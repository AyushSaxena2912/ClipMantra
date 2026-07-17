import { useState, useEffect, useRef, useCallback } from "react";
import { api, getToken } from "../api";
import { API_BASE } from "../api";
import StatusBadge from "../components/StatusBadge";

const STEPS = [
  { key: "queued", label: "Queued", hint: "Waiting to start" },
  { key: "downloading", label: "Downloading", hint: "Getting your video" },
  { key: "transcribing", label: "Reading audio", hint: "Speech to text" },
  { key: "rendering", label: "Making clips", hint: "Cutting highlights" },
  { key: "completed", label: "Done", hint: "Ready to download" },
];

const ACTIVE = ["queued", "downloading", "transcribing", "rendering", "processing"];

const JobDetailPage = ({ job: initialJob, onBack, toast, onRefresh }) => {
  const [job, setJob] = useState(initialJob);
  const [liveStatus, setLiveStatus] = useState(initialJob.status);
  const [streaming, setStreaming] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const esRef = useRef(null);

  const clips = job.clips_path
    ? Array.isArray(job.clips_path)
      ? job.clips_path
      : JSON.parse(job.clips_path || "[]")
    : [];

  useEffect(() => {
    api(`/jobs/${initialJob.id}`).then((r) => {
      if (r.ok) {
        setJob(r.data.data);
        setLiveStatus(r.data.data.status);
      }
    });
  }, [initialJob.id]);

  useEffect(() => {
    if (job.highlights_path) {
      const path = job.highlights_path.replace(/^storage\//, "");
      fetch(`${API_BASE.replace("/api", "")}/storage/${path}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((d) => setHighlights(Array.isArray(d) ? d : []))
        .catch(() => {});
    }
  }, [job.highlights_path]);

  const startStream = useCallback(() => {
    if (esRef.current) esRef.current.close();
    setStreaming(true);

    const es = new EventSource(
      `${API_BASE}/jobs/${job.id}/stream?token=${getToken()}`
    );
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        setLiveStatus(d.status);

        if (d.status === "completed" || d.status === "failed") {
          setStreaming(false);
          es.close();
          api(`/jobs/${job.id}`).then((r) => {
            if (r.ok) {
              setJob(r.data.data);
              onRefresh();
            }
          });
        }
      } catch {}
    };

    es.onerror = () => {
      setStreaming(false);
      es.close();
    };
  }, [job.id, onRefresh]);

  useEffect(() => {
    if (ACTIVE.includes(job.status)) startStream();
    return () => {
      if (esRef.current) esRef.current.close();
    };
  }, []);

  const stepKeys = STEPS.map((s) => s.key);
  const currentStep =
    liveStatus === "completed"
      ? stepKeys.length - 1
      : liveStatus === "processing"
        ? stepKeys.indexOf("rendering")
        : Math.max(0, stepKeys.indexOf(liveStatus));

  const progressPct =
    liveStatus === "completed"
      ? 100
      : liveStatus === "failed"
        ? 0
        : Math.round(((currentStep + (ACTIVE.includes(liveStatus) ? 0.45 : 0)) / (stepKeys.length - 1)) * 100);

  const statusCopy =
    liveStatus === "failed"
      ? "Something went wrong with this job."
      : liveStatus === "completed"
        ? clips.length
          ? `${clips.length} clip${clips.length === 1 ? "" : "s"} ready to download.`
          : "Job finished."
        : streaming
          ? "Working on your video — this page updates live."
          : "Job is in progress.";

  return (
    <div className="jobdetail">
      <button type="button" className="jobdetail-back" onClick={onBack}>
        ← Back to jobs
      </button>

      <header className="jobdetail-header">
        <div className="jobdetail-header-main">
          <div className="jobdetail-title-row">
            <h1 className="jobdetail-title">Job details</h1>
            <StatusBadge status={liveStatus} />
            {streaming && (
              <span className="jobdetail-live">
                <span className="jobdetail-live-dot" aria-hidden="true" />
                Live
              </span>
            )}
          </div>
          <a
            className="jobdetail-url"
            href={job.url}
            target="_blank"
            rel="noreferrer"
            title={job.url}
          >
            {job.url}
          </a>
          <p className="jobdetail-status-copy">{statusCopy}</p>
        </div>

        {ACTIVE.includes(liveStatus) && !streaming && (
          <button type="button" className="btn-secondary" onClick={startStream}>
            Watch live
          </button>
        )}
      </header>

      {liveStatus === "failed" ? (
        <section className="jobdetail-failed">
          <h2 className="jobdetail-failed-title">Job failed</h2>
          <p className="jobdetail-failed-desc">
            Try creating a new job with the same link, or pick a different video.
          </p>
          <button type="button" className="btn-primary" onClick={onBack}>
            Back to jobs
          </button>
        </section>
      ) : (
        <section className="jobdetail-pipeline">
          <div className="jobdetail-pipeline-top">
            <div>
              <p className="jobdetail-kicker">Progress</p>
              <h2 className="jobdetail-pipeline-title">
                {liveStatus === "completed" ? "All steps complete" : "Making your clips"}
              </h2>
            </div>
            <span className="jobdetail-progress-pill">{progressPct}%</span>
          </div>

          <div className="jobdetail-progress-track" aria-hidden="true">
            <div className="jobdetail-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>

          <ol className="jobdetail-steps">
            {STEPS.map((step, i) => {
              const done = i < currentStep || liveStatus === "completed";
              const active = i === currentStep && liveStatus !== "completed";
              return (
                <li
                  key={step.key}
                  className={`jobdetail-step${done ? " is-done" : ""}${active ? " is-active" : ""}`}
                >
                  <span className="jobdetail-step-marker">
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="jobdetail-step-label">{step.label}</span>
                  <span className="jobdetail-step-hint">{step.hint}</span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {clips.length > 0 && (
        <section className="jobdetail-clips">
          <div className="jobdetail-clips-head">
            <div>
              <h2 className="jobdetail-clips-title">Your clips</h2>
              <p className="jobdetail-clips-sub">
                {clips.length} ready · download anytime
              </p>
            </div>
          </div>

          <div className="jobdetail-clips-grid">
            {clips.map((clipPath, i) => {
              const videoUrl = clipPath.startsWith("http")
                ? clipPath
                : `${API_BASE.replace("/api", "")}/storage/${clipPath.replace(/^storage\//, "")}`;

              return (
                <article key={i} className="jobdetail-clip">
                  <video controls src={videoUrl} className="jobdetail-clip-video" />
                  <div className="jobdetail-clip-meta">
                    <span className="jobdetail-clip-name">Clip {i + 1}</span>
                    <a
                      href={videoUrl}
                      download={`clip_${i + 1}.mp4`}
                      className="jobdetail-clip-download"
                    >
                      Download
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {highlights.length > 0 && liveStatus === "completed" && (
        <section className="jobdetail-highlights">
          <h2 className="jobdetail-clips-title">Highlight moments</h2>
          <p className="jobdetail-clips-sub">Moments the AI ranked highest</p>
          <ul className="jobdetail-highlight-list">
            {highlights.slice(0, 8).map((h, i) => (
              <li key={i} className="jobdetail-highlight-item">
                <span className="jobdetail-highlight-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="jobdetail-highlight-title">
                    {h.title || h.reason || `Moment ${i + 1}`}
                  </p>
                  {(h.start != null || h.end != null) && (
                    <p className="jobdetail-highlight-time">
                      {h.start != null ? `${Math.round(h.start)}s` : "—"}
                      {" → "}
                      {h.end != null ? `${Math.round(h.end)}s` : "—"}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default JobDetailPage;
