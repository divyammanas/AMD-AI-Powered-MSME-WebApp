import { useState } from 'react';
import { CheckCircle2, AlertCircle, Clock, Send, ShieldCheck, X } from 'lucide-react';

const categories = [
  {
    name: 'GST & Taxation',
    status: 'warning',
    score: 78,
    items: [
      { task: 'GSTR-1 (Outward Supplies) — July', done: true, due: 'Filed Aug 1' },
      { task: 'GSTR-3B — July filing', done: false, due: 'Due Aug 11' },
      { task: 'E-invoicing (3 pending invoices > ₹5L)', done: false, due: 'Overdue' },
      { task: 'Input Tax Credit reconciliation', done: true, due: 'Completed' },
      { task: 'Annual GST audit — FY 2024-25', done: true, due: 'Filed Jun 30' },
    ],
  },
  {
    name: 'Labour & Employment',
    status: 'good',
    score: 92,
    items: [
      { task: 'EPF contribution — July', done: true, due: 'Paid Aug 1' },
      { task: 'ESIC contribution — July', done: true, due: 'Paid Aug 1' },
      { task: 'Shops & Establishments renewal', done: true, due: 'Valid till Mar 2026' },
      { task: 'Labour welfare fund contribution — H1', done: true, due: 'Paid Jul 15' },
      { task: 'Annual returns filing', done: false, due: 'Due Dec 31' },
    ],
  },
  {
    name: 'MSME & Environmental',
    status: 'good',
    score: 85,
    items: [
      { task: 'Udyam Registration renewal', done: true, due: 'Valid FY 2025-26' },
      { task: 'Environmental clearance certificate', done: true, due: 'Valid till 2027' },
      { task: 'Fire safety NOC renewal', done: false, due: 'Due Sep 15' },
      { task: 'Factory license — annual fee', done: true, due: 'Paid Apr 2025' },
      { task: 'PCB consent renewal (air/water)', done: true, due: 'Renewed Jun 2025' },
    ],
  },
];

const deadlines = [
  { task: 'GSTR-3B July filing', date: 'Aug 11, 2025', days: 3, urgency: 'critical' },
  { task: 'E-invoice generation (3 pending)', date: 'Aug 8, 2025', days: 0, urgency: 'overdue' },
  { task: 'TDS deposit — July', date: 'Aug 15, 2025', days: 7, urgency: 'warning' },
  { task: 'Fire safety NOC renewal', date: 'Sep 15, 2025', days: 38, urgency: 'upcoming' },
  { task: 'Advance tax Q2', date: 'Sep 15, 2025', days: 38, urgency: 'upcoming' },
  { task: 'Annual EPF return', date: 'Dec 31, 2025', days: 146, urgency: 'info' },
];

const aiAnswers: Record<string, string> = {
  default: `Based on your current compliance profile, here are the most critical actions:

1. **E-invoicing (Overdue)**: Generate e-invoices for the 3 transactions exceeding ₹5L immediately. This is mandatory under Rule 48(4) of CGST Rules. Penalty: ₹10,000 per non-compliance instance.

2. **GSTR-3B deadline (Aug 11)**: You have 3 days. Confirm invoice details from Mehta Packaging and Sri Balaji Textiles today. Your ITC eligible this month is ₹1.84L — don't miss the claiming window.

3. **TDS deposit (Aug 15)**: Ensure Section 194C deductions from contractor payments are deposited. Current outstanding: ₹42,800.

Shall I prepare a detailed compliance calendar for the next 90 days?`,
  gst: `**GST Compliance Deep Dive**

Your GST registration (27AABCM1234R1ZK) is active and in good standing. Here's your status:

• **GSTR-1**: Filed for July — 47 B2B invoices, 12 B2C invoices totaling ₹24.8L
• **GSTR-3B**: Pending. Tax liability ≈ ₹3.46L (after ITC of ₹1.84L)
• **ITC Available**: ₹1.84L across IGST (₹62K), CGST (₹61K), SGST (₹61K)
• **Pending action**: 3 e-invoices for transactions with Ratan Steel (₹6.2L), Kaveri Fabrics (₹5.8L), and Arjun Textiles (₹5.1L)

Generate those e-invoices on the GST portal today to avoid penalty accumulation.`,
};

function getAIAnswer(q: string): string {
  if (q.toLowerCase().includes('gst') || q.toLowerCase().includes('tax')) return aiAnswers.gst;
  return aiAnswers.default;
}

