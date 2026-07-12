import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, FileText, FileSearch, CheckCircle, PenTool, 
  Send, Activity, IndianRupee, ShieldCheck, ChevronDown, ChevronUp, Link as LinkIcon, ArrowRight
} from "lucide-react";

// Components
function MatchCard({ title, confidence, citation, onApprove, onReject }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
      className="p-4 border border-[#222222] bg-[#0d0d0d] rounded-lg mb-4 text-left shadow-lg"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-white text-sm">{title}</h4>
          <span className="text-xs text-[#888888] inline-flex items-center gap-1 mt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            {confidence}% Confidence Match
          </span>
        </div>
      </div>
      <div className="p-2 border border-[#222222] bg-[#050505] rounded text-xs text-[#888888] mb-4 font-mono">
        &gt; Citation: {citation}
      </div>
      <div className="flex gap-2">
        <button onClick={onReject} className="flex-1 py-1.5 border border-[#222222] text-[#888888] hover:bg-[#222222] hover:text-white transition-colors text-xs font-bold rounded">
          Reject
        </button>
        <button onClick={onApprove} className="flex-1 py-1.5 bg-white text-black hover:bg-gray-200 transition-colors text-xs font-bold rounded">
          Approve & Draft
        </button>
      </div>
    </motion.div>
  );
}

