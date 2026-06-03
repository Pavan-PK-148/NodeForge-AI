import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioBuilderContext';
import { 
  Plus, 
  Eye, 
  Edit3, 
  Layout, 
  Calendar, 
  RefreshCw, 
  Activity, 
  ArrowUpRight, 
  ShieldAlert,
  Server,
  Globe,
  Trash2,
  Terminal,
  Database,
  Loader2,
  AlertTriangle,
  X,
  Sparkles,
  User,
  FolderHeart,
  Wand2,
  Cpu
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';
import ThreeBackground from '../components/ThreeBackground';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio`;

export default function Dashboard() {
  const navigate = useNavigate();
  const { setPortfolioData } = usePortfolio();
  
  const [userPortfolios, setUserPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  
  const [deleteTarget, setDeleteTarget] = useState(null); 
  const [isDeleting, setIsDeleting] = useState(false);

  const [systemLogs, setSystemLogs] = useState([
    'Background canvas initialized.',
    'User session loaded successfully.',
  ]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const handleNavigation = () => {
  navigate('/resume-enhance');
};

  const fetchUserPortfolios = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });

      if (!response.ok) throw new Error('Failed to fetch data updates.');
      
      const data = await response.json();
      const verifiedArray = Array.isArray(data) ? data : data ? [data] : [];
      setUserPortfolios(verifiedArray);
      
      logAction(`Updated dashboard entries: ${verifiedArray.length} items loaded.`);
    } catch (err) {
      console.error(err);
      toast.error('Session expired. Please log in again.');
      logAction('Error connecting to back-end services.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPortfolios();
  }, []);

  const handleSync = async () => {
    setIsScraping(true);
    logAction('Refreshing active dashboard profile context...');
    const syncToast = toast.loading('Syncing latest items...');
    
    await fetchUserPortfolios();
    
    toast.dismiss(syncToast);
    toast.success('Dashboard synchronized.');
    setIsScraping(false);
  };

  const logAction = (msg) => {
    const time = new Date().toLocaleTimeString();
    setSystemLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 2)]);
  };

  const handleEditPortfolio = (portfolio) => {
    setPortfolioData(portfolio);
    toast.success('Loaded item details into editor workspace.');
    navigate('/builder');
  };

  const openDeleteModal = (id, title, e) => {
    e.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const confirmDeletion = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });

      if (!response.ok) throw new Error('Could not delete selected portfolio.');
      
      toast.success('Portfolio deleted successfully.');
      logAction(`Deleted item record: ${deleteTarget.title}`);
      
      setUserPortfolios(prev => prev.filter(p => p._id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Deletion failed.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen text-slate-100 relative overflow-x-hidden w-full pb-24 selection:bg-purple-500/40">
        
        {/* Background Visualizer Component */}
        <ThreeBackground isScraping={isScraping} />

        {/* Global Navigation Header */}
        <header className="bg-black/30 border-b border-white/[0.08] sticky top-0 z-40 backdrop-blur-xl px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-mono font-black flex items-center justify-center text-sm rounded shadow-md group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-wider text-white uppercase">
                  NODE<span className="text-purple-400">FORGE</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest">User Dashboard</span>
              </div>
            </div>
            
            <button 
              onClick={() => { localStorage.removeItem('token'); sessionStorage.removeItem('token'); toast.success('Disconnected.'); navigate('/login'); }}
              className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Main Interface Workspace */}
        <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
          
          {/* Welcome User Message Grid Banner */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1 text-slate-200 text-xl font-medium shadow-lg backdrop-blur-md">
              <User size={13} className="text-purple-400" />
              <span>Welcome back, <span className="text-white font-bold">Pavan</span></span>
              <span className="text-purple-500/40">|</span>
              <span className="text-xs text-purple-300 font-mono">Account Active</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <Activity size={11} className="text-pink-400" />
              <span>Graphics Mode: Accelerated</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 pb-8 border-b border-white/[0.1]">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Project Dashboard
              </h1>
              <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
                Manage your layout configurations, update live descriptions, and preview your active web designs directly from this hub.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
  {/* AI ENHANCER BUTTON: Animated Shifting Gradient + Cosmic Shadow Pulse */}
  <motion.button
    onClick={() => navigate('/enhance')}
    whileHover={{ scale: 1.04, y: -2 }}
    whileTap={{ scale: 0.97 }}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      boxShadow: [
        '0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 0 10px rgba(255, 159, 252, 0.2)',
        '0 10px 30px -3px rgba(236, 72, 153, 0.6), 0 0 20px rgba(82, 39, 255, 0.4)',
        '0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 0 10px rgba(255, 159, 252, 0.2)'
      ]
    }}
    transition={{
      backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      type: "spring", 
      stiffness: 400, 
      damping: 15
    }}
    style={{
      backgroundSize: '200% 200%',
      backgroundImage: 'linear-gradient(to right, #5227FF, #ff71ce, #FF9FFC, #5227FF)'
    }}
    className="inline-flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer border border-white/20 relative overflow-hidden"
  >
    {/* Subtle particle shimmer effect inside */}
    <motion.div 
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
    />
    <Sparkles size={13} className="relative z-10 animate-pulse" />
    <span className="relative z-10">ATS Score</span>
  </motion.button>

  <motion.button
  onClick={() => {
    navigate('/skills-recommend');
    window.scrollTo(0, 0);
  }}
  initial="initial"
  whileHover="hover"
  whileTap="tap"
  variants={{
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      borderColor: 'rgba(168, 85, 247, 0.6)',
      backgroundColor: 'rgba(139, 92, 246, 0.08)'
    },
    tap: { scale: 0.98 }
  }}
  transition={{ type: "spring", stiffness: 500, damping: 25 }}
  className="relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-white/10 bg-zinc-950/40 backdrop-blur-md font-mono text-xs font-bold uppercase text-purple-300 cursor-pointer overflow-hidden group select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex-shrink-0"
>
  {/* Absolute Corner Tech Brackets */}
  <span className="absolute top-0 left-0 w-2 h-[1px] bg-purple-500 opacity-40 group-hover:opacity-100 transition-opacity" />
  <span className="absolute top-0 left-0 w-[1px] h-2 bg-purple-500 opacity-40 group-hover:opacity-100 transition-opacity" />
  <span className="absolute bottom-0 right-0 w-2 h-[1px] bg-purple-500 opacity-40 group-hover:opacity-100 transition-opacity" />
  <span className="absolute bottom-0 right-0 w-[1px] h-2 bg-purple-500 opacity-40 group-hover:opacity-100 transition-opacity" />

  {/* Laser Scanline Overlay */}
  <motion.div
    variants={{
      initial: { y: '-100%' },
      hover: { y: '200%' }
    }}
    transition={{ 
      duration: 1.5, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none"
  />

  {/* Matrix Core Icon Animation */}
  <div className="relative flex items-center justify-center w-5 h-5 rounded-lg border border-purple-500/20 bg-purple-950/20 text-purple-400 overflow-hidden shadow-inner flex-shrink-0">
    <motion.div
      variants={{
        initial: { rotate: 0 },
        hover: { rotate: 90 }
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative z-10"
    >
      <Cpu size={13} />
    </motion.div>
    <span className="absolute inset-0 bg-purple-500/10 animate-ping rounded-lg opacity-40" />
  </div>

  {/* FIXED: Stable Letter Spacing Tracking Variables */}
  <motion.span 
    variants={{
      initial: { letterSpacing: '0.1em' },
      hover: { letterSpacing: '0.12em', color: '#ffffff' }
    }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="relative z-10 w-full text-center"
  >
    Skills Recommendation
  </motion.span>

  {/* Subtle UI Metadata Footer Accent */}
  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-purple-500/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
</motion.button>

  <motion.button
  onClick={handleNavigation}
  disabled={isScraping || isLoading}
  whileHover={!isScraping && !isLoading ? { scale: 1.04, backgroundColor: 'rgba(255,255,255,0.08)' } : {}}
  whileTap={!isScraping && !isLoading ? { scale: 0.97 } : {}}
  animate={{
    borderColor: isScraping 
      ? ['rgba(168,85,247,0.8)', 'rgba(236,72,153,0.8)', 'rgba(168,85,247,0.8)'] 
      : ['rgba(255,255,255,0.1)', 'rgba(139,92,246,0.3)', 'rgba(255,255,255,0.1)']
  }}
  transition={{ borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
  className="inline-flex items-center justify-center gap-2 bg-black/40 border text-slate-200 font-mono text-xs px-4 py-3 rounded-xl transition-all cursor-pointer backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
>
  <motion.div
    animate={isScraping ? { rotate: 360 } : { rotate: 0 }}
    transition={isScraping ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0.3 }}
  >
    <Wand2 size={12} className={isScraping ? "text-purple-400" : "text-slate-400 group-hover:text-white"} />
  </motion.div>
  <span>Enhance Resume</span>
</motion.button>

<motion.button
  onClick={() => {
    navigate('/portfolio-scoring');
    window.scrollTo(0, 0);
  }}
  initial="initial"
  whileHover="hover"
  whileTap="tap"
  variants={{
    initial: { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" },
    hover: { 
      y: -2, 
      borderColor: "rgba(236, 72, 153, 0.4)",
      boxShadow: "0 0 20px rgba(236, 72, 153, 0.15)" 
    }
  }}
  className="relative inline-flex items-center gap-4 px-5 py-3 rounded-xl border border-purple-950/40 bg-gradient-to-b from-neutral-900/80 to-[#03010a]/90 backdrop-blur-md font-mono text-xs text-pink-400 cursor-pointer overflow-hidden group select-none flex-shrink-0 transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
>
  {/* Cybernetic Grid Ambient Underlay (Swapped to Violet) */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />

  {/* Active Scanning Glow Edge (Swapped to Neon Pink) */}
  <span className="absolute inset-y-0 left-0 w-[2px] bg-pink-500 opacity-40 group-hover:opacity-100 group-hover:h-full transition-all duration-300" />

  {/* Micro Telemetry Graph Visualizer (Swapped to Pink/Purple Gradient) */}
  <div className="flex items-end gap-[2px] h-3 w-4 flex-shrink-0">
    {[0.3, 0.8, 0.5, 0.9].map((delay, i) => (
      <motion.span
        key={i}
        animate={{ height: ['20%', '100%', '20%'] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
        className="w-[2px] bg-gradient-to-t from-purple-500 to-pink-500 rounded-full origin-bottom"
      />
    ))}
  </div>

  {/* Text Layout Block */}
  <div className="flex flex-col text-left gap-0.5 relative z-10">
    <span className="text-[9px] font-bold tracking-widest text-pink-500/50 uppercase">Engine Node</span>
    <span className="font-sans font-extrabold text-xs tracking-wide text-neutral-200 group-hover:text-pink-400 transition-colors duration-200">
      Portfolio Scoring
    </span>
  </div>

  {/* Live Status Node (Swapped to Pink Theme matching "Telemetry Locked" status) */}
  <div className="flex items-center gap-1.5 bg-pink-950/20 border border-pink-500/20 px-2 py-0.5 rounded-md text-[9px] font-bold text-pink-400 uppercase tracking-wider relative overflow-hidden flex-shrink-0">
    <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
    Ready
  </div>
</motion.button>
  
</div>
          </div>

          {/* ================= GENERIC OVERVIEW TILES ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Projects', val: isLoading ? '...' : userPortfolios.length, desc: 'Created items', icon: FolderHeart, color: 'text-purple-400' },
              { label: 'Server State', val: 'Connected', desc: 'Secure connection', icon: Server, color: 'text-indigo-400' },
              { label: 'Global Access', val: 'Online', desc: 'Live hosting status', icon: Globe, color: 'text-emerald-400' },
              { label: 'Performance', val: 'Stable', desc: 'Optimized response', icon: Activity, color: 'text-pink-400' }
            ].map((stat, i) => (
              <div key={i} className="bg-black/40 border border-white/[0.08] p-4 rounded-xl backdrop-blur-xl flex flex-col justify-between shadow-xl transition-colors hover:border-white/20">
                <div className="flex items-start justify-between w-full mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{stat.label}</span>
                  <stat.icon size={13} className={`${stat.color}`} />
                </div>
                <div>
                  <span className="text-xl font-semibold text-white block tracking-tight">{stat.val}</span>
                  <span className="text-[10px] text-slate-400 block opacity-80">{stat.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= GENERIC ACTIVITY LOGGER WINDOW ================= */}
          <div className="bg-black/60 border border-white/[0.08] rounded-xl p-4 mb-10 font-mono text-[11px] text-slate-300 shadow-inner flex flex-col gap-1 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 mb-1 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
              <Terminal size={12} className="text-purple-400" />
              Recent Activity Log
            </div>
            {systemLogs.map((log, idx) => (
              <div key={idx} className="truncate select-none">
                <span className="text-purple-400/80">»</span> {log}
              </div>
            ))}
          </div>

          {/* Catalog Row Banner Header */}
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-wider text-slate-400">
            <div className="flex items-center gap-1.5 font-bold">
              <Database size={12} className="text-slate-400" /> My Portfolios ({userPortfolios.length})
            </div>
            <span className="bg-white/[0.05] px-2 py-0.5 rounded text-[10px] border border-white/5">System Up-to-date</span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-24 text-slate-400 font-mono text-xs gap-2">
              <Loader2 className="animate-spin text-purple-400 w-5 h-5" />
              Loading portfolio data...
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {userPortfolios.map((portfolio, idx) => {
  const portfolioId = portfolio._id || `item-${idx}`;
  const portfolioTitle = portfolio.personalInfo?.fullName || "Untitled Configuration";
  const currentSkin = portfolio.selectedTemplate || 'Default Layout';

  return (
    <motion.div
      key={portfolioId}
      variants={{ 
        hidden: { opacity: 0, y: 15 }, 
        visible: { opacity: 1, y: 0 } 
      }}
      whileHover={{ 
        y: -6, 
        borderColor: 'rgba(168, 85, 247, 0.4)',
        boxShadow: '0 20px 30px -10px rgba(82, 39, 255, 0.25), 0 0 15px rgba(255, 159, 252, 0.05)',
        backgroundColor: 'rgba(5, 3, 10, 0.7)'
      }}
      whileTap={{ scale: 0.99, y: -2 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="relative rounded-2xl border border-white/[0.08] bg-black/40 p-5 flex flex-col justify-between min-h-[230px] backdrop-blur-xl group transition-colors overflow-hidden"
    >
      {/* Dynamic light refraction lines on card hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-400/50 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-pink-500/0 to-transparent group-hover:via-pink-500/30 transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider uppercase bg-white/5 text-slate-300 border border-white/10 group-hover:border-purple-500/30 transition-colors">
            Record #{idx + 1}
          </span>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase flex items-center gap-1">
              <Calendar size={10} /> {portfolio.updatedAt ? new Date(portfolio.updatedAt).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : '2026'}
            </span>
            <motion.button
              whileHover={{ scale: 1.15, color: '#f87171' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => openDeleteModal(portfolioId, portfolioTitle, e)}
              className="p-1 rounded text-slate-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Delete entry"
            >
              <Trash2 size={12} />
            </motion.button>
          </div>
        </div>

        <h3 className="font-semibold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-1 tracking-tight">
          {portfolioTitle}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8 opacity-80 group-hover:opacity-100 transition-opacity">
          {portfolio.personalInfo?.bio || portfolio.personalInfo?.summary || "No description provided for this profile layout variant."}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.08] relative z-10">
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="text-slate-400 flex items-center gap-1"><Layout size={11}/> Selected Theme:</span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-purple-300 font-bold uppercase text-[9px] bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20 group-hover:border-pink-500/30 transition-colors"
          >
            {currentSkin.replace('-', ' ')}
          </motion.span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleEditPortfolio(portfolio)}
            className="inline-flex items-center justify-center gap-1 py-2 text-xs font-medium text-slate-200 bg-white/[0.04] border border-white/10 rounded-xl transition-all cursor-pointer"
          >
            <Edit3 size={11} /> Edit Data
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#f1f5f9', boxShadow: '0 4px 12px rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/p/${portfolioId}`)}
            className="inline-flex items-center justify-center gap-1 py-2 text-xs font-bold text-black bg-white rounded-xl transition-all cursor-pointer"
          >
            <Eye size={11} /> View Live <ArrowUpRight size={10} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
})}

