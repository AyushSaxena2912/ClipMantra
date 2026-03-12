import { useState, useEffect, useRef, useCallback } from "react";
import { api, getToken } from "../api";
import { API_BASE } from "../api";
import StatusBadge from "../components/StatusBadge";
import { fmtTime } from "../utils/helpers";

const STEPS = ["queued", "downloading", "transcribing", "rendering", "completed"];

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

  /* Load highlights */
  useEffect(() => {
    if (job.highlights_path) {
      const path = job.highlights_path.replace(/^storage\//, "");

      fetch(`${API_BASE.replace("/api", "")}/storage/${path}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((d) => setHighlights(Array.isArray(d) ? d : []))
        .catch(() => { });
    }
  }, [job.highlights_path]);

  /* SSE stream */

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
      } catch { }
    };

    es.onerror = () => {
      setStreaming(false);
      es.close();
    };
  }, [job.id, onRefresh]);

  useEffect(() => {
    const active = [
      "queued",
      "downloading",
      "transcribing",
      "rendering",
      "processing",
    ].includes(job.status);

    if (active) startStream();

    return () => {
      if (esRef.current) esRef.current.close();
    };
  }, []);

  const currentStep =
    liveStatus === "completed"
      ? STEPS.length - 1
      : STEPS.indexOf(liveStatus);

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontFamily: 'var(--font-main)',
          fontSize: "var(--fs-sm)",
          marginBottom: 24,
          padding: 0,
        }}
      >
        ← Back to jobs
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div className="flex items-center" style={{ gap: 12, marginBottom: 6 }}>
            <h1 style={{ fontSize: "var(--fs-3xl)", fontWeight: "var(--fw-extrabold)", color: "#fff", margin: 0 }}>
              Job Details
            </h1>

            <StatusBadge status={liveStatus} />

            {streaming && (
              <span
                style={{
                  color: "#00e599",
                  fontSize: "var(--fs-xs)",
                  fontFamily: 'var(--font-main)',
                  animation: "pulse 1.5s infinite",
                }}
              >
                ● LIVE
              </span>
            )}
          </div>

          <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)", margin: 0, maxWidth: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {job.url}
          </p>
        </div>

        {[
          "queued",
          "downloading",
          "transcribing",
          "rendering",
          "processing",
        ].includes(liveStatus) &&
          !streaming && (
            <button
              onClick={startStream}
              style={{
                padding: "10px 18px",
                background: "#16161a",
                border: "1px solid #00e59933",
                borderRadius: 10,
                color: "#00e599",
                cursor: "pointer",
                fontFamily: 'var(--font-main)',
                fontSize: "var(--fs-sm)",
              }}
            >
              ↻ Watch Live
            </button>
          )}
      </div>

      {/* Pipeline */}
      {liveStatus !== "failed" && (
        <div className="card pipeline-card" style={{ padding: "24px 28px", marginBottom: 28 }}>
          <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 20px" }}>
            Processing Pipeline
          </p>

          <div className="pipeline-container" style={{ display: "flex", alignItems: "center" }}>
            {STEPS.map((step, i) => {
              const done = i < currentStep || liveStatus === "completed";
              const active =
                i === currentStep && liveStatus !== "completed";
              const color = done ? "#00e599" : active ? "var(--accent-orange)" : "#222";

              return (
                <div
                  key={step}
                  className="pipeline-step"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: i < STEPS.length - 1 ? 1 : "none",
                  }}
                >
                  <div
                    className="step-marker-container"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      zIndex: 2
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: done
                          ? "#00e59915"
                          : active
                            ? "rgba(255, 153, 0, 0.1)"
                            : "#111",
                        border: `2px solid ${color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "var(--fs-xs)",
                        color,
                        boxShadow: active
                          ? `0 0 12px ${color}44`
                          : "none",
                        animation: active
                          ? "pulse 1.5s infinite"
                          : "none",
                      }}
                    >
                      {done ? "✓" : i + 1}
                    </div>

                    <span
                      className="step-label"
                      style={{
                        color: active
                          ? "#fff"
                          : done
                            ? "var(--text-muted)"
                            : "var(--text-dim)",
                        fontSize: "var(--fs-xs)",
                        fontFamily: 'var(--font-main)',
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step}
                    </span>
                  </div>

                  {i < STEPS.length - 1 && (
                    <div
                      className="step-connector"
                      style={{
                        flex: 1,
                        height: 2,
                        background: done
                          ? "#00e59933"
                          : "#1a1a24",
                        margin: "0 4px",
                        marginBottom: 22,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Video Clips */}
      {clips.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)", color: "#fff", margin: "0 0 16px" }}>
            Generated Clips
          </h2>

          <div className="clips-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {clips.map((clipPath, i) => {
              const videoUrl = clipPath.startsWith("http")
                ? clipPath
                : `${API_BASE.replace("/api", "")}/storage/${clipPath.replace(
                  /^storage\//,
                  ""
                )}`;

              return (
                <div key={i} className="card clip-card" style={{ padding: 0, overflow: "hidden" }}>
                  <video
                    controls
                    src={videoUrl}
                    style={{
                      width: "100%",
                      aspectRatio: '16/9',
                      background: "#000",
                      display: "block",
                    }}
                  />

                  <div style={{ padding: "16px" }} className="flex justify-between items-center">
                    <span className="font-syne" style={{ color: "#fff", fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)" }}>
                      Clip {i + 1}
                    </span>

                    <a
                      href={videoUrl}
                      download={`clip_${i + 1}.mp4`}
                      style={{
                        background: "rgba(240, 48, 80, 0.1)",
                        border: "1px solid var(--primary)",
                        borderRadius: 8,
                        color: "var(--primary)",
                        padding: "6px 14px",
                        fontSize: "var(--fs-xs)",
                        fontFamily: "'Montserrat', sans-serif",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 229, 153, 0.1)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    >
                      ↓ Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .pipeline-container {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0 !important;
          }
          .pipeline-step {
            flex-direction: row !important;
            width: 100% !important;
            flex: none !important;
            height: 60px !important;
          }
          .step-marker-container {
            flex-direction: row !important;
            align-items: center !important;
            gap: 16px !important;
          }
          .step-label {
            font-size: 11px !important;
          }
          .step-connector {
            position: absolute !important;
            left: 13px !important;
            top: 28px !important;
            width: 2px !important;
            height: 32px !important;
            margin: 0 !important;
          }
          .pipeline-card {
            padding: 20px !important;
          }
          .clips-grid {
            grid-template-columns: 1fr !important;
          }
          .clip-card video {
             max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobDetailPage;