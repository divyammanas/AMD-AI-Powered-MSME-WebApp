import { PageHeader, Stat, ConfidenceBadge, StatusPill } from "../components/ui-bits";
import { GlowCard, GlowCardHeader, GlowCardBody, GradientText, PrimaryButton, GhostButton } from "../components/glow-card";
import { matches, invoices, inr, getClient } from "../lib/mock-data";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { useNav } from "../lib/nav";

export function Overview() {
  const { go } = useNav();
  const totalPotential = matches.reduce((s, m) => s + (m.status !== "rejected" ? m.benefit : 0), 0);
  const disbursed = matches.filter((m) => m.status === "disbursed").reduce((s, m) => s + m.benefit, 0);
  const pending = matches.filter((m) => m.status === "suggested");

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Good morning, Priya ✦"
        subtitle="5 clients · 11 active matches · ₹68k in fees pending collection"
        action={
          <PrimaryButton onClick={() => go({ name: "clients" })}>
            <Sparkles className="h-4 w-4" /> Run eligibility sweep
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <Stat label="Clients under management" value="5" hint="+1 this month" trend="up" />
        <Stat label="Potential recovery" value={inr(totalPotential)} hint="Across 11 matches" trend="up" />
        <Stat label="Disbursed to date" value={inr(disbursed)} hint="1 client, 1 scheme" />
        <Stat label="Success fee earned" value="₹1,24,000" hint="₹68k pending" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Matches panel */}
        <GlowCard className="lg:col-span-2">
          <GlowCardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white" style={{ fontWeight: 600 }}>Highest-value matches awaiting review</div>
                <div className="text-xs mt-0.5" style={{ color: "#475569" }}>Sorted by estimated benefit · your first 10 seconds</div>
              </div>
              <GhostButton onClick={() => go({ name: "matches" })}>
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </GhostButton>
            </div>
          </GlowCardHeader>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {pending.slice().sort((a, b) => b.benefit - a.benefit).slice(0, 5).map((m) => {
              const c = getClient(m.clientId)!;
              return (
                <div
                  key={m.id}
                  className="px-5 py-3.5 flex items-center gap-4 transition-all duration-150"
                  style={{ borderLeft: "2px solid transparent" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderLeftColor = "#8f9fed"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent"}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-100 text-sm truncate" style={{ fontWeight: 500 }}>{m.scheme}</span>
                      <ConfidenceBadge level={m.confidence} />
                    </div>
                    <div className="text-xs mt-1 truncate" style={{ color: "#475569" }}>{c.name} · {m.reason}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div style={{ fontWeight: 700 }}>
                      <span className="text-white" style={{ fontWeight: 700 }}>{inr(m.benefit)}</span>
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: "#334155" }}>est. benefit</div>
                  </div>
                  <GhostButton onClick={() => go({ name: "client-detail", id: c.id })}>
                    Review
                  </GhostButton>
                </div>
              );
            })}
          </div>
        </GlowCard>

        {/* Billing panel */}
        <GlowCard>
          <GlowCardHeader>
            <div className="text-white" style={{ fontWeight: 600 }}>Recent disbursements</div>
            <div className="text-xs mt-0.5" style={{ color: "#475569" }}>Success fee = confirmed money recovered</div>
          </GlowCardHeader>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {invoices.map((inv) => {
              const c = getClient(inv.clientId)!;
              return (
                <div key={inv.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 truncate" style={{ fontWeight: 500 }}>{c.name}</div>
                      <div className="text-xs" style={{ color: "#475569" }}>Disbursed {inr(inv.disbursed)} · {inv.feePct}% fee</div>
                    </div>
                    <StatusPill status={inv.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div style={{ fontWeight: 700 }}>
                      <span className="text-white text-xl" style={{ fontWeight: 700 }}>{inr(inv.fee)}</span>
                    </div>
                    <TrendingUp className="h-4 w-4" style={{ color: "#245f2d" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => go({ name: "billing" })}
              className="block w-full px-5 py-3 text-xs text-left transition"
              style={{ color: "#bfcbff" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(143,159,237,0.06)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              Open full ledger →
            </button>
          </div>
        </GlowCard>
      </div>
    </>
  );
}
