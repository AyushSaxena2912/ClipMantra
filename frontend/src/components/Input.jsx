const Input = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label style={{
      display: "block", color: "#555", fontSize: 11,
      fontFamily: "'DM Mono', monospace", letterSpacing: 1.5,
      textTransform: "uppercase", marginBottom: 6,
    }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "12px 14px",
        background: "#080810", border: "1px solid #1e1e2e",
        borderRadius: 10, color: "#fff", fontSize: 14,
        fontFamily: "'DM Mono', monospace", outline: "none",
        boxSizing: "border-box", transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#00e599")}
      onBlur={(e) => (e.target.style.borderColor = "#1e1e2e")}
    />
  </div>
);

export default Input;