export function LandingClient({ onSignIn }: { onSignIn: (role: "ca" | "business") => void }) {
  const [view, setView] = useState<"ca" | "business">("ca");
  const [queue, setQueue] = useState([
    { id: 1, title: "PMEGP Capital Subsidy", confidence: 98, citation: "Turnover 3.2Cr < 5Cr Limit (Sec 4.1)" },
    { id: 2, title: "CLCSS Tech Upgradation", confidence: 85, citation: "Machinery invoice #442 aligns with Annexure II" },
  ]);
  const [approvedCount, setApprovedCount] = useState(0);

  const handleApprove = (id: number) => {
    setQueue(q => q.filter(item => item.id !== id));
    setApprovedCount(c => c + 1);
  };

  const handleReject = (id: number) => {
    setQueue(q => q.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#ffffff] font-sans selection:bg-white/20">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#080808]/90 backdrop-blur border-b border-[#222222]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded-sm overflow-hidden flex items-center justify-center">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold tracking-tight">Suvan</span>
          </a>
          <div className="flex gap-4 items-center">
            <button onClick={() => onSignIn(view)} className="text-sm font-medium text-[#888888] hover:text-white transition-colors">Sign In</button>
            <button onClick={() => onSignIn(view)} className="text-sm font-bold px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* 1. HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex p-1 bg-[#111111] border border-[#222222] rounded-md mb-8">
              <button 
                onClick={() => setView("ca")}
                className={`px-4 py-1.5 text-xs font-bold rounded-sm transition-colors ${view === "ca" ? "bg-[#222222] text-white" : "text-[#888888] hover:text-white"}`}
              >
                For CAs
              </button>
              <button 
                onClick={() => setView("business")}
                className={`px-4 py-1.5 text-xs font-bold rounded-sm transition-colors ${view === "business" ? "bg-[#222222] text-white" : "text-[#888888] hover:text-white"}`}
              >
                For Businesses
              </button>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              <span className={view === "business" ? "text-[#888888]" : ""}>AI finds the subsidy.</span><br/>
              <span className={view === "business" ? "text-white" : "text-[#888888]"}>You hold the pen.</span>
            </h1>
            
            <p className="text-lg text-[#888888] mb-10 max-w-lg leading-relaxed">
              {view === "ca" 
                ? "Stop manually hunting for MSME schemes. Our AI cross-references client data against 400+ policies, surfaces verified matches, and auto-drafts the paperwork. You just approve." 
                : "Get matched with a verified Chartered Accountant equipped with AI tools to instantly identify and claim government subsidies you didn't know you qualified for."}
            </p>

            <button onClick={() => onSignIn(view)} className="px-6 py-3 bg-white text-black font-bold rounded flex items-center gap-2 hover:bg-gray-200 transition-colors">
              {view === "ca" ? "Start Matching Clients" : "Find My Subsidy"}
            </button>
          </div>

          {/* Interactive Hero Element */}
          <div className="relative border border-[#222222] bg-[#050505] rounded-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-[#222222] pb-4">
              <h3 className="font-bold text-sm">Match Queue</h3>
              <span className="text-xs bg-[#111111] border border-[#222222] px-2 py-1 rounded">
                Drafts Ready: <span className="text-white font-bold">{approvedCount}</span>
              </span>
            </div>
            
            <div className="min-h-[280px]">
              <AnimatePresence>
                {queue.map((item) => (
                  <MatchCard 
                    key={item.id} 
                    title={item.title} 
                    confidence={item.confidence} 
                    citation={item.citation} 
                    onApprove={() => handleApprove(item.id)}
                    onReject={() => handleReject(item.id)}
                  />
                ))}
              </AnimatePresence>
              {queue.length === 0 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-10 text-[#888888] text-sm">
                  Queue cleared. Great job.
                  <button onClick={() => {
                    setQueue([
                      { id: 3, title: "State EV Transport Subsidy", confidence: 92, citation: "NAICS Code 484 matched to EV incentive" },
                      { id: 4, title: "Export Promotion Capital Goods", confidence: 88, citation: "Export ratio > 20% confirmed via GST returns" }
                    ]);
                  }} className="block mx-auto mt-4 underline text-white hover:text-gray-300">Load more mock data</button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 2. CORE LOOP */}
        <section className="border-t border-[#222222] bg-[#050505] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-16 text-center">The 7-Step Functional Pipeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {[
                { icon: FileText, title: "1. Ingest", desc: "Data sync via GST/Tally." },
                { icon: FileSearch, title: "2. Match", desc: "AI scans 400+ schemes." },
                { icon: ShieldCheck, title: "3. Review", desc: "CA verifies citations." },
                { icon: PenTool, title: "4. Draft", desc: "AI maps data to forms." },
                { icon: Send, title: "5. Submit", desc: "CA signs and files." },
                { icon: Activity, title: "6. Track", desc: "Real-time portal status." },
                { icon: IndianRupee, title: "7. Fee", desc: "Invoiced on success." },
              ].map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex flex-row md:flex-col items-center md:items-start text-left gap-4 p-4 border border-[#222222] bg-[#0d0d0d] rounded-lg"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-[#111111] border border-[#222222] rounded shrink-0">
                    <step.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-white">{step.title}</h4>
                    <p className="text-xs text-[#888888]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. TRUST PROOF */}
        <section className="py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Transparency is non-negotiable.</h2>
            <p className="text-[#888888] mb-6 leading-relaxed">Every match our AI surfaces is backed by an exact citation. If the AI claims a client is eligible, it shows you exactly where in the government notification that rule exists, alongside the specific piece of client data that satisfies it.</p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-sm text-[#888888]">No black box reasoning.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-sm text-[#888888]">Direct PDF links to official government gazettes.</span>
              </li>
            </ul>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 border border-[#222222] bg-[#0a0a0a] rounded-lg font-mono text-sm relative"
          >
            <div className="absolute top-0 right-0 p-2 border-b border-l border-[#222222] bg-[#111111] rounded-bl-lg text-xs font-sans font-bold">Trace Viewer</div>
            <div className="mb-4 pt-4">
              <span className="text-[#888888]">Assertion:</span> <span className="text-white">Applicant turnover requirement met.</span>
            </div>
            <div className="mb-4 pl-4 border-l-2 border-[#222222]">
              <span className="text-[#888888] block text-xs mb-1">EVIDENCE 1: GST Data</span>
              <span className="text-white">FY23_Turnover = ₹3.2Cr</span>
            </div>
            <div className="mb-4 pl-4 border-l-2 border-[#222222]">
              <span className="text-[#888888] block text-xs mb-1">EVIDENCE 2: Govt Rule</span>
              <span className="text-white">"Turnover must not exceed ₹5.0Cr"</span>
              <a href="#" className="flex items-center gap-1 text-[#888888] hover:text-white mt-1 text-xs underline decoration-[#222222]">
                <LinkIcon className="w-3 h-3" /> CGST_Notif_2023.pdf, Page 12
              </a>
            </div>
            <div className="mt-6 border-t border-[#222222] pt-4 flex items-center justify-between font-sans">
              <span className="text-xs font-bold text-emerald-500">Trace Verified</span>
            </div>
          </motion.div>
        </section>

        {/* 4. CA TIERS */}
        <section className="py-24 bg-[#050505] border-y border-[#222222]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Functional Pricing</h2>
              <div className="inline-block px-4 py-2 border border-[#222222] bg-[#0a0a0a] rounded text-sm text-white shadow-sm">
                <ShieldCheck className="inline w-4 h-4 mr-2 text-[#888888]" />
                Core AI matching accuracy is <strong className="text-white">100% identical</strong> across all tiers.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Starter", price: "Free", limit: "Up to 10 clients", features: ["Manual drafting", "Basic scheme alerts"] },
                { name: "Growth", price: "₹4,999/mo", limit: "Unlimited clients", features: ["Auto-drafting AI", "Full citation traces", "Success-fee tools"], highlight: true },
                { name: "Enterprise", price: "Custom", limit: "Unlimited clients", features: ["API access", "On-prem data options", "Dedicated account mgr"] }
              ].map(tier => (
                <div key={tier.name} className={`p-6 border rounded-lg flex flex-col transition-colors ${tier.highlight ? 'border-white bg-[#0d0d0d] shadow-lg' : 'border-[#222222] bg-[#0a0a0a] hover:border-gray-500'}`}>
                  <h3 className="font-bold text-lg mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold mb-1">{tier.price}</div>
                  <div className="text-xs text-[#888888] mb-6 pb-6 border-b border-[#222222]">{tier.limit}</div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="text-sm flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#888888] shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded text-sm font-bold transition-colors ${tier.highlight ? 'bg-white text-black hover:bg-gray-200' : 'border border-[#222222] text-[#888888] hover:text-white hover:bg-[#111111]'}`}>
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. MARKETPLACE FLOW */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How matching works for businesses</h2>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 p-6 border border-[#222222] bg-[#0a0a0a] rounded-lg">
              <div className="text-xs text-[#888888] mb-2 font-mono">STEP 01</div>
              <h3 className="font-bold mb-2">Profile Intake</h3>
              <p className="text-sm text-[#888888]">Business submits basic GST/Udyam data. AI identifies potential matches instantly.</p>
            </div>
            <div className="hidden md:flex items-center justify-center text-[#222222]"><ArrowRight /></div>
            <div className="flex-1 p-6 border border-[#222222] bg-[#0a0a0a] rounded-lg">
              <div className="text-xs text-[#888888] mb-2 font-mono">STEP 02</div>
              <h3 className="font-bold mb-2">CA Queue Route</h3>
              <p className="text-sm text-[#888888]">The profile is routed to verified CAs in the network who specialize in those specific schemes.</p>
            </div>
            <div className="hidden md:flex items-center justify-center text-[#222222]"><ArrowRight /></div>
            <div className="flex-1 p-6 border border-[#222222] bg-[#0a0a0a] rounded-lg border-l-4 border-l-[#888888]">
              <div className="text-xs text-[#888888] mb-2 font-mono">STEP 03</div>
              <h3 className="font-bold mb-2">SLA Enforced</h3>
              <p className="text-sm text-[#888888]">If a CA does not accept the match within 24 hours, the lead is rerouted to ensure the business gets served.</p>
            </div>
          </div>
        </section>

        {/* 6. HONEST FAQ */}
        <section className="py-24 bg-[#050505] border-y border-[#222222]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10">Candid FAQ</h2>
            <div className="space-y-4">
              <FaqItem 
                q="What stops a business from taking the AI match and applying directly to avoid the CA fee?"
                a="Our AI generates the draft, but government portals require CA credentials, digital signatures, and professional certification for final submission. The business physically cannot proceed without you."
              />
              <FaqItem 
                q="If the AI drafts the application, who holds the liability?"
                a="The Chartered Accountant. Suvan is a drafting and research tool, not a legal entity. You must review the citations and the draft before applying your digital signature. That's why human-in-the-loop is mandatory."
              />
              <FaqItem 
                q="Does cheaper tier mean worse AI accuracy?"
                a="No. Core matching logic and citation engines are identical across all tiers. You pay more for scale (unlimited clients) and operational automation (auto-drafting), not for better math."
              />
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-[#222222] bg-[#080808] pt-12 pb-8 px-6 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
                <span className="text-black font-bold text-[10px]">S</span>
              </div>
              <span className="font-bold tracking-tight">Suvan</span>
            </a>
            <p className="text-[#888888] max-w-xs mb-6">
              AI infrastructure for MSME compliance and government subsidies.
            </p>
            <div className="p-4 border border-[#222222] rounded bg-[#0a0a0a] max-w-sm">
              <strong className="text-white block mb-1">Explicitly Out of Scope for v1:</strong>
              <span className="text-[#888888]">Generic accounting, tax filing, tender matching, or compliance monitoring. We do subsidies.</span>
            </div>
          </div>
          <div className="flex flex-col md:items-end text-[#888888] space-y-2">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Security & Trust</a>
            <a href="#" className="hover:text-white transition-colors">CA Network Agreement</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#222222] text-[#888888] flex flex-col sm:flex-row justify-between gap-4">
          <span>© 2026 Suvan</span>
          <span>Not affiliated with the Govt of India.</span>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#222222] bg-[#0a0a0a] rounded-lg overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full p-4 flex justify-between items-center text-left font-bold hover:bg-[#111111] transition-colors"
      >
        {q}
        {open ? <ChevronUp className="w-4 h-4 text-[#888888] shrink-0 ml-4" /> : <ChevronDown className="w-4 h-4 text-[#888888] shrink-0 ml-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="px-4 text-[#888888] text-sm leading-relaxed overflow-hidden"
          >
            <div className="pb-4 pt-1">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
