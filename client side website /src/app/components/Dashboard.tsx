import { TrendingUp, TrendingDown, Users, ShoppingCart, IndianRupee, Sparkles } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const revenueData = [
  { month: 'Feb', revenue: 18.2, expenses: 12.1 },
  { month: 'Mar', revenue: 20.5, expenses: 13.4 },
  { month: 'Apr', revenue: 19.8, expenses: 14.2 },
  { month: 'May', revenue: 22.1, expenses: 13.8 },
  { month: 'Jun', revenue: 23.4, expenses: 15.1 },
  { month: 'Jul', revenue: 24.8, expenses: 14.6 },
];

const deptData = [
  { dept: 'Production', amount: 5.2 },
  { dept: 'Sales', amount: 3.1 },
  { dept: 'Logistics', amount: 2.8 },
  { dept: 'Admin', amount: 1.9 },
  { dept: 'R&D', amount: 1.6 },
];

const activity = [
  { text: 'New order from Sharma Traders', time: '8 min ago', type: 'order' },
  { text: 'GST filing reminder — due in 3 days', time: '1 hr ago', type: 'compliance' },
  { text: 'Supplier Kaveri Fabrics updated quote', time: '2 hrs ago', type: 'supplier' },
  { text: 'Q2 profit margin exceeded target by 4%', time: '5 hrs ago', type: 'financial' },
  { text: 'AI identified 12% cost reduction opportunity', time: '1 day ago', type: 'ai' },
];

const insights = [
  'Revenue growing at 12.4% MoM — on track for ₹3Cr annual target.',
  'Production costs can be reduced by 8% by renegotiating raw material contracts with 3 key suppliers.',
  'Market expansion to Tier-2 cities shows 34% untapped demand in your product category.',
];

const kpis = [
  { label: 'Total Revenue', value: '₹24.8L', change: '+12.4%', up: true, icon: IndianRupee, color: '#fff' },
  { label: 'Active Customers', value: '1,247', change: '+8.2%', up: true, icon: Users, color: '#aaa' },
  { label: 'Pending Orders', value: '38', change: '-5 from last week', up: false, icon: ShoppingCart, color: '#aaa' },
  { label: 'Net Profit', value: '₹6.1L', change: '+18.7%', up: true, icon: TrendingUp, color: '#fff' },
];

// Re-map types to B&W theme
const typeColor: Record<string, string> = {
  order: '#aaa', compliance: '#666', supplier: '#ccc', financial: '#fff', ai: '#22c55e',
};
typeColor.ai = '#fff';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, change, up, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff] hover:shadow-[0_8px_24px_rgba(255,255,255,0.04)]"
            style={{ background: '#0d0d0d', border: '1px solid #222' }}
          >
            <div className="flex items-center justify-between">
              <span style={{ color: '#aaa', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {label}
              </span>
              <div className="rounded p-1.5" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
                <Icon size={16} color={color} />
              </div>
            </div>
            <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              {value}
            </div>
            <div className="flex items-center gap-1" style={{ fontSize: 12 }}>
              {up ? <TrendingUp size={12} color="#22c55e" /> : <TrendingDown size={12} color="#ff3333" />}
              <span style={{ color: up ? '#22c55e' : '#ff3333', fontWeight: 500 }}>{change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="rounded-xl p-5 lg:col-span-2" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "'Roboto Slab', serif", color: '#fff', fontSize: 16, fontWeight: 600 }}>
              Revenue vs Expenses
            </h3>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#666', background: '#111', padding: '4px 10px', borderRadius: 20, border: '1px solid #222' }}>
              ₹ Lakhs · Feb–Jul 2025
            </span>
          </div>
          <div style={{ width: '100%', height: 260, border: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs key="defs1">
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#666" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#666" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid1" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis key="x1" dataKey="month" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis key="y1" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip
                  key="tooltip1"
                  contentStyle={{ background: '#050505', border: '1px solid #333', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                  labelStyle={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}
                  itemStyle={{ color: '#ccc' }}
                />
                <Area key="area1" type="monotone" dataKey="revenue" stroke="#fff" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
                <Area key="area2" type="monotone" dataKey="expenses" stroke="#666" fill="url(#expGrad)" strokeWidth={2} name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department expenses */}
        <div className="rounded-xl p-5" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
            Dept. Expenses
          </h3>
          <div style={{ width: '100%', height: 260, border: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" barSize={16}>
                <CartesianGrid key="grid2" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis key="x2" type="number" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis key="y2" type="category" dataKey="dept" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip
                  key="tooltip2"
                  contentStyle={{ background: '#050505', border: '1px solid #333', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                  labelStyle={{ color: '#fff', fontWeight: 600 }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: '#1a1a1a' }}
                />
                <Bar key="bar1" dataKey="amount" fill="#fff" radius={[0, 4, 4, 0]} name="₹ Lakhs" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent activity */}
        <div className="rounded-xl p-5" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
            Recent Activity
          </h3>
          <div className="flex flex-col gap-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColor[a.type], marginTop: 6, flexShrink: 0, transition: 'transform 0.2s', ...((a.type === 'ai') ? {boxShadow: '0 0 8px #fff'} : {}) }} className="group-hover:scale-150" />
                <div className="flex-1">
                  <div style={{ fontSize: 13, color: '#eee', fontWeight: 500 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: '#666', fontFamily: "'DM Mono', monospace", marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI insights */}
        <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-[0.02] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} color="#fff" />
            <h3 style={{ fontFamily: "'Roboto Slab', serif", color: '#fff', fontSize: 16, fontWeight: 600 }}>
              AI Insights
            </h3>
          </div>
          <div className="flex flex-col gap-3 relative z-10">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="rounded-lg p-4 transition-all duration-200 hover:bg-[#1a1a1a]"
                style={{ background: '#111', borderLeft: '2px solid #fff', fontSize: 13, color: '#ddd', lineHeight: 1.55 }}
              >
                {insight}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#555', marginTop: 16, fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
            Generated by Qwen2.5:7b · AMD ROCm
          </div>
        </div>
      </div>
    </div>
  );
}
