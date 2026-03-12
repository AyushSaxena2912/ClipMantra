import { useState } from "react";

const NAV = [
  {
    section: "Create", items: [
      { id: "new-job", icon: "＋", label: "New Job", badge: "New" },
    ]
  },
  {
    section: "Manage", items: [
      { id: "home", icon: "⬡", label: "Dashboard" },
      { id: "jobs", icon: "≡", label: "All Jobs" },
    ]
  },
  {
    section: "Settings", items: [
      { id: "settings", icon: "◎", label: "Settings" },
    ]
  }
];

const Sidebar = ({ page, setPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNav = (id) => {
    setPage(id);
    setIsOpen(false);
  };

  // Flattened items for mobile bottom nav
  const mobileItems = [
    { id: "home", icon: "⬡", label: "Home" },
    { id: "new-job", icon: "＋", label: "Create" },
    { id: "jobs", icon: "≡", label: "Jobs" },
    { id: "settings", icon: "◎", label: "Profile" },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="mobile-header" style={{
        display: "none",
        padding: "16px 20px",
        background: "var(--bg-sidebar)",
        borderBottom: "1px solid var(--border-muted)",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="font-syne" style={{ fontSize: 18, fontWeight: 800 }}>ClipMantra</span>
          <span style={{
            fontSize: 10, background: '#1a1a2e', padding: '2px 8px',
            borderRadius: 4, color: 'var(--text-muted)', border: '1px solid var(--border-color)'
          }}>Free</span>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--primary)', fontSize: 12, fontWeight: 700
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav" style={{
        display: "none",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        background: "rgba(8, 8, 16, 0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border-muted)",
        zIndex: 1000,
        padding: "0 10px",
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        {mobileItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              color: page === item.id ? "var(--primary)" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-header { display: flex !important; }
          .mobile-bottom-nav { display: flex !important; }
          .sidebar-container { display: none !important; }
          .content-area { padding-bottom: 90px !important; }
        }
      `}</style>

      <div className="sidebar-container" style={{
        width: isCollapsed ? 80 : 260,
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border-muted)",
        display: "flex", flexDirection: "column", padding: "24px 0",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: 'relative',
        overflow: 'visible'
      }}>
        {/* Toggle Button - Integrated at the top */}
        <div style={{
          padding: "0 22px 24px",
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          alignItems: 'center',
          borderBottom: "1px solid var(--border-muted)",
          marginBottom: 8
        }}>
          {!isCollapsed && <span className="font-syne" style={{ fontSize: 18, fontWeight: 800, whiteSpace: 'nowrap' }}>ClipMantra</span>}
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{
          flex: 1, padding: "24px 12px",
          display: "flex", flexDirection: "column", gap: 32,
          overflow: 'hidden'
        }}>
          {NAV.map((section) => (
            <div key={section.section}>
              {!isCollapsed && (
                <p style={{
                  color: 'var(--text-dim)', fontSize: 10, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: 1.5,
                  padding: '0 12px 12px'
                }}>
                  {section.section}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {section.items.map((n) => (
                  <button key={n.id} onClick={() => handleNav(n.id)} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: isCollapsed ? "12px 0" : "10px 14px",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    background: page === n.id ? "rgba(0, 229, 153, 0.05)" : "transparent",
                    border: "none",
                    borderRadius: 10,
                    color: page === n.id ? "var(--primary)" : "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: 14,
                    textAlign: "left", transition: "all 0.2s",
                    width: '100%',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: 20, minWidth: 20, textAlign: "center", opacity: page === n.id ? 1 : 0.7 }}>{n.icon}</span>
                    {!isCollapsed && <span style={{ whiteSpace: 'nowrap', fontWeight: page === n.id ? 600 : 400 }}>{n.label}</span>}
                    {n.badge && !isCollapsed && (
                      <span style={{
                        fontSize: 8, background: 'var(--primary)', color: '#000',
                        padding: '1px 4px', borderRadius: 4, fontWeight: 700,
                        textTransform: 'uppercase', marginLeft: 'auto'
                      }}>{n.badge}</span>
                    )}
                    {page === n.id && isCollapsed && (
                      <div style={{
                        position: 'absolute', left: 4, width: 3, height: 16,
                        borderRadius: 2, background: 'var(--primary)'
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div style={{ padding: "16px 12px 0", borderTop: "1px solid var(--border-muted)", overflow: 'hidden' }}>
          <div style={{
            padding: isCollapsed ? "12px 0" : "10px",
            borderRadius: 12,
            display: 'flex', flexDirection: 'column', alignItems: isCollapsed ? 'center' : 'stretch',
            gap: 12
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              padding: isCollapsed ? 0 : '4px 8px',
              background: isCollapsed ? 'transparent' : 'rgba(255,255,255,0.02)',
              borderRadius: 12,
              border: isCollapsed ? 'none' : '1px solid var(--border-color)'
            }}>
              <div style={{
                minWidth: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e1e3e, #0a0a1a)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--primary)',
                fontSize: 14, fontWeight: 700, border: '1px solid rgba(255,255,255,0.05)'
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              {!isCollapsed && (
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <p className="font-syne" style={{
                    color: "#fff", fontSize: 13, fontWeight: 600,
                    margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{user?.name}</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={onLogout}
                style={{
                  background: "transparent", border: "1px solid var(--border-muted)",
                  borderRadius: 8, color: "var(--text-dim)", cursor: "pointer",
                  fontSize: 11, padding: "8px", width: "100%", transition: "all 0.2s",
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-red)"; e.currentTarget.style.color = "var(--accent-red)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-muted)"; e.currentTarget.style.color = "var(--text-dim)"; }}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
