const Toasts = ({ toasts }) => (
  <div className="toast-container" style={{
    position: "fixed", bottom: 24, right: 24,
    zIndex: 9999, display: "flex", flexDirection: "column", gap: 10,
  }}>
    {toasts.map((t) => (
      <div key={t.id} style={{
        padding: "12px 20px", borderRadius: "var(--radius-sm)",
        fontSize: "var(--fs-sm)",
        fontWeight: 500, maxWidth: 320, letterSpacing: 0.3,
        background: t.type === "error" ? "var(--accent-red)" : t.type === "success" ? "var(--primary)" : "var(--bg-input)",
        color: "#fff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: "slideIn 0.3s ease",
        border: t.type === "error"
          ? "1px solid #ff6b6b"
          : t.type === "success"
            ? "1px solid var(--primary)"
            : "1px solid var(--border-color)",
      }}>
        {t.msg}
      </div>
    ))}

    <style>{`
      @media (max-width: 768px) {
        .toast-container {
          bottom: 90px !important;
          right: 16px !important;
          left: 16px !important;
        }
      }
    `}</style>
  </div>
);

export default Toasts;
