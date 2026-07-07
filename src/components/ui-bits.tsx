import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { CheckCircle2, AlertCircle, HelpCircle, Clock } from "lucide-react";

export function PageHeader({
  title, subtitle, action,
}: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function ConfidenceBadge({ level }: { level: "high" | "medium" | "review" }) {
  const cfg = {
    high:   { label: "High confidence",   Icon: CheckCircle2, cls: "bg-[color:var(--success)]/12 text-[color:var(--success)] border-[color:var(--success)]/30" },
    medium: { label: "Medium confidence", Icon: HelpCircle,   cls: "bg-[color:var(--warning)]/15 text-[color:oklch(0.45_0.14_75)] border-[color:var(--warning)]/40" },
    review: { label: "Needs review",      Icon: AlertCircle,  cls: "bg-muted text-muted-foreground border-border" },
  }[level];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium", cfg.cls)}>
      <cfg.Icon className="h-3 w-3" />{cfg.label}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    suggested: "bg-muted text-muted-foreground",
    approved: "bg-primary/10 text-primary",
    rejected: "bg-destructive/10 text-destructive",
    drafted: "bg-accent text-accent-foreground",
    submitted: "bg-[color:var(--warning)]/15 text-[color:oklch(0.45_0.14_75)]",
    disbursed: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
    onboarded: "bg-muted text-muted-foreground",
    matched: "bg-primary/10 text-primary",
    "in-progress": "bg-accent text-accent-foreground",
    paid: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
    sent: "bg-primary/10 text-primary",
    pending: "bg-muted text-muted-foreground",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize", map[status] ?? "bg-muted text-muted-foreground")}>
      <Clock className="h-2.5 w-2.5 opacity-60" />{status.replace("-", " ")}
    </span>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] card-hover animate-card-in relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 255 / 0.15), transparent 60%)" }} />
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center bg-muted/30">
      <div className="text-sm font-medium">{title}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}