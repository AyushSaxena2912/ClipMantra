import { useState } from "react";
import { api } from "../api";
import Input from "../components/Input";

const SettingsPage = ({ user, toast, onLogout }) => {
  const [f, setF] = useState({ old: "", newp: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const changePassword = async () => {
    if (!f.old || !f.newp || !f.confirm) { toast("All fields required", "error"); return; }
    setLoading(true);
    const r = await api("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword: f.old, newPassword: f.newp, confirmPassword: f.confirm }),
    });
    setLoading(false);
    if (r.ok) { toast("Password changed!", "success"); setF({ old: "", newp: "", confirm: "" }); }
    else toast(r.data.message, "error");
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
          Settings
        </h1>
        <p style={{ color: "#555", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
          Manage your account
        </p>
      </div>

      {/* Profile Card */}
      <div style={{ background: "#0d0d14", border: "1px solid #1e1e2e", borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 20px" }}>Profile</h2>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{
            width: 52, height: 52,
            background: "linear-gradient(135deg, #00e599, #00aaff)",
            borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20, fontWeight: 800,
            color: "#000", fontFamily: "'Syne', sans-serif",
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p style={{ color: "#fff", fontSize: 16, fontFamily: "'Syne', sans-serif", fontWeight: 700, margin: "0 0 2px" }}>{user?.name}</p>
            <p style={{ color: "#444", fontSize: 12, fontFamily: "'DM Mono', monospace", margin: 0 }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div style={{ background: "#0d0d14", border: "1px solid #1e1e2e", borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 20px" }}>
          Change Password
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Current Password" type="password" value={f.old} onChange={set("old")} placeholder="••••••••" />
          <Input label="New Password" type="password" value={f.newp} onChange={set("newp")} placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" value={f.confirm} onChange={set("confirm")} placeholder="••••••••" />
          <p style={{ color: "#333", fontSize: 11, fontFamily: "'DM Mono', monospace", margin: 0 }}>
            8-15 chars · uppercase · lowercase · number · special (@$!%*?&)
          </p>
          <button
            onClick={changePassword}
            disabled={loading}
            style={{
              padding: "13px 0",
              background: loading ? "#111" : "#0d1a12",
              border: "1px solid #00e59944", borderRadius: 10,
              color: loading ? "#333" : "#00e599",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div style={{ background: "#100000", border: "1px solid #ff3b3b22", borderRadius: 16, padding: 28 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#ff3b3b", margin: "0 0 12px" }}>
          Sign Out
        </h2>
        <p style={{ color: "#444", fontSize: 12, fontFamily: "'DM Mono', monospace", margin: "0 0 16px" }}>
          You'll need to sign in again to access your jobs.
        </p>
        <button
          onClick={onLogout}
          style={{
            padding: "11px 24px", background: "transparent",
            border: "1px solid #ff3b3b44", borderRadius: 10,
            color: "#ff3b3b", cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: 13,
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
