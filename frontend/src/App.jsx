import { useState, lazy, Suspense } from "react";
import { getUser, removeToken, removeUser } from "./api";
import { useToast } from "./hooks/useToast";
import Toasts from "./components/Toast";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const LandingPage = lazy(() => import("./pages/LandingPage"));

function PageLoader() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#121216", color: "#cbd5e1", fontFamily: "Plus Jakarta Sans, sans-serif",
    }}>
      Loading ClipMantra...
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => getUser());
  const [page, setPage] = useState(() => (getUser() ? "dashboard" : "landing"));
  const { toasts, add: toast } = useToast();

  const handleLogin = (u) => { setUser(u); setPage("dashboard"); };
  const handleLogout = () => {
    removeToken(); removeUser(); setUser(null); setPage("landing"); toast("Signed out.", "info");
  };

  return (
    <>
      <Toasts toasts={toasts} />
      {page === "landing" && (
        <Suspense fallback={<PageLoader />}>
          <LandingPage onGetStarted={() => setPage("auth")} onLogin={() => setPage("auth")} />
        </Suspense>
      )}
      {page === "auth" && (
        <AuthPage onLogin={handleLogin} toast={toast} onBack={() => setPage("landing")} />
      )}
      {page === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} toast={toast} />
      )}
    </>
  );
}
