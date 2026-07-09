import { Zap, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

const processes = [
  {
    name: 'Raw Material Procurement',
    efficiency: 74,
    target: 88,
    issue: 'Manual PO creation adds 2.3 days to cycle time',
    recommendation: 'Implement automated reorder triggers based on inventory thresholds. Integrate supplier portal for direct order placement.',
    impact: 'High',
    effort: 'Medium',
    saving: '₹45K/yr',
  },
  {
    name: 'Production Floor Operations',
    efficiency: 81,
    target: 92,
    issue: 'Machine downtime averaging 14% — above industry benchmark of 8%',
    recommendation: 'Schedule preventive maintenance during low-demand shifts. Install IoT sensors for real-time machine health monitoring.',
    impact: 'High',
    effort: 'High',
    saving: '₹1.2L/yr',
  },
  {
    name: 'Quality Control Process',
    efficiency: 88,
    target: 95,
    issue: 'End-of-line inspection catching defects too late — rework rate at 4.2%',
    recommendation: 'Shift to inline quality checks at 3 critical production stages. Reduces rework and material waste by ~60%.',
    impact: 'Medium',
    effort: 'Low',
    saving: '₹38K/yr',
  },
  {
    name: 'Dispatch & Logistics',
    efficiency: 69,
    target: 85,
    issue: 'Route planning is manual; vehicles running at 67% capacity utilization',
    recommendation: 'Use route optimization software. Consolidate deliveries for Pune/Nashik routes to 3x/week from daily.',
    impact: 'Medium',
    effort: 'Low',
    saving: '₹55K/yr',
  },
];

const bottlenecks = [
  { issue: 'Invoice approval cycle: 4.8 days average', priority: 'High', dept: 'Finance' },
  { issue: 'Raw material inspection queue: 18hr backlog', priority: 'High', dept: 'QC' },
  { issue: 'Packing station understaffed during peak hours', priority: 'Medium', dept: 'Production' },
  { issue: 'Customer complaint resolution: 6.2 day avg', priority: 'Medium', dept: 'Support' },
  { issue: 'Payroll processing manual — error-prone', priority: 'Low', dept: 'HR' },
];

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Quick Wins (0–30 days)',
    items: ['Implement route consolidation for logistics', 'Set up inline QC checkpoints', 'Automate invoice approval for amounts < ₹50K'],
    status: 'active',
  },
  {
    phase: 'Phase 2',
    title: 'System Upgrades (30–90 days)',
    items: ['Deploy inventory reorder triggers', 'Preventive maintenance schedule rollout', 'Supplier portal integration'],
    status: 'pending',
  },
  {
    phase: 'Phase 3',
    title: 'Advanced Optimization (90–180 days)',
    items: ['IoT machine health monitoring', 'AI-powered demand forecasting', 'Full ERP integration'],
    status: 'pending',
  },
];

const impactColor: Record<string, string> = { High: '#ffffff', Medium: '#f59e0b', Low: '#10b981' };
const priorityColor: Record<string, string> = { High: '#ffffff', Medium: '#f59e0b', Low: '#10b981' };

function EfficiencyBar({ value, target }: { value: number; target: number }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div className="flex justify-between mb-1" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
        <span>Current: <strong style={{ color: value >= 80 ? '#10b981' : '#f59e0b' }}>{value}%</strong></span>
        <span>Target: {target}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: value >= 80 ? '#10b981' : '#f59e0b', borderRadius: 3, transition: 'width 0.6s ease' }} />
        <div style={{ position: 'absolute', top: 0, left: `${target}%`, width: 2, height: '100%', background: 'var(--muted-foreground)', transform: 'translateX(-50%)' }} />
      </div>
    </div>
  );
}

export default function OperationalOptimization() {
  const avgEfficiency = Math.round(processes.reduce((s, p) => s + p.efficiency, 0) / processes.length);
  const totalSavings = '₹2.38L/yr';

  return (
    <div className="p-6 space-y-5">
      {/* Overview strip */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Overall Efficiency', value: `${avgEfficiency}%`, icon: Zap, color: '#f59e0b' },
          { label: 'Identified Savings', value: totalSavings, icon: CheckCircle2, color: '#10b981' },
          { label: 'Active Bottlenecks', value: '5', icon: AlertTriangle, color: '#ffffff' },
          { label: 'Avg Cycle Time', value: '3.4 days', icon: Clock, color: '#3b82f6' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-lg p-4 flex items-center gap-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="rounded-lg p-2.5" style={{ background: `${color}18` }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 20, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.2, marginTop: 2 }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Process cards */}
      <div>
        <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)', marginBottom: 12 }}>
          Process Analysis & Recommendations
        </h3>
        <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {processes.map(p => (
            <div key={p.name} className="rounded-lg p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="flex items-start justify-between mb-2">
                <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>{p.name}</div>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: `${impactColor[p.impact]}18`, color: impactColor[p.impact], fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
                  {p.impact} Impact
                </span>
              </div>
              <EfficiencyBar value={p.efficiency} target={p.target} />
              <div className="mt-3 rounded p-2.5" style={{ background: 'var(--accent)', fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                <strong style={{ color: '#f59e0b' }}>Issue:</strong> {p.issue}
              </div>
              <div className="mt-2" style={{ fontSize: 12, color: 'var(--foreground)', lineHeight: 1.55 }}>
                {p.recommendation}
              </div>
              <div className="flex items-center justify-between mt-3" style={{ fontSize: 11 }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Effort: <strong style={{ color: 'var(--foreground)' }}>{p.effort}</strong></span>
                <span style={{ color: '#10b981', fontFamily: "'DM Mono', monospace" }}>Saves {p.saving}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottlenecks + Roadmap */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 340px' }}>
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Active Bottlenecks</h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {bottlenecks.map((b, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor[b.priority], flexShrink: 0 }} />
                <div className="flex-1" style={{ fontSize: 13, color: 'var(--foreground)' }}>{b.issue}</div>
                <span style={{ fontSize: 11, color: 'var(--muted-foreground)', flexShrink: 0 }}>{b.dept}</span>
                <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 99, background: `${priorityColor[b.priority]}18`, color: priorityColor[b.priority], flexShrink: 0 }}>
                  {b.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)', marginBottom: 16 }}>
            Implementation Roadmap
          </h3>
          <div className="flex flex-col gap-4">
            {roadmap.map((phase, i) => (
              <div key={phase.phase} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: phase.status === 'active' ? 'var(--primary)' : 'var(--accent)',
                      border: phase.status === 'active' ? 'none' : '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: phase.status === 'active' ? '#fff' : 'var(--muted-foreground)',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < roadmap.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', margin: '4px 0' }} />}
                </div>
                <div className="pb-2">
                  <div style={{ fontSize: 10, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Mono', monospace" }}>
                    {phase.phase}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)', marginTop: 1 }}>{phase.title}</div>
                  <ul className="mt-2 space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-1.5" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                        <ArrowRight size={10} style={{ flexShrink: 0, marginTop: 2 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
