import { useState } from "react";
import { motion } from "framer-motion";
import { IconLink, IconUpload } from "@/components/icons";
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
        <div className="landing-hero-base" />
        <div className="landing-hero-spotlight" />
        <div className="landing-hero-orb landing-hero-orb--left" />
        <div className="landing-hero-orb landing-hero-orb--right" />
        <motion.div
          className="landing-hero-arc landing-hero-arc--primary"
          animate={{ opacity: [0.65, 0.95, 0.65], scale: [1, 1.03, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="landing-hero-arc landing-hero-arc--secondary"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.div
          className="landing-hero-arc landing-hero-arc--core"
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <div className="landing-hero-arc-rim" />
        <div className="landing-hero-grid" />
        <div className="landing-hero-noise" />
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
            {/* Credit Badge */}
            <motion.div 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-8"
              variants={fadeUp}
              transition={tween(0.5)}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Start free — no credit card
            </motion.div>

            <motion.h1 className="landing-hero-title font-extrabold tracking-tight mb-6" variants={fadeUp} transition={tween(0.55)}>
              Turn long videos into <span className="text-gradient">viral clips</span>
            </motion.h1>

            <motion.p className="landing-hero-sub text-neutral-400 max-w-3xl mb-10" variants={fadeUp} transition={tween(0.5)}>
              Paste a YouTube link. ClipMantra finds the best moments, cuts them into shorts, and gets them ready for TikTok, Reels, and YouTube Shorts — in minutes.
            </motion.p>
          </motion.div>

          {/* Search/Pill Container */}
          <motion.div
            className="w-full max-w-3xl flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...tween(0.55), delay: 0.3 }}
          >
            <form className="w-full flex items-center gap-2 p-1.5 rounded-full border border-primary/40 bg-neutral-950/80 shadow-lg shadow-primary/5 focus-within:border-primary/80 transition-all duration-300" onSubmit={handleSubmit}>
              <div className="pl-4 text-neutral-400 flex items-center justify-center shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <input
                type="text"
                className="flex-1 min-width-0 border-none bg-transparent py-2.5 px-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none"
                placeholder="Paste a video link or upload a video"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <button type="submit" className="landing-hero-submit" aria-label="Generate clips">
                <svg className="landing-hero-submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={() => onGetStarted?.()} className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-all duration-150">
                <IconUpload className="w-3.5 h-3.5" />
                Upload
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-all duration-150">
                <IconLink className="w-3.5 h-3.5" />
                YouTube Video Link
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-all duration-150">
                <IconLink className="w-3.5 h-3.5" />
                Other Links
              </button>
            </div>

            {/* Social Icons row */}
            <div className="landing-hero-socials">
              <div className="landing-hero-social landing-hero-social--youtube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.028 0 12 0 12s0 3.972.502 5.837a3.002 3.002 0 0 0 2.11 2.107C4.475 20.455 12 20.455 12 20.455s7.525 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div className="landing-hero-social landing-hero-social--tiktok">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.54-4.06-1.4-1.24-1.07-2.02-2.63-2.23-4.24-.03.01-.04.03-.06.04v11.66c-.05 1.95-.74 3.97-2.22 5.25-1.57 1.4-3.87 1.94-5.97 1.48-2.61-.49-4.81-2.73-5.18-5.37C2.28 14.7 3.5 11.83 6.01 10.7c1.37-.66 2.94-.8 4.41-.39v4.11c-1.07-.35-2.28-.15-3.15.53-.94.75-1.32 2.1-1.01 3.25.32 1.25 1.56 2.17 2.85 2.08 1.44-.01 2.6-1.28 2.61-2.72V.02h.81z"/></svg>
              </div>
              <div className="landing-hero-social landing-hero-social--twitch">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>
              </div>
              <div className="landing-hero-social landing-hero-social--vimeo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.396 7.177c-.074 1.702-1.252 4.026-3.535 6.972-2.366 3.064-4.364 4.594-5.992 4.594-.999 0-1.848-.921-2.548-2.766-.47-1.722-.94-3.444-1.41-5.166-.515-1.868-1.066-2.803-1.653-2.803-.118 0-.53.243-1.236.728l-.735-.941c.765-.676 1.523-1.353 2.278-2.029 1.03-.897 1.802-1.369 2.316-1.413 1.206-.103 1.949.721 2.229 2.472.31 1.93.522 4.126.639 6.591.161 1.722.5 2.583 1.015 2.583.397 0 1.008-.633 1.834-1.897.828-1.264 1.272-2.22 1.332-2.868.118-1.133-.235-1.701-1.059-1.701-.397 0-.809.088-1.235.265 1.558-5.097 5.753-4.708 7.027-.39z"/></svg>
              </div>
              <div className="landing-hero-social landing-hero-social--facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <div className="landing-hero-social landing-hero-social--drive">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.71 3.5L1.15 15l3.28 5.7h13.12l3.28-5.7L14.29 3.5H7.71zm.88.9h6.82l5.72 10-3.41 5.9H6.29l-3.4-5.9 5.7-10z"/></svg>
              </div>
              <div className="landing-hero-social landing-hero-social--dropbox">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 11.233l-5.753-3.69-6.247 3.99 6.247 4.004L24 11.233zM5.753 7.543L0 11.233l5.753 4.308 6.247-4.004-6.247-3.994zM12 11.533v.01l6.247 4.004-6.247 3.99v-8.004zm0 8.01v.01c0 .484.262.92.684 1.155l5.563 3.1c.421.236.937.236 1.359 0l5.562-3.1c.422-.236.684-.67.684-1.156v-.01l-6.926-4.426L12 19.543zm-6.247-4.004L0 11.233l5.753-3.69 6.247 3.994-6.247 4.004z"/></svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
