import { PageHeader, Stat, StatusPill } from "../components/ui-bits";
import { GlowCard, GradientText } from "../components/glow-card";
import { invoices, inr, getClient } from "../lib/mock-data";

export function Billing() {
  const total = invoices.reduce((s, i) => s + i.fee, 0);
  const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.fee, 0);

  return (
    <>
      <PageHeader
        eyebrow="Success fee"
        title="Fee ledger"
        subtitle="Invoiced only after confirmed disbursement — never on a promise."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        <Stat label="Total earned" value={inr(total)} trend="up" />
        <Stat label="Collected" value={inr(paid)} />
        <Stat label="Outstanding" value={inr(total - paid)} />
      </div>

      <GlowCard>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {["Invoice", "Client", "Date", "Disbursed", "Fee %", "Fee", "Status"].map((h, i) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-[11px] uppercase tracking-widest ${i >= 3 ? "text-right" : "text-left"}`}
                  style={{ color: "#334155", fontWeight: 600 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const c = getClient(inv.clientId)!;
              return (
                <tr
                  key={inv.id}
                  className="transition"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <td className="px-5 py-4 font-mono text-xs" style={{ color: "#64748b" }}>{inv.id.toUpperCase()}</td>
                  <td className="px-5 py-4 text-slate-200">{c.name}</td>
                  <td className="px-5 py-4" style={{ color: "#64748b" }}>{inv.date}</td>
                  <td className="px-5 py-4 text-right text-slate-300">{inr(inv.disbursed)}</td>
                  <td className="px-5 py-4 text-right" style={{ color: "#64748b" }}>{inv.feePct}%</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-white" style={{ fontWeight: 700 }}>{inr(inv.fee)}</span>
                  </td>
                  <td className="px-5 py-4"><StatusPill status={inv.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GlowCard>
    </>
  );
}
