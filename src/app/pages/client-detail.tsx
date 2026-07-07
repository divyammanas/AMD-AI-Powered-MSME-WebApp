import { PageHeader, ConfidenceBadge, StatusPill, Stat, EmptyState } from "../components/ui-bits";
import { GlowCard, GlowCardHeader, GradientText, PrimaryButton, GhostButton } from "../components/glow-card";
import { getClient, getMatchesFor, inr } from "../lib/mock-data";
import { ArrowLeft, Check, FileText, Pencil, X } from "lucide-react";
import { useNav } from "../lib/nav";

export function ClientDetail({ id }: { id: string }) {
  const { go } = useNav();
  const client = getClient(id);
  if (!client) return <div className="p-10 text-center text-sm" style={{ color: "#64748b" }}>Client not found.</div>;
  const matchList = getMatchesFor(id);

  const fields: [string, string][] = [
    ["Business name", client.name],
    ["Udyam", client.udyam],
    ["GSTIN", client.gstin],
    ["Sector", client.sector],
    ["Classification", client.classification],
    ["State / District", `${client.state} · ${client.district}`],
    ["Turnover (FY24)", inr(client.turnover)],
    ["Investment (P&M)", inr(client.investment)],
    ["Employees", `${client.employees}`],
  ];

  return (
    <>
      <button
        onClick={() => go({ name: "clients" })}
        className="inline-flex items-center gap-1.5 text-xs mb-5 transition"
        style={{ color: "#64748b" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#bfcbff"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#64748b"}
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All clients
      </button>

      <PageHeader
        eyebrow="Client profile"
        title={client.name}
        subtitle={`${client.udyam} · ${client.classification} enterprise · ${client.district}, ${client.state}`}
        action={<StatusPill status={client.status} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        <Stat label="Matched schemes" value={`${matchList.length}`} />
        <Stat label="Potential recovery" value={inr(client.potentialValue)} trend="up" />
        <Stat label="Approved / drafted" value={`${matchList.filter(m => ["approved","drafted","submitted","disbursed"].includes(m.status)).length}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Business profile */}
          <GlowCard>
            <GlowCardHeader>
              <div className="text-white" style={{ fontWeight: 600 }}>Business profile</div>
              <div className="text-xs mt-0.5" style={{ color: "#475569" }}>OCR-extracted · every field editable, never silently trusted</div>
            </GlowCardHeader>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {fields.map(([k, v]) => (
                <div
                  key={k}
                  className="px-5 py-3 flex items-center gap-4 group transition"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <dt className="text-[11px] uppercase tracking-widest w-36 shrink-0" style={{ color: "#334155", fontWeight: 600 }}>{k}</dt>
                  <dd className="text-sm text-slate-200 flex-1 capitalize" style={{ fontWeight: 500 }}>{v}</dd>
                  <button className="opacity-0 group-hover:opacity-100 transition" style={{ color: "#64748b" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#bfcbff"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#64748b"}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Eligibility matches */}
          <GlowCard>
            <GlowCardHeader>
              <div className="text-white" style={{ fontWeight: 600 }}>Eligibility matches</div>
              <div className="text-xs mt-0.5" style={{ color: "#475569" }}>Every claim carries a citation. Nothing files without your approval.</div>
            </GlowCardHeader>
            {matchList.length === 0 ? (
              <div className="p-6"><EmptyState title="No matches yet" hint="Upload documents to trigger eligibility sweep." /></div>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {matchList.map((m) => (
                  <div
                    key={m.id}
                    className="px-5 py-4 transition-all"
                    style={{ borderLeft: "2px solid transparent" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderLeftColor =
                      m.confidence === "high" ? "#8f9fed" : m.confidence === "medium" ? "#8f3f35" : "#475569"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent"}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-slate-100" style={{ fontWeight: 600 }}>{m.scheme}</span>
                          <ConfidenceBadge level={m.confidence} />
                          <StatusPill status={m.status} />
                        </div>
                        <div className="text-xs mb-2" style={{ color: "#475569" }}>{m.issuingBody} · verified {m.lastVerified}</div>
                        <p className="text-sm" style={{ color: "#94a3b8" }}>{m.reason}</p>
                        <details className="mt-2 group">
                          <summary
                            className="cursor-pointer text-xs list-none transition"
                            style={{ color: "#bfcbff" }}
                          >
                            View citation ({m.clauseRef}) ↓
                          </summary>
                          <blockquote
                            className="mt-2 pl-3 text-xs italic leading-relaxed"
                            style={{
                              borderLeft: "2px solid rgba(143,159,237,0.4)",
                              color: "#64748b",
                            }}
                          >
                            {m.citation}
                          </blockquote>
                        </details>
                      </div>
                      <div className="text-right shrink-0">
                        <div style={{ fontWeight: 700 }}>
                          <span className="text-white text-xl" style={{ fontWeight: 700 }}>{inr(m.benefit)}</span>
                        </div>
                        <div className="text-[10px] mt-0.5 mb-3" style={{ color: "#334155" }}>est. benefit</div>
                        {m.status === "suggested" && (
                          <div className="flex gap-1.5 justify-end">
                            <PrimaryButton className="rounded-lg px-3 py-1 text-xs">
                              <Check className="h-3 w-3" /> Approve
                            </PrimaryButton>
                            <GhostButton className="text-xs px-3 py-1">
                              <X className="h-3 w-3" /> Reject
                            </GhostButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlowCard>
        </div>

        <div className="space-y-5">
          {/* Documents */}
          <GlowCard>
            <GlowCardHeader>
              <div className="flex items-center justify-between">
                <div className="text-white" style={{ fontWeight: 600 }}>Documents</div>
                <button className="text-xs transition" style={{ color: "#bfcbff" }}>+ Upload</button>
              </div>
            </GlowCardHeader>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {client.documents.length === 0 && (
                <div className="px-5 py-8">
                  <EmptyState title="No documents uploaded" hint="Drag & drop Udyam, GST, financials to begin." />
                </div>
              )}
              {client.documents.map((d) => (
                <div key={d.name} className="px-5 py-3 flex items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0" style={{ color: "#475569" }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-slate-200 truncate">{d.name}</div>
                    <div className="text-[11px]" style={{ color: "#475569" }}>{d.type}</div>
                  </div>
                  <StatusPill status={d.ocr === "success" ? "approved" : d.ocr === "review" ? "review" : "pending"} />
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Audit trail */}
          <GlowCard>
            <GlowCardHeader>
              <div className="text-white" style={{ fontWeight: 600 }}>Audit trail</div>
            </GlowCardHeader>
            <div className="px-5 py-4">
              <ol className="space-y-4 text-xs relative">
                <div
                  className="absolute left-[3px] top-1 bottom-1 w-px"
                  style={{ background: "rgba(143,159,237,0.2)" }}
                />
                {[
                  { time: "Today", text: "Priya approved CGTMSE match (₹15L, high conf.)" },
                  { time: "Yesterday", text: "AI matched 4 schemes · KB v2026.06" },
                  { time: "2d ago", text: "OCR extracted Balance Sheet — 1 field flagged" },
                  { time: "3d ago", text: "Client onboarded" },
                ].map((e) => (
                  <li key={e.text} className="flex gap-3 pl-4 relative">
                    <span
                      className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full"
                      style={{ background: "#8f9fed", boxShadow: "0 0 6px rgba(143,159,237,0.5)" }}
                    />
                    <span style={{ color: "#334155" }} className="w-20 shrink-0">{e.time}</span>
                    <span style={{ color: "#94a3b8" }}>{e.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </GlowCard>
        </div>
      </div>
    </>
  );
}
