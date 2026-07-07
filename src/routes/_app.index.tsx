import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Stat, ConfidenceBadge, StatusPill } from "@/components/ui-bits";
import { clients, matches, invoices, inr, getClient } from "@/lib/mock-data";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Overview · SubsidyDesk" },
      { name: "description", content: "Firm-wide view of MSME subsidy matches, applications and recovered value." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const totalPotential = matches.reduce((s, m) => s + (m.status !== "rejected" ? m.benefit : 0), 0);
  const disbursed = matches.filter((m) => m.status === "disbursed").reduce((s, m) => s + m.benefit, 0);
  const pending = matches.filter((m) => m.status === "suggested");

  return (
    <>
      <PageHeader
        title="Good morning, Priya"
        subtitle="5 clients · 11 active matches · ₹68k in fees pending collection"
        action={
          <Link
            to="/clients"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform animate-glow-pulse"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="h-4 w-4 animate-float-slow" /> Run eligibility sweep
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Clients under management" value="5" hint="+1 this month" />
        <Stat label="Potential recovery" value={inr(totalPotential)} hint="Across 11 matches" />
        <Stat label="Disbursed to date" value={inr(disbursed)} hint="1 client, 1 scheme" />
        <Stat label="Success fee earned" value="₹1,24,000" hint="₹68k pending" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h2 className="font-semibold">Highest-value matches awaiting review</h2>
              <p className="text-xs text-muted-foreground">Sorted by estimated benefit · your first 10 seconds</p>
            </div>
            <Link to="/matches" className="text-xs text-primary inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {pending
              .slice()
              .sort((a, b) => b.benefit - a.benefit)
              .slice(0, 5)
              .map((m) => {
                const c = getClient(m.clientId)!;
                return (
                  <li key={m.id} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium truncate">{m.scheme}</span>
                        <ConfidenceBadge level={m.confidence} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        {c.name} · {m.reason}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{inr(m.benefit)}</div>
                      <div className="text-[11px] text-muted-foreground">est. benefit</div>
                    </div>
                    <Link
                      to="/clients/$id" params={{ id: c.id }}
                      className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-accent"
                    >
                      Review
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold">Recent disbursements & billing</h2>
            <p className="text-xs text-muted-foreground">Success fee = confirmed money recovered</p>
          </div>
          <ul className="divide-y divide-border">
            {invoices.map((inv) => {
              const c = getClient(inv.clientId)!;
              return (
                <li key={inv.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground">Disbursed {inr(inv.disbursed)} · {inv.feePct}% fee</div>
                    </div>
                    <StatusPill status={inv.status} />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-lg font-semibold">{inr(inv.fee)}</div>
                    <TrendingUp className="h-4 w-4 text-[color:var(--success)]" />
                  </div>
                </li>
              );
            })}
          </ul>
          <Link to="/billing" className="block px-5 py-3 text-xs text-primary border-t border-border hover:bg-muted/40">
            Open ledger →
          </Link>
        </section>
      </div>
    </>
  );
}