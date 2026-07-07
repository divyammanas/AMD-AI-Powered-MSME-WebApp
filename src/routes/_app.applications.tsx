import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/ui-bits";
import { matches, inr, getClient } from "@/lib/mock-data";
import { CheckCircle2, Circle, Download, FileText, Send } from "lucide-react";

export const Route = createFileRoute("/_app/applications")({
  head: () => ({ meta: [{ title: "Applications · SubsidyDesk" }] }),
  component: Applications,
});

function Applications() {
  const active = matches.filter((m) => ["approved", "drafted", "submitted"].includes(m.status));

  return (
    <>
      <PageHeader
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
            <article key={m.id} className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs text-muted-foreground">{c.name}</div>
                  <h3 className="font-semibold">{m.scheme}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={m.status} />
                  <div className="text-right">
                    <div className="font-semibold">{inr(m.benefit)}</div>
                    <div className="text-[11px] text-muted-foreground">estimated</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-border">
                <div className="p-5 md:col-span-2">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Draft preview</div>
                  <div className="rounded-md border border-border bg-muted/40 p-4 text-xs font-mono leading-relaxed text-muted-foreground">
                    <div className="font-semibold text-foreground mb-2">Form: {m.scheme.split("—")[0].trim()} — Application</div>
                    Applicant: {c.name}<br/>
                    Udyam: {c.udyam}<br/>
                    GSTIN: {c.gstin}<br/>
                    Category: {c.classification} · {c.sector}<br/>
                    Turnover FY24: {inr(c.turnover)}<br/>
                    Requested benefit: {inr(m.benefit)}<br/>
                    Cited eligibility: {m.clauseRef}<br/>
                    <span className="text-muted-foreground/60">…narrative section auto-generated…</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Missing documents</div>
                  <ul className="space-y-2 text-sm">
                    {missing.map((doc, i) => (
                      <li key={doc} className="flex items-center gap-2">
                        {i === 0 ? (
                          <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={i === 0 ? "line-through text-muted-foreground" : ""}>{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 space-y-2">
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium">
                      <Send className="h-4 w-4" /> Mark ready to file
                    </button>
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent">
                      <Download className="h-4 w-4" /> Export package
                    </button>
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent">
                      <FileText className="h-4 w-4" /> Open draft
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}