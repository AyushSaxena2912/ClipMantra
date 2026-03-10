import { useState, useEffect } from "react";
import { getUser, removeToken, removeUser } from "./api";
import { useToast } from "./hooks/useToast";
import Toasts from "./components/Toast";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);
  const { toasts, add: toast } = useToast();

  useEffect(() => {
    const u = getUser();
    if (u) setUser(u);
    setBooted(true);
  }, []);

  const handleLogin = (u) => setUser(u);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    toast("Signed out.", "info");
  };

  if (!booted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050508; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d14; }
        ::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 4px; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        input[type=range] { -webkit-appearance:none; height:4px; background:#1e1e2e; border-radius:4px; outline:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; background:#00e599; border-radius:50%; cursor:pointer; box-shadow:0 0 8px rgba(0,229,153,0.4); }
      `}</style>

      <Toasts toasts={toasts} />

      {!user
        ? <AuthPage onLogin={handleLogin} toast={toast} />
        : <Dashboard user={user} onLogout={handleLogout} toast={toast} />
      }
    </>
  );
}
