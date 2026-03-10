const STATUS = {
  queued:        { label: "QUEUED",        color: "#888",    bg: "#1a1a1a", dot: "#888" },
  downloading:   { label: "DOWNLOADING",   color: "#f0a500", bg: "#1a1400", dot: "#f0a500" },
  transcribing:  { label: "TRANSCRIBING",  color: "#00aaff", bg: "#001428", dot: "#00aaff" },
  rendering:     { label: "RENDERING",     color: "#a855f7", bg: "#120028", dot: "#a855f7" },
  processing:    { label: "PROCESSING",    color: "#a855f7", bg: "#120028", dot: "#a855f7" },
  completed:     { label: "COMPLETED",     color: "#00e599", bg: "#001a0f", dot: "#00e599" },
  failed:        { label: "FAILED",        color: "#ff3b3b", bg: "#1a0000", dot: "#ff3b3b" },
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
      fontFamily: "'DM Mono', monospace",
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
