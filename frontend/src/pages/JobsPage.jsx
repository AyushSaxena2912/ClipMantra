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

const EmptyState = () => (
  <div style={{ padding: "60px 0", textAlign: "center", border: "1px dashed #1e1e2e", borderRadius: 14 }}>
    <p style={{ color: "#333", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>No jobs yet.</p>
  </div>
);

const JobsPage = ({ jobs, loading, onViewJob, onRefresh }) => (
  <div className="flex flex-col" style={{ gap: "var(--spacing-lg)" }}>
    <div className="flex justify-between items-center">
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
          All Jobs
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 12 }}>
          {jobs.length} jobs total
        </p>
      </div>
      <button
        onClick={onRefresh}
        style={{
          padding: "10px 20px", background: "var(--bg-card)",
          border: "1px solid var(--border-color)", borderRadius: 10,
          color: "var(--text-muted)", cursor: "pointer",
          fontSize: 12, transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.color = "var(--primary)"; }}
        onMouseLeave={(e) => { e.target.style.borderColor = "var(--border-color)"; e.target.style.color = "var(--text-muted)"; }}
      >
        ↻ Refresh
      </button>
    </div>

    {loading ? <LoadingState /> : jobs.length === 0 ? <EmptyState /> : (
      <div className="flex flex-col" style={{ gap: 10 }}>
        {jobs.map((j) => <JobRow key={j.id} job={j} onClick={() => onViewJob(j)} />)}
      </div>
    )}
  </div>
);

export default JobsPage;
