import type { ReactNode } from "react";
import { cn } from "./ui/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  as?: "div" | "article" | "section" | "li";
}

export function GlowCard({ children, className, glow = false, onClick, as: Tag = "div" }: GlowCardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "rounded-2xl border transition-all duration-200",
        "bg-white/[0.03] backdrop-blur-md border-white/[0.08]",
        "hover:border-white/[0.14] hover:bg-white/[0.05]",
        glow && "shadow-lg shadow-[#40538f]/20",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function GlowCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("px-5 py-4 border-b border-white/[0.07]", className)}>
      {children}
    </div>
  );
}

export function GlowCardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-5", className)}>
      {children}
    </div>
  );
}

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("bg-gradient-to-r from-[#bfcbff] via-[#f1c0d9] to-[#9ee7b0] bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}

export function PinkBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-pink-500/25 bg-pink-500/15 px-2.5 py-0.5 text-xs text-pink-300", className)}
      style={{ fontWeight: 500 }}>
      {children}
    </span>
  );
}

export function PrimaryButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white transition-all duration-200",
        "border border-white/15 bg-black",
        "hover:border-[#bfcbff]/50 hover:bg-zinc-950",
        "shadow-lg shadow-[#40538f]/25 hover:shadow-[#5a4386]/25",
        className,
      )}
      style={{ fontWeight: 500 }}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm text-slate-300",
        "hover:bg-white/8 hover:border-white/25 hover:text-white transition-all duration-200",
        className,
      )}
    >
      {children}
    </button>
  );
}
