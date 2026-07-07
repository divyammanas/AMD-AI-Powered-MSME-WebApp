import { useState } from "react";
import { Zap, Mail, Lock } from "lucide-react";

export function Login({ onLogin }: { onLogin: (role: "ca" | "business") => void }) {
  const [role, setRole] = useState<"ca" | "business">("ca");
  const [email, setEmail] = useState("priya@nairca.in");
  const [password, setPassword] = useState("••••••••");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="dark min-h-screen flex flex-col items-center justify-center p-4 font-sans" style={{ background: "#050507", color: "#f1f5f9" }}>
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div
            style={{
              height: 48, width: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg,#8f9fed,#5a4386)",
              boxShadow: "0 0 24px rgba(143,159,237,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Zap style={{ width: 24, height: 24, color: "#fff" }} />
          </div>
          <div className="text-2xl font-bold tracking-tight">Welcome to SubsidyDesk</div>
          <p className="text-[#94a3b8] text-sm">Sign in to manage clients and schemes</p>
        </div>

        {/* Segmented Control for Role */}
        <div className="flex w-full p-1 mb-6 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            type="button"
            onClick={() => setRole("ca")}
            className="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
            style={{
              background: role === "ca" ? "rgba(143,159,237,0.15)" : "transparent",
              color: role === "ca" ? "#fff" : "#94a3b8",
              boxShadow: role === "ca" ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
              border: role === "ca" ? "1px solid rgba(143,159,237,0.25)" : "1px solid transparent",
            }}
          >
            I'm a CA
          </button>
          <button
            type="button"
            onClick={() => setRole("business")}
            className="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
            style={{
              background: role === "business" ? "rgba(143,159,237,0.15)" : "transparent",
              color: role === "business" ? "#fff" : "#94a3b8",
              boxShadow: role === "business" ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
              border: role === "business" ? "1px solid rgba(143,159,237,0.25)" : "1px solid transparent",
            }}
          >
            I run a business
          </button>
        </div>

        {/* Standard SaaS Login Card */}
        <form onSubmit={handleSignIn} className="w-full p-8 rounded-[20px] shadow-2xl flex flex-col gap-5" style={{ background: "#090b0f", border: "1px solid rgba(255,255,255,0.07)" }}>
          
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#e2e8f0]">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f1f5f9"
                }}
                onFocus={e => {
                  e.target.style.borderColor = "rgba(143,159,237,0.5)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(143,159,237,0.12)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="name@company.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#e2e8f0]">Password</label>
              <a href="#" className="text-xs font-medium transition-colors hover:text-[#bfcbff]" style={{ color: "#8f9fed" }}>Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f1f5f9"
                }}
                onFocus={e => {
                  e.target.style.borderColor = "rgba(143,159,237,0.5)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(143,159,237,0.12)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg,#8f9fed,#5a4386)",
              boxShadow: "0 4px 14px rgba(143,159,237,0.25)",
            }}
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-sm text-[#94a3b8]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => onLogin(role)}
            className="font-medium hover:underline cursor-pointer border-none bg-transparent p-0 inline-block font-sans"
            style={{ color: "#8f9fed", fontSize: "inherit" }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
