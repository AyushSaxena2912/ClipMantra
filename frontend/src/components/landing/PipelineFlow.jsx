const STAGES = [
  {
    label: "Queued",
    detail: "Your job enters the queue and waits for an available worker.",
    tone: "purple",
    time: "~0s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Downloading",
    detail: "We fetch the source video securely from YouTube.",
    tone: "blue",
    time: "~20s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 19h14" />
      </svg>
    ),
  },
  {
    label: "Transcribing",
    detail: "Speech is converted into a clean transcript for AI analysis.",
    tone: "cyan",
    time: "~45s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10v4" />
        <path d="M8 7v10" />
        <path d="M12 4v16" />
        <path d="M16 7v10" />
        <path d="M20 10v4" />
      </svg>
    ),
  },
  {
    label: "Rendering",
    detail: "Viral moments are cut and exported as polished MP4 clips.",
    tone: "amber",
    time: "~90s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="m10 10 5 2-5 2z" />
      </svg>
    ),
  },
  {
    label: "Completed",
    detail: "Clips are ready to download and post to Shorts, Reels, or TikTok.",
    tone: "green",
    time: "Done",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

export default function PipelineFlow() {
  return (
    <section id="pipeline" className="landing-pipeline">
      <div className="landing-container">
        <div className="landing-pipeline-head">
          <div className="landing-pipeline-live">
            <span className="landing-pipeline-live-dot" aria-hidden="true" />
            Live pipeline
          </div>
          <h2 className="landing-pipeline-title">Watch every job move in real time</h2>
          <p className="landing-pipeline-sub">
            From queue to finished clips — track each stage as ClipMantra processes your video.
          </p>
        </div>

        <div className="landing-pipeline-shell">
          <div className="landing-pipeline-shell-top">
            <div>
              <p className="landing-pipeline-shell-label">Job pipeline</p>
              <p className="landing-pipeline-shell-id">Typical run · ~3 minutes end to end</p>
            </div>
            <span className="landing-pipeline-shell-status">Completed</span>
          </div>

          <ol className="landing-pipeline-timeline">
            {STAGES.map((stage, index) => (
              <li
                key={stage.label}
                className={`landing-pipeline-row landing-pipeline-row--${stage.tone}${
                  index === STAGES.length - 1 ? " is-done" : ""
                }`}
              >
                <div className="landing-pipeline-rail" aria-hidden="true">
                  <div className="landing-pipeline-icon">{stage.icon}</div>
                  {index < STAGES.length - 1 && <span className="landing-pipeline-rail-line" />}
                </div>

                <div className="landing-pipeline-body">
                  <div className="landing-pipeline-body-top">
                    <h3 className="landing-pipeline-label">{stage.label}</h3>
                    <span className="landing-pipeline-time">{stage.time}</span>
                  </div>
                  <p className="landing-pipeline-detail">{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="landing-pipeline-shell-bottom">
            <div className="landing-pipeline-metrics">
              <div className="landing-pipeline-metric">
                <span>Stages</span>
                <strong>5</strong>
              </div>
              <div className="landing-pipeline-metric">
                <span>Avg. time</span>
                <strong>~3 min</strong>
              </div>
              <div className="landing-pipeline-metric">
                <span>Success rate</span>
                <strong>99.2%</strong>
              </div>
            </div>

            <div className="landing-pipeline-progress">
              <div className="landing-pipeline-progress-meta">
                <span>Overall progress</span>
                <strong>100%</strong>
              </div>
              <div className="landing-pipeline-progress-bar">
                <span className="landing-pipeline-progress-fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
