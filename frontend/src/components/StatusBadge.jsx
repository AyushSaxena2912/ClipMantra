const STATUS = {
  queued: { label: "QUEUED", color: "#a1a1aa", bg: "#121216", dot: "#a1a1aa" },
  downloading: { label: "DOWNLOADING", color: "#f59e0b", bg: "#1a1408", dot: "#f59e0b" },
  transcribing: { label: "TRANSCRIBING", color: "#38bdf8", bg: "#061018", dot: "#38bdf8" },
  rendering: { label: "RENDERING", color: "#c084fc", bg: "#14081f", dot: "#c084fc" },
  processing: { label: "PROCESSING", color: "#c084fc", bg: "#14081f", dot: "#c084fc" },
  completed: { label: "COMPLETED", color: "#34d399", bg: "#06140f", dot: "#34d399" },
  failed: { label: "FAILED", color: "#ef4444", bg: "#1a0808", dot: "#ef4444" },
};

const ACTIVE = ["downloading", "transcribing", "rendering", "processing"];

const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.queued;
  const isActive = ACTIVE.includes(status);

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", borderRadius: 20,
      background: s.bg, color: s.color,
      border: `1px solid ${s.color}33`,
      fontFamily: "var(--font-main)",
      fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: s.dot,
        boxShadow: isActive ? `0 0 6px ${s.dot}` : "none",
        animation: isActive ? "pulse 1.5s infinite" : "none",
      }} />
      {s.label}
    </span>
  );
};

export default StatusBadge;
