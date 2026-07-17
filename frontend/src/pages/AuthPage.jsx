import { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BrandLottie from "@/components/BrandLottie";
import { api, saveToken, saveUser } from "../api";

const AUTH_LOTTIE = "/lottie/auth-owl.lottie";

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

const AuthField = ({ label, type = "text", value, onChange, placeholder, inputRef }) => (
  <div className="landing-auth-field">
    <label className="landing-auth-label">{label}</label>
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="landing-auth-input"
    />
  </div>
);

const PasswordField = ({ label, value, onChange, placeholder, show, onToggle }) => (
  <div className="landing-auth-field">
    <label className="landing-auth-label">{label}</label>
    <div className="landing-auth-input-wrap">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        type="button"
        className={`landing-auth-eye${show ? " is-active" : ""}`}
        onClick={onToggle}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <EyeIcon show={show} />
      </button>
    </div>
  </div>
);

const AuthPage = ({ onLogin, toast, onBack }) => {
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
          use_fedcm_for_prompt: false,
        });

        const container = document.getElementById("google-signin-container");
        if (container) {
          window.google.accounts.id.renderButton(container, {
            type: "standard",
            theme: "outline",
            size: "large",
            width: 300,
          });
        }
      }
    };

    if (window.google) {
      initGoogle();
    } else {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      script?.addEventListener("load", initGoogle);
    }

    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, [mode]);

  const handleCustomGoogleClick = () => {
    const googleBtn = document.querySelector("#google-signin-container div[role='button']");
    if (googleBtn) {
      googleBtn.click();
    } else if (window.google) {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "email profile openid",
        callback: async (tokenResponse) => {
          if (tokenResponse.access_token) {
            setLoading(true);
            try {
              const r = await api("/auth/google", {
                method: "POST",
                body: JSON.stringify({ token: tokenResponse.access_token }),
              });
              if (r.ok) { saveToken(r.data.token); saveUser(r.data.user); onLogin(r.data.user); toast("Welcome!", "success"); }
              else toast(r.data.message || "Google login failed", "error");
            } finally {
              setLoading(false);
            }
          }
        },
      });
      tokenClient.requestAccessToken({ prompt: "select_account" });
    }
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
  const subtitles = {
    login: "Welcome back to ClipMantra",
    register: "Start clipping viral moments",
    forgot: "We'll send an OTP to your email",
    reset: "Enter the OTP from your email",
  };
  const btnLabels = { login: "Login", register: "Create Account", forgot: "Send OTP", reset: "Reset Password" };

  const showVisual = ["login", "register"].includes(mode);

  return (
    <div className={`landing-page landing-auth${showVisual ? " landing-auth--split" : ""}`}>
      {onBack && (
        <button type="button" className="landing-auth-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </button>
      )}

      {showVisual && (
        <aside className="landing-auth-visual" aria-hidden="true">
          <div className="landing-auth-lottie">
            <DotLottieReact
              src={AUTH_LOTTIE}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="landing-auth-visual-copy">
            <p className="landing-auth-visual-title">Clip smarter. Go viral faster.</p>
            <p className="landing-auth-visual-sub">
              Long videos to Shorts, Reels &amp; TikToks — in minutes.
            </p>
          </div>
        </aside>
      )}

      <main className="landing-auth-panel">
        <div className="landing-auth-form">
          <div className="landing-auth-brand">
            <div className="landing-auth-logo">
              <BrandLottie className="landing-auth-brand-lottie" size={36} />
              <span className="landing-auth-logo-name">ClipMantra</span>
            </div>
          </div>

          <div className="landing-auth-heading">
            <h2 className="landing-auth-title">{titles[mode]}</h2>
            <p className="landing-auth-sub">{subtitles[mode]}</p>
          </div>

            <div className="landing-auth-fields">
              {mode === "register" && (
                <AuthField label="Full Name" value={f.name} onChange={set("name")} placeholder="Tony Stark" />
              )}
              {["login", "register", "forgot", "reset"].includes(mode) && (
                <AuthField
                  label="Email Address"
                  type="email"
                  value={f.email}
                  onChange={set("email")}
                  placeholder="you@example.com"
                  inputRef={emailRef}
                />
              )}
              {mode === "reset" && (
                <AuthField
                  label="OTP Verification Code"
                  value={f.otp}
                  onChange={set("otp")}
                  placeholder="6-digit code from email"
                />
              )}

              {["login", "register"].includes(mode) && (
                <PasswordField
                  label="Password"
                  value={f.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  show={showPass}
                  onToggle={() => setShowPass((p) => !p)}
                />
              )}
              {mode === "register" && (
                <PasswordField
                  label="Confirm Password"
                  value={f.confirm}
                  onChange={set("confirm")}
                  placeholder="••••••••"
                  show={showConfirm}
                  onToggle={() => setShowConfirm((p) => !p)}
                />
              )}
              {mode === "reset" && (
                <>
                  <PasswordField
                    label="New Password"
                    value={f.newPass}
                    onChange={set("newPass")}
                    placeholder="••••••••"
                    show={showNewPass}
                    onToggle={() => setShowNewPass((p) => !p)}
                  />
                  <PasswordField
                    label="Confirm New Password"
                    value={f.confirmNew}
                    onChange={set("confirmNew")}
                    placeholder="••••••••"
                    show={showConfirmNew}
                    onToggle={() => setShowConfirmNew((p) => !p)}
                  />
                </>
              )}

              {mode === "register" && (
                <p className="landing-auth-hint">
                  Password must be 8–15 characters with uppercase, lowercase, number and special characters.
                </p>
              )}

              {mode === "login" && (
                <div className="landing-auth-row">
                  <span />
                  <button type="button" className="landing-auth-link" onClick={() => setMode("forgot")}>
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            <div className="landing-auth-actions">
              <button
                type="button"
                className="landing-auth-submit"
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Please wait..." : btnLabels[mode]}
              </button>

              {["login", "register"].includes(mode) && (
                <>
                  <div className="landing-auth-divider">
                    <span>OR</span>
                  </div>
                  <div id="google-signin-container" style={{ display: "none" }} />
                  <button
                    type="button"
                    className="landing-auth-google"
                    onClick={handleCustomGoogleClick}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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

          <div className="landing-auth-footer">
            {mode === "login" && (
              <span>
                Don&apos;t have an account?{" "}
                <button type="button" className="landing-auth-link landing-auth-link--accent" onClick={() => setMode("register")}>
                  Sign up
                </button>
              </span>
            )}
            {mode === "register" && (
              <span>
                Already have an account?{" "}
                <button type="button" className="landing-auth-link landing-auth-link--accent" onClick={() => setMode("login")}>
                  Sign in
                </button>
              </span>
            )}
            {["forgot", "reset"].includes(mode) && (
              <button type="button" className="landing-auth-link" onClick={() => setMode("login")}>
                ← Back to login
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
