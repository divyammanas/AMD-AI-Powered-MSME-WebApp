import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader, ConfidenceBadge, StatusPill, Stat, EmptyState } from "@/components/ui-bits";
import { getClient, getMatchesFor, inr, type Match, type Client } from "@/lib/mock-data";
import { ArrowLeft, Check, FileText, Pencil, X } from "lucide-react";

export const Route = createFileRoute("/_app/clients/$id")({
  loader: ({ params }) => {
    const client = getClient(params.id);
    if (!client) throw notFound();
    return { client, matches: getMatchesFor(params.id) };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.client.name} · SubsidyDesk` : "Client · SubsidyDesk" }],
  }),
  component: ClientDetail,
  notFoundComponent: () => (
    <div className="p-10 text-center text-sm text-muted-foreground">Client not found.</div>
  ),
});

function ClientDetail() {
  const { client, matches } = Route.useLoaderData() as { client: Client; matches: Match[] };

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
      <Link to="/clients" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-3 w-3" /> All clients
      </Link>

      <PageHeader
        title={client.name}
        subtitle={`${client.udyam} · ${client.classification} enterprise · ${client.district}, ${client.state}`}
        action={<StatusPill status={client.status} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Stat label="Matched schemes" value={`${matches.length}`} />
        <Stat label="Potential recovery" value={inr(client.potentialValue)} />
        <Stat label="Approved / drafted" value={`${matches.filter(m => ["approved","drafted","submitted","disbursed"].includes(m.status)).length}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Business profile</h2>
                <p className="text-xs text-muted-foreground">OCR-extracted · every field editable, never silently trusted</p>
              </div>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {fields.map(([k, v]) => (
                <div key={k} className="px-5 py-3 flex items-center justify-between sm:justify-start sm:gap-6 border-b border-border last:border-b-0 sm:[&:nth-child(-n+2)]:border-t-0">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground w-40 shrink-0">{k}</dt>
                  <dd className="text-sm font-medium flex-1 capitalize">{v}</dd>
                  <button className="text-muted-foreground hover:text-primary"><Pencil className="h-3.5 w-3.5" /></button>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-semibold">Eligibility matches</h2>
              <p className="text-xs text-muted-foreground">Every claim carries a citation. Nothing files without your approval.</p>
            </div>
            {matches.length === 0 ? (
              <div className="p-6"><EmptyState title="No matches yet" hint="Upload documents to trigger eligibility sweep." /></div>
            ) : (
              <ul className="divide-y divide-border">
                {matches.map((m) => (
                  <li key={m.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{m.scheme}</span>
                          <ConfidenceBadge level={m.confidence} />
                          <StatusPill status={m.status} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{m.issuingBody} · verified {m.lastVerified}</div>
                        <p className="text-sm mt-2">{m.reason}</p>
                        <details className="mt-2 group">
                          <summary className="cursor-pointer text-xs text-primary hover:underline list-none">
                            View citation ({m.clauseRef})
                          </summary>
                          <blockquote className="mt-2 border-l-2 border-primary/40 pl-3 text-xs text-muted-foreground italic">
                            {m.citation}
                          </blockquote>
                        </details>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-semibold">{inr(m.benefit)}</div>
                        <div className="text-[11px] text-muted-foreground mb-2">est. benefit</div>
                        {m.status === "suggested" && (
                          <div className="flex gap-1.5">
                            <button className="inline-flex items-center gap-1 rounded-md bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium hover:opacity-90">
                              <Check className="h-3 w-3" /> Approve
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs hover:bg-muted">
                              <X className="h-3 w-3" /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">Documents</h2>
              <button className="text-xs text-primary">+ Upload</button>
            </div>
            <ul className="divide-y divide-border">
              {client.documents.length === 0 && (
                <li className="px-5 py-8"><EmptyState title="No documents uploaded" hint="Drag & drop Udyam, GST, financials to begin." /></li>
              )}
              {client.documents.map((d) => (
                <li key={d.name} className="px-5 py-3 flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm truncate">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground">{d.type}</div>
                  </div>
                  <StatusPill status={d.ocr === "success" ? "approved" : d.ocr === "review" ? "submitted" : "pending"} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in p-5">
            <h2 className="font-semibold">Audit trail</h2>
            <ol className="mt-3 space-y-3 text-xs">
              <li className="flex gap-3"><span className="text-muted-foreground w-20 shrink-0">Today</span><span>Priya approved CGTMSE match (₹15L, high conf.)</span></li>
              <li className="flex gap-3"><span className="text-muted-foreground w-20 shrink-0">Yesterday</span><span>AI matched 4 schemes · KB v2026.06</span></li>
              <li className="flex gap-3"><span className="text-muted-foreground w-20 shrink-0">2d ago</span><span>OCR extracted Balance Sheet — 1 field flagged</span></li>
              <li className="flex gap-3"><span className="text-muted-foreground w-20 shrink-0">3d ago</span><span>Client onboarded</span></li>
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}