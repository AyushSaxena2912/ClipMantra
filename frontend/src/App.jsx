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
      <Toasts toasts={toasts} />

      {!user
        ? <AuthPage onLogin={handleLogin} toast={toast} />
        : <Dashboard user={user} onLogout={handleLogout} toast={toast} />
      }
    </>
  );
}
