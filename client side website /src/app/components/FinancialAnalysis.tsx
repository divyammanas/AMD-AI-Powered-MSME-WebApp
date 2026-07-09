import { useState } from 'react';
import { TrendingUp, TrendingDown, FileText, Download } from 'lucide-react';
import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 16.4, expenses: 11.2, profit: 5.2 },
  { month: 'Feb', revenue: 18.2, expenses: 12.1, profit: 6.1 },
  { month: 'Mar', revenue: 20.5, expenses: 13.4, profit: 7.1 },
  { month: 'Apr', revenue: 19.8, expenses: 14.2, profit: 5.6 },
  { month: 'May', revenue: 22.1, expenses: 13.8, profit: 8.3 },
  { month: 'Jun', revenue: 23.4, expenses: 15.1, profit: 8.3 },
  { month: 'Jul', revenue: 24.8, expenses: 14.6, profit: 10.2 },
];

const expenseBreakdown = [
  { name: 'Production', value: 35.6, color: '#ffffff' },
  { name: 'Salaries', value: 21.3, color: '#cccccc' },
  { name: 'Logistics', value: 14.8, color: '#999999' },
  { name: 'Marketing', value: 10.2, color: '#666666' },
  { name: 'Admin', value: 9.1, color: '#444444' },
  { name: 'R&D', value: 9.0, color: '#222222' },
];

const tableData = [
  { month: 'Feb 2025', revenue: '₹18.2L', expenses: '₹12.1L', profit: '₹6.1L', margin: '33.5%', growth: '+8.2%', up: true },
  { month: 'Mar 2025', revenue: '₹20.5L', expenses: '₹13.4L', profit: '₹7.1L', margin: '34.6%', growth: '+12.6%', up: true },
  { month: 'Apr 2025', revenue: '₹19.8L', expenses: '₹14.2L', profit: '₹5.6L', margin: '28.3%', growth: '-3.4%', up: false },
  { month: 'May 2025', revenue: '₹22.1L', expenses: '₹13.8L', profit: '₹8.3L', margin: '37.6%', growth: '+11.6%', up: true },
  { month: 'Jun 2025', revenue: '₹23.4L', expenses: '₹15.1L', profit: '₹8.3L', margin: '35.5%', growth: '+5.9%', up: true },
  { month: 'Jul 2025', revenue: '₹24.8L', expenses: '₹14.6L', profit: '₹10.2L', margin: '41.1%', growth: '+6.0%', up: true },
];

const metrics = [
  { label: 'Total Revenue', value: '₹24.8L', sub: 'This month', change: '+12.4%', up: true },
  { label: 'Total Expenses', value: '₹14.6L', sub: 'This month', change: '+8.1%', up: false },
  { label: 'Net Profit', value: '₹10.2L', sub: 'This month', change: '+22.9%', up: true },
  { label: 'Profit Margin', value: '41.1%', sub: 'This month', change: '+5.6pp', up: true },
];

const aiReport = `**AI Financial Analysis — July 2025**

Your business is on a strong growth trajectory. Net profit margin reached a 7-month high of 41.1%, driven by improved operational efficiency and revenue diversification.

**Key Observations:**
• Revenue grew 12.4% MoM despite a 3.4% dip in April — showing resilient recovery
• Production cost as % of revenue decreased from 38.2% to 34.4% — a positive efficiency signal
• The ₹10.2L July profit is your highest single-month profit this year

**Forward Projections (Aug–Oct 2025):**
Seasonal slowdown may bring revenue to ₹21–22L range. Maintain cost discipline to protect margins above 35%.

**Action Items:**
1. Reinvest ₹3L of July profit into production capacity expansion
2. Review marketing spend — ROI is below industry average at 4.2x
3. Accelerate receivables collection — ₹8.4L outstanding beyond 30 days`;

