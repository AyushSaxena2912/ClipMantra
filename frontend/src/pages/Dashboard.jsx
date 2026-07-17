import { useState, useCallback, useEffect } from "react";
import { api } from "../api";
import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import NewJobPage from "./NewJobPage";
import JobDetailPage from "./JobDetailPage";
import SettingsPage from "./SettingsPage";
import { parseLocation, pathForDash, navigate } from "../nav";

const Dashboard = ({ user, onLogout, toast, onGoHome }) => {
  const initial = parseLocation();
  const [page, setPageState] = useState(() =>
    initial.app === "dashboard" ? initial.dash || "home" : "home"
  );
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(() =>
    initial.dash === "job-detail" && initial.jobId ? { id: initial.jobId } : null
  );
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingJob, setLoadingJob] = useState(
    () => initial.dash === "job-detail" && !!initial.jobId
  );

  const setPage = (next, job = null) => {
    setPageState(next);
    if (job) setSelectedJob(job);
    const jobId = job?.id ?? (next === "job-detail" ? selectedJob?.id : null);
    navigate(pathForDash(next, jobId));
  };

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
    if (page === "home") fetchJobs();
  }, [page]);

  // Restore job detail after refresh from /app/jobs/:id
  useEffect(() => {
    if (page !== "job-detail" || !selectedJob?.id) return;
    if (selectedJob.status != null) {
      setLoadingJob(false);
      return;
    }
    let cancelled = false;
    setLoadingJob(true);
    api(`/jobs/${selectedJob.id}`).then((r) => {
      if (cancelled) return;
      setLoadingJob(false);
      if (r.ok) setSelectedJob(r.data.data);
      else {
        toast?.("Job not found", "error");
        setPageState("home");
        setSelectedJob(null);
        navigate("/app", { replace: true });
      }
    });
    return () => { cancelled = true; };
  }, [page, selectedJob?.id]);

  // Poll (without flashing the loading spinner) while any job is still
  // processing, so cards/badges update on their own instead of requiring a
  // manual refresh click.
  useEffect(() => {
    if (page !== "home") return;

    const ACTIVE_STATUSES = ["queued", "downloading", "transcribing", "rendering", "processing"];
    const hasActiveJob = jobs.some((j) => ACTIVE_STATUSES.includes(j.status));
    if (!hasActiveJob) return;

    const interval = setInterval(refetchJobs, 5000);
    return () => clearInterval(interval);
  }, [page, jobs, refetchJobs]);

  // Browser back/forward inside the dashboard
  useEffect(() => {
    const onPop = () => {
      const loc = parseLocation();
      if (loc.app !== "dashboard") return;
      setPageState(loc.dash || "home");
      if (loc.dash === "job-detail" && loc.jobId) {
        setSelectedJob((prev) => (prev?.id === loc.jobId ? prev : { id: loc.jobId }));
        setLoadingJob(true);
      } else {
        setSelectedJob(null);
        setLoadingJob(false);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openJob = async (job) => {
    setSelectedJob(job);
    setPageState("job-detail");
    setLoadingJob(false);
    navigate(pathForDash("job-detail", job.id));
    // Refresh in the background so the detail page (and the card once we're
    // back) reflect the latest status/clips instead of a stale list snapshot.
    const r = await api(`/jobs/${job.id}`);
    if (r.ok) setSelectedJob(r.data.data);
  };

  return (
    <div className="app-shell main-layout">
      <Sidebar page={page} setPage={setPage} user={user} onLogout={onLogout} onGoHome={onGoHome} />
      <div className="content-area">
        {page === "home" && (
          <HomePage
            user={user}
            jobs={jobs}
            loading={loadingJobs}
            onNewJob={(initialUrl) => {
              if (initialUrl) sessionStorage.setItem("clipmantra_draft_url", initialUrl);
              setPage("new-job");
            }}
            onViewJob={openJob}
          />
        )}
        {page === "new-job" && (
          <NewJobPage
            onJobCreated={(j) => {
              fetchJobs();
              setSelectedJob(j);
              setPageState("job-detail");
              setLoadingJob(false);
              navigate(pathForDash("job-detail", j.id));
            }}
            toast={toast}
          />
        )}
        {page === "job-detail" && loadingJob && (
          <div style={{ padding: 40, color: "var(--text-muted)" }}>Loading job…</div>
        )}
        {page === "job-detail" && !loadingJob && selectedJob?.status != null && (
          <JobDetailPage
            job={selectedJob}
            onBack={() => setPage("home")}
            toast={toast}
            onRefresh={fetchJobs}
          />
        )}
        {page === "settings" && <SettingsPage user={user} toast={toast} onLogout={onLogout} />}
      </div>
    </div>
  );
};

export default Dashboard;
