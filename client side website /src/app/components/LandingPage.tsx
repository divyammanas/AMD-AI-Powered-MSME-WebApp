import { useState } from 'react';
import { Cpu, ArrowRight, BarChart3, ShieldCheck, TrendingUp, Bot, Building2, FileText, MapPin, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  onSelectMode: (mode: 'msme' | 'client' | 'signup') => void;
}

const msmeFeatures = [
  { icon: BarChart3, text: 'Real-time market intelligence' },
  { icon: TrendingUp, text: 'Financial analysis & forecasting' },
  { icon: Bot, text: 'AI-powered business advisor' },
  { icon: ShieldCheck, text: 'GST & compliance tracking' },
];

const clientFeatures = [
  { icon: MapPin, text: 'Find nearby CAs by ID' },
  { icon: FileText, text: 'Document vault for scheme claims' },
  { icon: CheckCircle2, text: 'Government scheme eligibility' },
  { icon: MessageCircle, text: 'FAQ assistant 24/7' },
];

export default function LandingPage({ onSelectMode }: Props) {
  const [hovered, setHovered] = useState<'msme' | 'client' | null>(null);

  return (
    <div className="min-h-screen bg-[#080808] font-['DM_Sans'] flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden text-[#fff]">
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 opacity-40" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl animate-[fadeUp_0.6s_ease-out]">
          <a href="/" className="flex items-center justify-center gap-3 mb-6 hover:opacity-80 transition-opacity" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-['Roboto_Slab'] text-3xl font-bold tracking-tight text-[#fff]">
              Suvan
            </h1>
          </a>
          <h2 className="font-['Roboto_Slab'] text-4xl md:text-5xl font-semibold leading-tight mb-4 text-[#fff]">
            AI-Powered Business Intelligence <br />
            <span className="text-[#aaa]">for Indian MSMEs</span>
          </h2>
          <p className="text-[#666] text-lg">
            Powered by AMD ROCm · Ollama · Qwen2.5:7b — Built for Bharat's business backbone.
          </p>
        </div>

        {/* Selection Prompt */}
        <div className="text-center mb-8 animate-[fadeUp_0.7s_ease-out]">
          <span className="text-sm text-[#555] tracking-widest uppercase font-semibold">
            Select your portal
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-[fadeUp_0.8s_ease-out]">
          
          {/* MSME Card */}
          <div
            onMouseEnter={() => setHovered('msme')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelectMode('msme')}
            className={`group relative flex flex-col p-8 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
              ${hovered === 'msme' ? 'bg-[#111] border border-[#fff] shadow-[0_12px_32px_rgba(255,255,255,0.06)] -translate-y-2 scale-[1.02]' : 'bg-[#0d0d0d] border border-[#222]'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300
                ${hovered === 'msme' ? 'bg-[#fff] text-[#000]' : 'bg-[#1a1a1a] text-[#aaa]'}`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-['Roboto_Slab'] text-xl font-semibold text-[#fff]">MSME Platform</h3>
                <p className="text-sm text-[#666]">Business Intelligence</p>
              </div>
            </div>
            
            <p className="text-[#888] mb-8 leading-relaxed">
              Access your full AI-powered dashboard — market insights, financial analytics, compliance alerts, and supplier management — all in one place.
            </p>
            
            <div className="flex flex-col gap-3 mb-8 flex-1">
              {msmeFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#aaa]">
                  <Icon className={`w-4 h-4 ${hovered === 'msme' ? 'text-[#fff]' : 'text-[#555]'}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            
            <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-white text-black hover:bg-gray-200 shadow-lg`}>
              Enter MSME Platform <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Client Card */}
          <div
            onMouseEnter={() => setHovered('client')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelectMode('client')}
            className={`group relative flex flex-col p-8 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
              ${hovered === 'client' ? 'bg-[#111] border border-[#fff] shadow-[0_12px_32px_rgba(255,255,255,0.06)] -translate-y-2 scale-[1.02]' : 'bg-[#0d0d0d] border border-[#222]'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300
                ${hovered === 'client' ? 'bg-[#fff] text-[#000]' : 'bg-[#1a1a1a] text-[#aaa]'}`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-['Roboto_Slab'] text-xl font-semibold text-[#fff]">Connect CA</h3>
                <p className="text-sm text-[#666]">CA Services & Portal</p>
              </div>
            </div>
            
            <p className="text-[#888] mb-8 leading-relaxed">
              Find a verified CA near you, upload your documents, check scheme eligibility and get guided help through any government benefit application process.
            </p>
            
            <div className="flex flex-col gap-3 mb-8 flex-1">
              {clientFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#aaa]">
                  <Icon className={`w-4 h-4 ${hovered === 'client' ? 'text-[#fff]' : 'text-[#555]'}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            
            <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-white text-black hover:bg-gray-200 shadow-lg`}>
              Connect CA <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Footer Tags */}
        <div className="mt-16 flex items-center justify-center gap-4 flex-wrap animate-[fadeUp_1s_ease-out]">
          {['AMD ROCm Accelerated', 'Qwen2.5:7b LLM', 'DPDP Act 2023 Compliant', 'Made for Bharat'].map(tag => (
            <span
              key={tag}
              className="text-xs text-[#666] px-4 py-1.5 rounded-full border border-[#2a2a2a] bg-[#111]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
