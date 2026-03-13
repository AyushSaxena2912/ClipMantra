import { useState, useEffect } from "react";
import { getUser, removeToken, removeUser } from "./api";
import { useToast } from "./hooks/useToast";
import Toasts from "./components/Toast";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("auth"); // "auth" | "dashboard"
  const [booted, setBooted] = useState(false);
  const { toasts, add: toast } = useToast();

  useEffect(() => {
    const u = getUser();
    if (u) {
      setUser(u);
      setPage("dashboard");
    }
    setBooted(true);
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setPage("dashboard");
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    setPage("auth");
    toast("Signed out.", "info");
  };

  if (!booted) return null;

  return (
    <>
      <Toasts toasts={toasts} />

      {page === "auth" && (
        <AuthPage onLogin={handleLogin} toast={toast} />
      )}
      {page === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} toast={toast} />
      )}
    </>
  );
}
