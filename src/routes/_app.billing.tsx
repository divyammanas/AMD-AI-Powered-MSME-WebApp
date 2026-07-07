import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Stat, StatusPill } from "@/components/ui-bits";
import { invoices, inr, getClient } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/billing")({
  head: () => ({ meta: [{ title: "Success Fee · SubsidyDesk" }] }),
  component: Billing,
});

function Billing() {
  const total = invoices.reduce((s, i) => s + i.fee, 0);
  const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.fee, 0);

  return (
    <>
      <PageHeader title="Success fee ledger" subtitle="Invoiced only after confirmed disbursement." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Stat label="Total earned" value={inr(total)} />
        <Stat label="Collected" value={inr(paid)} />
        <Stat label="Outstanding" value={inr(total - paid)} />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-muted-foreground">
            <tr className="text-left">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Disbursed</th>
              <th className="px-5 py-3 font-medium text-right">Fee %</th>
              <th className="px-5 py-3 font-medium text-right">Fee</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((inv) => {
              const c = getClient(inv.clientId)!;
              return (
                <tr key={inv.id}>
                  <td className="px-5 py-4 font-mono text-xs">{inv.id.toUpperCase()}</td>
                  <td className="px-5 py-4">{c.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{inv.date}</td>
                  <td className="px-5 py-4 text-right">{inr(inv.disbursed)}</td>
                  <td className="px-5 py-4 text-right">{inv.feePct}%</td>
                  <td className="px-5 py-4 text-right font-semibold">{inr(inv.fee)}</td>
                  <td className="px-5 py-4"><StatusPill status={inv.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}