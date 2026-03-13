const LoadingSpinner = ({ text = "Loading..." }) => (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
        <div style={{
            width: 32, height: 32,
            border: "2px solid var(--border-color)", borderTopColor: "var(--primary)",
            borderRadius: "50%", animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
        }} />
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>{text}</p>
    </div>
);

export default LoadingSpinner;
