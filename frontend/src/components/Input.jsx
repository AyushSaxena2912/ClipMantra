import { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", value, onChange, placeholder }, ref) => (
  <div>
    <label style={{
      display: "block", color: "var(--text-dim)", fontSize: "var(--fs-xs)",
      fontFamily: "var(--font-main)", letterSpacing: 1.5,
      textTransform: "uppercase", marginBottom: 6,
    }}>
      {label}
    </label>
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "12px 14px",
        background: "var(--bg-input)", border: "1px solid var(--border-color)",
        borderRadius: 10, color: "#fff", fontSize: "var(--fs-base)",
        outline: "none",
        boxSizing: "border-box", transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
    />
  </div>
));

Input.displayName = "Input";
export default Input;
