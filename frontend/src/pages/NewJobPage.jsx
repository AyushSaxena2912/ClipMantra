import { useState } from "react";
import { api } from "../api";

const NewJobPage = ({ onJobCreated, toast }) => {
  const [url, setUrl] = useState(() => {
    const draft = sessionStorage.getItem("clipmantra_draft_url") || "";
    if (draft) sessionStorage.removeItem("clipmantra_draft_url");
    return draft;
  });
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!url.trim()) {
      toast("Please paste a YouTube link", "error");
      return;
    }
    setLoading(true);
    const r = await api("/jobs", {
      method: "POST",
      body: JSON.stringify({ url: url.trim(), count }),
    });
    setLoading(false);
    if (r.ok) {
      toast("Job started — we're making your clips", "success");
      onJobCreated(r.data.data);
    } else {
      toast(r.data.message || "Couldn't start this job", "error");
    }
  };

  return (
    <div className="newjob">
      <header className="newjob-header">
        <p className="newjob-eyebrow">Create</p>
        <h1 className="newjob-title">Make clips from a video</h1>
        <p className="newjob-sub">
          Paste a YouTube link, choose how many clips you want, and we&apos;ll do the rest.
        </p>
      </header>

      <form className="newjob-card newjob-card--solo" onSubmit={submit}>
        <div className="newjob-field">
          <label className="newjob-label" htmlFor="newjob-url">YouTube link</label>
          <div className={`newjob-input-wrap${loading ? " is-disabled" : ""}`}>
            <span className="newjob-input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </span>
            <input
              id="newjob-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
              className="newjob-input"
            />
          </div>
        </div>

        <div className="newjob-field">
          <label className="newjob-label" htmlFor="newjob-count">How many clips? ({count})</label>
          <input
            id="newjob-count"
            type="range"
            min={1}
            max={10}
            value={count}
            disabled={loading}
            onChange={(e) => setCount(Number(e.target.value))}
            className="newjob-range"
            style={{
              background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((count - 1) / 9) * 100}%, rgba(255,255,255,0.08) ${((count - 1) / 9) * 100}%, rgba(255,255,255,0.08) 100%)`,
            }}
          />
          <div className="newjob-range-labels">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {loading && (
          <div className="newjob-loading" aria-live="polite">
            <div className="newjob-loading-top">
              <span className="newjob-loading-dot" />
              Starting your job…
            </div>
            <p className="newjob-loading-text">
              Hang tight — we&apos;ll open the job page as soon as it&apos;s ready.
            </p>
          </div>
        )}

        <button type="submit" className="btn-primary newjob-submit" disabled={loading}>
          {loading ? "Starting…" : `Make ${count} clip${count === 1 ? "" : "s"} →`}
        </button>
        <p className="newjob-limit">Up to 10 jobs per hour on Free</p>
      </form>
    </div>
  );
};

export default NewJobPage;
