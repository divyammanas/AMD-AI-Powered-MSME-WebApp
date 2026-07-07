import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Firm Settings · SubsidyDesk" }] }),
  component: Settings,
});

function Settings() {
  return (
    <>
      <PageHeader title="Firm settings" subtitle="Firm profile, scheme scope, notification preferences." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-semibold mb-4">Firm profile</h2>
          <div className="space-y-3">
            <Field label="Firm name" value="Nair & Associates" />
            <Field label="Primary contact" value="Priya Nair, CA" />
            <Field label="Membership no." value="ICAI-123456" />
            <Field label="Partners" value="3" />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-semibold mb-4">Scheme scope</h2>
          <div className="space-y-3">
            <Field label="State of practice" value="Maharashtra" />
            <Field label="Categories" value="CGTMSE, PMEGP, MUDRA, PMFME" />
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              Knowledge base version: <span className="font-mono">v2026.06</span> · last synced today
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="font-semibold mb-4">Notifications</h2>
          <div className="space-y-1 text-sm">
            <Toggle label="Email digest (daily)" on />
            <Toggle label="WhatsApp digest" on />
            <Toggle label="New match alerts" on />
            <Toggle label="Deadline reminders" on />
            <Toggle label="Disbursement confirmations" on />
          </div>
        </section>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</label>
      <input defaultValue={value} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <label className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={on} className="h-4 w-4 rounded border-input" />
    </label>
  );
}