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

  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    const r = await api("/jobs");
    if (r.ok) setJobs(r.data.data || []);
    setLoadingJobs(false);
  }, []);

  useEffect(() => {
    if (page === "home" || page === "jobs") fetchJobs();
  }, [page]);

  const openJob = (job) => { setSelectedJob(job); setPage("job-detail"); };

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
