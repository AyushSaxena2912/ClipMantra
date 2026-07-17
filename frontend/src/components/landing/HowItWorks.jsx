import { IconLink, IconSparkles, IconDownload } from "@/components/icons";

const STEPS = [
  {
    step: "01",
    icon: IconLink,
    title: "Paste a YouTube URL",
    description:
      "Drop any public YouTube link and choose how many clips you want — from 1 to 10 per job.",
    badge: "10 seconds",
  },
  {
    step: "02",
    icon: IconSparkles,
    title: "AI finds viral moments",
    description:
      "Our pipeline transcribes the audio, then AI scores segments by hook strength, emotion, and engagement potential.",
    badge: "AI powered",
  },
  {
    step: "03",
    icon: IconDownload,
    title: "Download & publish",
    description:
      "Get ranked clips with viral scores and reasoning. Download MP4s and post to Shorts, Reels, or TikTok.",
    badge: "Ready to post",
  },
];

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
              <article className="landing-how-card">
                <div className="landing-how-card-top">
                  <div className="landing-how-icon">
                    <step.icon />
                  </div>
                  <span className="landing-how-num" aria-hidden="true">
                    {step.step}
                  </span>
                </div>

                <span className="landing-how-badge">{step.badge}</span>
                <h3 className="landing-how-card-title">{step.title}</h3>
                <p className="landing-how-card-desc">{step.description}</p>
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
