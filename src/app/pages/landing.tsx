import { motion } from "motion/react";
import { 
  Zap, ArrowRight, UploadCloud, Sparkles, UserCheck, 
  FileEdit, TrendingUp, Search, FileText, Globe, Receipt, 
  CheckCircle, Shield, Building2
} from "lucide-react";

export function Landing({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="dark min-h-screen bg-[#050507] text-[#f1f5f9] font-sans overflow-x-hidden selection:bg-[#8f9fed]/30">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#050507]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8f9fed] to-[#5a4386] flex items-center justify-center shadow-[0_0_16px_rgba(143,159,237,0.3)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Ledgerly</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onSignIn} className="text-sm font-medium text-[#f1f5f9] hover:text-[#8f9fed] transition-colors hidden sm:block">
              Sign In
            </button>
            <button onClick={onSignIn} className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-br from-[#8f9fed] to-[#5a4386] hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(143,159,237,0.25)]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Ambient background glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#8f9fed]/20 to-[#5a4386]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-[#8f9fed] mb-8 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            <span>Ledgerly AI matches MSMEs with government schemes</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Find the government money <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8f9fed] to-[#bfa8eb]">your clients already qualify for.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mb-10 leading-relaxed">
            Ledgerly securely connects to financial data to discover, match, and seamlessly draft applications for unclaimed MSME subsidies—all while keeping the Chartered Accountant in total control.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full justify-center">
            <button onClick={onSignIn} className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-br from-[#8f9fed] to-[#5a4386] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(143,159,237,0.3)]">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors">
              See how it works
            </button>
          </div>

          {/* Floating UI Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl p-6 rounded-2xl bg-[#090b0f]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="flex items-start justify-between relative z-10">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#8f9fed]/10 flex items-center justify-center border border-[#8f9fed]/20">
                  <Shield className="w-6 h-6 text-[#8f9fed]" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white mb-1">PMEGP Subsidy Match</h3>
                  <p className="text-sm text-[#94a3b8]">Prime Minister's Employment Generation Programme</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">98% Confidence</span>
                    <span className="px-2 py-1 rounded bg-[#8f9fed]/10 text-[#8f9fed] text-xs font-medium border border-[#8f9fed]/20">Requires CA Review</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#94a3b8] mb-1">Estimated Value</div>
                <div className="text-2xl font-bold text-white">₹25,00,000</div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm relative z-10">
              <div className="flex items-center gap-2 text-[#94a3b8]">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>GST data verified</span>
              </div>
              <button className="text-[#8f9fed] font-medium hover:text-white transition-colors">Draft Application →</button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-[#475569] mb-6 uppercase tracking-wider">Trusted by modern CA firms across India</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Placeholders for logos */}
            <div className="flex items-center gap-2 font-bold text-xl"><Building2 className="w-6 h-6" /> Vertex Associates</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> Nexa Tax & Co.</div>
            <div className="flex items-center gap-2 font-bold text-xl"><TrendingUp className="w-6 h-6" /> ClearBooks LLP</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6" /> Apex Financial</div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">A workflow built for professionals</h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">From raw documents to filed applications in a fraction of the time, all with verifiable citations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-10 right-10 h-0.5 bg-white/5 z-0" />
          
          {[
            { icon: UploadCloud, title: "1. Upload Data", desc: "Sync via GSTN, Tally, or bulk PDF upload." },
            { icon: Sparkles, title: "2. AI Match", desc: "Our engine cross-references 400+ schemes instantly." },
            { icon: UserCheck, title: "3. CA Review", desc: "Verify citations against source government docs." },
            { icon: FileEdit, title: "4. Auto-Draft", desc: "AI generates the complete application packet." },
            { icon: TrendingUp, title: "5. Disburse", desc: "Track status across portals until funds arrive." },
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-[#090b0f] border border-white/5">
              <div className="w-14 h-14 rounded-full bg-[#151a23] border border-white/10 flex items-center justify-center mb-4 shadow-lg shadow-[#050507]">
                <step.icon className="w-6 h-6 text-[#8f9fed]" />
              </div>
              <h3 className="text-base font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURES GRID */}
      <section id="product" className="py-24 px-6 bg-[#090b0f]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Enterprise-grade capabilities</h2>
            <p className="text-[#94a3b8] max-w-2xl text-lg">Designed specifically for the strict compliance and scaling needs of modern Chartered Accountancy firms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Citation-Backed Matching", desc: "Every eligibility claim is linked directly to the official scheme notification PDF for immediate verification." },
              { icon: Shield, title: "Human-in-the-Loop", desc: "Ledgerly doesn't file automatically. We prepare the drafts, you review, sign, and submit with your credentials." },
              { icon: FileText, title: "Smart Auto-Drafting", desc: "We map your client's parsed financial data onto official PDF application forms automatically." },
              { icon: Activity, title: "Unified Status Tracking", desc: "Stop logging into 15 different government portals. See the status of all applications in one dashboard." },
              { icon: Globe, title: "Multilingual Support", desc: "Parse state-level scheme documents in regional languages (Hindi, Marathi, Gujarati, etc.) with high accuracy." },
              { icon: Receipt, title: "Success-Fee Billing", desc: "Automatically generate invoices for your clients when a subsidy is successfully disbursed based on a % fee." },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#050507] border border-white/5 hover:border-[#8f9fed]/30 transition-colors group">
                <feature.icon className="w-8 h-8 text-[#5a4386] mb-6 group-hover:text-[#8f9fed] transition-colors" />
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOR CAs / FOR BUSINESSES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For CAs */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[#121626] to-[#090b0f] border border-[#8f9fed]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8f9fed]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-sm font-bold tracking-wider text-[#8f9fed] uppercase mb-4">For CA Firms</h3>
            <h2 className="text-3xl font-bold text-white mb-6">Scale your advisory practice</h2>
            <ul className="space-y-4 mb-8">
              {["Unlock a new high-margin revenue stream.", "Automate 90% of the manual research and drafting.", "Manage hundreds of client applications in one unified view."].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#8f9fed] shrink-0 mt-0.5" />
                  <span className="text-[#94a3b8]">{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={onSignIn} className="text-[#8f9fed] font-semibold flex items-center gap-2 hover:text-white transition-colors">
              Explore firm benefits <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* For Businesses */}
          <div className="p-10 rounded-3xl bg-[#090b0f] border border-white/10 hover:border-white/20 transition-colors">
            <h3 className="text-sm font-bold tracking-wider text-[#475569] uppercase mb-4">For MSMEs</h3>
            <h2 className="text-3xl font-bold text-white mb-6">Access the capital you deserve</h2>
            <ul className="space-y-4 mb-8">
              {["Discover obscure state and central schemes you qualify for.", "Provide view-only access to your CA to handle the paperwork.", "Receive funds faster with error-free applications."].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#475569] shrink-0 mt-0.5" />
                  <span className="text-[#94a3b8]">{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={onSignIn} className="text-[#f1f5f9] font-semibold flex items-center gap-2 hover:text-[#8f9fed] transition-colors">
              Invite your CA <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. PRICING TEASER */}
      <section id="pricing" className="py-24 px-6 bg-[#090b0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Simple, transparent pricing</h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">Start for free, upgrade when your practice grows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-8 rounded-2xl border border-white/5 bg-[#050507] flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <div className="text-[#94a3b8] text-sm mb-6">For independent practitioners</div>
              <div className="text-4xl font-bold text-white mb-6">₹0<span className="text-lg text-[#475569] font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-1 text-sm text-[#94a3b8]">
                <li>Up to 10 client profiles</li>
                <li>Basic scheme matching</li>
                <li>Manual drafting</li>
              </ul>
              <button onClick={onSignIn} className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium">Start Free</button>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-2xl border border-[#8f9fed]/50 bg-gradient-to-b from-[#121626] to-[#050507] flex flex-col relative shadow-[0_0_30px_rgba(143,159,237,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#8f9fed] text-[#050507] text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
              <div className="text-[#94a3b8] text-sm mb-6">For growing CA firms</div>
              <div className="text-4xl font-bold text-white mb-6">₹4,999<span className="text-lg text-[#475569] font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-1 text-sm text-[#f1f5f9]">
                <li>Unlimited client profiles</li>
                <li>AI Auto-drafting</li>
                <li>Citation verification</li>
                <li>Success-fee billing tools</li>
              </ul>
              <button onClick={onSignIn} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#8f9fed] to-[#5a4386] hover:opacity-90 transition-opacity font-medium">Start 14-Day Trial</button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl border border-white/5 bg-[#050507] flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-[#94a3b8] text-sm mb-6">For large national practices</div>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-3 mb-8 flex-1 text-sm text-[#94a3b8]">
                <li>Custom API integrations</li>
                <li>Dedicated account manager</li>
                <li>On-premise deployment options</li>
              </ul>
              <button onClick={onSignIn} className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium">Contact Sales</button>
            </div>
          </div>
          
          <div className="text-center mt-8">
             <a href="#" className="text-[#8f9fed] hover:text-white transition-colors text-sm font-medium">See detailed feature comparison →</a>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#8f9fed]/10 to-[#5a4386]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to modernise your compliance practice?</h2>
          <p className="text-xl text-[#94a3b8] mb-10">Join hundreds of top CAs using Ledgerly to deliver massive value to their MSME clients.</p>
          <button onClick={onSignIn} className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#8f9fed] to-[#5a4386] text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(143,159,237,0.3)]">
            Get Started Today
          </button>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#050507] border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#8f9fed] to-[#5a4386] flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Ledgerly</span>
            </div>
            <p className="text-[#475569] text-sm mb-6 max-w-sm leading-relaxed">
              The AI-powered subsidy discovery and compliance platform built exclusively for Indian Chartered Accountants and MSMEs.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li><a href="#" className="hover:text-white transition-colors">Scheme Matching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Auto-Drafting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
          <p>© 2026 Ledgerly Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Activity icon missing from lucide import above, adding a simple fallback component just in case
function Activity(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
