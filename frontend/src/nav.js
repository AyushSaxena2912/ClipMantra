/** Lightweight path helpers so refresh keeps the current screen. */

export function parseLocation(pathname = window.location.pathname) {
  const p = (pathname.replace(/\/+$/, "") || "/") ;
  if (p === "/auth") return { app: "auth" };
  if (p === "/app" || p.startsWith("/app/")) {
    const rest = p.slice(4).replace(/^\//, "");
    if (!rest) return { app: "dashboard", dash: "home" };
    if (rest === "new") return { app: "dashboard", dash: "new-job" };
    if (rest === "settings") return { app: "dashboard", dash: "settings" };
    const jobMatch = rest.match(/^jobs\/([^/]+)$/);
    if (jobMatch) {
      return { app: "dashboard", dash: "job-detail", jobId: decodeURIComponent(jobMatch[1]) };
    }
    return { app: "dashboard", dash: "home" };
  }
  return { app: "landing" };
}

export function pathForApp(app) {
  if (app === "auth") return "/auth";
  if (app === "dashboard") return "/app";
  return "/";
}

export function pathForDash(dash, jobId) {
  if (dash === "new-job") return "/app/new";
  if (dash === "settings") return "/app/settings";
  if (dash === "job-detail" && jobId) return `/app/jobs/${encodeURIComponent(jobId)}`;
  return "/app";
}

export function navigate(path, { replace = false } = {}) {
  if (window.location.pathname === path) return;
  if (replace) window.history.replaceState(null, "", path);
  else window.history.pushState(null, "", path);
}
