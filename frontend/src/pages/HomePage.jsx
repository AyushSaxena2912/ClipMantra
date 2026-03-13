import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

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
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Extract viral clips from any YouTube video using AI</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-md stats-container">
          {[
            { label: "Total Jobs", value: stats.total, color: "var(--text-main)", glow: "rgba(255,255,255,0.2)" },
            { label: "Completed", value: stats.completed, color: "var(--primary)", glow: "rgba(0, 229, 153, 0.3)" },
            { label: "Processing", value: stats.active, color: "var(--accent-orange)", glow: "rgba(240, 165, 0, 0.3)" },
            { label: "Failed", value: stats.failed, color: "var(--accent-red)", glow: "rgba(255, 59, 59, 0.3)" },
          ].map((s) => (
            <div key={s.label} className="card stat-card" style={{
              padding: "var(--spacing-md)",
              '--glow-color': s.glow,
              border: '1px solid var(--border-muted)',
            }}>
              <p style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 16px" }}>
                {s.label}
              </p>
              <p className="font-syne stat-value" style={{ color: s.color, fontSize: "var(--fs-5xl)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1 }}>
                {s.value}
              </p>
              <div style={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: stats.total > 0 ? `${(s.value / stats.total) * 100}%` : '0%', background: s.color, opacity: 0.5 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Create Banner */}
        <div className="card stat-card quick-create-banner" style={{
          background: "linear-gradient(135deg, rgba(0, 229, 153, 0.05), rgba(18, 18, 22, 0.4))",
          border: "1px solid rgba(0, 229, 153, 0.15)",
          padding: "var(--spacing-xl)",
          '--glow-color': 'rgba(0, 229, 153, 0.15)',
          position: "relative"
        }}>
          <div style={{
            position: "absolute", right: -50, top: -50,
            width: 250, height: 250,
            background: "radial-gradient(circle, rgba(0, 229, 153, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="font-syne banner-title" style={{ fontWeight: "var(--fw-extrabold)", margin: "0 0 10px" }}>
              Start a New Job
            </h2>
            <p className="banner-desc" style={{ color: "var(--text-muted)", fontSize: "var(--fs-base)", margin: "0 0 28px", maxWidth: '500px' }}>
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
            <h2 style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)", margin: 0 }}>
              Recent Jobs
            </h2>
            <button onClick={onViewAll} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: "var(--fs-sm)" }}>
              View all →
            </button>
          </div>

          {loading ? <LoadingSpinner /> : jobs.length === 0
            ? <EmptyState label="No jobs yet. Create your first one!" />
            : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 16
              }}>
                {jobs.slice(0, 8).map((j) => <JobCard key={j.id} job={j} onClick={() => onViewJob(j)} />)}
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
