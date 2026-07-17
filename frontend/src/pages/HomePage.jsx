import { useMemo, useState } from "react";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";

const PAGE_SIZE = 12;

const FILTERS = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "active", label: "In progress" },
  { id: "failed", label: "Failed" },
];

const ACTIVE = ["queued", "downloading", "transcribing", "rendering", "processing"];

function matchesFilter(job, filter) {
  if (filter === "all") return true;
  if (filter === "completed") return job.status === "completed";
  if (filter === "failed") return job.status === "failed";
  if (filter === "active") return ACTIVE.includes(job.status);
  return true;
}

const HomePage = ({ user, jobs, loading, onNewJob, onViewJob }) => {
  const firstName = user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const stats = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    active: jobs.filter((j) => ACTIVE.includes(j.status)).length,
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

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs
      .filter((j) => matchesFilter(j, filter))
      .filter((j) => !q || (j.url || "").toLowerCase().includes(q) || String(j.id).includes(q))
      .slice()
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }, [jobs, filter, query]);

  const shownJobs = filteredJobs.slice(0, visible);
  const hasMore = filteredJobs.length > visible;

  const setFilterAndReset = (id) => {
    setFilter(id);
    setVisible(PAGE_SIZE);
  };

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

      <section className="dash-panel" id="jobs">
        <div className="dash-panel-head">
          <div>
            <h2 className="dash-panel-title">Your jobs</h2>
            <p className="dash-panel-sub">
              {jobs.length === 0
                ? "All your clip jobs in one place"
                : filter === "all" && !query.trim()
                  ? `${jobs.length} job${jobs.length === 1 ? "" : "s"} in your workspace`
                  : `${filteredJobs.length} of ${jobs.length} job${jobs.length === 1 ? "" : "s"} shown`}
            </p>
          </div>
        </div>

        {jobs.length > 0 && (
          <div className="dash-jobs-toolbar">
            <div className="dash-jobs-filters" role="tablist" aria-label="Filter jobs">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`dash-jobs-filter${filter === f.id ? " is-active" : ""}`}
                  onClick={() => setFilterAndReset(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label className="dash-jobs-search">
              <span className="sr-only">Search jobs</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
                placeholder="Search by URL…"
              />
            </label>
          </div>
        )}

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
        ) : filteredJobs.length === 0 ? (
          <div className="dash-empty dash-empty--compact">
            <h3 className="dash-empty-title">No matching jobs</h3>
            <p className="dash-empty-desc">Try another filter or clear your search.</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setFilter("all");
                setQuery("");
                setVisible(PAGE_SIZE);
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="dash-jobs-grid">
              {shownJobs.map((j) => (
                <JobCard key={j.id} job={j} onClick={() => onViewJob(j)} />
              ))}
            </div>
            {hasMore && (
              <div className="dash-jobs-more">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setVisible((n) => n + PAGE_SIZE)}
                >
                  Show more ({filteredJobs.length - visible} left)
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
