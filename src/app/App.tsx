import { useState, useEffect } from "react";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { AppShell } from "./components/AppShell";

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

  const handleSignIn = () => {
    setScreen("login");
  };

  const handleLogin = (role: "ca" | "business") => {
    sessionStorage.setItem("authenticated", "true");
    setScreen("dashboard");
  };

  if (screen === "landing") {
    return <Landing onSignIn={handleSignIn} />;
  }

  if (screen === "login") {
    return <Login onLogin={handleLogin} />;
  }

  return <AppShell />;
}

