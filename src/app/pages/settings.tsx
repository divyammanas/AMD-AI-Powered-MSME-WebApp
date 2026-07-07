import { PageHeader } from "../components/ui-bits";
import { GlowCard, GlowCardHeader, PrimaryButton } from "../components/glow-card";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest block mb-1.5" style={{ color: "#475569", fontWeight: 600 }}>{label}</label>
      <input
        defaultValue={value}
        className="w-full h-10 rounded-xl px-3.5 text-sm text-slate-200 focus:outline-none transition"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onFocus={e => (e.target.style.borderColor = "rgba(143,159,237,0.45)")}
        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
      />
    </div>
  );
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <label
      className="flex items-center justify-between py-3 cursor-pointer"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span className="text-sm text-slate-300">{label}</span>
      <div
        className="relative h-5 w-9 rounded-full transition"
        style={{ background: on ? "rgba(143,159,237,0.5)" : "rgba(255,255,255,0.1)" }}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full transition-all"
          style={{
            right: on ? "2px" : "auto",
            left: on ? "auto" : "2px",
            background: on ? "#8f9fed" : "rgba(255,255,255,0.4)",
            boxShadow: on ? "0 0 8px rgba(143,159,237,0.6)" : "none",
          }}
        />
      </div>
    </label>
  );
}

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Firm settings"
        subtitle="Firm profile, scheme scope, notification preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl">
        <GlowCard>
          <GlowCardHeader>
            <div className="text-white" style={{ fontWeight: 600 }}>Firm profile</div>
          </GlowCardHeader>
          <div className="p-5 space-y-4">
            <Field label="Firm name" value="Nair & Associates" />
            <Field label="Primary contact" value="Priya Nair, CA" />
            <Field label="Membership no." value="ICAI-123456" />
            <Field label="Partners" value="3" />
            <PrimaryButton className="mt-2">Save changes</PrimaryButton>
          </div>
        </GlowCard>

        <GlowCard>
          <GlowCardHeader>
            <div className="text-white" style={{ fontWeight: 600 }}>Scheme scope</div>
          </GlowCardHeader>
          <div className="p-5 space-y-4">
            <Field label="State of practice" value="Maharashtra" />
            <Field label="Categories" value="CGTMSE, PMEGP, MUDRA, PMFME" />
            <div
              className="text-xs pt-3 mt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#475569" }}
            >
              Knowledge base: <span className="font-mono text-[#bfcbff]">v2026.06</span> · last synced today
            </div>
          </div>
        </GlowCard>

        <GlowCard className="lg:col-span-2">
          <GlowCardHeader>
            <div className="text-white" style={{ fontWeight: 600 }}>Notifications</div>
          </GlowCardHeader>
          <div className="px-5 pb-2">
            <Toggle label="Email digest (daily)" on />
            <Toggle label="WhatsApp digest" on />
            <Toggle label="New match alerts" on />
            <Toggle label="Deadline reminders" on />
            <Toggle label="Disbursement confirmations" on />
          </div>
        </GlowCard>
      </div>
    </>
  );
}
