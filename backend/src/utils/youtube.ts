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
      }
    );

    const data = response.data;

    if (!data?.videos?.items?.length) {
      throw new Error("No video streams found");
    }

    // MP4 + audio streams filter karo
    const video = data.videos.items
      .filter((v: any) => v.hasAudio && v.mimeType?.includes("mp4"))
      .sort((a: any, b: any) => (b.height || 0) - (a.height || 0))[0];

    if (!video) {
      throw new Error("No valid MP4 video stream found");
    }

    return video.url;
  } catch (err: any) {
    console.error("RapidAPI error:", err?.message);
    throw new Error("Failed to fetch video download URL");
  }
}