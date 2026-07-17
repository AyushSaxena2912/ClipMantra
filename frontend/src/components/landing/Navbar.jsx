import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu, IconX } from "@/components/icons";
import BrandLottie from "@/components/BrandLottie";
import { slideDown, tween } from "@/lib/motion";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({
  onGetStarted,
  onLogin,
  onLogout,
  isLoggedIn = false,
  user = null,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const initial = user?.name?.[0]?.toUpperCase() || "U";

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  return (
    <motion.header
      className="landing-nav"
      initial="hidden"
      animate="visible"
      variants={slideDown}
      transition={tween(0.45)}
    >
      <div className="landing-container landing-nav-inner">
        <a
          href="#"
          className="landing-nav-brand"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <BrandLottie className="landing-nav-logo" size={44} />
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
          {isLoggedIn ? (
            <>
              <button type="button" className="landing-nav-cta" onClick={onLogin}>
                Dashboard
              </button>
              <div className="landing-nav-profile" ref={menuRef}>
                <button
                  type="button"
                  className="landing-nav-avatar"
                  aria-label="Account menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {initial}
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      className="landing-nav-menu"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="landing-nav-menu-user">
                        <p className="landing-nav-menu-name">{user?.name}</p>
                        <p className="landing-nav-menu-email">{user?.email}</p>
                      </div>
                      <button
                        type="button"
                        className="landing-nav-menu-item"
                        onClick={() => {
                          setMenuOpen(false);
                          onLogin?.();
                        }}
                      >
                        Go to Dashboard
                      </button>
                      <button
                        type="button"
                        className="landing-nav-menu-item landing-nav-menu-item--danger"
                        onClick={() => {
                          setMenuOpen(false);
                          onLogout?.();
                        }}
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <button type="button" className="landing-nav-signin" onClick={onLogin}>
                Sign in
              </button>
              <button type="button" className="landing-nav-cta" onClick={onGetStarted}>
                Get Started Free
              </button>
            </>
          )}
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
                {isLoggedIn ? (
                  <>
                    <div className="landing-nav-mobile-user">
                      <span className="landing-nav-avatar" aria-hidden="true">{initial}</span>
                      <div>
                        <p className="landing-nav-menu-name">{user?.name}</p>
                        <p className="landing-nav-menu-email">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="landing-nav-cta"
                      onClick={() => {
                        setMobileOpen(false);
                        onLogin?.();
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      className="landing-nav-signin"
                      onClick={() => {
                        setMobileOpen(false);
                        onLogout?.();
                      }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="landing-nav-signin" onClick={onLogin}>
                      Sign in
                    </button>
                    <button type="button" className="landing-nav-cta" onClick={onGetStarted}>
                      Get Started Free
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
