import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, ConfidenceBadge, StatusPill } from "@/components/ui-bits";
import { matches, inr, getClient } from "@/lib/mock-data";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/_app/matches")({
  head: () => ({ meta: [{ title: "Eligibility Matches · SubsidyDesk" }] }),
  component: MatchesPage,
});

function MatchesPage() {
  return (
    <>
      <PageHeader
        title="Eligibility matches"
        subtitle="Every match is grounded in a cited clause from the scheme knowledge base."
        action={
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-accent">
            <Filter className="h-4 w-4" /> Filters
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches
          .slice()
          .sort((a, b) => b.benefit - a.benefit)
          .map((m) => {
            const c = getClient(m.clientId)!;
            return (
              <article key={m.id} className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{c.name}</div>
                    <h3 className="font-semibold mt-0.5">{m.scheme}</h3>
                    <div className="text-xs text-muted-foreground">{m.issuingBody} · verified {m.lastVerified}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{inr(m.benefit)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <ConfidenceBadge level={m.confidence} />
                  <StatusPill status={m.status} />
                </div>
                <p className="text-sm mt-3">{m.reason}</p>
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs text-primary hover:underline list-none">
                    Citation ({m.clauseRef})
                  </summary>
                  <blockquote className="mt-2 border-l-2 border-primary/40 pl-3 text-xs text-muted-foreground italic">
                    {m.citation}
                  </blockquote>
                </details>
                <div className="mt-4 flex justify-end">
                  <Link to="/clients/$id" params={{ id: c.id }} className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-accent">
                    Open client
                  </Link>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
}