import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Camera, 
  Upload, 
  History, 
  User, 
  Home, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Zap, 
  RefreshCcw,
  Flashlight,
  Settings,
  Bell,
  BarChart3,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showNav = !['/splash', '/scanner'].includes(location.pathname);

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-0 pt-16 cyber-gradient relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-neon-blue/5 blur-[80px] rounded-full pointer-events-none" />
      
      {/* Top Header */}
      {showNav && (
        <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img src="/src/assets/images/logo_trucheck_1779113177932.png" className="w-8 h-8 object-contain" alt="TruCheck Logo" />
            <span className="font-display font-bold tracking-tight text-xl uppercase italic">TRUCHECK <span className="text-neon-blue">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
            </button>
            <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue/30">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
            </Link>
          </div>
        </header>
      )}

      <main className="max-w-md mx-auto h-full relative">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 h-20 glass border-t border-white/5 z-50 flex items-center justify-around px-2 text-slate-500">
          <NavLink to="/" icon={<Home className="w-6 h-6" />} label="Home" active={location.pathname === '/'} />
          <NavLink to="/history" icon={<History className="w-6 h-6" />} label="History" active={location.pathname === '/history'} />
          <Link to="/scanner" className="relative -top-6">
            <div className="w-16 h-16 bg-neon-blue rounded-full flex items-center justify-center neon-glow shadow-neon-blue/40 transition-transform hover:scale-105 active:scale-95">
              <Camera className="w-8 h-8 text-cyber-dark" strokeWidth={2.5} />
            </div>
          </Link>
          <NavLink to="/report" icon={<AlertTriangle className="w-6 h-6" />} label="Report" active={location.pathname === '/report'} />
          <NavLink to="/profile" icon={<User className="w-6 h-6" />} label="Profile" active={location.pathname === '/profile'} />
        </nav>
      )}
    </div>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link to={to} className={cn("flex flex-col items-center gap-1 transition-colors", active ? "text-neon-blue" : "hover:text-slate-300")}>
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
  </Link>
);

// --- Pages ---

const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-8 text-center bg-cyber-dark">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-40 h-40 bg-neon-blue/5 rounded-3xl flex items-center justify-center relative overflow-hidden p-6">
          <img src="/src/assets/images/logo_trucheck_1779113177932.png" className="w-full h-full object-contain relative z-10" alt="Logo" />
          <motion.div 
            animate={{ y: [-80, 80] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-x-0 h-0.5 bg-neon-blue/50 blur-[2px] z-20" 
          />
        </div>
        <div className="absolute -inset-4 border border-neon-blue/20 rounded-full animate-pulse" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h1 className="text-3xl font-display font-bold tracking-tight uppercase italic">TRUCHECK <span className="text-neon-blue">AI</span></h1>
        <p className="text-slate-500 mt-2 tracking-widest text-xs font-medium uppercase italic">Shielding Authenticity</p>
      </motion.div>
    </div>
  );
};

const HomeDashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-8 pb-32"
    >
      <section>
        <h2 className="text-sm font-medium text-slate-500 tracking-widest uppercase mb-4">Security Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-5 rounded-2xl space-y-1">
            <p className="text-xs text-slate-400 font-medium">Scans Today</p>
            <p className="text-2xl font-display font-bold">24</p>
            <div className="h-1 bg-neon-blue/20 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-neon-blue w-2/3" />
            </div>
          </div>
          <div className="glass p-5 rounded-2xl space-y-1 border-red-500/20">
            <p className="text-xs text-slate-400 font-medium">Fakes Caught</p>
            <p className="text-2xl font-display font-bold text-red-400">03</p>
            <div className="h-1 bg-red-500/20 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-red-500 w-1/3" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-slate-500 tracking-widest uppercase">Quick Actions</h2>
        </div>
        <div className="space-y-3">
          <Link to="/scanner" className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 bg-neon-blue/10 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-neon-blue" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Live Scan</h3>
              <p className="text-xs text-slate-400">Analyze product AI in real-time</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center gap-4 p-4 glass rounded-2xl opacity-80 group cursor-pointer">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Database Search</h3>
              <p className="text-xs text-slate-400">Search by EAN/UPC code</p>
            </div>
            <Zap className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-slate-500 tracking-widest uppercase mb-4">Community Alerts</h2>
        <div className="space-y-3">
          {[
            { tag: "DANGER", msg: "Large influx of fake Nike Jordans detected in Singapore.", time: "1h ago" },
            { tag: "WARNING", msg: "Suspicious QR codes appearing on luxury handbags.", time: "4h ago" }
          ].map((alert, i) => (
            <div key={i} className="glass p-4 rounded-2xl flex items-start gap-4">
              <ShieldAlert className={cn("w-5 h-5 mt-0.5", alert.tag === 'DANGER' ? "text-red-500" : "text-amber-500")} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-[8px] font-bold px-1.5 py-0.5 rounded", alert.tag === 'DANGER' ? "bg-red-500/20 text-red-500" : "bg-amber-500/20 text-amber-500")}>{alert.tag}</span>
                  <span className="text-[10px] text-slate-600 font-medium">{alert.time}</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">{alert.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const Scanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [flashlight, setFlashlight] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setIsScanning(true);
      
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 })
        });
        const data = await res.json();
        navigate('/result', { state: { result: data, image: base64 } });
      } catch (err) {
        console.error(err);
        setIsScanning(false);
        // Fallback for demo if API fails
        navigate('/result', { state: { image: base64 } });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen bg-black relative"
    >
      {/* Simulation UI */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1000')] bg-cover bg-center grayscale opacity-60" />
      
      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="h-[20%] w-full bg-black/60 backdrop-blur-sm" />
        <div className="flex-1 flex w-full">
          <div className="w-[10%] h-full bg-black/60 backdrop-blur-sm" />
          <div className="flex-1 relative">
            <div className="absolute inset-0 border-2 border-neon-blue/30 rounded-3xl" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-neon-blue rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-neon-blue rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-neon-blue rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-neon-blue rounded-br-xl" />
            
            {isScanning && (
              <div className="absolute inset-x-4 top-0 h-1 bg-neon-blue/80 blur-[2px] animate-scan rounded-full shadow-[0_0_10px_#00f2ff]" />
            )}

            <div className="absolute top-4 left-4 space-y-2 opacity-60">
              <BarChart3 className="w-5 h-5 text-neon-blue" />
              <Search className="w-5 h-5 text-neon-blue" />
            </div>
          </div>
          <div className="w-[10%] h-full bg-black/60 backdrop-blur-sm" />
        </div>
        <div className="h-[30%] w-full bg-black/60 backdrop-blur-sm px-8 py-6 relative">
           <div className="text-center space-y-1">
             <p className="text-xs font-bold tracking-widest text-neon-blue uppercase">{isScanning ? "Processing with AI..." : "Scanning Active"}</p>
             <p className="text-slate-400 text-[10px] uppercase font-medium">Position product clearly within the frame</p>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 left-0 right-0 px-12 flex items-center justify-between gap-6 pointer-events-auto">
        <button 
          onClick={() => setFlashlight(!flashlight)}
          className={cn("w-14 h-14 rounded-full flex items-center justify-center glass border-white/5 transition-colors", flashlight && "bg-white/10 text-white")}
        >
          <Flashlight className={cn("w-6 h-6", flashlight ? "fill-white" : "text-slate-400")} />
        </button>
        
        <label className="w-20 h-20 bg-neon-blue rounded-full flex items-center justify-center neon-glow shadow-neon-blue/50 scale-110 active:scale-95 disabled:grayscale cursor-pointer">
          <Camera className="w-10 h-10 text-cyber-dark" />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
        
        <label className="w-14 h-14 rounded-full flex items-center justify-center glass border-white/5 cursor-pointer hover:bg-white/5">
          <Upload className="w-6 h-6 text-slate-400" />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="absolute top-12 right-6 w-10 h-10 glass rounded-full flex items-center justify-center"
      >
        <X className="w-5 h-5 text-slate-400" />
      </button>
    </motion.div>
  );
};

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  
  // Use real result or fallback
  const result = state.result || {
    authenticity: 88,
    fake_prob: 12,
    confidence: "High",
    decision: "Safe",
    issues: ["Minor packaging scuff", "Non-standard QR format detected"],
    report: "The product exhibits high alignment with official brand assets. Logo geometry and font kerning are within acceptable manufacturing tolerances."
  };

  const image = state.image || "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1000";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 pb-24 space-y-6"
    >
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 glass rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500">Analysis Report</h2>
        <button className="p-2 glass rounded-full"><Settings className="w-5 h-5 text-slate-400" /></button>
      </div>

      <div className="relative aspect-square glass rounded-3xl overflow-hidden group">
        <img src={image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-60" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
           <div>
             <p className="text-[10px] font-bold text-neon-blue uppercase">Analysis Token</p>
             <p className="text-xl font-display font-bold uppercase tracking-tight">{Math.random().toString(36).substring(7)}</p>
           </div>
           <div className="bg-neon-blue text-cyber-dark text-[10px] font-bold px-2 py-1 rounded">SCAN COMPLETE</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-5 rounded-2xl text-center space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auth Score</p>
          <div className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-neon-blue to-cyan-500">
            {result.authenticity}%
          </div>
        </div>
        <div className="glass p-5 rounded-2xl text-center space-y-1 border-amber-500/20">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confidence</p>
          <div className="text-3xl font-display font-bold text-amber-400">
            {result.confidence}
          </div>
        </div>
      </div>

      <div className={cn("glass p-4 rounded-2xl flex items-center gap-4", result.decision === 'Safe' ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5")}>
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", result.decision === 'Safe' ? "bg-emerald-500/20" : "bg-red-500/20")}>
          <CheckCircle2 className={cn("w-6 h-6", result.decision === 'Safe' ? "text-emerald-500" : "text-red-500")} />
        </div>
        <div>
          <h3 className={cn("font-bold", result.decision === 'Safe' ? "text-emerald-400" : "text-red-400")}>{result.decision} Detected</h3>
          <p className="text-xs text-slate-400">{result.decision === 'Safe' ? "Authenticity verified via AI Core" : "Potential counterfeit indicators found"}</p>
        </div>
        <div className="ml-auto flex -space-x-2">
           <img className="w-6 h-6 rounded-full border-2 border-cyber-dark shadow-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
           <img className="w-6 h-6 rounded-full border-2 border-cyber-dark shadow-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
        </div>
      </div>

      <div className="glass p-6 rounded-3xl space-y-4">
        <h3 className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon-blue" />
          AI Explanation
        </h3>
        <p className="text-sm leading-relaxed text-slate-400">
          {result.report}
        </p>
        <div className="space-y-2 pt-2 border-t border-white/5">
          {result.issues_detected?.map((issue: string, i: number) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {issue}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 h-14 bg-neon-blue rounded-2xl font-bold text-cyber-dark neon-glow active:scale-95 transition-transform" onClick={() => navigate('/')}>
          Register to Blockchain
        </button>
        <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/5">
          <ExternalLink className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    </motion.div>
  );
};

const HistoryPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
      <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500">Authentication Log</h2>
      <div className="space-y-4">
        {[
          { name: "Nike Air Jordan 1", date: "May 18, 2026", status: "Authentic", score: 98, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000" },
          { name: "Yeezy Boost 350", date: "May 16, 2026", status: "Fake", score: 14, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000" },
          { name: "Rolex Submariner", date: "May 12, 2026", status: "Authentic", score: 99, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000" }
        ].map((item, i) => (
          <div key={i} className="glass p-4 rounded-3xl flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/5">
               <img src={item.img} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1">
               <h3 className="text-sm font-bold">{item.name}</h3>
               <p className="text-[10px] text-slate-500 font-medium">{item.date}</p>
             </div>
             <div className="text-right">
               <p className={cn("text-xs font-bold", item.status === 'Authentic' ? "text-emerald-400" : "text-red-400")}>{item.status}</p>
               <p className="text-[10px] text-slate-600 font-medium">Score: {item.score}%</p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ReportPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-display font-bold">REPORT FRAUD</h2>
        <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">Contribute to global security</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Evidence Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button className="glass p-4 rounded-2xl border-neon-blue/30 text-neon-blue text-xs font-bold flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Visual
            </button>
            <button className="glass p-4 rounded-2xl text-slate-400 text-xs font-bold flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Digital
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Description</label>
          <textarea 
            placeholder="Describe the suspicious elements..."
            className="w-full glass p-4 rounded-2xl text-sm border-white/5 focus:border-neon-blue/40 focus:outline-none h-32 placeholder:text-slate-700" 
          />
        </div>

        <div className="p-6 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center space-y-2 hover:bg-white/5 cursor-pointer transition-colors">
          <Upload className="w-8 h-8 text-slate-600" />
          <p className="text-xs text-slate-500 font-bold uppercase">Upload Proof</p>
        </div>

        <button className="w-full h-14 bg-red-500 rounded-2xl font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-95 transition-transform mt-4">
          SUBMIT REPORT
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/profile" element={<div className="p-6 text-center text-slate-500">Profile system initializing...</div>} />
          {/* Default to splash for first load or handle it with logic */}
          <Route path="*" element={<HomeDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

