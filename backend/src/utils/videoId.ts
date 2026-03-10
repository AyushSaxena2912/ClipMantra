export function extractVideoId(url: string): string | null {

  try {

    const parsed = new URL(url);

    /* youtube.com/watch?v= */

    if (parsed.hostname.includes("youtube.com")) {

      const v = parsed.searchParams.get("v");
      if (v) return v;

      /* shorts */

      const parts = parsed.pathname.split("/");
      if (parts.includes("shorts")) {
        return parts[parts.indexOf("shorts") + 1] || null;
      }

      /* embed */

      if (parts.includes("embed")) {
        return parts[parts.indexOf("embed") + 1] || null;
      }

    }

    /* youtu.be */

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    return null;

  } catch {
    return null;
  }

}