const Toasts = ({ toasts }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24,
    zIndex: 9999, display: "flex", flexDirection: "column", gap: 10,
  }}>
    {toasts.map((t) => (
      <div key={t.id} style={{
        padding: "12px 20px", borderRadius: 10,
        fontFamily: "'DM Mono', monospace", fontSize: 13,
        fontWeight: 500, maxWidth: 320, letterSpacing: 0.3,
        background: t.type === "error" ? "#ff3b3b" : t.type === "success" ? "#00e599" : "#1a1a2e",
        color: t.type === "success" ? "#000" : "#fff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: "slideIn 0.3s ease",
        border: t.type === "error"
          ? "1px solid #ff6b6b"
          : t.type === "success"
          ? "1px solid #00e599"
          : "1px solid #333",
      }}>
        {t.msg}
      </div>
    ))}
  </div>
);

export default Toasts;
