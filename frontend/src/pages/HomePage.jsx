import JobRow from "../components/JobRow";

const LoadingState = () => (
  <div style={{ padding: "60px 0", textAlign: "center" }}>
    <div style={{
      width: 32, height: 32,
      border: "2px solid #1e1e2e", borderTopColor: "#00e599",
      borderRadius: "50%", animation: "spin 0.8s linear infinite",
      margin: "0 auto 16px",
    }} />
    <p style={{ color: "#333", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>Loading...</p>
  </div>
);

const EmptyState = ({ label }) => (
  <div style={{ padding: "60px 0", textAlign: "center", border: "1px dashed #1e1e2e", borderRadius: 14 }}>
    <p style={{ color: "#333", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{label}</p>
  </div>
);

const HomePage = ({ jobs, loading, onNewJob, onViewJob, onViewAll }) => {
  const stats = {
    total:     jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    active:    jobs.filter((j) => ["queued","downloading","transcribing","rendering","processing"].includes(j.status)).length,
    failed:    jobs.filter((j) => j.status === "failed").length,
  };

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
          Dashboard
        </h1>
        <p style={{ color: "#555", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
          Extract viral clips from any YouTube video using AI
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
        {[
          { label: "Total Jobs",  value: stats.total,     color: "#fff"    },
          { label: "Completed",   value: stats.completed, color: "#00e599" },
          { label: "Processing",  value: stats.active,    color: "#f0a500" },
          { label: "Failed",      value: stats.failed,    color: "#ff3b3b" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#0d0d14", border: "1px solid #1e1e2e", borderRadius: 14, padding: "20px 22px" }}>
            <p style={{ color: "#444", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 10px" }}>
              {s.label}
            </p>
            <p style={{ color: s.color, fontSize: 32, fontFamily: "'Syne', sans-serif", fontWeight: 800, margin: 0 }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Create Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0d1a12, #050f0a)",
        border: "1px solid #00e59922", borderRadius: 16,
        padding: "28px 32px", marginBottom: 32,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -30, top: -30,
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(0,229,153,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
          Start a New Job
        </h2>
        <p style={{ color: "#555", fontSize: 12, fontFamily: "'DM Mono', monospace", margin: "0 0 20px" }}>
          Paste a YouTube URL and let Gemini AI find the viral moments
        </p>
        <button
          onClick={onNewJob}
          style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg, #00e599, #00c47a)",
            color: "#000", border: "none", borderRadius: 10,
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}
        >
          Create Job →
        </button>
      </div>

      {/* Recent Jobs */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>
            Recent Jobs
          </h2>
          <button onClick={onViewAll} style={{ background: "none", border: "none", color: "#00e599", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
            View all →
          </button>
        </div>

        {loading ? <LoadingState /> : jobs.length === 0
          ? <EmptyState label="No jobs yet. Create your first one!" />
          : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {jobs.slice(0, 5).map((j) => <JobRow key={j.id} job={j} onClick={() => onViewJob(j)} />)}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default HomePage;
