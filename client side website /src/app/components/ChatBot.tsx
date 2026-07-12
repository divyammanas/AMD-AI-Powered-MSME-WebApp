import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const suggestions = [
  'Analyze my Q3 revenue performance',
  'How can I reduce production costs?',
  'What are market expansion opportunities?',
  'Help me with GST compliance',
  'Evaluate my top suppliers',
];

const aiResponses: Record<string, string> = {
  default: `Based on your business data, I can see several strategic opportunities:

**Revenue Growth**: Your current MoM growth rate of 12.4% is strong, but there's potential to push this to 18% by targeting Tier-2 cities in Maharashtra and Gujarat where your product category has 34% unmet demand.

**Cost Optimization**: Production costs at ₹5.2L represent 35% of expenses. Renegotiating with your top 3 raw material suppliers (who together account for 68% of input costs) could yield 8–12% savings.

**Working Capital**: Your current ratio of 1.8 is healthy, but optimizing receivables — especially from Sharma Traders and Gupta Enterprises who average 42-day payment cycles — could free up ₹3.2L in liquidity.

Would you like a deeper analysis on any of these areas?`,

  revenue: `**Q3 Revenue Analysis — July 2025**

Your Q3 revenue of ₹24.8L represents a **12.4% increase** over Q2 (₹22.1L). Key drivers:

• **Top product line** (Textile Components): ₹9.2L (+18% YoY)
• **New customer acquisitions**: 47 new accounts added
• **Average order value**: increased from ₹18,400 to ₹21,200

**Risks to watch:**
- Seasonal slowdown expected in Aug–Sep; plan for 8–10% dip
- Raw material prices up 6% — may squeeze margins in Q4

**Recommendation**: Lock in forward contracts with Kaveri Fabrics and Ratan Steel before August price revision.`,

  cost: `**Cost Reduction Analysis**

I've identified **₹2.8L in annual savings** across 4 areas:

1. **Supplier Consolidation** — Reduce from 12 to 8 suppliers; negotiate volume discounts. Estimated saving: ₹1.1L/yr
2. **Energy Audit** — Production floor uses 340 kWh/day. LED retrofit + scheduling saves ~22%. Saving: ₹68K/yr
3. **Logistics Optimization** — Route consolidation for Pune/Nashik deliveries. Saving: ₹45K/yr
4. **Inventory Management** — Reduce safety stock by 15% using demand forecasting. Saving: ₹80K in working capital

Want me to generate a detailed implementation roadmap for any of these?`,

  gst: `**GST Compliance Status**

Your next GST filing is due in **3 days** (August 11, 2025). Here's your checklist:

✅ GSTR-1 (outward supplies) — data ready
✅ Input Tax Credit reconciliation — completed
⚠️ GSTR-3B — awaiting invoice confirmation from 2 vendors
❌ E-invoicing for 3 transactions > ₹5L — needs action

**Action required:**
Contact Mehta Packaging (INV-2025-0234) and Sri Balaji Textiles (INV-2025-0241) for invoice confirmation today.

**ITC available this month**: ₹1.84L — ensure you claim before filing.

Shall I prepare the filing summary report?`,

  supplier: `**Supplier Evaluation Report**

Based on the last 6 months of transaction data, here's your supplier scorecard:

| Supplier | Score | Delivery | Quality |
|---|---|---|---|
| Kaveri Fabrics | 9.2/10 | 98% on-time | Excellent |
| Ratan Steel | 8.7/10 | 94% on-time | Good |
| Mehta Packaging | 7.1/10 | 87% on-time | Average |
| Sri Balaji Textiles | 6.4/10 | 79% on-time | Needs review |

**Recommendation**: Sri Balaji Textiles is underperforming — suggest issuing a performance improvement notice and qualifying 2 backup suppliers in the same category. I've identified Sunrise Weaves and Pioneer Fabrics as potential alternatives.`,
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('revenue') || lower.includes('q3') || lower.includes('sales')) return aiResponses.revenue;
  if (lower.includes('cost') || lower.includes('reduc') || lower.includes('produc')) return aiResponses.cost;
  if (lower.includes('gst') || lower.includes('tax') || lower.includes('complian')) return aiResponses.gst;
  if (lower.includes('supplier') || lower.includes('vendor') || lower.includes('evaluat')) return aiResponses.supplier;
  return aiResponses.default;
}

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `Namaste! I'm your **AI Business Advisor** powered by Qwen2.5:7b running on AMD ROCm.\n\nI have access to your financial data, supplier records, compliance status, and market analytics. Ask me anything about your MSME — I'll give you actionable, data-driven insights.`,
      timestamp: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now(), role: 'user', content: text, timestamp: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getResponse(text),
        timestamp: now(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, delay);
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: 700, marginTop: i > 0 ? 8 : 0, color: 'var(--foreground)' }}>{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return <div key={i} style={{ paddingLeft: 12, marginTop: 3 }}>{line}</div>;
      }
      if (line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('❌')) {
        return <div key={i} style={{ marginTop: 3 }}>{line}</div>;
      }
      // bold inline
      const parts = line.split(/\*\*(.*?)\*\*/g);
      if (parts.length > 1) {
        return (
          <div key={i} style={{ marginTop: i > 0 ? 4 : 0 }}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          </div>
        );
      }
      return line ? <div key={i} style={{ marginTop: i > 0 ? 4 : 0 }}>{line}</div> : <div key={i} style={{ height: 6 }} />;
    });
  };

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
        style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full flex items-center justify-center" style={{ width: 36, height: 36, background: '#ffffff18' }}>
            <Bot size={18} color="var(--primary)" />
          </div>
          <div>
            <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
              AI Business Advisor
            </div>
            <div style={{ fontSize: 11, color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              Qwen2.5:7b · AMD ROCm
            </div>
          </div>
        </div>
        <button
          onClick={() => setMessages(prev => [prev[0]])}
          style={{ color: 'var(--muted-foreground)', background: 'transparent', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
        >
          <RefreshCw size={13} /> New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-5">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div
              className="flex-shrink-0 rounded-full flex items-center justify-center"
              style={{
                width: 32, height: 32,
                background: msg.role === 'assistant' ? '#ffffff18' : 'var(--accent)',
              }}
            >
              {msg.role === 'assistant'
                ? <Sparkles size={14} color="var(--primary)" />
                : <User size={14} color="var(--muted-foreground)" />}
            </div>
            <div style={{ maxWidth: '72%' }}>
              <div
                className="rounded-lg px-4 py-3"
                style={{
                  background: msg.role === 'assistant' ? 'var(--card)' : '#ffffff20',
                  border: msg.role === 'assistant' ? '1px solid var(--border)' : '1px solid #ffffff40',
                  fontSize: 13,
                  color: 'var(--foreground)',
                  lineHeight: 1.6,
                }}
              >
                {formatContent(msg.content)}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted-foreground)', marginTop: 4, fontFamily: "'DM Mono', monospace", textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: '#ffffff18' }}>
              <Sparkles size={14} color="var(--primary)" />
            </div>
            <div className="rounded-lg px-4 py-3" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="flex gap-1 items-center" style={{ height: 20 }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)',
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-4 sm:px-6 pb-3 flex gap-2 flex-wrap">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="rounded-full px-3 py-1.5 transition-colors"
              style={{ background: 'var(--accent)', color: 'var(--muted-foreground)', fontSize: 12, border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--card)' }}
      >
        <div
          className="flex items-end gap-3 rounded-lg px-4 py-3"
          style={{ background: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask me about your business, finances, compliance, suppliers..."
            rows={1}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--foreground)', fontSize: 13, resize: 'none', lineHeight: 1.5,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="rounded-md flex items-center justify-center transition-all"
            style={{
              width: 34, height: 34, flexShrink: 0,
              background: input.trim() && !loading ? 'var(--primary)' : 'var(--muted)',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              border: 'none',
            }}
          >
            <Send size={15} color={input.trim() && !loading ? '#fff' : 'var(--muted-foreground)'} />
          </button>
        </div>
        <div style={{ fontSize: 10, color: 'var(--muted-foreground)', marginTop: 6, textAlign: 'center', fontFamily: "'DM Mono', monospace" }}>
          Shift+Enter for new line · Enter to send
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
