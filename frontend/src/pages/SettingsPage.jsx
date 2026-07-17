import { useState } from "react";
import { api } from "../api";

const SettingsPage = ({ user, toast, onLogout }) => {
  const [f, setF] = useState({ old: "", newp: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const changePassword = async (e) => {
    e?.preventDefault?.();
    if (!f.old || !f.newp || !f.confirm) {
      toast("Please fill all password fields", "error");
      return;
    }
    setLoading(true);
    const r = await api("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: f.old,
        newPassword: f.newp,
        confirmPassword: f.confirm,
      }),
    });
    setLoading(false);
    if (r.ok) {
      toast("Password updated", "success");
      setF({ old: "", newp: "", confirm: "" });
    } else {
      toast(r.data.message || "Couldn't update password", "error");
    }
  };

  const initial = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="settings">
      <header className="settings-header">
        <p className="settings-eyebrow">Account</p>
        <h1 className="settings-title">Settings</h1>
        <p className="settings-sub">Manage your profile and sign-in security</p>
      </header>

      <div className="settings-stack">
        <section className="settings-card">
          <div className="settings-card-head">
            <h2 className="settings-card-title">Profile</h2>
            <span className="settings-badge">Free</span>
          </div>
          <div className="settings-profile">
            <div className="settings-avatar" aria-hidden="true">{initial}</div>
            <div className="settings-profile-meta">
              <p className="settings-name">{user?.name}</p>
              <p className="settings-email">{user?.email}</p>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-head">
            <h2 className="settings-card-title">Password</h2>
          </div>
          <p className="settings-card-desc">
            Use a strong password you don&apos;t reuse elsewhere.
          </p>
          <form className="settings-form" onSubmit={changePassword}>
            <label className="settings-field">
              <span className="settings-label">Current password</span>
              <input
                className="settings-input"
                type="password"
                value={f.old}
                onChange={set("old")}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>
            <label className="settings-field">
              <span className="settings-label">New password</span>
              <input
                className="settings-input"
                type="password"
                value={f.newp}
                onChange={set("newp")}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </label>
            <label className="settings-field">
              <span className="settings-label">Confirm new password</span>
              <input
                className="settings-input"
                type="password"
                value={f.confirm}
                onChange={set("confirm")}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </label>
            <p className="settings-hint">
              8–15 characters with uppercase, lowercase, a number, and a special character.
            </p>
            <button type="submit" className="btn-primary settings-submit" disabled={loading}>
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        </section>

        <section className="settings-card settings-card--danger">
          <h2 className="settings-card-title settings-card-title--danger">Sign out</h2>
          <p className="settings-card-desc">
            You&apos;ll need to sign in again to access your jobs.
          </p>
          <button type="button" className="btn-danger" onClick={onLogout}>
            Sign out
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
