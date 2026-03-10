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
    ["🔽", "Download",   "Video downloaded via yt-dlp"],
    ["🎙️", "Transcribe", "Audio transcribed to text"],
    ["🤖", "AI Analysis","Gemini detects viral moments"],
    ["✂️", "Render",     `${count} clips extracted with FFmpeg`],
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
          New Job
        </h1>
        <p style={{ color: "#555", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
          Paste a YouTube URL to extract viral clips
        </p>
      </div>

      <div style={{ background: "#0d0d14", border: "1px solid #1e1e2e", borderRadius: 16, padding: 32 }}>
        {/* URL Input */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: "block", color: "#555", fontSize: 11,
            fontFamily: "'DM Mono', monospace", letterSpacing: 1.5,
            textTransform: "uppercase", marginBottom: 8,
          }}>YouTube URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="https://youtube.com/watch?v=..."
            style={{
              width: "100%", padding: "14px 16px",
              background: "#080810", border: "1px solid #1e1e2e",
              borderRadius: 12, color: "#fff", fontSize: 14,
              fontFamily: "'DM Mono', monospace", outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#00e599")}
            onBlur={(e) => (e.target.style.borderColor = "#1e1e2e")}
          />
        </div>

        {/* Clip Count Slider */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: "block", color: "#555", fontSize: 11,
            fontFamily: "'DM Mono', monospace", letterSpacing: 1.5,
            textTransform: "uppercase", marginBottom: 12,
          }}>
            Number of Clips: <span style={{ color: "#00e599" }}>{count}</span>
          </label>
          <input
            type="range" min={1} max={10} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#00e599", cursor: "pointer" }}
          />
          <div style={{
            display: "flex", justifyContent: "space-between",
            color: "#333", fontSize: 10,
            fontFamily: "'DM Mono', monospace", marginTop: 6,
          }}>
            <span>1</span><span>5</span><span>10</span>
          </div>
        </div>

        {/* Pipeline Preview */}
        <div style={{
          background: "#080810", border: "1px solid #1e1e2e",
          borderRadius: 10, padding: 16, marginBottom: 24,
        }}>
          <p style={{ color: "#333", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 14px" }}>
            Pipeline
          </p>
          {steps.map(([icon, title, desc]) => (
            <div key={title} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <div>
                <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{title}</span>
                <span style={{ color: "#444", fontSize: 12, fontFamily: "'DM Mono', monospace", marginLeft: 8 }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%", padding: "15px 0",
            background: loading ? "#111" : "linear-gradient(135deg, #00e599, #00c47a)",
            color: loading ? "#555" : "#000",
            border: "none", borderRadius: 12,
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating job..." : "Start Clipping →"}
        </button>
        <p style={{ color: "#333", fontSize: 10, fontFamily: "'DM Mono', monospace", textAlign: "center", marginTop: 12 }}>
          Max 10 jobs per hour
        </p>
      </div>
    </div>
  );
};

export default NewJobPage;
