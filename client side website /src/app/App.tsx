import { useState, useEffect } from 'react';
import { LayoutDashboard, Bot, TrendingUp, BarChart3, Settings2, ShieldCheck, Truck, Cpu, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import FinancialAnalysis from './components/FinancialAnalysis';
import MarketIntelligence from './components/MarketIntelligence';
import OperationalOptimization from './components/OperationalOptimization';
import ComplianceAssistant from './components/ComplianceAssistant';
import SupplierManagement from './components/SupplierManagement';
import LandingPage from './components/LandingPage';
import ClientPortal from './components/ClientPortal';
type AppMode = 'landing' | 'msme' | 'client' | 'signup';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'AI Advisor', icon: Bot },
  { id: 'financial', label: 'Financial', icon: TrendingUp },
  { id: 'market', label: 'Market', icon: BarChart3 },
  { id: 'operations', label: 'Operations', icon: Settings2 },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'supplier', label: 'Suppliers', icon: Truck },
];

export default function App() {
  const [mode, setModeState] = useState<AppMode>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('suvanMode') as AppMode;
    if (savedMode && ['msme', 'client'].includes(savedMode)) {
      setModeState(savedMode);
    }
    setIsLoaded(true);
  }, []);

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    // Persist login state if going to an app portal, clear it if returning to landing
    if (newMode === 'msme' || newMode === 'client') {
      localStorage.setItem('suvanMode', newMode);
    } else if (newMode === 'landing') {
      localStorage.removeItem('suvanMode');
    }
  };

  // Prevent hydration mismatch/flash by waiting for localStorage check
  if (!isLoaded) return <div style={{ background: '#080808', minHeight: '100vh' }} />;

  if (mode === 'landing') {
    return <LandingPage onSelectMode={(m) => setMode(m)} />;
  }



  if (mode === 'client') {
    return <ClientPortal onBack={() => setMode('landing')} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'chat': return <ChatBot />;
      case 'financial': return <FinancialAnalysis />;
      case 'market': return <MarketIntelligence />;
      case 'operations': return <OperationalOptimization />;
      case 'compliance': return <ComplianceAssistant />;
      case 'supplier': return <SupplierManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ background: '#080808', color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .nav-link { transition: color 0.2s ease, background 0.2s ease; cursor: pointer; }
        .nav-link:hover { color: #fff !important; }
        .cp-btn-ghost { transition: all 0.2s ease; cursor: pointer; }
        .cp-btn-ghost:hover { border-color: #fff !important; background: rgba(255,255,255,0.06) !important; }
      `}</style>

      {/* Top nav */}
      <header className="px-4 md:px-8" style={{ height: 60, background: '#000', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setMode('landing')}
            className="cp-btn-ghost"
            style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 8, padding: '6px 12px', color: '#aaa', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <LogOut size={14} /> Logout
          </button>
          <div style={{ width: 1, height: 24, background: '#222' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setMode('landing')}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={15} color="#000" />
            </div>
            <span className="hidden sm:inline" style={{ fontFamily: "'Roboto Slab', serif", fontSize: 15, fontWeight: 600 }}>Suvan Platform</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button 
            onClick={() => setMode('client')}
            className="cp-btn-ghost"
            style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 8, padding: '6px 14px', color: '#aaa', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800 }}>B</div>
            <span className="hidden sm:inline">Switch to Portal</span>
          </button>
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 6, fontSize: 12, color: '#aaa', background: '#111', padding: '6px 12px', borderRadius: 20, border: '1px solid #222' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            AMD ROCm Active
          </div>
        </div>
      </header>

      {/* Sub Navigation (Horizontal Tabs) */}
      <div className="px-4 md:px-8" style={{ background: '#000', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 1, scrollbarWidth: 'none' }} className="no-scrollbar">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="nav-link"
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? '#fff' : 'transparent'}`,
                  color: isActive ? '#fff' : '#666',
                  padding: '16px 12px',
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} color={isActive ? '#fff' : '#555'} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
