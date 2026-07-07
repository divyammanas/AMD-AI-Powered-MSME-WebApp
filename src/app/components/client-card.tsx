import { MoreHorizontal } from "lucide-react";

export type ClientSource = "existing" | "matched";

export type ClientCardProps = {
  name: string;
  industry: string;
  status: string;
  tone: "blue" | "amber" | "emerald" | "slate";
  progress: number;
  initials: string;
  source: ClientSource;
};

const toneMap: Record<ClientCardProps["tone"], { badge: string; dot: string; bar: string }> = {
  blue: { badge: "bg-blue-500/10 text-blue-300 ring-blue-500/20", dot: "bg-blue-400", bar: "bg-blue-500" },
  amber: { badge: "bg-amber-500/10 text-amber-300 ring-amber-500/20", dot: "bg-amber-400", bar: "bg-amber-500" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20", dot: "bg-emerald-400", bar: "bg-emerald-500" },
  slate: { badge: "bg-slate-500/10 text-slate-300 ring-slate-500/20", dot: "bg-slate-400", bar: "bg-slate-400" },
};

const sourceMap: Record<ClientSource, { label: string; className: string }> = {
  existing: { label: "Existing Client", className: "bg-slate-800/80 text-slate-400 ring-slate-700" },
  matched: { label: "Platform Matched", className: "bg-indigo-500/10 text-indigo-300 ring-indigo-500/20" },
};

export function ClientCard({ name, industry, status, tone, progress, initials, source }: ClientCardProps) {
  const t = toneMap[tone];
  const s = sourceMap[source];
  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm shadow-black/20 hover:border-slate-700 hover:bg-slate-900/80 transition cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 ring-1 ring-slate-700 flex items-center justify-center text-slate-200 text-sm shrink-0" style={{ fontWeight: 500 }}>
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-slate-100 truncate" style={{ fontWeight: 500 }}>{name}</div>
            <div className="text-xs text-slate-500 truncate">{industry}</div>
          </div>
        </div>
        <button className="h-7 w-7 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 ring-inset text-xs ${t.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
          {status}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[11px] ring-1 ring-inset ${s.className}`}>
          {s.label}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">Compliance progress</span>
          <span className="text-xs text-slate-300 tabular-nums">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className={`h-full ${t.bar} rounded-full transition-all`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
