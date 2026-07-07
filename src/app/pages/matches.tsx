import { PageHeader, ConfidenceBadge, StatusPill } from "../components/ui-bits";
import { GlowCard, GradientText, GhostButton } from "../components/glow-card";
import { matches, inr, getClient } from "../lib/mock-data";
import { Filter } from "lucide-react";
import { useNav } from "../lib/nav";

export function MatchesPage() {
  const { go } = useNav();
  return (
    <>
      <PageHeader
        eyebrow="Eligibility"
        title="Scheme matches"
        subtitle="Every match is grounded in a cited clause from the scheme knowledge base."
        action={
          <GhostButton><Filter className="h-4 w-4" /> Filters</GhostButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.slice().sort((a, b) => b.benefit - a.benefit).map((m) => {
          const c = getClient(m.clientId)!;
          const accentColor = m.confidence === "high" ? "#8f9fed" : m.confidence === "medium" ? "#8f3f35" : "#475569";
          return (
            <GlowCard key={m.id} as="article">
              <div
                className="px-5 pt-5 pb-4"
                style={{ borderLeft: `3px solid ${accentColor}`, borderTopLeftRadius: "1rem", borderBottomLeftRadius: 0 }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: "#475569", fontWeight: 600 }}>
                      {c.name}
                    </div>
                    <h3 className="text-slate-100" style={{ fontWeight: 600 }}>{m.scheme}</h3>
                    <div className="text-xs mt-0.5" style={{ color: "#475569" }}>{m.issuingBody} · verified {m.lastVerified}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div style={{ fontWeight: 700 }}>
                      <span className="text-white text-xl" style={{ fontWeight: 700 }}>{inr(m.benefit)}</span>
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: "#334155" }}>estimated</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <ConfidenceBadge level={m.confidence} />
                  <StatusPill status={m.status} />
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{m.reason}</p>

                <details className="mt-3">
                  <summary
                    className="cursor-pointer text-xs list-none transition"
                    style={{ color: "#bfcbff" }}
                  >
                    View citation ({m.clauseRef}) ↓
                  </summary>
                  <blockquote
                    className="mt-2 pl-3 text-xs italic leading-relaxed"
                    style={{ borderLeft: "2px solid rgba(143,159,237,0.3)", color: "#64748b" }}
                  >
                    {m.citation}
                  </blockquote>
                </details>

                <div className="mt-4 flex justify-end">
                  <GhostButton onClick={() => go({ name: "client-detail", id: c.id })}>
                    Open client
                  </GhostButton>
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </>
  );
}
