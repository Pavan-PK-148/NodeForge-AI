import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioBuilderContext';
import { 
  Plus, 
  Eye, 
  Edit3, 
  Layers, 
  Calendar, 
  Sparkles, 
  RefreshCw, 
  Activity, 
  ArrowUpRight, 
  ShieldAlert,
  Cpu,
  Globe,
  Trash2,
  Terminal,
  Database,
  Loader2,
  AlertTriangle,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';

// Base target API configuration matching secure ecosystem cluster defaults
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio`;

// --- Premium 3D Interactive Perspective Wrapper with Holographic Glare ---
function Interactive3DCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 140, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), springConfig);
  
  const glareX = useTransform(x, [-150, 150], ['0%', '100%']);
  const glareY = useTransform(y, [-150, 150], ['0%', '100%']);

  function handleMouseMove(event) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
      }}
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.015, y: -3 }}
        className="group relative rounded-2xl bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent border border-white/[0.06] hover:border-indigo-500/40 transition-colors duration-500 overflow-hidden flex flex-col justify-between h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <motion.div 
          style={{ background: `radial-gradient(circle 220px at ${glareX} ${glareY}, rgba(139, 92, 246, 0.15), transparent)` }}
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="bg-[#080611]/95 rounded-2xl h-full w-full p-6 flex flex-col justify-between relative z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30" />
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { setPortfolioData } = usePortfolio();
  
  const [userPortfolios, setUserPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScraping, setIsScraping] = useState(false);
  
  // Custom Dynamic Dialog States
  const [deleteTarget, setDeleteTarget] = useState(null); 
  const [isDeleting, setIsDeleting] = useState(false);

  const [terminalLogs, setTerminalLogs] = useState([
    'Initializing secure telemetry node connection...',
    'Privacy firewall verified. Isolate authorization protocol online.',
  ]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const fetchIsolatedUserInstances = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });

      if (!response.ok) throw new Error('Failed to synchronize private account clusters.');
      
      const data = await response.json();
      const verifiedArray = Array.isArray(data) ? data : data ? [data] : [];
      setUserPortfolios(verifiedArray);
      
      addLog(`Synchronized ${verifiedArray.length} deployment layers down from the cloud registry.`);
    } catch (err) {
      console.error('[FIREWALL SECURITY EXCEPTION]:', err);
      toast.error('Identity authorization breach or network failure.');
      addLog('ERR: Isolation cluster sync failed.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIsolatedUserInstances();

    const moveGlow = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveGlow);
    return () => window.removeEventListener('mousemove', moveGlow);
  }, []);

  const triggerGlobalScrape = async () => {
    setIsScraping(true);
    addLog('Executing targeted secure workspace repository sync routine...');
    const scrapeToast = toast.loading('Refreshing account network maps...');
    
    await fetchIsolatedUserInstances();
    
    toast.dismiss(scrapeToast);
    toast.success('Isolated security boundaries synchronized.');
    setIsScraping(false);
  };

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
  };

  const handleActiveInstantiation = (portfolio) => {
    setPortfolioData(portfolio);
    toast.success('Hydrated dynamic workspace configuration values.');
    navigate('/builder');
  };

  // Triggers the UI Modal wrapper rather than native window.confirm alerts
  const openDeleteModal = (id, title, e) => {
    e.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const executeClusterDestruction = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });

      if (!response.ok) throw new Error('Authorization layer rejected destruction packet.');
      
      toast.success('Instance de-provisioned successfully from edge registries.', {
        style: { background: '#080611', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.2)' }
      });
      addLog(`Terminated deployment node allocation for ID: ${deleteTarget.id}`);
      
      // Instantly wipe from UI client state list variables
      setUserPortfolios(prev => prev.filter(p => p._id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Failed to target cluster segment.');
    } finally {
      setIsDeleting(false);
    }
  };

  const activeDeploymentsCount = userPortfolios.length;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#040209] text-slate-200 relative overflow-x-hidden w-full pb-24 selection:bg-indigo-500/30 selection:text-white">
        
        {/* Cosmic Mesh Glow Background Components */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-40" />

        <div
          className="w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 z-0 hidden lg:block"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        />

        {/* System Header Utility Ribbon */}
        <header className="bg-[#05030c]/60 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold font-mono text-white text-base shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white font-mono">
                  Node<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">FORGE</span>
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Secure_Console</span>
              </div>
            </div>
            
            <button 
              onClick={() => { localStorage.removeItem('token'); sessionStorage.removeItem('token'); toast.success('Secure session terminated.'); navigate('/login'); }}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-white transition bg-white/5 border border-white/5 hover:border-white/10 px-4 py-2.5 rounded-xl cursor-pointer"
            >
              Log out
            </button>
          </div>
        </header>

        {/* Operational Workspace Frame Area */}
        <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
          
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12 pb-8 border-b border-white/5">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 shadow-inner">
                <Activity size={12} className="text-purple-400 animate-pulse" /> Isolation Protocol Engaged
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-mono">
                Deployed_Instances
              </h1>
              <p className="text-sm text-slate-400 mt-2 font-medium max-w-2xl leading-relaxed">
                Monitor your personal cross-region static build nodes, swap active interface layouts, or execute immediate configuration overrides.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={triggerGlobalScrape}
                disabled={isScraping || isLoading}
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-md"
              >
                <RefreshCw size={13} className={isScraping ? "animate-spin text-purple-400" : "text-slate-400"} />
                {isScraping ? "SYNC_BUFFERS..." : "Sync Repositories"}
              </button>

              <button
                onClick={() => { navigate('/wizard'); }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer shadow-lg shadow-purple-950/40 hover:-translate-y-0.5 transition-all"
              >
                <Plus size={14} className="stroke-[3]" /> Initialize New Build
              </button>
            </div>
          </div>

          {/* ================= TELEMETRY OVERVIEW COUNTER MODULES ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Private Clusters', val: isLoading ? '...' : activeDeploymentsCount, sub: 'Isolated Live Instances', icon: Globe, color: 'text-emerald-400', bg: 'hover:border-emerald-500/20' },
              { label: 'Pipeline Network', val: 'Protected', sub: 'TLS & Token Enforced', icon: Cpu, color: 'text-purple-400', bg: 'hover:border-purple-500/20' },
              { label: 'Global Latency', val: '14ms', sub: 'Edge Server Network', icon: Activity, color: 'text-indigo-400', bg: 'hover:border-indigo-500/20' },
              { label: 'Sync Status', val: 'Synced', sub: 'Account Ledger State', icon: Sparkles, color: 'text-amber-400', bg: 'hover:border-amber-500/20' }
            ].map((stat, i) => (
              <div key={i} className={`bg-[#0b0816]/60 border border-white/5 p-5 rounded-xl backdrop-blur-md flex items-center justify-between shadow-lg transition-colors duration-300 ${stat.bg}`}>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">{stat.label}</span>
                  <span className="text-2xl font-black font-mono text-white block">{stat.val}</span>
                  <span className="text-[10px] text-slate-400 font-medium block">{stat.sub}</span>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color} opacity-80 shrink-0`} />
              </div>
            ))}
          </div>

          {/* ================= REAL-TIME SYSTEMS LOGGER TERMINAL ================= */}
          <div className="bg-[#05030c]/90 border border-white/5 rounded-xl p-4 mb-10 font-mono text-[11px] text-slate-400 shadow-inner flex flex-col gap-1.5 relative overflow-hidden">
            <div className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1 text-slate-500 font-bold tracking-wider text-[10px] uppercase">
              <Terminal size={12} className="text-indigo-400" />
              Live Diagnostics Frame Buffer
            </div>
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="truncate select-none">
                <span className="text-indigo-500/70">❯</span> {log}
              </div>
            ))}
          </div>

          {/* ================= COMPOSABLE PORTFOLIO CARDS MATRIX ================= */}
          <div className="mb-6 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-slate-500 font-bold">
            <div className="flex items-center gap-2">
              <Database size={13} className="text-slate-400" /> Layout Registries Matrix ({activeDeploymentsCount})
            </div>
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-white/5">Routing Status: nominal</span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-24 text-slate-500 font-mono text-xs gap-3">
              <Loader2 className="animate-spin text-purple-500 w-6 h-6" />
              SWAPPING_ISOLATION_LAYERS...
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {userPortfolios.map((portfolio, idx) => {
                const portfolioId = portfolio._id || `instance-${idx}`;
                const portfolioTitle = portfolio.personalInfo?.fullName || "Untitled Shell";
                const currentSkin = portfolio.selectedTemplate || 'developer-pro';

                return (
                  <Interactive3DCard key={portfolioId}>
                    <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full">
                      <div>
                        <div className="flex items-center justify-between mb-5 w-full">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            SECURE_OWNER_NODE
                          </span>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mr-2">
                              <Calendar className="w-3 h-3 text-slate-600" /> {portfolio.updatedAt ? new Date(portfolio.updatedAt).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : 'MAY 2026'}
                            </span>
                            
                            <button
                              onClick={(e) => openDeleteModal(portfolioId, portfolioTitle, e)}
                              title="De-provision Build Node"
                              className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition duration-300 cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-bold text-xl text-white group-hover:text-purple-400 transition-colors duration-300 font-mono tracking-tight line-clamp-1 mb-2 uppercase">
                          {portfolioTitle}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed h-8">
                          {portfolio.personalInfo?.bio || portfolio.personalInfo?.summary || "Custom compiled developer instance blueprint configured on isolated architecture subnets."}
                        </p>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-white/[0.04]">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Layers className="w-3.5 h-3.5 text-slate-500" /> Layer Skin:
                          </div>
                          <span className="text-purple-300 font-mono font-bold uppercase text-[9px] bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/10 tracking-widest">
                            {currentSkin.replace('-', '_')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.05] grid grid-cols-2 gap-2 relative z-20 w-full">
                      <button
                        onClick={() => handleActiveInstantiation(portfolio)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        <Edit3 size={12} /> OVERWRITE
                      </button>
                      
                      <button
                        onClick={() => { navigate(`/p/${portfolioId}`); }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:brightness-110 transition-all duration-300 cursor-pointer shadow-md shadow-purple-950/40"
                      >
                        <Eye size={12} /> VIEW_NODE <ArrowUpRight size={11} className="text-purple-200" />
                      </button>
                    </div>
                  </Interactive3DCard>
                );
              })}

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.01, border: '1px dashed rgba(139, 92, 246, 0.45)', bg: 'rgba(11, 8, 22, 0.4)' }}
                onClick={() => navigate('/wizard')}
                className="rounded-2xl p-6 border border-dashed border-white/10 bg-white/[0.005] hover:bg-purple-950/5 transition-all flex flex-col items-center justify-center text-center group cursor-pointer min-h-[268px]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all mb-4 font-bold text-base">
                  +
                </div>
                <h4 className="font-bold text-sm text-slate-200 group-hover:text-purple-400 transition-colors font-mono uppercase tracking-wider">Generate Shell Cluster</h4>
                <p className="text-xs text-slate-500 max-w-[200px] mt-2 font-medium leading-relaxed">
                  Configure an entirely separate independent design presentation matrix.
                </p>
              </motion.div>
            </motion.div>
          )}

          {!isLoading && userPortfolios.length === 0 && (
            <div className="mt-12 text-center p-12 border border-dashed border-white/5 rounded-2xl bg-black/20 max-w-md mx-auto">
              <ShieldAlert className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">No active deployments linked to this engine node matrix.</p>
            </div>
          )}

        </main>

        {/* ================= HOLOGRAPHIC MODAL DIALOG CONTAINER ================= */}
        <AnimatePresence>
          {deleteTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dark Blur Backdrop Mask */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isDeleting && setDeleteTarget(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              {/* Modal Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-[#0b0816] border border-red-500/30 rounded-2xl p-6 max-w-md w-full relative z-10 shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden"
              >
                {/* Neon Warning Top Backlight Accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 shadow-inner">
                    <AlertTriangle size={18} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold font-mono text-white uppercase tracking-tight flex items-center justify-between">
                      De-provision Shell Node?
                      {!isDeleting && (
                        <button 
                          onClick={() => setDeleteTarget(null)}
                          className="text-slate-500 hover:text-white transition p-1 hover:bg-white/5 rounded-lg"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      You are about to completely drop and purge <span className="text-red-400 font-mono font-bold">"{deleteTarget.title}"</span> from the network registries. This operation cannot be rolled back.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                  <button
                    disabled={isDeleting}
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition disabled:opacity-40"
                  >
                    Abort
                  </button>
                  
                  <button
                    disabled={isDeleting}
                    onClick={executeClusterDestruction}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-950/50 transition flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>PURGING_CLUSTER... <Loader2 size={13} className="animate-spin" /></>
                    ) : (
                      <>EXECUTE_DROP_PROTOCAL</>
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