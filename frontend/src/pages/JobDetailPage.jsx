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

      fetch(`${API_BASE.replace("/api","")}/storage/${path}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((d) => setHighlights(Array.isArray(d) ? d : []))
        .catch(() => {});
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
      } catch {}
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
          color: "#555",
          cursor: "pointer",
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#fff",
                margin: 0,
              }}
            >
              Job Details
            </h1>

            <StatusBadge status={liveStatus} />

            {streaming && (
              <span
                style={{
                  color: "#00e599",
                  fontSize: 10,
                  fontFamily: "'DM Mono', monospace",
                  animation: "pulse 1.5s infinite",
                }}
              >
                ● LIVE
              </span>
            )}
          </div>

          <p
            style={{
              color: "#444",
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              margin: 0,
              maxWidth: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
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
                background: "#0d0d14",
                border: "1px solid #00e59944",
                borderRadius: 10,
                color: "#00e599",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
              }}
            >
              ↻ Watch Live
            </button>
          )}
      </div>

      {/* Pipeline */}
      {liveStatus !== "failed" && (
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid #1e1e2e",
            borderRadius: 14,
            padding: "24px 28px",
            marginBottom: 28,
          }}
        >
          <p
            style={{
              color: "#444",
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            Processing Pipeline
          </p>

          <div style={{ display: "flex", alignItems: "center" }}>
            {STEPS.map((step, i) => {
              const done = i < currentStep || liveStatus === "completed";
              const active =
                i === currentStep && liveStatus !== "completed";
              const color = done ? "#00e599" : active ? "#f0a500" : "#222";

              return (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: i < STEPS.length - 1 ? 1 : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: done
                          ? "#00e59922"
                          : active
                          ? "#f0a50022"
                          : "#111",
                        border: `2px solid ${color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
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
                      style={{
                        color: active
                          ? "#fff"
                          : done
                          ? "#555"
                          : "#333",
                        fontSize: 9,
                        fontFamily: "'DM Mono', monospace",
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
                      style={{
                        flex: 1,
                        height: 2,
                        background: done
                          ? "#00e59944"
                          : "#1a1a1a",
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
        <div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Generated Clips
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {clips.map((clipPath, i) => {
              const videoUrl = clipPath.startsWith("http")
                ? clipPath
                : `${API_BASE.replace("/api","")}/storage/${clipPath.replace(
                    /^storage\//,
                    ""
                  )}`;

              return (
                <div
                  key={i}
                  style={{
                    background: "#0d0d14",
                    border: "1px solid #1e1e2e",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <video
                    controls
                    src={videoUrl}
                    style={{
                      width: "100%",
                      maxHeight: 200,
                      background: "#000",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      padding: "12px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#555",
                        fontSize: 11,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      Clip {i + 1}
                    </span>

                    <a
                      href={videoUrl}
                      download={`clip_${i + 1}.mp4`}
                      style={{
                        background: "#001a0f",
                        border: "1px solid #00e59933",
                        borderRadius: 8,
                        color: "#00e599",
                        padding: "5px 12px",
                        fontSize: 11,
                        fontFamily: "'DM Mono', monospace",
                        textDecoration: "none",
                      }}
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
    </div>
  );
};

export default JobDetailPage;