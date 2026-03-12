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
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    active: jobs.filter((j) => ["queued", "downloading", "transcribing", "rendering", "processing"].includes(j.status)).length,
    failed: jobs.filter((j) => j.status === "failed").length,
  };

  return (
    <div>
      <div className="flex flex-col gap-xl">
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px" }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 12 }}>
            Extract viral clips from any YouTube video using AI
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-md stats-container">
          {[
            { label: "Total Jobs", value: stats.total, color: "var(--text-main)", glow: "rgba(255,255,255,0.2)" },
            { label: "Completed", value: stats.completed, color: "var(--primary)", glow: "rgba(0, 229, 153, 0.3)" },
            { label: "Processing", value: stats.active, color: "var(--accent-orange)", glow: "rgba(240, 165, 0, 0.3)" },
            { label: "Failed", value: stats.failed, color: "var(--accent-red)", glow: "rgba(255, 59, 59, 0.3)" },
          ].map((s) => (
            <div key={s.label} className="card stat-card" style={{ padding: "24px", '--glow-color': s.glow }}>
              <p style={{ color: "var(--text-dim)", fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 12px" }}>
                {s.label}
              </p>
              <p className="font-syne stat-value" style={{ color: s.color, fontSize: 40, fontWeight: 800, margin: "0 0 12px", lineHeight: 1 }}>
                {s.value}
              </p>
              {/* Visual indicator bar */}
              <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: stats.total > 0 ? `${(s.value / stats.total) * 100}%` : '0%', background: s.color, opacity: 0.6 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Create Banner */}
        <div className="card stat-card quick-create-banner" style={{
          background: "linear-gradient(135deg, rgba(0, 229, 153, 0.05), rgba(5, 15, 10, 0.4))",
          border: "1px solid rgba(0, 229, 153, 0.15)",
          padding: "40px",
          '--glow-color': 'rgba(0, 229, 153, 0.2)'
        }}>
          <div style={{
            position: "absolute", right: -50, top: -50,
            width: 250, height: 250,
            background: "radial-gradient(circle, rgba(0,229,153,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="font-syne banner-title" style={{ fontSize: 24, fontWeight: 800, margin: "0 0 10px" }}>
              Start a New Job
            </h2>
            <p className="banner-desc" style={{ color: "var(--text-muted)", fontSize: 14, margin: "0 0 28px", maxWidth: '500px' }}>
              Paste a YouTube URL and let Gemini AI extract the most viral, high-engagement moments for you automatically.
            </p>
            <button onClick={onNewJob} className="btn-primary" style={{ padding: '14px 32px' }}>
              Create Job →
            </button>
          </div>
        </div>

        {/* Recent Jobs */}
        <div style={{ marginBottom: 20 }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>
              Recent Jobs
            </h2>
            <button onClick={onViewAll} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 12 }}>
              View all →
            </button>
          </div>

          {loading ? <LoadingState /> : jobs.length === 0
            ? <EmptyState label="No jobs yet. Create your first one!" />
            : (
              <div className="flex flex-col" style={{ gap: 10 }}>
                {jobs.slice(0, 5).map((j) => <JobRow key={j.id} job={j} onClick={() => onViewJob(j)} />)}
              </div>
            )
          }
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .stat-card {
            padding: 16px !important;
          }
          .stat-value {
            font-size: 32px !important;
          }
          .quick-create-banner {
            padding: 24px !important;
          }
          .banner-title {
            font-size: 20px !important;
          }
          .banner-desc {
            font-size: 13px !important;
            margin-bottom: 20px !important;
          }
        }
        @media (max-width: 480px) {
           .stats-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
