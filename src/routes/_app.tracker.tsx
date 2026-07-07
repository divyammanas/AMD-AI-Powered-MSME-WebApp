import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-bits";
import { matches, inr, getClient, type MatchStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/tracker")({
  head: () => ({ meta: [{ title: "Status Tracker · SubsidyDesk" }] }),
  component: Tracker,
});

const columns: { key: MatchStatus; label: string; hint: string }[] = [
  { key: "approved",  label: "Matched",   hint: "Approved by CA" },
  { key: "drafted",   label: "Drafted",   hint: "Application ready" },
  { key: "submitted", label: "Submitted", hint: "Awaiting decision" },
  { key: "disbursed", label: "Disbursed", hint: "Money in client account" },
];

function Tracker() {
  return (
    <>
      <PageHeader title="Status tracker" subtitle="Full lifecycle from matched → disbursed, per client." />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = matches.filter((m) => m.status === col.key);
          return (
            <div key={col.key} className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-baseline justify-between mb-3 px-1">
                <div>
                  <div className="text-sm font-semibold">{col.label}</div>
                  <div className="text-[11px] text-muted-foreground">{col.hint}</div>
                </div>
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-6">—</div>
                )}
                {items.map((m) => {
                  const c = getClient(m.clientId)!;
                  return (
                    <div key={m.id} className="rounded-lg bg-card border border-border p-3 shadow-[var(--shadow-card)]">
                      <div className="text-xs text-muted-foreground truncate">{c.name}</div>
                      <div className="text-sm font-medium mt-0.5 line-clamp-2">{m.scheme}</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-semibold">{inr(m.benefit)}</span>
                        <span className="text-[10px] text-muted-foreground">{m.clauseRef}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}