import { PageHeader } from "../components/ui-bits";
import { GlowCard } from "../components/glow-card";
import { notifications } from "../lib/mock-data";
import { Bell, Calendar, CheckCircle2, Sparkles } from "lucide-react";

const iconMap = { match: Sparkles, deadline: Calendar, status: CheckCircle2 } as const;

const toneMap = {
  match:    { bg: "rgba(143,159,237,0.15)", color: "#bfcbff", glow: "rgba(143,159,237,0.25)" },
  deadline: { bg: "rgba(143,63,53,0.15)", color: "#ffc0b4", glow: "rgba(143,63,53,0.25)" },
  status:   { bg: "rgba(36,95,45,0.15)", color: "#9ee7b0", glow: "rgba(36,95,45,0.25)" },
};

export function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications"
        title="Updates & alerts"
        subtitle="Actionable updates only — no noise."
        action={
          <label className="flex items-center gap-2.5 text-sm cursor-pointer">
            <div
              className="relative h-5 w-9 rounded-full transition"
              style={{ background: "rgba(143,159,237,0.4)" }}
            >
              <span
                className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full"
                style={{ background: "#8f9fed", boxShadow: "0 0 6px rgba(143,159,237,0.5)" }}
              />
            </div>
            <span style={{ color: "#94a3b8" }}>WhatsApp digest</span>
          </label>
        }
      />

      <GlowCard>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {notifications.map((n) => {
            const Icon = iconMap[n.type as keyof typeof iconMap] ?? Bell;
            const tone = toneMap[n.type as keyof typeof toneMap] ?? toneMap.status;
            return (
              <div
                key={n.id}
                className="px-5 py-4 flex items-start gap-4 transition"
                style={n.unread ? { background: "rgba(143,159,237,0.04)" } : {}}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = n.unread ? "rgba(143,159,237,0.04)" : "transparent"}
              >
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: tone.bg,
                    border: `1px solid ${tone.glow}`,
                    color: tone.color,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200" style={{ fontWeight: 500 }}>{n.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#475569" }}>{n.time}</div>
                </div>
                {n.unread && (
                  <span
                    className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                    style={{ background: "#8f9fed", boxShadow: "0 0 6px rgba(143,159,237,0.6)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </GlowCard>
    </>
  );
}
