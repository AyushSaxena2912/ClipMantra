import { IconLink, IconSparkles, IconDownload, IconCrop, IconCaption } from "@/components/icons";

const STEPS = [
  {
    step: "01",
    icon: IconLink,
    title: "Paste a YouTube URL",
    description:
      "Drop any public YouTube link and choose how many clips you want — from 1 to 10 per job. Works with podcasts, interviews, and long-form videos.",
    badge: "10 seconds",
    mock: "paste",
    image: "/images/how-step-paste.jpg",
    imageAlt: "Long-form interview ready to clip",
  },
  {
    step: "02",
    icon: IconSparkles,
    title: "AI finds viral moments",
    description:
      "Our pipeline transcribes the audio, then AI scores segments by hook strength, emotion, and engagement potential.",
    badge: "AI powered",
    mock: "virality",
  },
  {
    step: "03",
    icon: IconDownload,
    title: "Download & publish",
    description:
      "Get ranked clips with viral scores and reasoning. Download MP4s and post straight to Shorts, Reels, TikTok, and more.",
    badge: "Ready to post",
    mock: "viral-clips",
  },
];

const VIRALITY_CLIPS = [
  { src: "/images/how-clip-1.jpg", score: 98, play: false },
  { src: "/images/how-clip-2.jpg", score: 96, play: true },
  { src: "/images/how-clip-3.jpg", score: 94, play: false },
  { src: "/images/how-clip-1.jpg", score: 91, play: true },
];

const VIRAL_CLIPS = [
  { src: "/images/how-viral-1.jpg", caption: "Hook in 3 seconds", pos: "tl" },
  { src: "/images/how-viral-2.jpg", caption: "Peak emotion", pos: "bl" },
  { src: "/images/how-viral-3.jpg", caption: "Share-worthy moment", pos: "tr" },
  { src: "/images/how-viral-4.jpg", caption: "Ready to post", pos: "br" },
];

function PasteMock({ src, alt }) {
  return (
    <div className="landing-how-mock" aria-hidden="true">
      <div className="landing-how-mock-glow" />

      <div className="landing-how-mock-frame">
        <img src={src} alt={alt || ""} loading="lazy" />

        <div className="landing-how-mock-upload">
          <svg viewBox="0 0 40 44" fill="none">
            <path
              d="M8 6h16l8 8v22a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z"
              fill="url(#howUploadGrad)"
            />
            <path d="M24 6v8h8" stroke="#2e1065" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="20" cy="26" r="7.5" fill="#2e1065" />
            <path
              d="M20 30V22.5M20 22.5l-3 3M20 22.5l3 3"
              stroke="#e9d5ff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="howUploadGrad" x1="4" y1="6" x2="36" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c084fc" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="landing-how-mock-bar">
          <span className="landing-how-mock-placeholder">Paste a video link</span>
          <span className="landing-how-mock-btn">Upload Files</span>
        </div>

        <div className="landing-how-mock-plus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        <div className="landing-how-mock-cursor">
          <svg viewBox="0 0 24 28" fill="none">
            <path
              d="M4 2l1.2 20.5 4.4-4.1 3.6 7.4 2.6-1.3-3.7-7.3L20 14.2 4 2z"
              fill="#fff"
              stroke="#111"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="landing-how-mock-hints">
        <span>Drop a link</span>
        <span>Pick clip count</span>
        <span>Start job</span>
      </div>
    </div>
  );
}

