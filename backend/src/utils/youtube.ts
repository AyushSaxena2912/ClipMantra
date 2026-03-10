import axios from "axios";

export async function getVideoDownloadUrl(videoId: string) {

  try {

    const response = await axios.get(
      "https://youtube-media-downloader.p.rapidapi.com/v2/video/details",
      {
        params: { videoId },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
        },
        timeout: 15000,
      }
    );

    const data = response.data;

    if (!data?.videos?.items?.length) {
      throw new Error("No video streams found");
    }

    /* filter mp4 streams with audio */

    const streams = data.videos.items.filter(
      (v: any) => v.hasAudio && v.mimeType?.includes("mp4") && v.url
    );

    if (!streams.length) {
      throw new Error("No valid MP4 stream with audio");
    }

    /* pick highest quality */

    const video = streams.sort(
      (a: any, b: any) => (b.height || 0) - (a.height || 0)
    )[0];

    return video.url;

  } catch (err: any) {

    console.error("RapidAPI error:", err?.response?.data || err.message);

    throw new Error("Failed to fetch video download URL");

  }
}