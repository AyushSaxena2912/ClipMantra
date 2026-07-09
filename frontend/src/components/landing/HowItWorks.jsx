import { Badge } from "@/components/ui/badge";
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
      "Faster-Whisper transcribes the audio, then Gemini AI scores segments by hook strength, emotion, and engagement potential.",
    badge: "Powered by Gemini",
  },
  {
    step: "03",
    icon: IconDownload,
    title: "Download & publish",
    description:
      "Get ranked clips with viral scores, hooks, and reasoning. Download MP4s and post directly to Shorts, Reels, or TikTok.",
    badge: "Ready to post",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-section-lg border-t border-border/60 bg-secondary/20">
      <div className="landing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Three steps to viral content
          </h2>
          <p className="mt-4 text-muted-foreground">
            No video editing experience required. Our automated pipeline does
            the heavy lifting.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.step} className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="mb-6 flex items-center justify-center gap-5 md:justify-start w-full">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-lg shadow-primary/10">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-5xl font-extrabold text-border/20 select-none">
                  {step.step}
                </span>
              </div>

              <Badge className="mb-3">{step.badge}</Badge>

              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-xl border border-border bg-card/50 p-6">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Pipeline Status Flow
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {[
              { label: "Queued", variant: "secondary" },
              { label: "Downloading", variant: "info" },
              { label: "Transcribing", variant: "info" },
              { label: "Rendering", variant: "warning" },
              { label: "Completed", variant: "success" },
            ].map((status, i, arr) => (
              <div key={status.label} className="flex items-center gap-2 md:gap-3">
                <Badge variant={status.variant}>{status.label}</Badge>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
