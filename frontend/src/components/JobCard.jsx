import StatusBadge from "./StatusBadge";
import { timeAgo, getYoutubeId } from "../utils/helpers";

const JobCard = ({ job, onClick }) => {
    const thumbId = getYoutubeId(job.url);
    const thumbUrl = thumbId ? `https://img.youtube.com/vi/${thumbId}/mqdefault.jpg` : null;

    const clips = job.clips_path
        ? Array.isArray(job.clips_path)
            ? job.clips_path
            : JSON.parse(job.clips_path || "[]")
        : [];

    return (
        <div
            onClick={onClick}
            className="card"
            style={{
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: "rgba(26, 26, 32, 0.6)",
                border: "1px solid var(--border-color)",
                position: "relative",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "0 12px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(168, 85, 247, 0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Thumbnail Area */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
                {thumbUrl ? (
                    <img
                        src={thumbUrl}
                        alt="Thumbnail"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)' }}>
                        No Preview
                    </div>
                )}

                {/* Play Icon Overlay */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)'
                }}>
                    <span style={{ color: '#fff', fontSize: 14, marginLeft: 2 }}>▶</span>
                </div>

                {/* Status Badge Overlay */}
                <div style={{ position: 'absolute', top: 10, right: 10, transform: 'scale(0.85)', transformOrigin: 'top right' }}>
                    <StatusBadge status={job.status} />
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{
                    color: "var(--text-main)", fontSize: "var(--fs-sm)",
                    margin: 0, fontWeight: 600,
                    overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical",
                    lineHeight: 1.4, minHeight: '1.4em'
                }} title={job.url}>
                    {job.url}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: "var(--text-dim)", fontSize: 10 }}>
                        {timeAgo(job.created_at)}
                    </span>

                    {job.status === "completed" && clips.length > 0 ? (
                        <span style={{
                            color: "var(--primary-hover)", fontSize: 9,
                            fontWeight: 800, background: 'var(--primary-soft)',
                            padding: '1px 6px', borderRadius: 4, border: '1px solid var(--primary-border)'
                        }}>
                            {clips.length} READY
                        </span>
                    ) : (
                        <span style={{ color: "var(--text-dark)", fontSize: 9, fontWeight: 600 }}>
                            {job.clip_count} REQ.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobCard;
