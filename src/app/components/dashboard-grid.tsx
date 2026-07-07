import { ClientCard, type ClientCardProps } from "./client-card";
import { AddClientCard } from "./add-client-card";
import { SuccessFeeLedger } from "./success-fee-ledger";

const clients: ClientCardProps[] = [
  { name: "Suryodaya Textiles Pvt Ltd", industry: "Manufacturing · Surat", status: "3 schemes eligible", tone: "blue", progress: 72, initials: "ST", source: "existing" },
  { name: "Anand Agro Foods", industry: "Food processing · Nashik", status: "1 application in review", tone: "amber", progress: 45, initials: "AA", source: "matched" },
  { name: "Meridian Logistics LLP", industry: "Transport · Pune", status: "All filings up to date", tone: "emerald", progress: 96, initials: "ML", source: "existing" },
  { name: "Kavya Handlooms", industry: "Retail · Jaipur", status: "Docs pending", tone: "slate", progress: 28, initials: "KH", source: "matched" },
];

export function DashboardGrid() {
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-slate-100 text-2xl tracking-tight" style={{ fontWeight: 500 }}>Client overview</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor compliance status and scheme eligibility across your book.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Synced 2 min ago
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {clients.map((c) => (
          <ClientCard key={c.name} {...c} />
        ))}
        <AddClientCard />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SuccessFeeLedger />
        </div>
      </div>
    </div>
  );
}
