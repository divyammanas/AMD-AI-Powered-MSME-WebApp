import { MessageCircle, Check, Upload, FileText, IndianRupee, Sparkles } from "lucide-react";

const steps = ["Matched", "Docs Reviewed", "Application Drafted", "Submitted", "Disbursed"];
const currentStep = 2;

const schemes = [
  { name: "PMEGP Subsidy", desc: "Government help to expand your manufacturing unit.", benefit: "Up to ₹8,50,000" },
  { name: "Credit Guarantee (CGTMSE)", desc: "Collateral-free loan backed by the government.", benefit: "Up to ₹25,00,000" },
  { name: "MSME Champions Scheme", desc: "Support for upgrading machinery and quality.", benefit: "Up to ₹4,50,000" },
];

const docs = [
  { name: "GST Registration Certificate", done: true },
  { name: "Udyam Registration", done: true },
  { name: "Last 2 years ITR", done: true },
  { name: "Bank statements (6 months)", done: false },
  { name: "Machinery invoices", done: false },
];

export function ClientView() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-8">
        <div className="flex items-center gap-2 text-xs text-blue-300 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          Current stage
        </div>
        <h1 className="text-slate-50 text-3xl tracking-tight" style={{ fontWeight: 500 }}>
          Application under review
        </h1>
        <p className="text-slate-400 mt-2">Your CA is preparing the final paperwork for PMEGP Subsidy.</p>

        <div className="mt-8">
          <div className="flex items-center">
            {steps.map((s, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs ring-1 " +
                        (done
                          ? "bg-blue-600 text-white ring-blue-500"
                          : active
                          ? "bg-blue-500/20 text-blue-200 ring-blue-500/40"
                          : "bg-slate-900 text-slate-500 ring-slate-800")
                      }
                    >
                      {done ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <div className={"mt-2 text-xs text-center whitespace-nowrap " + (done || active ? "text-slate-200" : "text-slate-500")}>
                      {s}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={"flex-1 h-px mx-2 mb-6 " + (i < currentStep ? "bg-blue-500/60" : "bg-slate-800")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="text-sm text-slate-500 mb-2">Your CA</div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white" style={{ fontWeight: 500 }}>
              MA
            </div>
            <div>
              <div className="text-slate-100" style={{ fontWeight: 500 }}>Mehta & Associates</div>
              <div className="text-xs text-slate-500">Chartered Accountants · Mumbai</div>
            </div>
          </div>
          <button className="mt-5 w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition" style={{ fontWeight: 500 }}>
            <MessageCircle className="h-4 w-4" />
            Message
          </button>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2 text-xs text-emerald-300 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Potential savings
          </div>
          <div className="flex items-baseline gap-1 text-slate-50 tabular-nums" style={{ fontWeight: 500 }}>
            <IndianRupee className="h-8 w-8 text-slate-300" />
            <span className="text-6xl tracking-tight">37,50,000</span>
          </div>
          <p className="text-sm text-slate-400 mt-3">
            Estimated benefits across all schemes you qualify for this year.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-slate-100 text-xl mb-4" style={{ fontWeight: 500 }}>Eligible schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schemes.map((s) => (
            <div key={s.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition">
              <div className="text-slate-100" style={{ fontWeight: 500 }}>{s.name}</div>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <div className="text-xs text-slate-500">Estimated benefit</div>
                <div className="text-emerald-300 mt-0.5" style={{ fontWeight: 500 }}>{s.benefit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-slate-100 text-lg mb-4" style={{ fontWeight: 500 }}>Documents</h2>
          <ul className="space-y-2.5">
            {docs.map((d) => (
              <li key={d.name} className="flex items-center gap-3">
                <div
                  className={
                    "h-5 w-5 rounded-md flex items-center justify-center ring-1 " +
                    (d.done ? "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30" : "bg-slate-900 ring-slate-700 text-slate-500")
                  }
                >
                  {d.done ? <Check className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                </div>
                <span className={"text-sm " + (d.done ? "text-slate-300" : "text-slate-400")}>{d.name}</span>
                {!d.done && <span className="ml-auto text-[11px] text-amber-300">Needed</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-slate-800 hover:border-blue-500/40 bg-slate-900/20 hover:bg-blue-500/5 p-6 flex flex-col items-center justify-center text-center transition cursor-pointer">
          <div className="h-12 w-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 mb-3">
            <Upload className="h-5 w-5" />
          </div>
          <div className="text-slate-200" style={{ fontWeight: 500 }}>Drop files here to upload</div>
          <div className="text-sm text-slate-500 mt-1">or click to browse from your device</div>
          <div className="text-xs text-slate-600 mt-3">PDF, JPG, PNG · up to 10 MB each</div>
        </div>
      </div>
    </div>
  );
}
