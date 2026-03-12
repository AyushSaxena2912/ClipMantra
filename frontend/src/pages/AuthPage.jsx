import { useState } from "react";
import { api, saveToken, saveUser } from "../api";
import Input from "../components/Input";

// ✅ Outside AuthPage — nahi toh har render pe re-mount hoga aur focus lost hogi
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

// ✅ Outside AuthPage
const PasswordInput = ({ label, value, onChange, placeholder, show, onToggle }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ color: "#888", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: 1, textTransform: "uppercase" }}>
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
          background: "#0a0a12",
          border: "1px solid #1e1e2e",
          borderRadius: 10,
          color: "#fff",
          fontSize: 14,
          fontFamily: "'DM Mono', monospace",
          outline: "none",
          boxSizing: "border-box",
          transition: "border 0.2s",
        }}
        onFocus={e => e.target.style.border = "1px solid #00e599"}
        onBlur={e => e.target.style.border = "1px solid #1e1e2e"}
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
          color: show ? "#00e599" : "#444",
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
  background: "none", border: "none", color: "#555",
  cursor: "pointer", fontSize: 13,
  fontFamily: "'DM Mono', monospace", padding: 0,
};

const AuthPage = ({ onLogin, toast }) => {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", otp: "", newPass: "", confirmNew: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === "login") {
        const r = await api("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: f.email, password: f.password }),
        });
        if (r.ok) { saveToken(r.data.token); saveUser(r.data.user); onLogin(r.data.user); toast("Welcome back! 🎬", "success"); }
        else toast(r.data.message, "error");

      } else if (mode === "register") {
        const r = await api("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name: f.name, email: f.email, password: f.password, confirmPassword: f.confirm }),
        });
        if (r.ok) { saveToken(r.data.token); saveUser(r.data.user); onLogin(r.data.user); toast("Account created! 🎬", "success"); }
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

  const titles    = { login: "Login", register: "Create Account", forgot: "Reset Password", reset: "Enter OTP" };
  const subtitles = { login: "Welcome back to ClipMantra", register: "Start clipping viral moments", forgot: "We'll send an OTP to your email", reset: "Enter the OTP from your email" };
  const btnLabels = { login: "Login", register: "Create Account", forgot: "Send OTP", reset: "Reset Password" };

  return (
    <div style={{
      minHeight: "100vh", background: "#050508",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, position: "relative", overflow: "hidden",
    }}>
      {/* BG Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,229,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,153,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,229,153,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #00e599, #00aaff)",
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>✂️</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>ClipMantra</span>
          </div>
          <p style={{ color: "#666", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
            AI-Powered Viral Clip Extractor
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#0d0d14", border: "1px solid #1e1e2e",
          borderRadius: 20, padding: 36,
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
            {titles[mode]}
          </h2>
          <p style={{ color: "#555", fontSize: 13, fontFamily: "'DM Mono', monospace", margin: "0 0 28px" }}>
            {subtitles[mode]}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && <Input label="Full Name" value={f.name} onChange={set("name")} placeholder="John Doe" />}
            {["login","register","forgot","reset"].includes(mode) && (
              <Input label="Email" type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" />
            )}
            {mode === "reset" && <Input label="OTP Code" value={f.otp} onChange={set("otp")} placeholder="6-digit OTP" />}

            {["login","register"].includes(mode) && (
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
              <p style={{ color: "#444", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>
                Must be 8-15 chars with uppercase, lowercase, number & special char (@$!%*?&)
              </p>
            )}

            <button
              onClick={submit}
              disabled={loading}
              style={{
                marginTop: 6, padding: "14px 0",
                background: loading ? "#111" : "linear-gradient(135deg, #00e599, #00c47a)",
                color: loading ? "#555" : "#000",
                border: "none", borderRadius: 12,
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Please wait..." : btnLabels[mode]}
            </button>
          </div>

          {/* Mode switches */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {mode === "login" && (
              <>
                <button onClick={() => setMode("forgot")} style={linkBtn}>Forgot password?</button>
                <span style={{ color: "#333", fontSize: 12 }}>
                  Don't have an account?{" "}
                  <button onClick={() => setMode("register")} style={{ ...linkBtn, color: "#00e599" }}>Sign up</button>
                </span>
              </>
            )}
            {mode === "register" && (
              <span style={{ color: "#333", fontSize: 12 }}>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} style={{ ...linkBtn, color: "#00e599" }}>Sign in</button>
              </span>
            )}
            {["forgot","reset"].includes(mode) && (
              <button onClick={() => setMode("login")} style={linkBtn}>← Back to login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
