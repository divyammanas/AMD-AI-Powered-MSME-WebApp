import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/ui-bits";
import { clients, inr } from "@/lib/mock-data";
import { Plus, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/clients/")({
  head: () => ({ meta: [{ title: "Clients · SubsidyDesk" }] }),
  component: ClientList,
});

function ClientList() {
  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Every client, sorted by highest potential recovery"
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-accent">
              <Upload className="h-4 w-4" /> Bulk import
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Plus className="h-4 w-4" /> Add client
            </button>
          </div>
        }
      />

      <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-muted-foreground">
            <tr className="text-left">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Sector</th>
              <th className="px-5 py-3 font-medium">Class</th>
              <th className="px-5 py-3 font-medium text-right">Matches</th>
              <th className="px-5 py-3 font-medium text-right">Potential value</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clients
              .slice()
              .sort((a, b) => b.potentialValue - a.potentialValue)
              .map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-5 py-4">
                    <Link to="/clients/$id" params={{ id: c.id }} className="font-medium hover:text-primary">
                      {c.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{c.udyam}</div>
                  </td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{c.sector}</td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{c.classification}</td>
                  <td className="px-5 py-4 text-right">{c.matchCount}</td>
                  <td className="px-5 py-4 text-right font-semibold">{inr(c.potentialValue)}</td>
                  <td className="px-5 py-4"><StatusPill status={c.status} /></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}