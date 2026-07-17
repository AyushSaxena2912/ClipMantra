import { useState, useEffect, lazy, Suspense } from "react";
import { getUser, removeToken, removeUser } from "./api";
import { useToast } from "./hooks/useToast";
import Toasts from "./components/Toast";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import { parseLocation, pathForApp, navigate } from "./nav";

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

function resolveAppPage(user) {
  const loc = parseLocation();
  if (loc.app === "dashboard") return user ? "dashboard" : "auth";
  if (loc.app === "auth") return "auth";
  return "landing";
}

export default function App() {
  const [user, setUser] = useState(() => getUser());
  const [page, setPageState] = useState(() => resolveAppPage(getUser()));
  const { toasts, add: toast } = useToast();

  const setPage = (next, { replace = false } = {}) => {
    setPageState(next);
    if (next === "dashboard") {
      // Keep deep dashboard paths (e.g. /app/settings); only enter /app if outside it.
      if (!window.location.pathname.startsWith("/app")) {
        navigate("/app", { replace });
      }
      return;
    }
    navigate(pathForApp(next), { replace });
  };

  useEffect(() => {
    const onPop = () => {
      const u = getUser();
      const next = resolveAppPage(u);
      setUser(u);
      setPageState(next);
      if (parseLocation().app === "dashboard" && !u) {
        navigate("/auth", { replace: true });
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Normalize URL when a logged-out user hits /app/*
  useEffect(() => {
    if (page === "auth" && parseLocation().app === "dashboard" && !user) {
      navigate("/auth", { replace: true });
    }
  }, [page, user]);

  const handleLogin = (u) => {
    setUser(u);
    setPageState("dashboard");
    navigate("/app", { replace: true });
  };
  const handleLogout = () => {
    removeToken(); removeUser(); setUser(null); setPageState("landing");
    navigate("/", { replace: true });
    toast("Signed out.", "info");
  };
  const goLanding = () => setPage("landing");
  const goDashboard = () => setPage("dashboard");
  const goAuth = () => setPage("auth");

  return (
    <>
      <Toasts toasts={toasts} />
      {page === "landing" && (
        <Suspense fallback={<PageLoader />}>
          <LandingPage
            isLoggedIn={!!user}
            user={user}
            onGetStarted={user ? goDashboard : goAuth}
            onLogin={user ? goDashboard : goAuth}
            onLogout={handleLogout}
          />
        </Suspense>
      )}
      {page === "auth" && (
        <AuthPage onLogin={handleLogin} toast={toast} onBack={goLanding} />
      )}
      {page === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} toast={toast} onGoHome={goLanding} />
      )}
    </>
  );
}
