import { useState, ReactElement } from 'react';
import { Search, Star, TrendingUp, TrendingDown, Truck, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const suppliers = [
  { name: 'Kaveri Fabrics Pvt Ltd', category: 'Raw Material', city: 'Surat', rating: 4.6, delivery: '98%', avgDays: 3.2, spend: '₹8.4L', status: 'active', trend: 'up' },
  { name: 'Ratan Steel Works', category: 'Raw Material', city: 'Rajkot', rating: 4.3, delivery: '94%', avgDays: 4.8, spend: '₹5.1L', status: 'active', trend: 'stable' },
  { name: 'Mehta Packaging', category: 'Packaging', city: 'Ahmedabad', rating: 3.6, delivery: '87%', avgDays: 5.4, spend: '₹2.2L', status: 'review', trend: 'down' },
  { name: 'Sri Balaji Textiles', category: 'Raw Material', city: 'Coimbatore', rating: 3.2, delivery: '79%', avgDays: 7.1, spend: '₹3.8L', status: 'review', trend: 'down' },
  { name: 'Sunrise Logistics', category: 'Logistics', city: 'Mumbai', rating: 4.1, delivery: '91%', avgDays: 2.1, spend: '₹1.9L', status: 'active', trend: 'up' },
  { name: 'Pioneer Chemicals', category: 'Consumables', city: 'Pune', rating: 4.4, delivery: '96%', avgDays: 2.8, spend: '₹1.2L', status: 'active', trend: 'stable' },
  { name: 'Gupta Electricals', category: 'Maintenance', city: 'Nagpur', rating: 3.8, delivery: '83%', avgDays: 6.2, spend: '₹0.8L', status: 'active', trend: 'stable' },
  { name: 'Bharat Polymers', category: 'Raw Material', city: 'Vadodara', rating: 2.9, delivery: '72%', avgDays: 9.3, spend: '₹1.4L', status: 'inactive', trend: 'down' },
];

const topSuppliers = suppliers.filter(s => s.rating >= 4.1).slice(0, 3);

const statusIcon: Record<string, ReactElement> = {
  active: <CheckCircle2 size={13} color="#10b981" />,
  review: <AlertCircle size={13} color="#f59e0b" />,
  inactive: <XCircle size={13} color="#ffffff" />,
};

const statusStyle: Record<string, { bg: string; color: string }> = {
  active: { bg: '#10b98118', color: '#10b981' },
  review: { bg: '#f59e0b18', color: '#f59e0b' },
  inactive: { bg: '#ffffff18', color: '#ffffff' },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#f59e0b' }}>
      ★ {rating.toFixed(1)}
    </span>
  );
}

export default function SupplierManagement() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(suppliers.map(s => s.category)))];

  const filtered = suppliers.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchCategory = filterCategory === 'all' || s.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="p-6 space-y-5">
      {/* Top supplier cards */}
      <div>
        <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)', marginBottom: 12 }}>
          Top Performers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topSuppliers.map((s, i) => (
            <div key={s.name} className="rounded-lg p-5" style={{ background: 'var(--card)', border: `1px solid ${i === 0 ? 'var(--primary)' : 'var(--border)'}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2 }}>{s.category} · {s.city}</div>
                </div>
                {i === 0 && (
                  <div className="rounded-full px-2 py-0.5" style={{ background: '#ffffff18', fontSize: 10, color: 'var(--primary)', fontWeight: 600 }}>
                    #1 Supplier
                  </div>
                )}
              </div>
              <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { label: 'Rating', value: <Stars rating={s.rating} /> },
                  { label: 'On-Time', value: <span style={{ color: '#10b981', fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{s.delivery}</span> },
                  { label: 'Avg Lead', value: <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'var(--foreground)' }}>{s.avgDays}d</span> },
                  { label: 'YTD Spend', value: <span style={{ fontSize: 13, color: 'var(--foreground)' }}>{s.spend}</span> },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 10, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 flex-1" style={{ background: 'var(--card)', border: '1px solid var(--border)', minWidth: 220 }}>
          <Search size={14} color="var(--muted-foreground)" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search suppliers, cities, categories..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: 'var(--foreground)', fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        <div className="flex gap-2">
          {['all', 'active', 'review', 'inactive'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="rounded-md px-3 py-1.5 transition-colors"
              style={{
                fontSize: 12, border: '1px solid var(--border)', cursor: 'pointer', textTransform: 'capitalize',
                background: filterStatus === s ? 'var(--primary)' : 'var(--card)',
                color: filterStatus === s ? '#fff' : 'var(--muted-foreground)',
              }}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>

        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6,
            padding: '6px 10px', fontSize: 12, color: 'var(--foreground)', outline: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {categories.map(c => (
            <option key={c} value={c} style={{ background: '#0d1224' }}>
              {c === 'all' ? 'All Categories' : c}
            </option>
          ))}
        </select>

        <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginLeft: 'auto' }}>
          {filtered.length} of {suppliers.length} suppliers
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
            <tr style={{ background: 'var(--accent)' }}>
              {['Supplier', 'Category', 'City', 'Rating', 'On-Time Delivery', 'Avg Lead Time', 'YTD Spend', 'Trend', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: 'var(--muted-foreground)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: 13 }}>
                  No suppliers match your filters.
                </td>
              </tr>
            ) : filtered.map((s, i) => (
              <tr
                key={s.name}
                style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
              >
                <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 500, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>{s.name}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted-foreground)' }}>{s.category}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted-foreground)' }}>{s.city}</td>
                <td style={{ padding: '10px 14px' }}><Stars rating={s.rating} /></td>
                <td style={{ padding: '10px 14px', fontSize: 13, fontFamily: "'DM Mono', monospace", color: parseFloat(s.delivery) >= 90 ? '#10b981' : '#f59e0b' }}>
                  {s.delivery}
                </td>
                <td style={{ padding: '10px 14px', fontSize: 13, fontFamily: "'DM Mono', monospace", color: 'var(--foreground)' }}>
                  {s.avgDays}d
                </td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--foreground)' }}>{s.spend}</td>
                <td style={{ padding: '10px 14px' }}>
                  {s.trend === 'up' && <TrendingUp size={14} color="#10b981" />}
                  {s.trend === 'down' && <TrendingDown size={14} color="#ffffff" />}
                  {s.trend === 'stable' && <Truck size={14} color="#6b7aa1" />}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span className="flex items-center gap-1.5" style={{ fontSize: 12, ...statusStyle[s.status], padding: '2px 8px', borderRadius: 99, background: statusStyle[s.status].bg, width: 'fit-content' }}>
                    {statusIcon[s.status]}
                    <span style={{ textTransform: 'capitalize' }}>{s.status}</span>
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