const urgencyStyle: Record<string, { bg: string; color: string; label: string }> = {
  overdue: { bg: '#ffffff20', color: '#ffffff', label: 'Overdue' },
  critical: { bg: '#f59e0b20', color: '#f59e0b', label: 'Critical' },
  warning: { bg: '#f59e0b12', color: '#f59e0b', label: 'Due Soon' },
  upcoming: { bg: '#3b82f612', color: '#3b82f6', label: 'Upcoming' },
  info: { bg: 'var(--accent)', color: 'var(--muted-foreground)', label: 'Scheduled' },
};

export default function ComplianceAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    setTimeout(() => {
      setAnswer(getAIAnswer(question));
      setLoading(false);
    }, 900);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.name} className="rounded-lg p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
                {cat.name}
              </div>
              {cat.status === 'good'
                ? <CheckCircle2 size={18} color="#10b981" />
                : <AlertCircle size={18} color="#f59e0b" />}
            </div>
            <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 28, fontWeight: 600, color: cat.score >= 90 ? '#10b981' : '#f59e0b', marginBottom: 8 }}>
              {cat.score}%
            </div>
            <div style={{ height: 4, borderRadius: 2, background: 'var(--accent)', overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ height: '100%', width: `${cat.score}%`, background: cat.score >= 90 ? '#10b981' : '#f59e0b', borderRadius: 2 }} />
            </div>
            <div className="space-y-2">
              {cat.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  {item.done
                    ? <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                    : <X size={13} color="#ffffff" style={{ flexShrink: 0, marginTop: 1 }} />}
                  <div>
                    <div style={{ fontSize: 12, color: item.done ? 'var(--muted-foreground)' : 'var(--foreground)' }}>{item.task}</div>
                    <div style={{ fontSize: 10, color: item.done ? '#10b981' : '#f59e0b', fontFamily: "'DM Mono', monospace" }}>{item.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Deadlines + AI Q&A */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
        {/* Deadlines */}
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <Clock size={15} color="var(--primary)" />
            <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
              Upcoming Deadlines
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
              <thead>
              <tr style={{ background: 'var(--accent)' }}>
                {['Task', 'Due Date', 'Days Left', 'Status'].map(h => (
                  <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontSize: 11, color: 'var(--muted-foreground)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deadlines.map((d, i) => {
                const s = urgencyStyle[d.urgency];
                return (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: 'var(--foreground)' }}>{d.task}</td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: 'var(--muted-foreground)', fontFamily: "'DM Mono', monospace" }}>{d.date}</td>
                    <td style={{ padding: '10px 16px', fontSize: 13, fontFamily: "'DM Mono', monospace", color: d.days === 0 ? '#ffffff' : 'var(--foreground)' }}>
                      {d.days === 0 ? 'Today' : `${d.days}d`}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: s.bg, color: s.color, fontWeight: 600 }}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>

        {/* AI Q&A */}
        <div className="rounded-lg p-5 flex flex-col" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={15} color="var(--primary)" />
            <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
              Ask Compliance AI
            </h3>
          </div>

          <div
            className="flex-1 rounded-lg p-4 mb-3"
            style={{ background: 'var(--accent)', minHeight: 160, fontSize: 13, color: answer ? 'var(--foreground)' : 'var(--muted-foreground)', lineHeight: 1.65 }}
          >
            {loading && (
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
                <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:0.4} 40%{transform:translateY(-6px);opacity:1} }`}</style>
              </div>
            )}
            {!loading && !answer && 'Ask about GST filing, labor compliance, MSME regulations, deadlines, penalties...'}
            {!loading && answer && answer.split('\n').map((line, i) => {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              if (parts.length > 1) {
                return <div key={i} style={{ marginTop: i > 0 ? 4 : 0 }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</div>;
              }
              return line ? <div key={i} style={{ marginTop: i > 0 ? 3 : 0 }}>{line}</div> : <div key={i} style={{ height: 6 }} />;
            })}
          </div>

          <div className="flex gap-2">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && ask()}
              placeholder="e.g. When is my GSTR-3B due?"
              style={{
                flex: 1, background: 'var(--accent)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px',
                fontSize: 13, color: 'var(--foreground)', outline: 'none', fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              onClick={ask}
              style={{ background: 'var(--primary)', border: 'none', borderRadius: 6, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send size={14} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
