import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const detectHighlightsWithGemini = async (
  transcriptText: string,
  clipCount: number = 3
) => {
  try {

    const safeTranscript =
      transcriptText.length > 25000
        ? transcriptText.slice(0, 25000)
        : transcriptText;

    const prompt = `
You are a viral content editor.

Extract EXACTLY ${clipCount} viral clips.

Rules:
• Duration 18–65 seconds
• Strong hook in first 3 seconds
• Avoid greetings or filler
• Return ONLY JSON array

Format:

[
  {
    "start": number,
    "end": number,
    "title": "Short hook title",
    "hook": "Opening sentence",
    "viral_score": number,
    "reason": "Why it works"
  }
]

Transcript:
${safeTranscript}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    /* remove markdown if exists */

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed)) return [];

    /* ensure numbers */

    const cleaned = parsed
      .map((clip: any) => ({
        start: Number(clip.start),
        end: Number(clip.end),
        title: clip.title || "",
        hook: clip.hook || "",
        viral_score: Number(clip.viral_score || 0),
        reason: clip.reason || "",
      }))
      .filter(
        (c) =>
          !isNaN(c.start) &&
          !isNaN(c.end) &&
          c.end > c.start &&
          c.end - c.start >= 10
      );

    return cleaned.slice(0, clipCount);

  } catch (error) {

    console.error("Gemini error:", error);

    return [];
  }
};