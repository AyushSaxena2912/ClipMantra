import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const JobsPage = ({ jobs, loading, onViewJob, onRefresh }) => (
  <div className="flex flex-col" style={{ gap: "var(--spacing-lg)" }}>
    <div className="flex justify-between items-center">
      <div className="page-header">
        <h1>All Jobs</h1>
        <p>{jobs.length} jobs total</p>
      </div>
      <button onClick={onRefresh} className="btn-secondary">
        ↻ Refresh
      </button>
    </div>

    {loading ? <LoadingSpinner /> : jobs.length === 0 ? <EmptyState label="No jobs yet." /> : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 16
      }}>
        {jobs.map((j) => <JobCard key={j.id} job={j} onClick={() => onViewJob(j)} />)}
      </div>
    )}
  </div>
);

export default JobsPage;
