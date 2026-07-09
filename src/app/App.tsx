import { useState, useEffect } from "react";
import { LandingClient } from "./pages/landing-client";
import { Login } from "./pages/login";
import { AppShell } from "./components/AppShell";
import BusinessApp from "../../client side website /src/app/App";

export default function App() {
  const [screen, setScreen] = useState<"landing" | "login" | "dashboard">(() => {
    const path = window.location.pathname;
    if (path === "/dashboard") {
      const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
      return isAuthenticated ? "dashboard" : "landing";
    }
    if (path === "/login") {
      return "login";
    }
    return "landing";
  });

  const [pendingRole, setPendingRole] = useState<"ca" | "business">("ca");

  useEffect(() => {
    if (screen === "landing") {
      if (window.location.pathname !== "/") {
        window.history.replaceState({}, "", "/");
      }
    } else if (screen === "login") {
      if (window.location.pathname !== "/login") {
        window.history.pushState({}, "", "/login");
      }
    } else if (screen === "dashboard") {
      if (window.location.pathname !== "/dashboard") {
        window.history.pushState({}, "", "/dashboard");
      }
    }
  }, [screen]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/dashboard") {
        const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
        setScreen(isAuthenticated ? "dashboard" : "landing");
      } else if (path === "/login") {
        setScreen("login");
      } else {
        setScreen("landing");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSignIn = (role: "ca" | "business") => {
    setPendingRole(role);
    setScreen("login");
  };

  const handleLogin = (role: "ca" | "business") => {
    sessionStorage.setItem("authenticated", "true");
    sessionStorage.setItem("role", role);
    setScreen("dashboard");
  };

  if (screen === "landing") {
    return <LandingClient onSignIn={handleSignIn} />;
  }

  if (screen === "login") {
    return <Login initialRole={pendingRole} onLogin={handleLogin} />;
  }

  if (screen === "dashboard") {
    const role = sessionStorage.getItem("role") || "ca";
    if (role === "business") {
      return <BusinessApp />;
    }
    return <AppShell />;
  }

  return null;
}