{/* Add New Empty Slot Box: Floating Physics + Rotating Axis Intersections */}
<motion.div 
  variants={{ 
    hidden: { opacity: 0, y: 15 }, 
    visible: { opacity: 1, y: 0 } 
  }}
  onClick={() => navigate('/wizard')}
  whileHover={{ 
    y: -6,
    borderColor: 'rgba(236, 72, 153, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    boxShadow: '0 20px 30px -10px rgba(236, 72, 153, 0.15)'
  }}
  whileTap={{ scale: 0.99 }}
  transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 20 
  }}
  className="rounded-2xl border border-dashed border-white/20 bg-white/[0.01] transition-colors flex flex-col items-center justify-center text-center group cursor-pointer min-h-[230px] backdrop-blur-xl p-5"
>
  <motion.div 
    variants={{
      hover: { scale: 1.1 }
    }}
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-black group-hover:rotate-90 transition-all duration-300 mb-3 text-lg font-light shadow-inner"
  >
    +
  </motion.div>
  <h4 className="font-bold text-xs text-slate-200 group-hover:text-pink-400 transition-colors uppercase tracking-wider">Add New Entry</h4>
  <p className="text-[11px] text-slate-400 max-w-[180px] mt-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
    Configure an independent setup framework mapping.
  </p>
