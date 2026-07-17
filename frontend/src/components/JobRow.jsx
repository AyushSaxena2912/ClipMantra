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
      className="card flex items-center justify-between"
      style={{
        padding: "16px 20px",
        cursor: "pointer", transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary-border)";
        e.currentTarget.style.background = "rgba(22, 22, 26, 0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.background = "var(--bg-card)";
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          color: "#fff", fontSize: "var(--fs-sm)",
          margin: "0 0 4px",
          overflow: "hidden", textOverflow: "ellipsis",
          whiteSpace: "nowrap", maxWidth: 400,
        }}>{job.url}</p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>
            {timeAgo(job.created_at)}
          </span>
          <span style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)" }}>·</span>
          <span style={{ color: "var(--text-muted)", fontSize: "var(--fs-xs)" }}>
            {job.clip_count} clips requested
          </span>
          {job.status === "completed" && clips.length > 0 && (
            <>
              <span style={{ color: "var(--text-dim)", fontSize: "var(--fs-xs)" }}>·</span>
              <span style={{ color: "var(--primary)", fontSize: "var(--fs-xs)" }}>
                {clips.length} clips ready
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        <StatusBadge status={job.status} />
        <span style={{ color: "var(--text-dim)" }}>›</span>
      </div>
    </div>
  );
};

export default JobRow;
