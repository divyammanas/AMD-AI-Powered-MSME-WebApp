import { IndianRupee, ArrowUpRight } from "lucide-react";

const rows = [
  { client: "Suryodaya Textiles", scheme: "PMEGP Subsidy", disbursed: 850000, fee: 42500, date: "Jul 2" },
  { client: "Meridian Logistics", scheme: "Credit Guarantee", disbursed: 1200000, fee: 60000, date: "Jun 27" },
  { client: "Anand Agro Foods", scheme: "MSME Champions", disbursed: 450000, fee: 22500, date: "Jun 18" },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export function SuccessFeeLedger() {
  const owed = rows.reduce((a, r) => a + r.fee, 0);
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-slate-100" style={{ fontWeight: 500 }}>Success Fee Ledger</div>
          <div className="text-xs text-slate-500 mt-0.5">Recent disbursements and platform fee</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Owed to platform</div>
          <div className="text-slate-100 tabular-nums flex items-center gap-0.5 justify-end" style={{ fontWeight: 500 }}>
            <IndianRupee className="h-3.5 w-3.5" />
            {owed.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-800/80">
        {rows.map((r) => (
          <div key={r.client} className="flex items-center justify-between py-2.5 text-sm">
            <div className="min-w-0">
              <div className="text-slate-200 truncate">{r.client}</div>
              <div className="text-xs text-slate-500 truncate">{r.scheme} · {r.date}</div>
            </div>
            <div className="text-right shrink-0 pl-4">
              <div className="text-slate-200 tabular-nums">{fmt(r.disbursed)}</div>
              <div className="text-xs text-emerald-400 tabular-nums">+{fmt(r.fee)} fee</div>
            </div>
          </div>
        ))}
      </div>

      <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 transition">
        View full ledger <ArrowUpRight className="h-3 w-3" />
      </a>
    </div>
  );
}
