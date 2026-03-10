import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import axios from "axios";

import { redis } from "./redis";
import { pool } from "../db/pool";
import { detectHighlightsWithGemini } from "../ai/gemini";
import { getVideoDownloadUrl } from "../utils/youtube";
import { extractVideoId } from "../utils/videoId";
import { uploadToR2 } from "../utils/r2";

const execAsync = promisify(exec);
const role = process.argv[2];

if (!["download", "transcribe", "render"].includes(role)) {
  console.error("Provide worker role: download | transcribe | render");
  process.exit(1);
}

type Highlight = {
  start: number;
  end: number;
};

const log = (jobId: string, message: string) => {
  console.log(`[${role.toUpperCase()}][JOB ${jobId}] ${message}`);
};

const publishStatus = async (jobId: string, status: string) => {
  await redis.publish(`job:${jobId}`, JSON.stringify({ status }));
};

const ensureFolders = () => {
  const folders = [
    "storage/videos",
    "storage/audio",
    "storage/transcripts",
    "storage/highlights",
    "storage/clips",
  ];

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  });
};

const startWorker = async () => {

  console.log(`Worker started for role: ${role}`);

  ensureFolders();

  const queueName = `queue:${role}`;

  while (true) {

    let jobId: string | null = null;

    try {

      const job = await redis.brpop(queueName, 5);
      if (!job) continue;

      jobId = job[1];

      log(jobId, "Job received.");

      const result = await pool.query(
        `SELECT * FROM jobs WHERE id = $1`,
        [jobId]
      );

      const jobData = result.rows[0];
      if (!jobData) continue;

      /* ================= DOWNLOAD WORKER ================= */

      if (role === "download") {

        await pool.query(
          `UPDATE jobs SET status = 'downloading' WHERE id = $1`,
          [jobId]
        );

        await publishStatus(jobId, "downloading");

        const videoId = extractVideoId(jobData.url);

        if (!videoId) {
          throw new Error("Invalid YouTube URL");
        }

        const { videoId: id, itag } = await getVideoDownloadUrl(videoId);

        const videoDownloadUrl =
        `https://youtube-media-downloader.p.rapidapi.com/v2/video/download?videoId=${id}&itag=${itag}`;

        const videoPath = `storage/videos/${jobId}.mp4`;

        const response = await axios({
          method: "GET",
          url: videoDownloadUrl,
          responseType: "stream",
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com"
          }
        });

        const writer = fs.createWriteStream(videoPath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        const stats = fs.statSync(videoPath);

        if (!stats || stats.size < 100000) {
          throw new Error("Downloaded video file invalid");
        }

        const audioPath = `storage/audio/${jobId}.mp3`;

        await execAsync(
          `ffmpeg -i "${videoPath}" -vn -acodec libmp3lame "${audioPath}" -y`
        );

        const videoKey = `videos/${jobId}.mp4`;
        const videoUrlR2 = await uploadToR2(videoPath, videoKey);

        const audioKey = `audio/${jobId}.mp3`;
        const audioUrl = await uploadToR2(audioPath, audioKey);

        await pool.query(
          `UPDATE jobs SET video_path = $1, audio_path = $2 WHERE id = $3`,
          [videoUrlR2, audioUrl, jobId]
        );

        await redis.lpush("queue:transcribe", jobId);

        log(jobId, "Moved to transcribe queue.");
      }

      /* ================= TRANSCRIBE WORKER ================= */

      if (role === "transcribe") {

        await pool.query(
          `UPDATE jobs SET status = 'transcribing' WHERE id = $1`,
          [jobId]
        );

        await publishStatus(jobId, "transcribing");

        const transcriptPath = `storage/transcripts/${jobId}.json`;

        const localAudioPath = `storage/audio/${jobId}.mp3`;

        const response = await axios({
          url: jobData.audio_path,
          method: "GET",
          responseType: "stream",
        });

        const writer = fs.createWriteStream(localAudioPath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        await execAsync(
          `python3 scripts/transcribe.py "${localAudioPath}" "${transcriptPath}"`
        );

        await pool.query(
          `UPDATE jobs SET transcript_path = $1 WHERE id = $2`,
          [transcriptPath, jobId]
        );

        await redis.lpush("queue:render", jobId);

        log(jobId, "Moved to render queue.");
      }

      /* ================= RENDER WORKER ================= */

      if (role === "render") {

        await pool.query(
          `UPDATE jobs SET status = 'rendering' WHERE id = $1`,
          [jobId]
        );

        await publishStatus(jobId, "rendering");

        const localVideoPath = `storage/videos/${jobId}.mp4`;

        const videoResponse = await axios({
          url: jobData.video_path,
          method: "GET",
          responseType: "stream",
        });

        const videoWriter = fs.createWriteStream(localVideoPath);

        videoResponse.data.pipe(videoWriter);

        await new Promise((resolve, reject) => {
          videoWriter.on("finish", resolve);
          videoWriter.on("error", reject);
        });

        const transcriptRaw = fs.readFileSync(
          jobData.transcript_path,
          "utf-8"
        );

        const transcriptJson = JSON.parse(transcriptRaw);

        const transcriptText: string = transcriptJson.text;

        const clipCount =
          typeof jobData.clip_count === "number" &&
          jobData.clip_count > 0
            ? jobData.clip_count
            : 3;

        let highlights: Highlight[] = [];

        try {

          const parsed = await detectHighlightsWithGemini(
            transcriptText,
            clipCount
          );

          if (Array.isArray(parsed)) {

            highlights = parsed.filter(
              (clip: any) =>
                typeof clip.start === "number" &&
                typeof clip.end === "number" &&
                clip.end > clip.start
            );

          }

        } catch (e) {

          log(jobId, "Gemini error.");

        }

        highlights = highlights.slice(0, clipCount);

        const highlightsPath = `storage/highlights/${jobId}.json`;

        fs.writeFileSync(
          highlightsPath,
          JSON.stringify(highlights, null, 2)
        );

        const clipsDir = `storage/clips/${jobId}`;

        fs.mkdirSync(clipsDir, { recursive: true });

        const generatedClips: string[] = [];

        for (let i = 0; i < highlights.length; i++) {

          const outputClipPath = `${clipsDir}/clip_${i + 1}.mp4`;

          await execAsync(
            `ffmpeg -ss ${highlights[i].start} -i "${localVideoPath}" -t ${
              highlights[i].end - highlights[i].start
            } -c:v libx264 -c:a aac -movflags +faststart "${outputClipPath}" -y`
          );

          const key = `clips/${jobId}/clip_${i + 1}.mp4`;

          const publicUrl = await uploadToR2(outputClipPath, key);

          generatedClips.push(publicUrl);

          fs.unlinkSync(outputClipPath);
        }

        await pool.query(
          `UPDATE jobs
           SET status = 'completed',
               highlights_path = $1,
               clips_path = $2,
               completed_at = NOW()
           WHERE id = $3`,
          [
            highlightsPath,
            JSON.stringify(generatedClips),
            jobId,
          ]
        );

        await publishStatus(jobId, "completed");

        log(jobId, "Job completed.");
      }

    } catch (err) {

      console.error(`[${role}] Worker error for job ${jobId}`, err);

      if (jobId) {

        await pool.query(
          `UPDATE jobs SET status = 'failed' WHERE id = $1`,
          [jobId]
        );

        await publishStatus(jobId, "failed");

      }

    }

  }

};

startWorker();