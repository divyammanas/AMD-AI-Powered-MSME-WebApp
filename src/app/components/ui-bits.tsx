import type { ReactNode } from "react";
import { CheckCircle2, AlertCircle, HelpCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "./ui/utils";
import { GradientText } from "./glow-card";

export function PageHeader({
  title, subtitle, action, eyebrow,
}: { title: string; subtitle?: string; action?: ReactNode; eyebrow?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs mb-3"
            style={{
              background: "rgba(143,159,237,0.12)",
              border: "1px solid rgba(143,159,237,0.2)",
              color: "#bfcbff",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        )}
        <h1
          className="text-2xl text-white"
          style={{ fontWeight: 700, letterSpacing: "-0.025em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-1.5" style={{ color: "#64748b" }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function ConfidenceBadge({ level }: { level: "high" | "medium" | "review" }) {
  const cfg = {
    high: {
      label: "High confidence",
      Icon: CheckCircle2,
      style: { background: "rgba(36,95,45,0.42)", border: "1px solid rgba(87,171,104,0.32)", color: "#9ee7b0" },
    },
    medium: {
      label: "Medium confidence",
      Icon: HelpCircle,
      style: { background: "rgba(143,63,53,0.34)", border: "1px solid rgba(238,143,126,0.30)", color: "#ffc0b4" },
    },
    review: {
      label: "Needs review",
      Icon: AlertCircle,
      style: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b" },
    },
  }[level];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px]"
      style={{ fontWeight: 500, ...cfg.style }}
    >
      <cfg.Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const styles: Record<string, { background: string; color: string; border: string }> = {
    suggested:    { background: "rgba(255,255,255,0.06)", color: "#64748b", border: "rgba(255,255,255,0.1)" },
    approved:     { background: "rgba(143,159,237,0.12)", color: "#bfcbff", border: "rgba(143,159,237,0.25)" },
    rejected:     { background: "rgba(164,71,63,0.12)",  color: "#ffc0b4", border: "rgba(164,71,63,0.25)" },
    drafted:      { background: "rgba(90,67,134,0.34)", color: "#d2c2ff", border: "rgba(166,143,225,0.30)" },
    submitted:    { background: "rgba(143,63,53,0.34)", color: "#ffc0b4", border: "rgba(238,143,126,0.30)" },
    disbursed:    { background: "rgba(36,95,45,0.42)", color: "#9ee7b0", border: "rgba(87,171,104,0.32)" },
    onboarded:    { background: "rgba(255,255,255,0.06)", color: "#64748b", border: "rgba(255,255,255,0.1)" },
    matched:      { background: "rgba(143,159,237,0.12)", color: "#bfcbff", border: "rgba(143,159,237,0.25)" },
    "in-progress":{ background: "rgba(6,182,212,0.12)",  color: "#c8d6ff", border: "rgba(6,182,212,0.25)" },
    paid:         { background: "rgba(36,95,45,0.42)", color: "#9ee7b0", border: "rgba(87,171,104,0.32)" },
    sent:         { background: "rgba(143,159,237,0.12)", color: "#bfcbff", border: "rgba(143,159,237,0.25)" },
    pending:      { background: "rgba(255,255,255,0.06)", color: "#64748b", border: "rgba(255,255,255,0.1)" },
    success:      { background: "rgba(36,95,45,0.42)", color: "#9ee7b0", border: "rgba(87,171,104,0.32)" },
    review:       { background: "rgba(143,63,53,0.34)", color: "#ffc0b4", border: "rgba(238,143,126,0.30)" },
  };

  const s = styles[status] ?? styles.suggested;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] capitalize"
      style={{ fontWeight: 500, background: s.background, color: s.color, border: `1px solid ${s.border}` }}
    >
      <Clock className="h-2.5 w-2.5 opacity-70" />
      {status.replace("-", " ")}
    </span>
  );
}

export function Stat({
  label, value, hint, trend,
}: { label: string; value: string; hint?: string; trend?: "up" | "down" }) {
  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.13)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(143,159,237,0.12)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* subtle top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(143,159,237,0.4), transparent)" }}
      />
      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#94a3b8", fontWeight: 600 }}>
        {label}
      </div>
      <div className="text-3xl mb-1 text-white" style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
        {value}
      </div>
      {(hint || trend) && (
        <div className="flex items-center gap-1.5 mt-2">
          {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-400" />}
          {trend === "down" && <TrendingDown className="h-3 w-3 text-red-400" />}
          {hint && <span className="text-xs" style={{ color: "#475569" }}>{hint}</span>}
        </div>
      )}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div
      className="rounded-2xl p-10 text-center"
      style={{ border: "1px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}
    >
      <div className="text-sm text-slate-300" style={{ fontWeight: 500 }}>{title}</div>
      {hint && <div className="text-xs text-slate-600 mt-1">{hint}</div>}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] mb-3")}
      style={{
        background: "rgba(143,159,237,0.12)",
        border: "1px solid rgba(143,159,237,0.2)",
        color: "#bfcbff",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
