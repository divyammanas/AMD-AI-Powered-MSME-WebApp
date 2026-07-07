import { PageHeader, StatusPill } from "../components/ui-bits";
import { GlowCard, GlowCardHeader, GradientText, PrimaryButton, GhostButton } from "../components/glow-card";
import { matches, inr, getClient } from "../lib/mock-data";
import { CheckCircle2, Circle, Download, FileText, Send } from "lucide-react";

export function Applications() {
  const active = matches.filter((m) => ["approved", "drafted", "submitted"].includes(m.status));

  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Application workspace"
        subtitle="Draft, collect missing documents, export a submission-ready package."
      />

      <div className="space-y-5">
        {active.map((m) => {
          const c = getClient(m.clientId)!;
          const missing =
            m.scheme.includes("PMEGP") ? ["Project report", "Caste certificate (if applicable)"]
            : m.scheme.includes("CGTMSE") ? ["Bank sanction letter"]
            : ["Auditor certificate"];

          return (
            <GlowCard key={m.id} as="article">
              <GlowCardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: "#475569", fontWeight: 600 }}>{c.name}</div>
                    <div className="text-white" style={{ fontWeight: 600 }}>{m.scheme}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={m.status} />
                    <div className="text-right">
                      <span className="text-white" style={{ fontWeight: 700 }}>{inr(m.benefit)}</span>
                      <div className="text-[10px]" style={{ color: "#334155" }}>estimated</div>
                    </div>
                  </div>
                </div>
              </GlowCardHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="p-5 md:col-span-2">
                  <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: "#334155", fontWeight: 600 }}>Draft preview</div>
                  <div
                    className="rounded-xl p-4 text-xs font-mono leading-relaxed"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#64748b",
                    }}
                  >
                    <div className="text-slate-200 mb-2" style={{ fontWeight: 600 }}>
                      Form: {m.scheme.split("—")[0].trim()} — Application
                    </div>
                    Applicant: {c.name}<br />
                    Udyam: {c.udyam}<br />
                    GSTIN: {c.gstin}<br />
                    Category: {c.classification} · {c.sector}<br />
                    Turnover FY24: {inr(c.turnover)}<br />
                    Requested benefit: {inr(m.benefit)}<br />
                    Cited eligibility: {m.clauseRef}<br />
                    <span style={{ color: "#334155" }}>…narrative section auto-generated…</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: "#334155", fontWeight: 600 }}>Missing documents</div>
                  <ul className="space-y-2 text-sm mb-5">
                    {missing.map((doc, i) => (
                      <li key={doc} className="flex items-center gap-2">
                        {i === 0
                          ? <CheckCircle2 className="h-4 w-4" style={{ color: "#245f2d" }} />
                          : <Circle className="h-4 w-4" style={{ color: "#334155" }} />}
                        <span style={{ color: i === 0 ? "#334155" : "#94a3b8", textDecoration: i === 0 ? "line-through" : "none" }}>
                          {doc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <PrimaryButton className="w-full justify-center rounded-xl">
                      <Send className="h-4 w-4" /> Mark ready to file
                    </PrimaryButton>
                    <GhostButton className="w-full justify-center rounded-xl">
                      <Download className="h-4 w-4" /> Export package
                    </GhostButton>
                    <GhostButton className="w-full justify-center rounded-xl">
                      <FileText className="h-4 w-4" /> Open draft
                    </GhostButton>
                  </div>
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </>
  );
}
