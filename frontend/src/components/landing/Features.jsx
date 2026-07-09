import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconBrain,
  IconDownload,
  IconGauge,
  IconRadio,
  IconScissors,
  IconZap,
} from "@/components/icons";
import { fadeUp, inViewProps, stagger, tween } from "@/lib/motion";

const FEATURES = [
  {
    icon: IconBrain,
    title: "Gemini AI Detection",
    description:
      "Google Gemini 2.5 Flash analyzes transcripts to find hooks, emotional peaks, and high-engagement moments with viral scores.",
  },
  {
    icon: IconScissors,
    title: "Auto Clip Rendering",
    description:
      "FFmpeg cuts and exports polished MP4 clips optimized for Shorts, Reels, and TikTok — no editing skills needed.",
  },
  {
    icon: IconRadio,
    title: "Real-Time Progress",
    description:
      "Watch your job pipeline live via SSE. Track download, transcription, AI analysis, and rendering in real time.",
  },
  {
    icon: IconGauge,
    title: "Viral Score Ranking",
    description:
      "Every clip gets a viral score with hook type and reasoning, so you always post the highest-impact content first.",
  },
  {
    icon: IconDownload,
    title: "One-Click Downloads",
    description:
      "Download individual clips or grab them all from your dashboard. Files are stored securely and auto-deleted after 24 hours.",
  },
  {
    icon: IconZap,
    title: "Async Pipeline",
    description:
      "Queue-based workers handle download, transcription, and rendering in parallel — submit a job and come back when it's done.",
  },
];

export default function Features() {
  return (
    <section id="features" className="landing-section-lg">
      <div className="landing-container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          {...inViewProps}
          variants={stagger(0.08)}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-widest text-primary"
            variants={fadeUp}
            transition={tween(0.45)}
          >
            Features
          </motion.p>
          <motion.h2
            className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl"
            variants={fadeUp}
            transition={tween(0.5)}
          >
            Everything you need to go viral
          </motion.h2>
          <motion.p className="mt-4 text-muted-foreground" variants={fadeUp} transition={tween(0.45)}>
            From raw YouTube link to polished short-form content — ClipMantra
            handles the entire pipeline so you can focus on publishing.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          {...inViewProps}
          variants={stagger(0.08)}
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp} transition={tween(0.45)}>
              <motion.div whileHover={{ y: -4 }} transition={tween(0.2)}>
                <Card className="h-full border-border/60 bg-card/50 transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
