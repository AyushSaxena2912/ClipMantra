import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";

const JobsPage = ({ jobs, loading, onViewJob, onRefresh, onNewJob }) => {
  const completed = jobs.filter((j) => j.status === "completed").length;
  const active = jobs.filter((j) =>
    ["queued", "downloading", "transcribing", "rendering", "processing"].includes(j.status)
  ).length;
  const failed = jobs.filter((j) => j.status === "failed").length;

  return (
    <div className="jobs">
      <header className="jobs-header">
        <div>
          <p className="jobs-eyebrow">Manage</p>
          <h1 className="jobs-title">Jobs</h1>
          <p className="jobs-sub">
            {jobs.length === 0
              ? "Your clip jobs will show up here"
              : `${jobs.length} job${jobs.length === 1 ? "" : "s"} · ${completed} done · ${active} running`}
          </p>
        </div>
        <div className="jobs-actions">
          <button type="button" className="btn-secondary" onClick={onRefresh} disabled={loading}>
            Refresh
          </button>
          {onNewJob && (
            <button type="button" className="btn-primary" onClick={onNewJob}>
              New job
            </button>
          )}
        </div>
      </header>

      {jobs.length > 0 && (
        <div className="jobs-summary">
          <div className="jobs-summary-item">
            <span className="jobs-summary-label">Total</span>
            <span className="jobs-summary-value">{jobs.length}</span>
          </div>
          <div className="jobs-summary-item">
            <span className="jobs-summary-label">Completed</span>
            <span className="jobs-summary-value" style={{ color: "var(--accent-success)" }}>{completed}</span>
          </div>
          <div className="jobs-summary-item">
            <span className="jobs-summary-label">In progress</span>
            <span className="jobs-summary-value" style={{ color: "var(--accent-orange)" }}>{active}</span>
          </div>
          <div className="jobs-summary-item">
            <span className="jobs-summary-label">Failed</span>
            <span className="jobs-summary-value" style={{ color: "var(--accent-red)" }}>{failed}</span>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : jobs.length === 0 ? (
        <div className="jobs-empty">
          <div className="jobs-empty-icon" aria-hidden="true">≡</div>
          <h2 className="jobs-empty-title">No jobs yet</h2>
          <p className="jobs-empty-desc">
            Create a job from a YouTube link and your clips will appear in this list.
          </p>
          {onNewJob && (
            <button type="button" className="btn-primary" onClick={onNewJob}>
              Create first job →
            </button>
          )}
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} onClick={() => onViewJob(j)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
