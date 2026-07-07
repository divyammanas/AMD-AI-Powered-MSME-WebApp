import { Briefcase, User } from "lucide-react";

export type View = "ca" | "client";

export function ViewSwitcher({ value, onChange }: { value: View; onChange: (v: View) => void }) {
  const opts: { key: View; label: string; icon: typeof User }[] = [
    { key: "ca", label: "CA View", icon: Briefcase },
    { key: "client", label: "Client View", icon: User },
  ];
  return (
    <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/80 p-0.5">
      {opts.map(({ key, label, icon: Icon }) => {
        const active = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={
              "inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs transition " +
              (active
                ? "bg-blue-600/20 text-blue-200 ring-1 ring-inset ring-blue-500/30"
                : "text-slate-400 hover:text-slate-200")
            }
            style={{ fontWeight: active ? 500 : 400 }}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