</motion.div>
            </motion.div>
          )}

          {!isLoading && userPortfolios.length === 0 && (
            <div className="mt-12 text-center p-12 border border-dashed border-white/10 rounded-xl bg-black/40 max-w-sm mx-auto backdrop-blur-xl">
              <ShieldAlert className="w-6 h-6 text-slate-500 mx-auto mb-2" />
              <p className="text-xs text-slate-400 uppercase tracking-wider">No portfolios discovered.</p>
            </div>
          )}

        </main>

        {/* ================= ACTION CONFIRMATION MODAL WINDOW ================= */}
        <AnimatePresence>
          {deleteTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeleting && setDeleteTarget(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.15 }}
                className="bg-[#0e0c14] border border-red-500/20 rounded-xl p-5 max-w-sm w-full relative z-10 shadow-2xl overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 rounded-lg">
                    <AlertTriangle size={15} />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight flex items-center justify-between">
                      Confirm Deletion
                      {!isDeleting && (
                        <button 
                          onClick={() => setDeleteTarget(null)}
                          className="text-slate-400 hover:text-white transition p-0.5 rounded hover:bg-white/5"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Are you sure you want to delete <span className="text-red-400 font-bold">"{deleteTarget.title}"</span>? This process cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2">
                  <button
                    disabled={isDeleting}
                    onClick={() => setDeleteTarget(null)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  
                  <button
                    disabled={isDeleting}
                    onClick={confirmDeletion}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md transition flex items-center gap-1.5"
                  >
                    {isDeleting ? (
                      <>Deleting... <Loader2 size={11} className="animate-spin" /></>
                    ) : (
                      <>Delete Project</>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
}