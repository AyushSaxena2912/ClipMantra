import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

export type DownloadResult = {
  videoPath: string;
  audioPath: string;
};

/**
 * Run the Python yt-dlp download script.
 * Returns the actual output path (stdout from Python script).
 *
 * Exit codes from Python:
 *   0 = success
 *   1 = transient error (network, rate limit) — retryable
 *   2 = fatal error (private, unavailable, copyright) — don't retry
 */
const runDownloadScript = async (
  url: string,
  outputPath: string,
  mode: "video" | "audio",
  attempt: number = 1
): Promise<string> => {

  const MAX_ATTEMPTS = 3;
  const RETRY_DELAY_MS = 5000; // 5 seconds between retries

  try {

    const { stdout, stderr } = await execAsync(
      `python3 scripts/download.py "${url}" "${outputPath}" "${mode}"`,
      { timeout: 5 * 60 * 1000 } // 5 min timeout per attempt
    );

    if (stderr) {
      console.warn(`[YTDLP][${mode.toUpperCase()}] stderr: ${stderr}`);
    }

    // Python script prints final path to stdout
    const finalPath = stdout.trim();
    if (!finalPath) {
      throw new Error("yt-dlp script returned empty path");
    }

    return finalPath;

  } catch (err: any) {

    const exitCode = err?.code ?? 1;
    const stderr = err?.stderr ?? "";

    // Exit code 2 = fatal (private video, copyright, unavailable)
    // No point retrying these
    if (exitCode === 2) {
      throw new Error(`[YTDLP] Fatal error — cannot download: ${stderr}`);
    }

    // Retry on transient errors
    if (attempt < MAX_ATTEMPTS) {
      console.warn(
        `[YTDLP] Attempt ${attempt} failed. Retrying in ${RETRY_DELAY_MS / 1000}s... Error: ${stderr}`
      );
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS * attempt)); // Backoff
      return runDownloadScript(url, outputPath, mode, attempt + 1);
    }

    throw new Error(
      `[YTDLP] All ${MAX_ATTEMPTS} attempts failed for ${mode}. Last error: ${stderr}`
    );
  }
};

/**
 * Download a YouTube video as mp4 using yt-dlp.
 * Returns the final local path of the downloaded video.
 */
export const downloadVideo = async (
  url: string,
  jobId: string
): Promise<string> => {

  const outputPath = `storage/videos/${jobId}.mp4`;

  // If already downloaded (e.g. worker restart), skip
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    if (stats.size > 100_000) {
      console.log(`[YTDLP] Video already exists, skipping download: ${outputPath}`);
      return outputPath;
    }
    // File exists but is too small/corrupt — delete and re-download
    fs.unlinkSync(outputPath);
  }

  const finalPath = await runDownloadScript(url, outputPath, "video");

  // Validate
  if (!fs.existsSync(finalPath)) {
    throw new Error(`[YTDLP] Video file not found after download: ${finalPath}`);
  }

  const size = fs.statSync(finalPath).size;
  if (size < 100_000) {
    throw new Error(`[YTDLP] Video file too small (${size} bytes) — likely corrupt`);
  }

  console.log(`[YTDLP] Video downloaded: ${finalPath} (${(size / 1_000_000).toFixed(1)} MB)`);
  return finalPath;
};

/**
 * Download a YouTube video's audio as mp3 using yt-dlp.
 * Returns the final local path of the downloaded audio.
 */
export const downloadAudio = async (
  url: string,
  jobId: string
): Promise<string> => {

  const outputPath = `storage/audio/${jobId}.mp3`;

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    if (stats.size > 10_000) {
      console.log(`[YTDLP] Audio already exists, skipping download: ${outputPath}`);
      return outputPath;
    }
    fs.unlinkSync(outputPath);
  }

  const finalPath = await runDownloadScript(url, outputPath, "audio");

  if (!fs.existsSync(finalPath)) {
    throw new Error(`[YTDLP] Audio file not found after download: ${finalPath}`);
  }

  const size = fs.statSync(finalPath).size;
  if (size < 10_000) {
    throw new Error(`[YTDLP] Audio file too small (${size} bytes) — likely corrupt`);
  }

  console.log(`[YTDLP] Audio downloaded: ${finalPath} (${(size / 1_000_000).toFixed(1)} MB)`);
  return finalPath;
};