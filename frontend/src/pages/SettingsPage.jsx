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
    <div style={{ maxWidth: 520 }} className="flex flex-col gap-lg">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account</p>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ padding: "var(--spacing-md)" }}>
        <h2 style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-bold)", color: "var(--text-main)", margin: "0 0 20px" }}>Profile</h2>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div className="font-syne flex items-center justify-center" style={{
            width: 52, height: 52,
            background: "linear-gradient(135deg, var(--primary), var(--accent-blue))",
            borderRadius: 14, fontSize: "var(--fs-2xl)", fontWeight: 800,
            color: "#000",
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-syne" style={{ color: "var(--text-main)", fontSize: "var(--fs-lg)", fontWeight: 700, margin: "0 0 2px" }}>{user?.name}</p>
            <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-sm)", margin: 0 }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card" style={{ padding: "var(--spacing-md)" }}>
        <h2 style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-bold)", color: "var(--text-main)", margin: "0 0 20px" }}>
          Change Password
        </h2>
        <div className="flex flex-col" style={{ gap: 14 }}>
          <Input label="Current Password" type="password" value={f.old} onChange={set("old")} placeholder="••••••••" />
          <Input label="New Password" type="password" value={f.newp} onChange={set("newp")} placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" value={f.confirm} onChange={set("confirm")} placeholder="••••••••" />
          <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)", margin: 0 }}>
            8-15 chars · uppercase · lowercase · number · special (@$!%*?&)
          </p>
          <button
            onClick={changePassword}
            disabled={loading}
            className="btn-secondary"
            style={{ width: "100%" }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="card" style={{ background: "rgba(255, 59, 59, 0.03)", border: "1px solid rgba(255, 59, 59, 0.1)", padding: "var(--spacing-md)" }}>
        <h2 style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-bold)", color: "var(--accent-red)", margin: "0 0 12px" }}>
          Sign Out
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: "var(--fs-sm)", margin: "0 0 16px" }}>
          You'll need to sign in again to access your jobs.
        </p>
        <button onClick={onLogout} className="btn-danger">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
