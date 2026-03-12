import { useState } from "react";
import { api } from "../api";

const NewJobPage = ({ onJobCreated, toast }) => {
  const [url, setUrl] = useState("");
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!url.trim()) { toast("Please enter a YouTube URL", "error"); return; }
    setLoading(true);
    const r = await api("/jobs", {
      method: "POST",
      body: JSON.stringify({ url: url.trim(), count }),
    });
    setLoading(false);
    if (r.ok) { toast("Job created! Processing started 🚀", "success"); onJobCreated(r.data.data); }
    else toast(r.data.message || "Failed to create job", "error");
  };

  const steps = [
    ["Download", "Video downloaded via yt-dlp"],
    ["Transcribe", "Audio transcribed to text"],
    ["AI Analysis", "Gemini detects viral moments"],
    ["Render", `${count} clips extracted with FFmpeg`],
  ];

  return (
    <div style={{ maxWidth: 400 }} className="flex flex-col gap-lg">
      <div style={{ marginBottom: 36 }}>
        <h1>New Job</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>
          Paste a YouTube URL to extract viral clips
        </p>
      </div>

      <div className="card" style={{ padding: "32px" }}>
        {/* URL Input */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: "block", color: "var(--text-dim)", fontSize: "var(--fs-xs)",
            fontFamily: "'Montserrat', sans-serif", letterSpacing: 1.5,
            textTransform: "uppercase", marginBottom: 8,
          }}>YouTube URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="https://youtube.com/watch?v=..."
            style={{
              width: "100%", padding: "14px 16px",
              background: "var(--bg-input)", border: "1px solid var(--border-color)",
              borderRadius: 12, color: "#fff", fontSize: "var(--fs-base)",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
          />
        </div>

        {/* Clip Count Slider */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: "block", color: "var(--text-dim)", fontSize: "var(--fs-xs)",
            fontFamily: "'Montserrat', sans-serif", letterSpacing: 1.5,
            textTransform: "uppercase", marginBottom: 12,
          }}>
            Number of Clips: <span style={{ color: "var(--primary)" }}>{count}</span>
          </label>
          <input
            type="range" min={1} max={10} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer" }}
          />
          <div style={{
            display: "flex", justifyContent: "space-between",
            color: "var(--text-dim)", fontSize: "var(--fs-xs)",
            fontFamily: "'Montserrat', sans-serif", marginTop: 6,
          }}>
            <span>1</span><span>5</span><span>10</span>
          </div>
        </div>

        {/* Pipeline Preview - Only shown during submission/processing */}
        {loading && (
          <div style={{
            marginBottom: 24, padding: '20px', background: '#080810', borderRadius: 10, border: '1px solid #1e1e2e'
          }}>
            <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)", fontFamily: "'Montserrat', sans-serif", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 16px" }}>
              Pipeline
            </p>
            <div className="flex flex-col">
              {steps.map(([title, desc], i) => (
                <div key={title} className="flex gap-md">
                  <div className="flex flex-col items-center" style={{ width: 16 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--primary)',
                      boxShadow: '0 0 8px var(--primary-glow)',
                      zIndex: 2,
                      marginTop: 6
                    }} />
                    {i < steps.length - 1 && (
                      <div style={{
                        flex: 1, width: 1, background: 'var(--primary)',
                        opacity: 0.2, minHeight: 30
                      }} />
                    )}
                  </div>

                  <div style={{ paddingBottom: i < steps.length - 1 ? 16 : 0 }}>
                    <p className="font-syne" style={{ color: "var(--text-main)", fontSize: "var(--fs-base)", fontWeight: "var(--fw-bold)", margin: "0 0 2px" }}>{title}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)", fontFamily: "'Montserrat', sans-serif", margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="btn-primary"
          style={{ width: "100%" }}
        >
          {loading ? "Creating job..." : "Start Clipping →"}
        </button>
        <p style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)", fontFamily: "'Montserrat', sans-serif", textAlign: "center", marginTop: 12 }}>
          Max 10 jobs per hour
        </p>
      </div>
    </div>
  );
};

export default NewJobPage;
