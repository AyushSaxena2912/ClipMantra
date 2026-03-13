const EmptyState = ({ label = "No items yet." }) => (
    <div style={{
        padding: "60px 0", textAlign: "center",
        border: "1px dashed var(--border-color)", borderRadius: 14,
    }}>
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-base)" }}>{label}</p>
    </div>
);

export default EmptyState;
