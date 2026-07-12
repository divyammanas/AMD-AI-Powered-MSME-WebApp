import { useState, useEffect } from "react";
import { LandingClient } from "./pages/landing-client";
import { Login } from "./pages/login";
import { AppShell } from "./components/AppShell";
import Signup from "./pages/signup";
import BusinessApp from "../../client side website /src/app/App";

export default function App() {
  const [screen, setScreen] = useState<"landing" | "login" | "dashboard" | "signup">(() => {
    const path = window.location.pathname;
    if (path === "/dashboard") {
      const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
      return isAuthenticated ? "dashboard" : "landing";
    }
    if (path === "/login") {
      return "login";
    }
    if (path === "/signup") {
      return "signup";
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
    } else if (screen === "signup") {
      if (window.location.pathname !== "/signup") {
        window.history.pushState({}, "", "/signup");
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
      } else if (path === "/signup") {
        setScreen("signup");
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

  const handleSignUp = (role: "ca" | "business") => {
    setPendingRole(role);
    setScreen("signup");
  };

  const handleLogin = (role: "ca" | "business") => {
    sessionStorage.setItem("authenticated", "true");
    sessionStorage.setItem("role", role);
    setScreen("dashboard");
  };

  if (screen === "landing") {
    return <LandingClient onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  if (screen === "login") {
    return <Login initialRole={pendingRole} onLogin={handleLogin} onSignUp={() => setScreen("signup")} />;
  }

  if (screen === "signup") {
    return <Signup onBack={() => setScreen("login")} onComplete={(role) => handleLogin(role)} />;
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
