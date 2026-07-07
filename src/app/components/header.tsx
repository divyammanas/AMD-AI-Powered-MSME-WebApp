import { Bell, Search, Layers } from "lucide-react";
import { ViewSwitcher, type View } from "./view-switcher";

export function Header({ view, onViewChange }: { view: View; onViewChange: (v: View) => void }) {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur flex items-center px-6 gap-6 shrink-0">
      <div className="flex items-center gap-2 w-56">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
          <Layers className="h-4 w-4 text-white" />
        </div>
        <span className="text-slate-100 tracking-tight" style={{ fontWeight: 500 }}>Ledgerly</span>
      </div>

      <div className="flex-1 flex justify-center items-center gap-3">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search clients, schemes, applications…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-900/80 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition"
          />
        </div>
        <ViewSwitcher value={view} onChange={onViewChange} />
      </div>

      <div className="flex items-center gap-3 w-56 justify-end">
        <button className="relative h-9 w-9 rounded-lg hover:bg-slate-800/70 flex items-center justify-center text-slate-400 hover:text-slate-200 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-slate-200 text-sm ring-1 ring-slate-700">
          RA
        </div>
      </div>
    </header>
  );
}
