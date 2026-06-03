import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioBuilderContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { 
  Loader2, Sparkles, AlertTriangle, CheckCircle, Cpu, FileText, 
  ChevronRight, Terminal, Shield, Network, Zap, ArrowLeft, Layers 
} from 'lucide-react';

// --- Dynamic Roll-Up Count Effect for Metrics ---
function AnimatedMetric({ value, label, gradientClass }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    if (start === end) return;

    let totalDuration = 1000;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));
    
    let timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={`relative overflow-hidden bg-gradient-to-br ${gradientClass} border border-white/10 p-6 rounded-2xl text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-md group`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 rounded-2xl" />
      <span className="text-4xl font-black font-mono tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        {displayValue}%
      </span>
      <span className="block text-[10px] uppercase font-mono text-slate-300 tracking-widest mt-2 font-bold">{label}</span>
    </motion.div>
  );
}

// --- NEW 3D INTERACTIVE COSMIC CONSTELLATION GRAPHICS CONFIGURATION ---
function CosmicConstellationGrid({ processingState }) {
  const ref = useRef();
  // Generate high-density complex point structure arrays
  const [sphere] = useState(() => random.inSphere(new Float32Array(4500), { radius: 1.6 }));

  useFrame((state, delta) => {
    // Morph system physics speed variables depending on operational system state changes
    const speed = processingState === 'loading' ? 6.5 : 0.6;
    ref.current.rotation.x += delta * 0.05 * speed;
    ref.current.rotation.y += delta * 0.08 * speed;
    
    // Subtle wave pulsing animation effect
    const wave = Math.sin(state.clock.getElapsedTime() * (processingState === 'loading' ? 4 : 1)) * 0.05;
    ref.current.position.z = wave;
  });

  return (
    <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={processingState === 'loading' ? '#F43F5E' : processingState === 'success' ? '#10B981' : '#8B5CF6'}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export default function TailoredResumeEngine() {
  const navigate = useNavigate();
  const { savedPortfolios } = usePortfolio(); 
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
  const [variant, setVariant] = useState('Full-Stack Engineer');
  const [jobDescription, setJobDescription] = useState('');
  const [systemState, setSystemState] = useState('idle'); 
  const [output, setOutput] = useState(null);

  // Auto-initialize base configuration profiles on mount
  useEffect(() => {
    if (savedPortfolios && savedPortfolios.length > 0 && !selectedPortfolioId) {
      setSelectedPortfolioId(savedPortfolios[0]._id);
    }
  }, [savedPortfolios, selectedPortfolioId]);

  const triggerOptimizationEngine = async () => {
    if (!selectedPortfolioId) {
      toast.error("Please identify a deployment target profile configuration first.");
      return;
    }
    setSystemState('loading');
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio/tailor-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          variantType: variant, 
          jobDescription,
          portfolioId: selectedPortfolioId 
        })
      });

      if (!response.ok) throw new Error('AI Alignment pipeline returned an error code.');
      
      const payload = await response.json();
      setOutput(payload);
      setSystemState('success');
      toast.success('AI Variant generation complete. ATS parameters tracked!');
    } catch (err) {
      console.error(err);
      setSystemState('idle');
      toast.error('Failed to run optimization matrix modules.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] text-slate-100 font-sans overflow-x-hidden selection:bg-purple-500/40 selection:text-white">
      
      {/* BACKGROUND GRAPHICS: THREE.JS WEBGL CONSTELLATION CANVAS CONTAINER */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1.2] }}>
          <CosmicConstellationGrid processingState={systemState} />
        </Canvas>
      </div>

      {/* GLOBAL HUD DESIGN HEADER NAVIGATION BLOCK */}
      <nav className="sticky top-0 z-50 bg-[#03050a]/60 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform cursor-pointer" /> 
            <span>EXIT</span>
          </button>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemState === 'loading' ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${systemState === 'loading' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">CORE_AI_WORKSPACE</span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-purple-400"/> STATUS: ONLINE</span>
        </div>
      </nav>

      {/* VIEW WORKSPACE COMPILATION AREA */}
      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
        
        {/* INPUT PANELS & CONTROLS CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col gap-5 bg-gradient-to-b from-slate-900/40 to-slate-950/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        >
          {/* WELCOME BANNER COMPONENT */}
          <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent border-l-2 border-purple-500 px-4 py-2.5 rounded-r-xl mb-2">
            <span className="block text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase">System Initialization</span>
            <h1 className="text-sm font-bold font-mono text-white tracking-wide mt-0.5">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-black">Pavan</span>
            </h1>
          </div>

          <div className="flex items-start justify-between border-b border-white/5 pb-3">
            <div>
              <h2 className="text-sm font-bold flex items-center gap-2 font-mono text-white uppercase tracking-wider">
                <Cpu className="text-purple-400 w-4 h-4 animate-spin-slow" /> Configuration Options
              </h2>
            </div>
            <Terminal className="w-4 h-4 text-slate-500 font-mono" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Layers className="w-3 h-3 text-emerald-400" /> Select Source Resume Node
            </label>
            <select 
              value={selectedPortfolioId} 
              onChange={(e) => setSelectedPortfolioId(e.target.value)}
              className="bg-slate-950/90 border border-white/10 text-slate-200 text-xs p-3.5 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all cursor-pointer font-mono"
            >
              {savedPortfolios && savedPortfolios.map((portfolio, index) => (
                <option key={portfolio._id} value={portfolio._id}>
                  {portfolio.personalInfo?.fullName || `Resume Shell Node #${index + 1}`} ({portfolio.selectedTemplate})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Network className="w-3 h-3 text-indigo-400" /> Target Profile Variant
            </label>
            <select 
              value={variant} 
              onChange={(e) => setVariant(e.target.value)}
              className="bg-slate-950/90 border border-white/10 text-slate-200 text-xs p-3.5 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all cursor-pointer font-mono"
            >
              <option value="Frontend Engineer">Frontend Architecture Target</option>
              <option value="Backend Developer">Backend Infrastructure Target</option>
              <option value="Full-Stack Engineer">Full-Stack System Target</option>
              <option value="AI / Machine Learning Specialist">AI / Core Automation Target</option>
              <option value="DevOps & Reliability Engineer">DevOps Pipeline & SRE Target</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <FileText className="w-3 h-3 text-purple-400" /> Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste corporate job compliance maps here to compute keyword density values..."
              className="bg-slate-950/90 border border-white/10 text-slate-300 text-xs p-4 rounded-xl h-56 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none font-mono placeholder:text-slate-600 leading-relaxed"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            disabled={systemState === 'loading'}
            onClick={triggerOptimizationEngine}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-4 rounded-xl text-xs font-extrabold font-mono uppercase flex items-center justify-center gap-2 disabled:opacity-40 transition-all cursor-pointer border border-white/10"
          >
            {systemState === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing_Matrix_Alignment...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-purple-200 animate-bounce" />
                <span>Optimize Resume Variant</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* METRICS & HIGHLY ANIMATED OUTPUT PREVIEW CONTAINER */}
        <div className="lg:col-span-7 flex flex-col gap-6 min-h-[540px]">
          <AnimatePresence mode="wait">
            
            {/* STATE 1: IDLE SYSTEM STANDBY VIEW */}
            {systemState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex-1 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-12 text-center bg-slate-950/20 backdrop-blur-sm"
              >
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-full mb-4 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <Terminal className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
                <span className="text-slate-400 font-mono text-xs tracking-widest font-semibold">// AWAITING CORE AGGREGATOR INGESTION PROTOCAL</span>
              </motion.div>
            )}

            {/* STATE 2: PIPELINE LOADER ENGINE VIEW */}
            {systemState === 'loading' && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 border border-white/10 bg-slate-950/40 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center p-12 text-center gap-4 shadow-2xl"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-16 h-16 border-2 border-dashed border-rose-500/30 rounded-full animate-spin" />
                  <Loader2 className="w-7 h-7性能 animate-spin text-rose-500" />
                </div>
                <div className="flex flex-col gap-1 mt-3">
                  <span className="text-xs font-mono tracking-widest text-white font-bold uppercase animate-pulse">Running Neural Alignment Network...</span>
                  <span className="text-[10px] font-mono text-slate-500">// Adjusting data indices & converting experience elements to Google XYZ layout models.</span>
                </div>
              </motion.div>
            )}

            {/* STATE 3: HYPER-ANIMATED RESULTS MODULE VIEW */}
            {systemState === 'success' && output && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 12 }}
                className="flex flex-col gap-6"
                style={{ perspective: 1000 }}
              >
                {/* METRICS DISPLAYS WITH CUSTOM GRADIENTS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AnimatedMetric value={output.atsMatrix.overallScore} label="ATS Match Rating" gradientClass="from-emerald-600/20 to-teal-900/40 text-emerald-400" />
                  <AnimatedMetric value={output.atsMatrix.impactScore} label="Impact Vector" gradientClass="from-purple-600/20 to-indigo-900/40 text-purple-400" />
                  <AnimatedMetric value={output.atsMatrix.keywordDensityScore} label="Density Weights" gradientClass="from-pink-600/20 to-rose-900/40 text-pink-400" />
                </div>

                {/* STAGGER REVEAL SYSTEM FOR KEYWORDS */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="bg-gradient-to-b from-slate-900/30 to-slate-950/50 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4 shadow-2xl"
                >
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                    <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                    <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">// Optimization Matrix Analysis</h3>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle className="w-3.5 h-3.5"/> Key Expressions Identified:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {output.atsMatrix.identifiedKeywordsMatched.map((kw, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 180, delay: 0.25 + (i * 0.04) }}
                          key={i} 
                          className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-default"
                        >
                          {kw}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {output.atsMatrix.missingCriticalKeywords.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                      <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5"/> Recommended Priority Expansions:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {output.atsMatrix.missingCriticalKeywords.map((kw, i) => (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 180, delay: 0.35 + (i * 0.04) }}
                            key={i} 
                            className="text-[10px] font-mono bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3 py-1 rounded-lg hover:bg-rose-500/20 hover:border-rose-500/50 transition-all cursor-default"
                          >
                            {kw}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* TEXT COMPILATION VARIANT PREVIEW BOX */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="bg-gradient-to-b from-slate-900/30 to-slate-950/50 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4 shadow-2xl"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-1 uppercase tracking-wide">
                      <ChevronRight className="w-4 h-4 text-purple-400" /> Compiled Output Summary Preview
                    </h3>
                    <span className="text-[9px] font-mono text-purple-300 bg-purple-500/10 px-3 py-1 border border-purple-500/30 rounded-full uppercase tracking-widest font-bold">
                      {output.tailoredData.personalInfo.title}
                    </span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="bg-black/40 p-4 border border-white/5 rounded-2xl relative group hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="absolute inset-y-4 left-0 w-[3px] bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                    <p className="text-slate-300 text-xs font-mono leading-relaxed pl-3 select-text select-all">{output.tailoredData.personalInfo.summary}</p>
                  </motion.div>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* SYSTEM METADATA HUD FOOTER CONTAINER */}
      <footer className="w-full bg-[#03050a]/80 backdrop-blur-md border-t border-white/10 px-8 py-4 mt-16 flex flex-col md:flex-row gap-4 items-center justify-between text-[10px] font-mono text-slate-500 z-10 relative">
        <div className="flex items-center gap-2">
          <span>&copy; 2026 COGNITIVE_STUDIOS_MATRIX</span>
          <span>|</span>
          <span className="text-slate-400">ENGINE_BUILD_V3.0.0_PRODUCTION</span>
        </div>
        <div className="flex items-center gap-6">
          <span>ROUTING: <span className="text-emerald-400">SECURE_EDGE</span></span>
        </div>
      </footer>

    </div>
  );
}