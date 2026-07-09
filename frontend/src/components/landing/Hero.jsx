import { useState } from "react";
import { motion } from "framer-motion";
import { IconLink } from "@/components/icons";
import { fadeUp, stagger, tween } from "@/lib/motion";

export default function Hero({ onGetStarted }) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGetStarted?.(videoUrl);
  };

  return (
    <section className="landing-hero">
      <div className="landing-hero-bg" aria-hidden="true">
        <motion.div
          className="landing-hero-arc landing-hero-arc--primary"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="landing-hero-arc landing-hero-arc--secondary"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="landing-hero-arc landing-hero-arc--core"
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="landing-hero-arc-rim"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="landing-hero-vignette" />
      </div>

      <div className="landing-container relative z-10">
        <div className="landing-hero-content">
          <motion.div
            className="landing-hero-head"
            initial="hidden"
            animate="visible"
            variants={stagger(0.1)}
          >
            <motion.p className="landing-hero-eyebrow" variants={fadeUp} transition={tween(0.5)}>
              #1 AI Video Clipping Tool
            </motion.p>
            <motion.h1 className="landing-hero-title" variants={fadeUp} transition={tween(0.55)}>
              1 long video, 10 viral clips.
              <br />
              Create 10x faster.
            </motion.h1>
            <motion.p className="landing-hero-sub" variants={fadeUp} transition={tween(0.5)}>
              ClipMantra turns long videos into Shorts, Reels, and TikToks — scored
              for virality and ready to post in one click.
            </motion.p>
          </motion.div>

          <motion.div
            className="landing-hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...tween(0.55), delay: 0.3 }}
          >
            <form className="landing-hero-pill" onSubmit={handleSubmit}>
              <IconLink className="landing-hero-pill-icon" />
              <input
                type="text"
                className="landing-hero-pill-input"
                placeholder="Drop a video link"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <button type="submit" className="landing-hero-pill-btn">
                Get free clips
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
