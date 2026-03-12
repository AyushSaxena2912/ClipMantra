import { useState, useEffect, useRef } from "react";
import { api, saveToken, saveUser } from "../api";
import Input from "../components/Input";

const EyeIcon = ({ show }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {show ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const PasswordInput = ({ label, value, onChange, placeholder, show, onToggle }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)", fontFamily: "'Montserrat', sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 44px 12px 14px",
          background: "var(--bg-input)",
          border: "1px solid var(--border-color)",
          borderRadius: 10,
          color: "#fff",
          fontSize: "var(--fs-base)",
          fontFamily: 'var(--font-main)',
          outline: "none",
          boxSizing: "border-box",
          transition: "border 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "var(--primary)"}
        onBlur={e => e.target.style.borderColor = "var(--border-color)"}
      />
      <button
        type="button"
        onClick={onToggle}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: show ? "var(--primary)" : "var(--text-dark)",
          padding: 0,
          display: "flex",
          alignItems: "center",
          transition: "color 0.2s",
        }}
      >
        <EyeIcon show={show} />
      </button>
    </div>
  </div>
);

const linkBtn = {
  background: "none", border: "none", color: "var(--text-muted)",
  cursor: "pointer", fontSize: "var(--fs-sm)",
  fontFamily: "'Montserrat', sans-serif", padding: 0,
};

