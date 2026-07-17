import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = ({ user, jobs, loading, onNewJob, onViewJob, onViewAll }) => {
  const firstName = user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const stats = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    active: jobs.filter((j) =>
      ["queued", "downloading", "transcribing", "rendering", "processing"].includes(j.status)
    ).length,
    failed: jobs.filter((j) => j.status === "failed").length,
  };

  const successRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : null;

  const STATS = [
    {
      key: "total",
      label: "Total jobs",
      value: stats.total,
      hint: "All time",
      color: "var(--text-main)",
      icon: "◈",
    },
    {
      key: "completed",
      label: "Completed",
      value: stats.completed,
      hint: successRate != null ? `${successRate}% success` : "Ready clips",
      color: "var(--accent-success)",
      icon: "✓",
    },
    {
      key: "active",
      label: "In progress",
      value: stats.active,
      hint: stats.active ? "Live pipeline" : "Idle",
      color: "var(--accent-orange)",
      icon: "◎",
    },
    {
      key: "failed",
      label: "Failed",
      value: stats.failed,
      hint: stats.failed ? "Needs retry" : "All clear",
      color: "var(--accent-red)",
      icon: "!",
    },
  ];

  return (
    <div className="dash-home">
      <header className="dash-home-top">
        <div>
          <p className="dash-home-eyebrow">{greeting}</p>
          <h1 className="dash-home-title">
            Welcome back, <span className="text-gradient-purple">{firstName}</span>
          </h1>
          <p className="dash-home-sub">
            Your AI clip workspace — paste a link, extract viral moments, ship Shorts.
          </p>
        </div>
        <button type="button" className="btn-primary dash-home-cta" onClick={() => onNewJob?.()}>
          New job
        </button>
      </header>

      <section className="dash-stats" aria-label="Workspace stats">
        {STATS.map((s) => (
          <article key={s.key} className="dash-stat">
            <div className="dash-stat-head">
              <span className="dash-stat-icon" style={{ color: s.color }}>{s.icon}</span>
              <span className="dash-stat-label">{s.label}</span>
            </div>
            <p className="dash-stat-value" style={{ color: s.color }}>{s.value}</p>
            <p className="dash-stat-hint">{s.hint}</p>
          </article>
        ))}
      </section>

      <section className="dash-panel">
        <div className="dash-panel-head">
          <div>
            <h2 className="dash-panel-title">Recent jobs</h2>
            <p className="dash-panel-sub">Latest extractions in your workspace</p>
          </div>
          {jobs.length > 0 && (
            <button type="button" className="dash-link" onClick={onViewAll}>
              View all →
            </button>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : jobs.length === 0 ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden="true">✦</div>
            <h3 className="dash-empty-title">No jobs yet</h3>
            <p className="dash-empty-desc">
              Create your first job to see viral clips appear here. Most runs finish in a few minutes.
            </p>
            <button type="button" className="btn-primary" onClick={() => onNewJob?.()}>
              Create first job →
            </button>
          </div>
        ) : (
          <div className="dash-jobs-grid">
            {jobs.slice(0, 6).map((j) => (
              <JobCard key={j.id} job={j} onClick={() => onViewJob(j)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
