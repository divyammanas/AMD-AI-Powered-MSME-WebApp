import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

const marketShare = [
  { name: 'Your Co.', share: 8.4, growth: 12.4 },
  { name: 'Arjun Tex', share: 14.2, growth: 3.1 },
  { name: 'Modi Fab.', share: 11.8, growth: -1.4 },
  { name: 'Patel Ind.', share: 9.1, growth: 5.8 },
  { name: 'Sunrise', share: 7.3, growth: 8.2 },
  { name: 'Others', share: 49.2, growth: 0 },
];

const radarData = [
  { metric: 'Product Quality', you: 82, leader: 88 },
  { metric: 'Price Competitiveness', you: 74, leader: 65 },
  { metric: 'Delivery Speed', you: 68, leader: 85 },
  { metric: 'Customer Service', you: 78, leader: 72 },
  { metric: 'Brand Presence', you: 55, leader: 90 },
  { metric: 'Innovation', you: 70, leader: 75 },
];

const trends = [
  {
    sector: 'Textile Components',
    trend: 'up',
    change: '+18.3%',
    desc: 'Strong demand from apparel exporters in Surat & Tiruppur; festive season orders accelerating.',
    opportunity: 'High',
  },
  {
    sector: 'Industrial Packaging',
    trend: 'stable',
    change: '+2.1%',
    desc: 'Steady but competitive; new government procurement tenders opening in Q4 2025.',
    opportunity: 'Medium',
  },
  {
    sector: 'Agricultural Inputs',
    trend: 'down',
    change: '-4.7%',
    desc: 'Monsoon season softness; expected recovery post-October with Rabi crop procurement.',
    opportunity: 'Low',
  },
];

const competitors = [
  { name: 'Arjun Textiles Pvt Ltd', city: 'Surat', rating: 4.2, strength: 'Distribution network', threat: 'High' },
  { name: 'Modi Fabrications', city: 'Ahmedabad', rating: 3.8, strength: 'Cost leadership', threat: 'Medium' },
  { name: 'Patel Industries', city: 'Rajkot', rating: 4.0, strength: 'Product quality', threat: 'Medium' },
  { name: 'Sunrise Weaves', city: 'Ludhiana', rating: 3.5, strength: 'Fast delivery', threat: 'Low' },
  { name: 'Pioneer Fabrics', city: 'Coimbatore', rating: 3.9, strength: 'Price', threat: 'Low' },
];

const threatColor: Record<string, string> = { High: '#ff3333', Medium: '#f59e0b', Low: '#22c55e' };
const opportunityColor: Record<string, string> = { High: '#22c55e', Medium: '#f59e0b', Low: '#ff3333' };

export default function MarketIntelligence() {
  return (
    <div className="space-y-6">
      {/* Trend cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trends.map(({ sector, trend, change, desc, opportunity }) => (
          <div key={sector} className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#fff] hover:shadow-[0_8px_24px_rgba(255,255,255,0.04)]" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: 12, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {sector}
              </span>
              {trend === 'up' && <div className="p-1.5 rounded-md bg-[#22c55e]/10 text-[#22c55e]"><TrendingUp size={16} /></div>}
              {trend === 'down' && <div className="p-1.5 rounded-md bg-[#ff3333]/10 text-[#ff3333]"><TrendingDown size={16} /></div>}
              {trend === 'stable' && <div className="p-1.5 rounded-md bg-[#f59e0b]/10 text-[#f59e0b]"><Minus size={16} /></div>}
            </div>
            <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 26, fontWeight: 700, color: trend === 'up' ? '#22c55e' : trend === 'down' ? '#ff3333' : '#f59e0b', mb: 10 }}>
              {change}
            </div>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, marginBottom: 16, marginTop: 10 }}>{desc}</p>
            <div className="flex items-center gap-2 pt-4 border-t border-[#222]">
              <span style={{ fontSize: 12, color: '#666' }}>Opportunity:</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: opportunityColor[opportunity] }}>{opportunity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Market share */}
        <div className="rounded-xl p-6 xl:col-span-2" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
            Market Share — Textile Components (Gujarat)
          </h3>
          <div style={{ width: '100%', height: 260, border: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketShare}>
                <CartesianGrid key="grid1" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis key="x1" dataKey="name" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis key="y1" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  key="t1"
                  contentStyle={{ background: '#050505', border: '1px solid #333', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                  itemStyle={{ color: '#fff', fontWeight: 600 }}
                  cursor={{ fill: '#1a1a1a' }}
                  formatter={(v: number) => [`${v}%`, 'Market Share']}
                />
                <Bar key="bar1" dataKey="share" radius={[4, 4, 0, 0]}>
                  {marketShare.map((entry, i) => (
                    <Cell key={entry.name} fill={i === 0 ? '#ffffff' : '#333333'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitive radar */}
        <div className="rounded-xl p-6" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16 }}>
            Competitive Positioning
          </h3>
          <div style={{ width: '100%', height: 260, border: 'none' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid key="grid2" stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis key="axis2" dataKey="metric" tick={{ fontSize: 11, fill: '#888' }} />
                <Radar key="radar1" name="Your Co." dataKey="you" stroke="#ffffff" fill="#ffffff" fillOpacity={0.2} strokeWidth={2} />
                <Radar key="radar2" name="Market Leader" dataKey="leader" stroke="#666666" fill="#666666" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                <Legend key="l1" wrapperStyle={{ fontSize: 12, color: '#aaa', paddingTop: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Competitor table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid #222' }}>
        <div className="px-6 py-5 border-b border-[#222]">
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 16, fontWeight: 600, color: '#fff' }}>
            Competitor Analysis
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap">
            <thead>
              <tr className="bg-[#111]">
                {['Company', 'City', 'Rating', 'Key Strength', 'Competitive Threat'].map(h => (
                  <th key={h} className="px-6 py-4 text-xs text-[#aaa] font-semibold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={c.name} className={`border-t border-[#222] hover:bg-[#111] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#0a0a0a]'}`}>
                  <td className="px-6 py-4 text-sm text-[#fff] font-medium">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-[#888]">{c.city}</td>
                  <td className="px-6 py-4 text-sm text-[#fff] font-mono">
                    <span className="text-[#f59e0b]">★</span> {c.rating}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#ccc]">{c.strength}</td>
                  <td className="px-6 py-4">
                    <span
                      style={{
                        fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 99,
                        background: `${threatColor[c.threat]}15`,
                        color: threatColor[c.threat],
                        border: `1px solid ${threatColor[c.threat]}30`
                      }}
                    >
                      {c.threat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
