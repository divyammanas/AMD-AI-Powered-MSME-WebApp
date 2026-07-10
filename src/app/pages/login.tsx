import { useState } from "react";
import { Zap, Mail, Lock } from "lucide-react";

export function Login({ initialRole = "ca", onLogin, onSignUp }: { initialRole?: "ca" | "business", onLogin: (role: "ca" | "business") => void, onSignUp: () => void }) {
  const [role, setRole] = useState<"ca" | "business">(initialRole);
  const [email, setEmail] = useState("priya@nairca.in");
  const [password, setPassword] = useState("••••••••");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="dark min-h-screen flex flex-col items-center justify-center p-4 font-sans selection:bg-white/20" style={{ background: "#080808", color: "#ffffff" }}>
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div
            style={{
              height: 48, width: 48,
              borderRadius: 14,
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <img src="/logo.jpg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="text-2xl font-bold tracking-tight">
            Welcome to Subsidy<span style={{ color: "#888888" }}>Setu</span>
          </div>
          <p className="text-sm" style={{ color: "#888888" }}>Sign in to manage clients and schemes</p>
        </div>

        {/* Segmented Control for Role */}
        <div className="flex w-full p-1 mb-6 rounded-xl" style={{ background: "#111111", border: "1px solid #222222" }}>
          <button
            type="button"
            onClick={() => setRole("ca")}
            className="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
            style={{
              background: role === "ca" ? "#222222" : "transparent",
              color: role === "ca" ? "#ffffff" : "#888888",
            }}
          >
            I'm a CA
          </button>
          <button
            type="button"
            onClick={() => setRole("business")}
            className="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
            style={{
              background: role === "business" ? "#222222" : "transparent",
              color: role === "business" ? "#ffffff" : "#888888",
            }}
          >
            I run a business
          </button>
        </div>

        {/* Standard SaaS Login Card */}
        <form onSubmit={handleSignIn} className="w-full p-8 rounded-[20px] shadow-2xl flex flex-col gap-5" style={{ background: "#0d0d0d", border: "1px solid #222222" }}>
          
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: "#ffffff" }}>Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#888888" }} />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
                style={{
                  background: "#050505",
                  border: "1px solid #222222",
                  color: "#ffffff"
                }}
                onFocus={e => {
                  e.target.style.borderColor = "#ffffff";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#222222";
                }}
                placeholder="name@company.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: "#ffffff" }}>Password</label>
              <a href="#" className="text-xs font-medium transition-colors hover:text-white" style={{ color: "#888888" }}>Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#888888" }} />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
                style={{
                  background: "#050505",
                  border: "1px solid #222222",
                  color: "#ffffff"
                }}
                onFocus={e => {
                  e.target.style.borderColor = "#ffffff";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#222222";
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-gray-200 active:scale-[0.98]"
            style={{
              background: "#ffffff",
              color: "#000000"
            }}
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-sm" style={{ color: "#888888" }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSignUp}
            className="font-medium hover:underline cursor-pointer border-none bg-transparent p-0 inline-block font-sans hover:text-white"
            style={{ color: "#ffffff", fontSize: "inherit" }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
