import { PageHeader, StatusPill } from "../components/ui-bits";
import { GlowCard, PrimaryButton, GhostButton, GradientText } from "../components/glow-card";
import { clients, inr } from "../lib/mock-data";
import { Plus, Upload } from "lucide-react";
import { useNav } from "../lib/nav";

export function ClientsList() {
  const { go } = useNav();
  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title="Client portfolio"
        subtitle="Every client, sorted by highest potential recovery"
        action={
          <div className="flex gap-2">
            <GhostButton><Upload className="h-4 w-4" /> Bulk import</GhostButton>
            <PrimaryButton><Plus className="h-4 w-4" /> Add client</PrimaryButton>
          </div>
        }
      />

      <GlowCard>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {["Client", "Sector", "Class", "Matches", "Potential value", "Status"].map((h, i) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-[11px] uppercase tracking-widest ${i >= 3 ? "text-right" : "text-left"}`}
                  style={{ color: "#334155", fontWeight: 600 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.slice().sort((a, b) => b.potentialValue - a.potentialValue).map((c) => (
              <tr
                key={c.id}
                className="transition-all duration-150 cursor-pointer"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                onClick={() => go({ name: "client-detail", id: c.id })}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <td className="px-5 py-4">
                  <div className="text-slate-100" style={{ fontWeight: 500 }}>{c.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#334155" }}>{c.udyam}</div>
                </td>
                <td className="px-5 py-4 capitalize" style={{ color: "#64748b" }}>{c.sector}</td>
                <td className="px-5 py-4 capitalize" style={{ color: "#64748b" }}>{c.classification}</td>
                <td className="px-5 py-4 text-right text-slate-300">{c.matchCount}</td>
                <td className="px-5 py-4 text-right">
                  <span className="text-white" style={{ fontWeight: 700 }}>{inr(c.potentialValue)}</span>
                </td>
                <td className="px-5 py-4">
                  <StatusPill status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlowCard>
    </>
  );
}