const AuthPage = ({ onLogin, toast }) => {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", otp: "", newPass: "", confirmNew: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  const emailRef = useRef(null);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const handleGoogleLogin = async (response) => {
    setLoading(true);
    try {
      const r = await api("/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: response.credential }),
      });
      if (r.ok) { saveToken(r.data.token); saveUser(r.data.user); onLogin(r.data.user); toast("Welcome!", "success"); }
      else toast(r.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleLogin,
        });
        // Render hidden Google button for OAuth flow
        window.google.accounts.id.renderButton(
          document.getElementById("google-btn-hidden"),
          {
            theme: "filled_black",
            size: "large",
            width: 300,
            text: "continue_with",
            shape: "rectangular"
          }
        );
      }
    };

    if (window.google) {
      initGoogle();
    } else {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      script?.addEventListener("load", initGoogle);
    }

    // Delay focus to ensure it stays on email even after Google SDK renders
    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, [mode]);

  const handleCustomGoogleClick = () => {
    const hiddenBtn = document.querySelector("#google-btn-hidden div[role='button']")
      || document.querySelector("#google-btn-hidden iframe");
    if (hiddenBtn) hiddenBtn.click();
  };

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === "login") {
        const r = await api("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: f.email, password: f.password }),
        });
        if (r.ok) { saveToken(r.data.token); saveUser(r.data.user); onLogin(r.data.user); toast("Welcome back!", "success"); }
        else toast(r.data.message, "error");

      } else if (mode === "register") {
        const r = await api("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name: f.name, email: f.email, password: f.password, confirmPassword: f.confirm }),
        });
        if (r.ok) { saveToken(r.data.token); saveUser(r.data.user); onLogin(r.data.user); toast("Account created!", "success"); }
        else toast(r.data.message, "error");

      } else if (mode === "forgot") {
        const r = await api("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email: f.email }),
        });
        if (r.ok) { toast("OTP sent to your email!", "success"); setMode("reset"); }
        else toast(r.data.message, "error");

      } else if (mode === "reset") {
        const r = await api("/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({ email: f.email, otp: f.otp, newPassword: f.newPass, confirmPassword: f.confirmNew }),
        });
        if (r.ok) { toast("Password updated! Login now.", "success"); setMode("login"); }
        else toast(r.data.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const titles = { login: "Login", register: "Create Account", forgot: "Reset Password", reset: "Enter OTP" };
  const subtitles = { login: "Welcome back to ClipMantra", register: "Start clipping viral moments", forgot: "We'll send an OTP to your email", reset: "Enter the OTP from your email" };
  const btnLabels = { login: "Login", register: "Create Account", forgot: "Send OTP", reset: "Reset Password" };

  return (
    <div className="flex items-center justify-center" style={{
      minHeight: "100vh", background: "var(--bg-dark)",
      padding: 20, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,229,153,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,153,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,229,153,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }} className="flex flex-col items-center">
        <div className="text-center" style={{ marginBottom: 48 }}>
          <div className="flex items-center justify-center" style={{ gap: 10, marginBottom: 12 }}>
            <span className="logo-text" style={{ fontSize: "var(--fs-4xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>ClipMantra</span>
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8 }}>
            AI-Powered Viral Clip Extractor
          </p>
        </div>

        <div className="card" style={{ padding: "40px", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", width: "100%" }}>
          <div style={{ minHeight: 400, display: "flex", flexDirection: "column" }}>
            <h2 style={{ fontSize: "var(--fs-2xl)", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
              {titles[mode]}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", margin: "0 0 32px", lineHeight: 1.5 }}>
              {subtitles[mode]}
            </p>

            <div className="flex flex-col" style={{ gap: 20, flex: 1 }}>
              {mode === "register" && <Input label="Full Name" value={f.name} onChange={set("name")} placeholder="Tony Stark" />}
              {["login", "register", "forgot", "reset"].includes(mode) && (
                <Input ref={emailRef} label="Email Address" type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" />
              )}
              {mode === "reset" && <Input label="OTP Verification Code" value={f.otp} onChange={set("otp")} placeholder="Check your email for 6-digit code" />}

              {["login", "register"].includes(mode) && (
                <PasswordInput
                  label="Password"
                  value={f.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  show={showPass}
                  onToggle={() => setShowPass(p => !p)}
                />
              )}
              {mode === "register" && (
                <PasswordInput
                  label="Confirm Password"
                  value={f.confirm}
                  onChange={set("confirm")}
                  placeholder="••••••••"
                  show={showConfirm}
                  onToggle={() => setShowConfirm(p => !p)}
                />
              )}
              {mode === "reset" && (
                <>
                  <PasswordInput
                    label="New Password"
                    value={f.newPass}
                    onChange={set("newPass")}
                    placeholder="••••••••"
                    show={showNewPass}
                    onToggle={() => setShowNewPass(p => !p)}
                  />
                  <PasswordInput
                    label="Confirm New Password"
                    value={f.confirmNew}
                    onChange={set("confirmNew")}
                    placeholder="••••••••"
                    show={showConfirmNew}
                    onToggle={() => setShowConfirmNew(p => !p)}
                  />
                </>
              )}

              {mode === "register" && (
                <p style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-main)", lineHeight: 1.4 }}>
                  Password must be 8-15 characters with uppercase, lowercase, number and special characters.
                </p>
              )}

              <button
                onClick={submit}
                disabled={loading}
                className="btn-primary"
                style={{ marginTop: "auto", width: "100%", padding: "14px" }}
              >
                {loading ? "Please wait..." : btnLabels[mode]}
              </button>

              {["login", "register"].includes(mode) && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "10px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
                    <span style={{ color: "var(--text-dark)", fontSize: "var(--fs-xs)", fontWeight: 600 }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
                  </div>
                  <div id="google-btn-hidden" style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, overflow: "hidden" }} />
                  <button
                    type="button"
                    onClick={handleCustomGoogleClick}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--bg-input)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: "var(--fs-sm)",
                      fontFamily: "var(--font-main)",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "var(--border-color)"; e.target.style.background = "var(--bg-input)"; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>
                </>
              )}
            </div>

            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              {mode === "login" && (
                <>
                  <button onClick={() => setMode("forgot")} style={linkBtn}>Forgot password?</button>
                  <span style={{ color: "var(--text-dim)", fontSize: "var(--fs-sm)" }}>
                    Don't have an account?{" "}
                    <button onClick={() => setMode("register")} style={{ ...linkBtn, color: "var(--primary)", fontWeight: 600 }}>Sign up</button>
                  </span>
                </>
              )}
              {mode === "register" && (
                <span style={{ color: "var(--text-dim)", fontSize: "var(--fs-sm)" }}>
                  Already have an account?{" "}
                  <button onClick={() => setMode("login")} style={{ ...linkBtn, color: "var(--primary)", fontWeight: 600 }}>Sign in</button>
                </span>
              )}
              {["forgot", "reset"].includes(mode) && (
                <button onClick={() => setMode("login")} style={{ ...linkBtn, fontWeight: 500 }}>
                  ← Back to login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;