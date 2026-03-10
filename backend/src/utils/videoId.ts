export function extractVideoId(url: string): string | null {

  try {

    const parsed = new URL(url);

    const hostname = parsed.hostname.replace("www.", "");

    /* youtube.com links */

    if (
      hostname.includes("youtube.com") ||
      hostname.includes("m.youtube.com")
    ) {

      /* watch?v= */

      const v = parsed.searchParams.get("v");
      if (v) return v;

      const parts = parsed.pathname.split("/").filter(Boolean);

      /* shorts */

      if (parts[0] === "shorts") {
        return parts[1] || null;
      }

      /* embed */

      if (parts[0] === "embed") {
        return parts[1] || null;
      }

    }

    /* youtu.be short link */

    if (hostname.includes("youtu.be")) {

      const id = parsed.pathname.replace("/", "");

      return id || null;
    }

    return null;

  } catch {

    return null;

  }

}