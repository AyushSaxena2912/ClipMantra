import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu, IconX } from "@/components/icons";
import { slideDown, tween } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onGetStarted, onLogin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className="landing-nav"
      initial="hidden"
      animate="visible"
      variants={slideDown}
      transition={tween(0.45)}
    >
      <div className="landing-container landing-nav-inner">
        <a href="#" className="landing-nav-brand">
          <img src="/logo.svg" alt="ClipMantra" className="landing-nav-logo" />
          <span className="landing-nav-name">ClipMantra</span>
        </a>

        <nav className="landing-nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="landing-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="landing-nav-actions">
          <button type="button" className="landing-nav-signin" onClick={onLogin}>
            Sign in
          </button>
          <button type="button" className="landing-nav-cta" onClick={onGetStarted}>
            Get Started Free
          </button>
        </div>

        <button
          className="landing-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="landing-nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={tween(0.25)}
          >
            <div className="landing-nav-mobile-inner">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="landing-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="landing-nav-mobile-actions">
                <button type="button" className="landing-nav-signin" onClick={onLogin}>
                  Sign in
                </button>
                <button type="button" className="landing-nav-cta" onClick={onGetStarted}>
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
