import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-bits";
import { notifications } from "@/lib/mock-data";
import { Bell, Calendar, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications · SubsidyDesk" }] }),
  component: Notifications,
});

const iconMap = { match: Sparkles, deadline: Calendar, status: CheckCircle2 } as const;

function Notifications() {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Actionable updates only — no noise."
        action={
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="rounded border-input" />
            WhatsApp digest
          </label>
        }
      />

      <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] card-hover animate-card-in divide-y divide-border">
        {notifications.map((n) => {
          const Icon = iconMap[n.type as keyof typeof iconMap] ?? Bell;
          const tone =
            n.type === "deadline" ? "bg-[color:var(--warning)]/15 text-[color:oklch(0.45_0.14_75)]"
            : n.type === "status" ? "bg-[color:var(--success)]/15 text-[color:var(--success)]"
            : "bg-primary/10 text-primary";
          return (
            <div key={n.id} className={`px-5 py-4 flex items-start gap-4 ${n.unread ? "bg-primary/[0.03]" : ""}`}>
              <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${tone}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
              </div>
              {n.unread && <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />}
            </div>
          );
        })}
      </div>
    </>
  );
}