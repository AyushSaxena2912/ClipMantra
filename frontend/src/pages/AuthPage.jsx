import { useState } from "react";
import { api, saveToken, saveUser } from "../api";
import Input from "../components/Input";

const AuthPage = ({ onLogin, toast }) => {
  const [mode, setMode] = useState("login"); // login | register | forgot | reset
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", otp: "", newPass: "", confirmNew: "" });
  const [loading, setLoading] = useState(false);

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

  const titles    = { login: "Sign In", register: "Create Account", forgot: "Reset Password", reset: "Enter OTP" };
  const subtitles = { login: "Welcome back to ClipMantra", register: "Start clipping viral moments", forgot: "We'll send an OTP to your email", reset: "Enter the OTP from your email" };

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
              <Input label="Password" type="password" value={f.password} onChange={set("password")} placeholder="••••••••" />
            )}
            {mode === "register" && (
              <Input label="Confirm Password" type="password" value={f.confirm} onChange={set("confirm")} placeholder="••••••••" />
            )}
            {mode === "reset" && (
              <>
                <Input label="New Password" type="password" value={f.newPass} onChange={set("newPass")} placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" value={f.confirmNew} onChange={set("confirmNew")} placeholder="••••••••" />
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
              {loading ? "Please wait..." : titles[mode]}
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

const linkBtn = {
  background: "none", border: "none", color: "#555",
  cursor: "pointer", fontSize: 13,
  fontFamily: "'DM Mono', monospace", padding: 0,
};

export default AuthPage;
