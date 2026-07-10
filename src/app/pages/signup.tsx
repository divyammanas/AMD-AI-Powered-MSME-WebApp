import { useState, useEffect } from 'react';
import { ChevronLeft, Building2, Briefcase, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Lock, User, FileText } from 'lucide-react';

interface Props {
  onBack: () => void;
  onComplete: (role: 'business' | 'ca') => void;
}

export default function Signup({ onBack, onComplete }: Props) {
  const [role, setRole] = useState<'business' | 'ca'>('business');
  
  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  // CA specific
  const [caId, setCaId] = useState('');
  const [hasFirm, setHasFirm] = useState(false);
  const [firmName, setFirmName] = useState('');
  const [firmAddress, setFirmAddress] = useState('');
  
  // Business specific
  const [companyName, setCompanyName] = useState('');
  const [udyam, setUdyam] = useState('');

  // Captcha (Simple Math)
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAns, setCaptchaAns] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    // Generate simple captcha on mount or role change
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAns('');
    setCaptchaError(false);
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (!/^\d{10}$/.test(phone)) {
      setFormError('Phone number must be exactly 10 digits');
      return;
    }
    
    if (parseInt(captchaAns) !== num1 + num2) {
      setCaptchaError(true);
      return;
    }
    
    // Simulate successful registration
    onComplete(role);
  };

  return (
    <div className="min-h-screen bg-[#080808] font-['DM_Sans'] flex flex-col items-center justify-center p-6 relative overflow-hidden text-[#fff]">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white opacity-[0.015] blur-[100px] z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#aaa] opacity-[0.015] blur-[100px] z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        
        {/* Left Side: Branding & Info */}
        <div className="w-full lg:w-5/12 flex flex-col items-start animate-[fadeUp_0.5s_ease-out]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 mb-8 rounded-lg text-sm font-medium text-[#aaa] hover:text-[#fff] bg-[#111] border border-[#222] hover:border-[#444] transition-all"
          >
            <ChevronLeft size={16} /> Back to Home
          </button>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#fff] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Cpu className="w-6 h-6 text-[#000]" />
            </div>
            <span className="font-['Roboto_Slab'] text-2xl font-bold tracking-tight text-[#fff]">
              Subsidy<span className="text-[#aaa]">Setu</span>
            </span>
          </div>

          <h1 className="font-['Roboto_Slab'] text-3xl md:text-4xl font-semibold leading-tight mb-4 text-[#fff]">
            Join India's Leading <br />
            <span className="text-[#aaa]">AI Business Network</span>
          </h1>
          <p className="text-[#888] text-base leading-relaxed mb-8">
            Whether you're an MSME looking to optimize operations or a Chartered Accountant expanding your client base, SubsidySetu brings the power of AI to your fingertips.
          </p>

          <div className="flex flex-col gap-4 w-full">
            {[
              { icon: ShieldCheck, text: 'DPDP Act 2023 Compliant Data Vault' },
              { icon: CheckCircle2, text: 'End-to-End Encrypted Document Sharing' },
              { icon: Cpu, text: 'Powered by Qwen2.5:7b & AMD ROCm' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-[#aaa]">
                <div className="p-1.5 rounded-md bg-[#1a1a1a] border border-[#333]">
                  <Icon size={14} className="text-[#fff]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-7/12 animate-[fadeUp_0.7s_ease-out]">
          <div className="bg-[#0d0d0d] border border-[#222] rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            
            {/* Role Toggle */}
            <div className="flex p-1 bg-[#111] border border-[#2a2a2a] rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setRole('business')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300
                  ${role === 'business' ? 'bg-[#fff] text-[#000] shadow-sm' : 'text-[#888] hover:text-[#fff]'}`}
              >
                <Briefcase size={16} /> Business Owner
              </button>
              <button
                type="button"
                onClick={() => setRole('ca')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-300
                  ${role === 'ca' ? 'bg-[#fff] text-[#000] shadow-sm' : 'text-[#888] hover:text-[#fff]'}`}
              >
                <Building2 size={16} /> Chartered Accountant
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                    <input 
                      required value={name} onChange={e => setName(e.target.value)}
                      type="text" placeholder="John Doe"
                      className="w-full bg-[#050505] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] placeholder:text-[#444] focus:outline-none focus:border-[#fff] transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                    <input 
                      required value={email} onChange={e => setEmail(e.target.value)}
                      type="email" placeholder="john@example.com"
                      className="w-full bg-[#050505] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] placeholder:text-[#444] focus:outline-none focus:border-[#fff] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                    <input 
                      required value={phone} onChange={e => setPhone(e.target.value)}
                      type="tel" placeholder="+91 98765 43210"
                      className="w-full bg-[#050505] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] placeholder:text-[#444] focus:outline-none focus:border-[#fff] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                    <input 
                      required value={password} onChange={e => setPassword(e.target.value)}
                      type="password" placeholder="••••••••"
                      className="w-full bg-[#050505] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] placeholder:text-[#444] focus:outline-none focus:border-[#fff] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Confirm Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                    <input 
                      required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                      type="password" placeholder="••••••••"
                      className="w-full bg-[#050505] border border-[#2a2a2a] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] placeholder:text-[#444] focus:outline-none focus:border-[#fff] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <div className="text-[#ff3333] text-sm mt-1">{formError}</div>
              )}

              {/* Dynamic Fields based on Role */}
              {role === 'business' && (
                <div className="p-5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl flex flex-col gap-5 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Company Name</label>
                    <div className="relative">
                      <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                      <input 
                        required value={companyName} onChange={e => setCompanyName(e.target.value)}
                        type="text" placeholder="Your Business Pvt. Ltd."
                        className="w-full bg-[#050505] border border-[#222] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] focus:outline-none focus:border-[#fff] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1 flex items-center justify-between">
                      <span>Udyam Registration No.</span>
                      <span className="text-[10px] bg-[#222] px-2 py-0.5 rounded text-[#888]">Optional</span>
                    </label>
                    <div className="relative">
                      <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                      <input 
                        value={udyam} onChange={e => setUdyam(e.target.value)}
                        type="text" placeholder="UDYAM-XX-00-0000000"
                        className="w-full bg-[#050505] border border-[#222] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] focus:outline-none focus:border-[#fff] transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {role === 'ca' && (
                <div className="p-5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl flex flex-col gap-5 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">ICAI Membership ID</label>
                    <div className="relative">
                      <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                      <input 
                        required value={caId} onChange={e => setCaId(e.target.value)}
                        type="text" placeholder="XXXXXX"
                        className="w-full bg-[#050505] border border-[#222] rounded-lg py-3 pl-10 pr-4 text-sm text-[#fff] focus:outline-none focus:border-[#fff] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={hasFirm} 
                        onChange={e => setHasFirm(e.target.checked)}
                        className="peer appearance-none w-5 h-5 border-2 border-[#444] rounded bg-[#050505] checked:bg-[#fff] checked:border-[#fff] transition-all cursor-pointer"
                      />
                      <CheckCircle2 size={14} className="absolute text-[#000] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="text-sm font-medium text-[#ccc] group-hover:text-[#fff] transition-colors">
                      I am associated with a firm
                    </span>
                  </label>

                  {hasFirm && (
                    <div className="flex flex-col gap-5 pt-3 border-t border-[#222] animate-[fadeUp_0.3s_ease-out]">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Firm Name</label>
                        <input 
                          required={hasFirm} value={firmName} onChange={e => setFirmName(e.target.value)}
                          type="text" placeholder="Associates & Co."
                          className="w-full bg-[#050505] border border-[#222] rounded-lg py-3 px-4 text-sm text-[#fff] focus:outline-none focus:border-[#fff] transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#888] uppercase tracking-wider pl-1">Firm City / Address</label>
                        <input 
                          required={hasFirm} value={firmAddress} onChange={e => setFirmAddress(e.target.value)}
                          type="text" placeholder="Ahmedabad, Gujarat"
                          className="w-full bg-[#050505] border border-[#222] rounded-lg py-3 px-4 text-sm text-[#fff] focus:outline-none focus:border-[#fff] transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Security Captcha */}
              <div className="mt-2 flex items-center justify-between p-4 bg-[#050505] border border-[#2a2a2a] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#111] border border-[#222]">
                    <ShieldCheck size={18} className="text-[#888]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#ccc]">Security Check</div>
                    <div className="text-xs text-[#666]">What is {num1} + {num2}?</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    required value={captchaAns} onChange={e => { setCaptchaAns(e.target.value); setCaptchaError(false); }}
                    type="number" placeholder="?"
                    className={`w-16 bg-[#111] border rounded-lg py-2 px-3 text-center text-sm font-mono text-[#fff] focus:outline-none transition-colors
                      ${captchaError ? 'border-[#ff3333]' : 'border-[#333] focus:border-[#fff]'}`}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-[#fff] text-[#000] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
              >
                Create Account <ArrowRight size={18} />
              </button>
              
              <div className="text-center text-xs text-[#555] mt-2">
                By signing up, you agree to our Terms of Service & Privacy Policy.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
