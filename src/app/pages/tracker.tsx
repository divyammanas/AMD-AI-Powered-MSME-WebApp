import { PageHeader } from "../components/ui-bits";
import { GradientText } from "../components/glow-card";
import { matches, inr, getClient, type MatchStatus } from "../lib/mock-data";

const columns: { key: MatchStatus; label: string; hint: string; color: string }[] = [
  { key: "approved",  label: "Matched",   hint: "Approved by CA",           color: "#8f9fed" },
  { key: "drafted",   label: "Drafted",   hint: "Application ready",         color: "#5a4386" },
  { key: "submitted", label: "Submitted", hint: "Awaiting decision",         color: "#8f3f35" },
  { key: "disbursed", label: "Disbursed", hint: "Money in client account",   color: "#245f2d" },
];

export function Tracker() {
  return (
    <>
      <PageHeader
        eyebrow="Status tracker"
        title="Application pipeline"
        subtitle="Full lifecycle from matched → disbursed, per client."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = matches.filter((m) => m.status === col.key);
          return (
            <div
              key={col.key}
              className="rounded-2xl p-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: col.color, boxShadow: `0 0 6px ${col.color}` }}
                    />
                    <div className="text-sm text-slate-100" style={{ fontWeight: 600 }}>{col.label}</div>
                  </div>
                  <div className="text-[11px] pl-4 mt-0.5" style={{ color: "#475569" }}>{col.hint}</div>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${col.color}1a`,
                    color: col.color,
                    border: `1px solid ${col.color}33`,
                    fontWeight: 600,
                  }}
                >
                  {items.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {items.length === 0 && (
                  <div
                    className="rounded-xl py-8 text-center text-xs"
                    style={{ color: "#334155", border: "1px dashed rgba(255,255,255,0.06)" }}
                  >
                    No items
                  </div>
                )}
                {items.map((m) => {
                  const c = getClient(m.clientId)!;
                  return (
                    <div
                      key={m.id}
                      className="rounded-xl p-3 transition-all duration-150"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${col.color}44`}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}
                    >
                      <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: "#334155", fontWeight: 600 }}>
                        {c.name}
                      </div>
                      <div className="text-sm text-slate-200 line-clamp-2 mb-2" style={{ fontWeight: 500 }}>
                        {m.scheme}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white" style={{ fontWeight: 700 }}>{inr(m.benefit)}</span>
                        <span className="text-[10px]" style={{ color: "#334155" }}>{m.clauseRef}</span>
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
