import { LayoutDashboard, Users, FileStack, ClipboardList, BarChart3, Settings, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Clients", icon: Users },
  { label: "Schemes", icon: FileStack },
  { label: "Applications", icon: ClipboardList },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-800/80 bg-slate-950/40 px-3 py-6 flex flex-col">
      <nav className="flex flex-col gap-1">
        {items.map(({ label, icon: Icon, active }) => (
          <a
            key={label}
            href="#"
            className={
              "group flex items-center gap-3 h-9 px-3 rounded-lg text-sm transition " +
              (active
                ? "bg-blue-600/15 text-blue-200 ring-1 ring-inset ring-blue-500/20"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60")
            }
          >
            <Icon className="h-4 w-4" />
            <span style={{ fontWeight: active ? 500 : 400 }}>{label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Workspace</div>
        <div className="text-sm text-slate-200" style={{ fontWeight: 500 }}>Mehta & Associates</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 ring-1 ring-inset ring-blue-500/20 text-[11px]">
            <Sparkles className="h-3 w-3" />
            Growth Plan
          </span>
        </div>
        <a href="#" className="mt-2 inline-block text-[11px] text-slate-400 hover:text-blue-300 transition">Manage plan →</a>
      </div>
    </aside>
  );
}