export default function FinancialAnalysis() {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, sub, change, up }) => (
          <div key={label} className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff] hover:shadow-[0_8px_24px_rgba(255,255,255,0.04)]" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
            <div style={{ fontSize: 12, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontWeight: 600 }}>
              {label}
            </div>
            <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{sub}</div>
            <div className="flex items-center gap-1 mt-3" style={{ fontSize: 13, fontWeight: 500 }}>
              {up ? <TrendingUp size={14} color="#22c55e" /> : <TrendingDown size={14} color="#ff3333" />}
              <span style={{ color: up ? '#22c55e' : '#ff3333' }}>{change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-xl p-5 lg:col-span-2" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16 }}>
            Monthly P&L Trend
          </h3>
          <div style={{ width: '100%', height: 260, border: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid key="grid1" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis key="x1" dataKey="month" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis key="y1" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip key="t1" contentStyle={{ background: '#050505', border: '1px solid #333', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }} labelStyle={{ color: '#fff', fontWeight: 600 }} itemStyle={{ color: '#eee' }} />
                <Legend key="l1" wrapperStyle={{ fontSize: 12, color: '#aaa', paddingTop: 10 }} />
                <Line key="line1" type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} dot={{ fill: '#ffffff', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Revenue" />
                <Line key="line2" type="monotone" dataKey="expenses" stroke="#666666" strokeWidth={2} dot={{ fill: '#666666', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Expenses" />
                <Line key="line3" type="monotone" dataKey="profit" stroke="#aaaaaa" strokeWidth={2} strokeDasharray="4 4" dot={{ fill: '#aaaaaa', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16 }}>
            Expense Breakdown
          </h3>
          <div style={{ width: '100%', height: 180, border: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie key="pie1" data={expenseBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                  {expenseBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  key="t2"
                  contentStyle={{ background: '#050505', border: '1px solid #333', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                  itemStyle={{ color: '#fff', fontWeight: 600 }}
                  formatter={(v: number) => [`${v}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pl-4">
            {expenseBreakdown.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2">
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#aaa' }}>{name} <span className="text-[#fff] font-mono">{value}%</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 16, fontWeight: 600, color: '#fff' }}>
            Monthly Summary
          </h3>
          <button
            onClick={() => setShowReport(v => !v)}
            className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all hover:bg-[#fff] hover:text-[#000] text-[#fff] bg-[#1a1a1a] border border-[#333]"
            style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            <FileText size={14} /> {showReport ? 'Hide' : 'Generate AI'} Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead>
              <tr className="bg-[#111]">
                {['Month', 'Revenue', 'Expenses', 'Net Profit', 'Margin', 'MoM Growth'].map(h => (
                  <th key={h} className="px-6 py-4 text-xs text-[#aaa] font-semibold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={row.month} className={`border-t border-[#222] hover:bg-[#111] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#0a0a0a]'}`}>
                  <td className="px-6 py-4 text-sm text-[#fff] font-mono">{row.month}</td>
                  <td className="px-6 py-4 text-sm text-[#eee]">{row.revenue}</td>
                  <td className="px-6 py-4 text-sm text-[#aaa]">{row.expenses}</td>
                  <td className="px-6 py-4 text-sm text-[#fff] font-semibold">{row.profit}</td>
                  <td className="px-6 py-4 text-sm text-[#ccc] font-mono">{row.margin}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`flex items-center gap-1.5 font-medium ${row.up ? 'text-[#22c55e]' : 'text-[#ff3333]'}`}>
                      {row.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {row.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Report */}
      {showReport && (
        <div className="rounded-xl p-6 relative overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid #fff' }}>
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-[0.03] blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#fff] text-[#000] flex items-center justify-center">
                <FileText size={16} />
              </div>
              <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>
                AI Financial Report
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#aaa] hover:text-[#fff] transition-colors text-sm font-medium">
              <Download size={16} /> Export PDF
            </button>
          </div>
          <div className="text-sm text-[#ddd] leading-relaxed whitespace-pre-line relative z-10 pl-10">
            {aiReport.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <div key={`bold-${i}`} className="font-bold text-[#fff] mt-4 mb-2 text-base">{line.replace(/\*\*/g, '')}</div>;
              }
              const parts = line.split(/\*\*(.*?)\*\*/g);
              if (parts.length > 1) {
                return <div key={`mix-${i}`} className="mt-1">{parts.map((p, j) => j % 2 === 1 ? <strong key={`str-${j}`} className="text-[#fff]">{p}</strong> : p)}</div>;
              }
              return line ? <div key={`line-${i}`} className="mt-1 flex items-start gap-2">
                {line.startsWith('•') ? <span className="text-[#fff] mt-0.5">•</span> : null}
                <span>{line.replace(/^•\s*/, '')}</span>
              </div> : <div key={`br-${i}`} className="h-2" />;
            })}
          </div>
          <div className="text-xs text-[#666] mt-6 font-mono flex items-center gap-2 pl-10 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#fff]" />
            Generated by Qwen2.5:7b · AMD ROCm · {new Date().toLocaleDateString('en-IN')}
          </div>
        </div>
      )}
    </div>
  );
}
