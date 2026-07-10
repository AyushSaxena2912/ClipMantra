import { useState, useCallback, useEffect } from "react";
import { api } from "../api";
import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import NewJobPage from "./NewJobPage";
import JobsPage from "./JobsPage";
import JobDetailPage from "./JobDetailPage";
import SettingsPage from "./SettingsPage";

const Dashboard = ({ user, onLogout, toast }) => {
  const [page, setPage] = useState("home");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const refetchJobs = useCallback(async () => {
    const r = await api("/jobs");
    if (r.ok) setJobs(r.data.data || []);
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    await refetchJobs();
    setLoadingJobs(false);
  }, [refetchJobs]);

  useEffect(() => {
    if (page === "home" || page === "jobs") fetchJobs();
  }, [page]);

  // Poll (without flashing the loading spinner) while any job is still
  // processing, so cards/badges update on their own instead of requiring a
  // manual refresh click.
  useEffect(() => {
    if (page !== "home" && page !== "jobs") return;

    const ACTIVE_STATUSES = ["queued", "downloading", "transcribing", "rendering", "processing"];
    const hasActiveJob = jobs.some((j) => ACTIVE_STATUSES.includes(j.status));
    if (!hasActiveJob) return;

    const interval = setInterval(refetchJobs, 5000);
    return () => clearInterval(interval);
  }, [page, jobs, refetchJobs]);

  const openJob = async (job) => {
    setSelectedJob(job);
    setPage("job-detail");
    // Refresh in the background so the detail page (and the card once we're
    // back) reflect the latest status/clips instead of a stale list snapshot.
    const r = await api(`/jobs/${job.id}`);
    if (r.ok) setSelectedJob(r.data.data);
  };

  return (
    <div className="main-layout">
      <Sidebar page={page} setPage={setPage} user={user} onLogout={onLogout} />
      <div className="content-area">
        {page === "home" && <HomePage jobs={jobs} loading={loadingJobs} onNewJob={() => setPage("new-job")} onViewJob={openJob} onViewAll={() => setPage("jobs")} />}
        {page === "new-job" && <NewJobPage onJobCreated={(j) => { fetchJobs(); setSelectedJob(j); setPage("job-detail"); }} toast={toast} />}
        {page === "jobs" && <JobsPage jobs={jobs} loading={loadingJobs} onViewJob={openJob} onRefresh={fetchJobs} />}
        {page === "job-detail" && selectedJob && <JobDetailPage job={selectedJob} onBack={() => setPage("jobs")} toast={toast} onRefresh={fetchJobs} />}
        {page === "settings" && <SettingsPage user={user} toast={toast} onLogout={onLogout} />}
      </div>
    </div>
  );
};

export default Dashboard;