function ViralityMock() {
  return (
    <div className="landing-how-viral" aria-hidden="true">
      <div className="landing-how-viral-tabs">
        <span className="landing-how-viral-tab landing-how-viral-tab--active">Virality (Highest first)</span>
        <span className="landing-how-viral-tab">Time (Earliest first)</span>
        <span className="landing-how-viral-cursor">
          <svg viewBox="0 0 24 28" fill="none">
            <path
              d="M4 2l1.2 20.5 4.4-4.1 3.6 7.4 2.6-1.3-3.7-7.3L20 14.2 4 2z"
              fill="#fff"
              stroke="#111"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="landing-how-viral-grid">
        {VIRALITY_CLIPS.map((clip, i) => (
          <div key={i} className="landing-how-viral-card">
            <div className="landing-how-viral-thumb">
              <img src={clip.src} alt="" loading="lazy" />
              {clip.play && (
                <span className="landing-how-viral-play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </span>
              )}
            </div>

            <div className="landing-how-viral-score">
              <span className="landing-how-viral-score-num">{clip.score}</span>
              <span className="landing-how-viral-score-den">/100</span>
            </div>

            <div className="landing-how-viral-foot">
              <div className="landing-how-viral-react">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                  <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="landing-how-viral-tools">
                <IconCrop />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="7" height="18" rx="1" />
                  <rect x="14" y="3" width="7" height="18" rx="1" />
                </svg>
                <IconCaption />
                <IconDownload />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 8.75A3.25 3.25 0 1 0 12 15.25 3.25 3.25 0 0 0 12 8.75zm0 5.25a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        <circle cx="16.7" cy="7.35" r="0.95" />
        <path d="M17.2 3.5H6.8A3.3 3.3 0 0 0 3.5 6.8v10.4a3.3 3.3 0 0 0 3.3 3.3h10.4a3.3 3.3 0 0 0 3.3-3.3V6.8a3.3 3.3 0 0 0-3.3-3.3zm2.05 13.7a2.05 2.05 0 0 1-2.05 2.05H6.8a2.05 2.05 0 0 1-2.05-2.05V6.8A2.05 2.05 0 0 1 6.8 4.75h10.4A2.05 2.05 0 0 1 19.25 6.8v10.4z" />
      </svg>
    );
  }
  if (type === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.6 7.3a5.7 5.7 0 0 1-3.4-1.1v7.3a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V2.5h2.6c.2 1.5 1.2 2.8 2.5 3.5.7.4 1.5.6 2.3.7v2.6c-.5 0-1-.1-1.4-.2z" />
      </svg>
    );
  }
  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
      </svg>
    );
  }
  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.9-6.4L5.4 22H2.6l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.2h2.6V5h-2.6C11.7 5 10 6.7 10 9.3V11H7.5v3.2H10V21h3.3v-6.8h2.5l.5-3.2h-3V9.5c0-.7.3-1.3 1.2-1.3z" />
      </svg>
    );
  }
  return null;
}

function ViralClipsMock() {
  return (
    <div className="landing-how-collage" aria-hidden="true">
      <div className="landing-how-collage-glow" />

      {VIRAL_CLIPS.map((clip) => (
        <div key={clip.pos} className={`landing-how-collage-clip landing-how-collage-clip--${clip.pos}`}>
          <img src={clip.src} alt="" loading="lazy" />
          <span className="landing-how-collage-caption">{clip.caption}</span>
        </div>
      ))}

      <div className="landing-how-collage-badge">
        <svg className="landing-how-collage-spark" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
        </svg>
        <span>
          <em>Viral</em> Clips
        </span>
      </div>

      <span className="landing-how-collage-social landing-how-collage-social--ig">
        <SocialIcon type="instagram" />
      </span>
      <span className="landing-how-collage-social landing-how-collage-social--tt">
        <SocialIcon type="tiktok" />
      </span>
      <span className="landing-how-collage-social landing-how-collage-social--fb">
        <SocialIcon type="facebook" />
      </span>
      <span className="landing-how-collage-social landing-how-collage-social--x">
        <SocialIcon type="x" />
      </span>
      <span className="landing-how-collage-social landing-how-collage-social--yt">
        <SocialIcon type="youtube" />
      </span>
    </div>
  );
}

function StepVisual({ step }) {
  if (step.mock === "paste") return <PasteMock src={step.image} alt={step.imageAlt} />;
  if (step.mock === "virality") return <ViralityMock />;
  if (step.mock === "viral-clips") return <ViralClipsMock />;
  if (step.image) {
    return (
      <figure className="landing-how-media">
        <img src={step.image} alt={step.imageAlt || ""} loading="lazy" />
      </figure>
    );
  }
  return null;
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-how">
      <div className="landing-container">
        <div className="landing-how-head">
          <p className="landing-how-eyebrow">How it works</p>
          <h2 className="landing-how-title">Three steps to viral content</h2>
          <p className="landing-how-sub">
            No video editing experience required. Our automated pipeline does the heavy lifting.
          </p>
        </div>

        <div className="landing-how-grid">
          {STEPS.map((step, index) => (
            <div key={step.step} className="landing-how-item">
              <article className={`landing-how-card${step.mock ? " landing-how-card--mock" : ""}`}>
                <div className="landing-how-card-head">
                  <div className="landing-how-step-row">
                    <span className="landing-how-icon" aria-hidden="true">
                      <step.icon />
                    </span>
                    <span className="landing-how-step">Step {step.step}</span>
                  </div>
                  <span className="landing-how-meta">{step.badge}</span>
                </div>

                <StepVisual step={step} />

                <div className="landing-how-card-copy">
                  <h3 className="landing-how-card-title">{step.title}</h3>
                  <p className="landing-how-card-desc">{step.description}</p>
                </div>
              </article>

              {index < STEPS.length - 1 && (
                <div className="landing-how-connector" aria-hidden="true">
                  <span className="landing-how-connector-line" />
                  <span className="landing-how-connector-arrow">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
