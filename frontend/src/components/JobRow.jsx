import StatusBadge from "./StatusBadge";
import { timeAgo } from "../utils/helpers";

const JobRow = ({ job, onClick }) => {
  const clips = job.clips_path
    ? Array.isArray(job.clips_path)
      ? job.clips_path
      : JSON.parse(job.clips_path || "[]")
    : [];

  return (
    <div
      onClick={onClick}
      style={{
        background: "#0d0d14", border: "1px solid #1e1e2e",
        borderRadius: 12, padding: "16px 20px",
        cursor: "pointer", transition: "all 0.15s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#2a2a3e";
        e.currentTarget.style.background = "#0f0f18";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e1e2e";
        e.currentTarget.style.background = "#0d0d14";
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          color: "#fff", fontSize: 13,
          fontFamily: "'DM Mono', monospace",
          margin: "0 0 4px",
          overflow: "hidden", textOverflow: "ellipsis",
          whiteSpace: "nowrap", maxWidth: 400,
        }}>{job.url}</p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ color: "#444", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>
            {timeAgo(job.created_at)}
          </span>
          <span style={{ color: "#333", fontSize: 10 }}>·</span>
          <span style={{ color: "#444", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>
            {job.clip_count} clips requested
          </span>
          {job.status === "completed" && clips.length > 0 && (
            <>
              <span style={{ color: "#333", fontSize: 10 }}>·</span>
              <span style={{ color: "#00e599", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>
                {clips.length} clips ready
              </span>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <StatusBadge status={job.status} />
        <span style={{ color: "#333" }}>›</span>
      </div>
    </div>
  );
};

export default JobRow;
