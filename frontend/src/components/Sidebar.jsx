const NAV = [
  { id: "home",     icon: "⬡", label: "Dashboard" },
  { id: "new-job",  icon: "＋", label: "New Job"   },
  { id: "jobs",     icon: "≡", label: "All Jobs"  },
  { id: "settings", icon: "◎", label: "Settings"  },
];

const Sidebar = ({ page, setPage, user, onLogout }) => (
  <div style={{
    width: 220, background: "#080810",
    borderRight: "1px solid #111",
    display: "flex", flexDirection: "column", padding: "24px 0",
  }}>
    {/* Logo */}
    <div style={{ padding: "0 24px 32px", borderBottom: "1px solid #111" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 30, height: 30,
          background: "linear-gradient(135deg, #00e599, #00aaff)",
          borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 14,
        }}>✂️</div>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontSize: 20,
          fontWeight: 800, color: "#fff",
        }}>ClipMantra</span>
      </div>
    </div>

    {/* Nav Links */}
    <nav style={{
      flex: 1, padding: "20px 12px",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      {NAV.map((n) => (
        <button key={n.id} onClick={() => setPage(n.id)} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "11px 14px",
          background: page === n.id ? "#0d0d1a" : "transparent",
          border: page === n.id ? "1px solid #1e1e2e" : "1px solid transparent",
          borderRadius: 10,
          color: page === n.id ? "#00e599" : "#555",
          cursor: "pointer",
          fontFamily: "'DM Mono', monospace", fontSize: 13,
          textAlign: "left", transition: "all 0.15s",
        }}>
          <span style={{ fontSize: 16, width: 18, textAlign: "center" }}>{n.icon}</span>
          {n.label}
        </button>
      ))}
    </nav>

    {/* User Info */}
    <div style={{ padding: "16px 16px 0", borderTop: "1px solid #111" }}>
      <div style={{
        padding: "10px 14px", background: "#0d0d1a",
        borderRadius: 10, border: "1px solid #1e1e2e",
      }}>
        <p style={{
          color: "#fff", fontSize: 13,
          fontFamily: "'Syne', sans-serif", fontWeight: 600,
          margin: "0 0 2px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{user?.name}</p>
        <p style={{
          color: "#444", fontSize: 10,
          fontFamily: "'DM Mono', monospace",
          margin: "0 0 10px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{user?.email}</p>
        <button
          onClick={onLogout}
          style={{
            background: "none", border: "1px solid #2a2a2a",
            borderRadius: 6, color: "#555", cursor: "pointer",
            fontSize: 11, fontFamily: "'DM Mono', monospace",
            padding: "5px 10px", width: "100%", transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = "#ff3b3b"; e.target.style.color = "#ff3b3b"; }}
          onMouseLeave={(e) => { e.target.style.borderColor = "#2a2a2a"; e.target.style.color = "#555"; }}
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
);

export default Sidebar;
