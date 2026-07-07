import { Plus } from "lucide-react";

export function AddClientCard() {
  return (
    <button className="group rounded-xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-900/20 hover:bg-blue-500/5 p-5 flex flex-col items-center justify-center text-center transition min-h-[188px]">
      <div className="h-10 w-10 rounded-full bg-slate-800/80 group-hover:bg-blue-500/20 flex items-center justify-center text-slate-400 group-hover:text-blue-300 transition mb-3">
        <Plus className="h-5 w-5" />
      </div>
      <div className="text-slate-200" style={{ fontWeight: 500 }}>Add New Client</div>
      <div className="text-xs text-slate-500 mt-1">Onboard an MSME to your workspace</div>
    </button>
  );
}
