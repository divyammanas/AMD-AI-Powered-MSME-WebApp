import { useState, useRef, useEffect } from 'react';
import {
  Search, MapPin, Star, Upload, FileText, CheckCircle2, X,
  MessageCircle, ChevronRight, Send, Building2, Phone, Mail, Award,
  ArrowLeft, Cpu, Shield, Clock, Users, ChevronDown, Loader2,
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const nearbyCAs = [
  { id: 'CA-IN-1042', name: 'Rohan Mehta & Associates', city: 'Ahmedabad', distance: '1.2 km', rating: 4.8, reviews: 214, speciality: 'GST · MSME · Startup', years: 12, phone: '+91 98250 12042', email: 'rohan@mehta-ca.in', available: true },
  { id: 'CA-IN-2087', name: 'Priya Sharma CA Firm', city: 'Ahmedabad', distance: '2.6 km', rating: 4.6, reviews: 168, speciality: 'Direct Tax · Audit', years: 9, phone: '+91 98240 22087', email: 'priya@sharmaca.co.in', available: true },
  { id: 'CA-IN-3311', name: 'Kavya Patel Consultancy', city: 'Gandhinagar', distance: '4.1 km', rating: 4.9, reviews: 302, speciality: 'MSME Schemes · Subsidy', years: 15, phone: '+91 98790 03311', email: 'contact@kavyapatel.in', available: false },
  { id: 'CA-IN-4508', name: 'Nirmal & Sons CAs', city: 'Ahmedabad', distance: '5.4 km', rating: 4.4, reviews: 91, speciality: 'Compliance · ROC', years: 7, phone: '+91 99098 14508', email: 'firm@nirmalsons.in', available: true },
  { id: 'CA-IN-5902', name: 'Desai Financial Services', city: 'Ahmedabad', distance: '6.8 km', rating: 4.5, reviews: 177, speciality: 'GST · Import-Export', years: 11, phone: '+91 99795 65902', email: 'info@desaifs.co.in', available: true },
  { id: 'CA-IN-6214', name: 'Shah & Patel Associates', city: 'Vadodara', distance: '9.3 km', rating: 4.3, reviews: 83, speciality: 'Tax Planning · Audit', years: 6, phone: '+91 96650 76214', email: 'shahpatel@ca.in', available: false },
];

const requiredDocs = [
  { key: 'aadhar', label: 'Aadhaar Card', desc: 'Proprietor / Authorized Signatory', category: 'Identity', required: true },
  { key: 'pan', label: 'PAN Card', desc: 'Business & Proprietor PAN', category: 'Identity', required: true },
  { key: 'birth', label: 'Birth Certificate', desc: 'For age-linked eligibility schemes', category: 'Identity', required: false },
  { key: 'udyam', label: 'Udyam Registration', desc: 'MSME classification proof', category: 'Business', required: true },
  { key: 'gst', label: 'GST Certificate', desc: 'GSTIN registration document', category: 'Business', required: true },
  { key: 'bank', label: 'Bank Statement', desc: 'Last 6 months', category: 'Financial', required: true },
  { key: 'itr', label: 'ITR (Last 2 Years)', desc: 'Income Tax Return acknowledgement', category: 'Financial', required: true },
  { key: 'address', label: 'Business Address Proof', desc: 'Electricity bill / Rent agreement', category: 'Business', required: false },
  { key: 'photo', label: 'Passport Size Photo', desc: 'Recent colour photograph', category: 'Identity', required: false },
  { key: 'caste', label: 'Caste Certificate', desc: 'SC/ST/OBC (if applicable)', category: 'Identity', required: false },
];

const faqs = [
  { q: 'How do I find the right CA for my business?', a: 'Use the search bar above with a CA ID, or browse the Nearby CAs section. Each listing shows ratings, speciality, years of experience, and availability. Click "Connect" to send a request — the CA will respond within 24 hours.' },
  { q: 'Which documents are needed for MSME scheme claims?', a: 'For most government MSME schemes you\'ll need: Aadhaar, PAN, Udyam Registration, GST Certificate, 6-month bank statement, and ITR for the last 2 years. Upload them all in the Document Vault above — required docs are marked with a red dot.' },
  { q: 'How long does document verification take?', a: 'Standard verification is 24–48 hours. Aadhaar & PAN are usually verified within 2 hours via DigiLocker. You\'ll receive an SMS and email notification for each document that clears.' },
  { q: 'What government schemes can I apply for?', a: 'Once your Udyam & GST docs are uploaded, our system runs an eligibility scan across PMEGP, CGTMSE, MUDRA, ZED Certification, and 40+ state-level schemes. Results appear in your eligibility panel within 15 minutes.' },
  { q: 'Can I switch my CA after connecting?', a: 'Yes, anytime. Go to Nearby CAs, select a new firm and click "Request Switch". Your document history transfers securely and the previous CA is notified automatically.' },
  { q: 'Is my data secure?', a: 'Absolutely. All documents are encrypted end-to-end using AES-256 and stored on India-based servers compliant with the DPDP Act 2023. Only your assigned CA and you have access.' },
  { q: 'What is CA ID and where do I find it?', a: 'A CA ID is a unique identifier (format: CA-IN-XXXX) assigned to every registered Chartered Accountant on this platform. You can find it on their business card, email signature, or ask them directly.' },
  { q: 'How do I track my scheme application status?', a: 'Once your CA submits the application, a tracking ID appears in your dashboard. You can check real-time status updates from the relevant ministry portal, which we also display here automatically.' },
];

type DocStatus = 'pending' | 'uploading' | 'done';

export default function ClientPortal({ onBack }: Props) {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<typeof nearbyCAs[0] | null | 'notfound'>(null);
  const [searching, setSearching] = useState(false);
  const [docs, setDocs] = useState<Record<string, DocStatus>>({});
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I\'m your FAQ assistant. I can help you with questions about finding a CA, uploading documents, or checking scheme eligibility. Pick a question below or type your own.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [connectedCA, setConnectedCA] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<string>('All');
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, botTyping]);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    setSearching(true);
    setSearchResult(null);
    setTimeout(() => {
      const found = nearbyCAs.find(c => c.id.toLowerCase() === searchId.trim().toLowerCase());
      setSearchResult(found ?? 'notfound');
      setSearching(false);
    }, 800);
  };

  const handleUpload = (key: string) => {
    setDocs(d => ({ ...d, [key]: 'uploading' }));
    setTimeout(() => setDocs(d => ({ ...d, [key]: 'done' })), 1400);
  };

  const handleFaqClick = (i: number) => {
    setChatHistory(h => [...h, { role: 'user', text: faqs[i].q }]);
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setChatHistory(h => [...h, { role: 'bot', text: faqs[i].a }]);
    }, 900);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setChatInput('');
    setChatHistory(h => [...h, { role: 'user', text: q }]);
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      const matched = faqs.find(f => f.q.toLowerCase().split(' ').some(w => w.length > 4 && q.toLowerCase().includes(w)));
      setChatHistory(h => [...h, {
        role: 'bot',
        text: matched ? matched.a : 'I\'m best at answering questions about CA search, documents, and scheme claims. Try selecting one of the suggested questions below, or contact your assigned CA for personalised help.',
      }]);
    }, 900);
  };

  const categories = ['All', ...Array.from(new Set(requiredDocs.map(d => d.category)))];
  const filteredDocs = filterCat === 'All' ? requiredDocs : requiredDocs.filter(d => d.category === filterCat);
  const uploadedCount = Object.values(docs).filter(s => s === 'done').length;
  const requiredCount = requiredDocs.filter(d => d.required).length;
  const uploadedRequired = requiredDocs.filter(d => d.required && docs[d.key] === 'done').length;
  const progress = Math.round((uploadedCount / requiredDocs.length) * 100);

  return (
    <div style={{ background: '#080808', color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse-white { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); } 50% { box-shadow: 0 0 0 10px rgba(255,255,255,0); } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
        .cp-card { animation: fadeUp 0.45s ease-out both; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .cp-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.5) !important; box-shadow: 0 12px 32px rgba(255,255,255,0.06); }
        .cp-doc { transition: all 0.2s ease; }
        .cp-doc:hover { border-color: rgba(255,255,255,0.6) !important; background: rgba(255,255,255,0.02) !important; transform: translateX(4px); }
        .cp-btn-white { transition: all 0.2s ease; cursor: pointer; }
        .cp-btn-white:hover { background: #fff !important; color: #000 !important; box-shadow: 0 4px 16px rgba(255,255,255,0.2); }
        .cp-btn-ghost { transition: all 0.2s ease; cursor: pointer; }
        .cp-btn-ghost:hover { border-color: #fff !important; background: rgba(255,255,255,0.06) !important; }
        .cp-fab { animation: pulse-white 2.5s infinite; transition: transform 0.2s ease; }
        .cp-fab:hover { transform: scale(1.1); }
        .cp-faq-item { transition: all 0.18s ease; cursor: pointer; border-left: 2px solid transparent; }
        .cp-faq-item:hover { background: rgba(255,255,255,0.06) !important; border-left-color: #fff; padding-left: 14px !important; }
        .cp-chat-panel { animation: slideUp 0.35s cubic-bezier(0.34, 1.26, 0.64, 1); }
        .dot-typing span { animation: blink 1.2s infinite; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #aaa; margin: 0 2px; }
        .dot-typing span:nth-child(2) { animation-delay: 0.2s; }
        .dot-typing span:nth-child(3) { animation-delay: 0.4s; }
        .shimmer-bar { background: linear-gradient(90deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%); background-size: 200% auto; animation: shimmer 1.5s linear infinite; }
        .nav-link { transition: color 0.2s ease; cursor: pointer; }
        .nav-link:hover { color: #fff !important; }
      `}</style>

      {/* Top nav */}
      <header className="px-4 md:px-8" style={{ height: 60, background: '#000', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            className="cp-btn-ghost"
            style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 8, padding: '6px 12px', color: '#aaa', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div style={{ width: 1, height: 24, background: '#222' }} />
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo.jpg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontFamily: "'Roboto Slab', serif", fontSize: 15, fontWeight: 600 }}>Suvan <span className="hidden sm:inline">Business Portal</span></span>
          </a>
        </div>
        <div className="hidden sm:flex" style={{ alignItems: 'center', gap: 20 }}>
          {['Find CA', 'Documents', 'Schemes'].map(link => (
            <span key={link} className="nav-link hidden sm:block" style={{ fontSize: 13, color: '#666' }}>{link}</span>
          ))}
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>B</div>
        </div>
      </header>

      {/* Hero */}
      <div className="px-4 sm:px-6 md:px-12 py-10 md:py-14" style={{ background: '#000', borderBottom: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, animation: 'fadeUp 0.6s ease-out' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid #2a2a2a', borderRadius: 20, padding: '4px 12px', marginBottom: 18 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Business Owner Portal · Active</span>
          </div>
          <h1 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 36, fontWeight: 700, lineHeight: 1.2, color: '#fff', margin: 0, marginBottom: 14 }}>
            Your gateway to<br />government schemes & CA support
          </h1>
          <p style={{ color: '#666', fontSize: 15, lineHeight: 1.65, maxWidth: 540, margin: 0 }}>
            Find a verified Chartered Accountant near you, upload your documents securely, and get your business the benefits it deserves under MSME schemes.
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
            {[
              { icon: Users, label: '12,400+ CAs', sub: 'Verified nationwide' },
              { icon: Shield, label: 'AES-256', sub: 'Encrypted vault' },
              { icon: Clock, label: '24–48 hrs', sub: 'Avg. verification' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#141414', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="#aaa" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 11, color: '#666' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-10 py-8 md:py-16 mx-auto max-w-[1200px]">
        {/* ── CA SEARCH ── */}
        <section className="cp-card p-4 sm:p-6 md:p-8" style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: 14, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Search size={18} />
            <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>Search CA by Client ID</h2>
          </div>
          <p style={{ fontSize: 13, color: '#666', margin: '0 0 22px' }}>Enter the unique CA-IN identifier provided by your Chartered Accountant.</p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} color="#555" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. CA-IN-1042"
                style={{
                  width: '100%', background: '#050505', border: '1px solid #2a2a2a', borderRadius: 10,
                  padding: '13px 16px 13px 40px', color: '#fff', fontSize: 14,
                  fontFamily: "'DM Mono', monospace", outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#fff')}
                onBlur={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching}
              className="cp-btn-white"
              style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '0 28px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {searching ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : null}
              {searching ? 'Searching…' : 'Search'}
            </button>
          </div>

          {/* Result */}
          {searchResult && searchResult !== 'notfound' && (
            <div className="mt-5 p-5 bg-[#050505] border border-white rounded-xl animate-[fadeUp_0.4s_ease-out]">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#666', marginBottom: 4 }}>{searchResult.id}</div>
                    <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{searchResult.name}</div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>{searchResult.speciality} · {searchResult.years} yrs experience</div>
                    <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#aaa' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Phone size={12} />{searchResult.phone}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Mail size={12} />{searchResult.email}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Star size={12} fill="#fff" />{searchResult.rating} ({searchResult.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {connectedCA === searchResult.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e', fontSize: 13, color: '#22c55e' }}>
                      <CheckCircle2 size={14} /> Connected
                    </div>
                  ) : (
                    <button
                      onClick={() => setConnectedCA(searchResult.id)}
                      className="cp-btn-white"
                      style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600 }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {searchResult === 'notfound' && (
            <div style={{ marginTop: 16, padding: 14, background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 10, fontSize: 13, color: '#777', display: 'flex', alignItems: 'center', gap: 10 }}>
              <X size={16} color="#555" />
              No CA found with ID "<span style={{ fontFamily: "'DM Mono', monospace", color: '#aaa' }}>{searchId}</span>". Check the ID and try again, or browse nearby CAs below.
            </div>
          )}
        </section>

        {/* ── NEARBY CAs ── */}
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={18} />
                <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>Nearby Chartered Accountants</h2>
              </div>
              <p style={{ fontSize: 13, color: '#555', margin: '4px 0 0 28px' }}>Sorted by distance · Ahmedabad, Gujarat</p>
            </div>
            <button className="cp-btn-ghost" style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 8, padding: '7px 14px', color: '#aaa', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              Filter by Speciality <ChevronDown size={13} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {nearbyCAs.map((ca, i) => (
              <div
                key={ca.id}
                className="cp-card"
                style={{
                  background: '#0d0d0d', border: '1px solid #222', borderRadius: 12,
                  padding: 22, cursor: 'pointer', animationDelay: `${i * 50}ms`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 size={20} color="#aaa" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#555' }}>{ca.id}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginTop: 2 }}>{ca.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, flexShrink: 0 }}>
                    <Star size={11} fill="#fff" color="#fff" />
                    <span style={{ fontWeight: 600 }}>{ca.rating}</span>
                    <span style={{ color: '#555' }}>({ca.reviews})</span>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: '#777', marginBottom: 6 }}>{ca.speciality}</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 14 }}>{ca.years} yrs experience</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={11} />{ca.distance}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: ca.available ? '#22c55e' : '#555' }} />
                      <span style={{ color: ca.available ? '#22c55e' : '#555' }}>{ca.available ? 'Available' : 'Busy'}</span>
                    </div>
                  </div>
                  {connectedCA === ca.id ? (
                    <span style={{ fontSize: 11, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={12} /> Connected
                    </span>
                  ) : (
                    <button
                      onClick={() => setConnectedCA(ca.id)}
                      className="cp-btn-ghost"
                      style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 6, padding: '5px 12px', color: '#aaa', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      Connect <ChevronRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DOCUMENT VAULT ── */}
        <section className="cp-card p-4 sm:p-6 md:p-8" style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: 14, marginBottom: 28 }}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <Upload size={18} />
                <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>Document Vault</h2>
              </div>
              <p style={{ fontSize: 13, color: '#666', margin: 0 }}>Securely upload documents required for government MSME scheme claims.</p>
            </div>
            <div className="text-left sm:text-right">
              <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{uploadedCount}</div>
              <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>of {requiredDocs.length} uploaded</div>
              <div style={{ fontSize: 11, color: uploadedRequired === requiredCount ? '#22c55e' : '#888', marginTop: 4 }}>
                {uploadedRequired}/{requiredCount} required ✓
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ width: '100%', height: 3, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#fff', borderRadius: 2, transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className="cp-btn-ghost"
                style={{
                  background: filterCat === cat ? '#fff' : 'transparent',
                  color: filterCat === cat ? '#000' : '#666',
                  border: `1px solid ${filterCat === cat ? '#fff' : '#2a2a2a'}`,
                  borderRadius: 20, padding: '5px 14px', fontSize: 12, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
            {filteredDocs.map(doc => {
              const status = docs[doc.key] ?? 'pending';
              return (
                <div
                  key={doc.key}
                  className="cp-doc"
                  style={{
                    background: '#080808', border: `1px solid ${status === 'done' ? 'rgba(255,255,255,0.5)' : '#1e1e1e'}`,
                    borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
                    background: status === 'done' ? '#fff' : status === 'uploading' ? '#1a1a1a' : '#111',
                    color: status === 'done' ? '#000' : '#aaa',
                  }}>
                    {status === 'done' ? <CheckCircle2 size={18} /> : status === 'uploading' ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <FileText size={16} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{doc.label}</span>
                      {doc.required && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', display: 'inline-block', flexShrink: 0 }} title="Required" />}
                    </div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{doc.desc}</div>
                  </div>
                  <input ref={el => { fileRefs.current[doc.key] = el; }} type="file" style={{ display: 'none' }} onChange={() => handleUpload(doc.key)} />
                  <button
                    onClick={() => { if (status !== 'uploading') fileRefs.current[doc.key]?.click(); }}
                    disabled={status === 'uploading'}
                    className="cp-btn-ghost"
                    style={{
                      background: 'transparent', color: status === 'done' ? '#aaa' : '#fff',
                      border: `1px solid ${status === 'done' ? '#2a2a2a' : '#444'}`,
                      borderRadius: 6, padding: '5px 10px', fontSize: 11, flexShrink: 0,
                      opacity: status === 'uploading' ? 0.5 : 1,
                    }}
                  >
                    {status === 'pending' && 'Upload'}
                    {status === 'uploading' && 'Saving…'}
                    {status === 'done' && 'Replace'}
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20, padding: '12px 16px', background: '#080808', border: '1px solid #1a1a1a', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#555' }}>
            <Award size={14} />
            All documents encrypted end-to-end · AES-256 · India-based servers · DPDP Act 2023 compliant
          </div>
        </section>

        {/* ── SCHEME ELIGIBILITY TEASER ── */}
        <section className="cp-card p-4 sm:p-6 md:p-7" style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: 14 }}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 18, fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>Government Scheme Eligibility</h2>
              <p style={{ fontSize: 13, color: '#555', margin: 0 }}>Upload required docs to auto-scan eligibility across 40+ MSME schemes.</p>
            </div>
            {uploadedRequired < requiredCount ? (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#aaa' }}>Upload {requiredCount - uploadedRequired} more required doc{requiredCount - uploadedRequired > 1 ? 's' : ''}</div>
                <div style={{ width: 160, height: 3, background: '#1a1a1a', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(uploadedRequired / requiredCount) * 100}%`, background: '#fff', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ) : (
              <button className="cp-btn-white" style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 600 }}>
                Run Eligibility Scan
              </button>
            )}
          </div>
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['PMEGP', 'CGTMSE', 'MUDRA Loan', 'ZED Certification', 'Credit Guarantee Scheme', 'Technology Upgradation'].map(scheme => (
              <span
                key={scheme}
                style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, background: '#111', border: '1px solid #2a2a2a', color: '#666', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666'; }}
              >
                {scheme}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* ── FAQ CHATBOT ── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="cp-fab"
          style={{
            position: 'fixed', bottom: 28, right: 28, width: 58, height: 58, borderRadius: '50%',
            background: '#fff', color: '#000', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {chatOpen && (
        <div
          className="cp-chat-panel"
          style={{
            position: 'fixed', bottom: 24, right: 'min(24px, 4vw)', width: 'calc(100vw - 32px)', maxWidth: 380, height: 'calc(100vh - 120px)', maxHeight: 560,
            background: '#050505', border: '1px solid #fff', borderRadius: 16, zIndex: 200,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}
        >
          {/* Chat header */}
          <div style={{ padding: '15px 18px', background: '#fff', color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 14, fontWeight: 700 }}>FAQ Assistant</div>
                <div style={{ fontSize: 10, color: '#555', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                  Online · Instant replies
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#000', display: 'flex', alignItems: 'center', padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatHistory.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    background: m.role === 'user' ? '#fff' : '#111',
                    color: m.role === 'user' ? '#000' : '#ddd',
                    padding: '10px 14px', borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    fontSize: 13, lineHeight: 1.5, maxWidth: '86%',
                    animation: 'fadeUp 0.3s ease-out',
                  }}
                >
                  {m.text}
                </div>
              ))}
              {botTyping && (
                <div style={{ alignSelf: 'flex-start', background: '#111', padding: '12px 16px', borderRadius: '12px 12px 12px 2px' }}>
                  <div className="dot-typing"><span /><span /><span /></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested FAQs */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Suggested Questions</div>
              {faqs.map((f, i) => (
                <div
                  key={i}
                  onClick={() => handleFaqClick(i)}
                  className="cp-faq-item"
                  style={{
                    padding: '8px 10px', borderRadius: 6, marginBottom: 3,
                    fontSize: 12, color: '#888', display: 'flex', alignItems: 'flex-start', gap: 6,
                    transition: 'all 0.18s ease',
                  }}
                >
                  <ChevronRight size={12} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>{f.q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: '1px solid #1a1a1a', display: 'flex', gap: 8, flexShrink: 0 }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask a question…"
              style={{
                flex: 1, background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 8,
                padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#fff')}
              onBlur={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
            <button
              onClick={handleChatSend}
              className="cp-btn-white"
              style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '0 13px', display: 'flex', alignItems: 'center' }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
