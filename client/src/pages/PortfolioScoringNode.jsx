// src/pages/PortfolioScoringNode.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { ArrowLeft, ShieldAlert, Cpu, Activity, Database, CheckCircle, Globe, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as random from 'maath/random/dist/maath-random.esm';

/* =========================================================
   3D NEO-PULSE MATRIX & COAXIAL GEOMETRY (THREE.JS)
========================================================= */
function CyberMatrixField({ isAnalyzing }) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(900), { radius: 2.0 }));

  useFrame((state, delta) => {
    if (ref.current) {
      // Speed up spin velocity exponentially when processing a dynamic payload
      const speed = isAnalyzing ? 4.0 : 0.2;
      ref.current.rotation.y += delta * 0.12 * speed;
      ref.current.rotation.x += delta * 0.05 * speed;
    }
  });

  return (
    <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isAnalyzing ? "#f43f5e" : "#a855f7"}
          size={0.038}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

function FloatingDataPrism({ isAnalyzing }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * (isAnalyzing ? 3.0 : 0.6);
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (isAnalyzing ? 1.5 : 0.3);
      
      // Dynamic breathing amplitude adjustments
      const pulse = 1.1 + Math.sin(state.clock.getElapsedTime() * (isAnalyzing ? 8 : 2)) * 0.08;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[1, 1]} />
      <meshBasicMaterial 
        color={isAnalyzing ? "#ec4899" : "#6366f1"} 
        wireframe 
        transparent 
        opacity={0.25} 
      />
    </mesh>
  );
}

/* =========================================================
   MAIN VIEWPORT: DYNAMIC OBSIDIAN OVERDRIVE NODE
========================================================= */
export default function PortfolioScoringNode() {
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);

  const executeDynamicAudit = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return toast.error("Please insert a live destination URL node first.");

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/portfolio/scoring-metrics`,
        { portfolioUrl: urlInput },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        setMetrics(response.data);
        toast.success("Telemetry matrix calculated successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to audit portfolio target.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03010a] text-white p-6 md:p-12 selection:bg-pink-500/30 overflow-x-hidden">
      
      {/* 3D CANVAS RENDERING SUB-PLANE */}
      <div className="absolute inset-0 z-0 h-screen w-screen pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.4} />
          <CyberMatrixField isAnalyzing={loading} />
          <FloatingDataPrism isAnalyzing={loading} />
        </Canvas>
      </div>

      {/* BACKGROUND GRAPH LAYER 2: SHARP VIOLET HORIZON GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none z-0" />

      {/* FOREGROUND MATRIX LAYOUT */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* COMMAND SYSTEM HEADER TRACK */}
        <div className="flex items-center justify-between mb-10 border-b border-purple-950/40 pb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 0.4)", color: "#ec4899" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-xl border border-white/5 bg-black/40 flex items-center justify-center transition-colors cursor-pointer text-neutral-400"
            >
              <ArrowLeft size={16} />
            </motion.button>
            <div>
              <h1 className="text-2xl md:text-3xl font-mono font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-pink-500 flex items-center gap-2">
                AI Portfolio Scoring Engine
              </h1>
              <p className="text-[10px] font-mono text-pink-400/60 uppercase tracking-widest mt-1">
                Dynamic URL Scraping Vector Engine // Synth Cybernetic Overlay
              </p>
            </div>
          </div>
        </div>

        {/* INPUT TELEMETRY COMPONENT */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mx-auto mb-10 backdrop-blur-xl bg-neutral-950/40 border border-purple-900/20 rounded-2xl p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
        >
          <form onSubmit={executeDynamicAudit} className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Globe size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500/50" />
              <input 
                type="url" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="PROBE ROUTE PINNING ADDRESS (e.g., https://portfolio.com)" 
                disabled={loading}
                className="w-full pl-11 pr-4 py-3 bg-black/60 border border-purple-950/40 rounded-xl outline-none focus:border-pink-500/50 font-mono text-xs tracking-wider transition-all text-neutral-200 placeholder-neutral-700 shadow-inner"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-mono font-bold text-xs tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-[0_0_25px_rgba(236,72,153,0.25)]"
            >
              {loading ? "Analyzing Matrix..." : "Evaluate Layout"}
              <ArrowRight size={13} />
            </motion.button>
          </form>
        </motion.div>

        {/* DATA CONTAINER READOUT PORTS */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="h-[35vh] flex flex-col items-center justify-center gap-4 font-mono text-[11px] tracking-widest text-pink-400 bg-neutral-950/20 border border-purple-950/20 rounded-3xl backdrop-blur-sm shadow-2xl"
            >
              <Activity size={20} className="animate-spin text-pink-500 [animation-duration:3s]" />
              <div className="flex flex-col items-center gap-1 text-center px-4">
                <p className="animate-pulse uppercase font-bold text-neutral-200 tracking-wider">Intercepting Host Target Stream...</p>
                <p className="text-[9px] text-purple-400/50 uppercase font-medium">Injecting dynamic Groq semantic model logic keys</p>
              </div>
            </motion.div>
          ) : metrics ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* CURRENT ACTIVE RECORD IDENTIFIER */}
              <div className="lg:col-span-3 bg-neutral-950/40 border border-purple-950/20 rounded-xl px-5 py-3 font-mono text-[11px] text-neutral-400 flex items-center justify-between flex-wrap gap-2 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-pink-500 font-extrabold tracking-wider uppercase">Active Node Verified:</span>
                  <a href={metrics.evaluatedUrl} target="_blank" rel="noreferrer" className="underline hover:text-pink-400 transition-colors tracking-wide text-neutral-300">{metrics.evaluatedUrl}</a>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded border border-pink-500/20 bg-pink-950/20 text-pink-400 uppercase font-bold tracking-widest animate-pulse">Telemetry Locked</span>
              </div>
              
              {/* COMPOSITE INTERACTIVE RADIAL DIAL CARD */}
              <div className="backdrop-blur-xl bg-neutral-950/20 border border-purple-950/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[340px] shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.03)_0%,transparent_70%)] pointer-events-none" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-500 mb-4">Structural Alignment Rating</span>
                
                <div className="relative flex items-center justify-center w-40 h-40 rounded-full border border-purple-950/20 bg-black/50 shadow-[inset_0_4px_25px_rgba(0,0,0,0.9)] group-hover:border-pink-500/30 transition-all duration-500">
                  <div className="absolute inset-2 border border-dashed border-pink-500/10 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-4 border border-solid border-neutral-900/60 rounded-full" />
                  <h2 className="text-6xl font-black tracking-tight font-sans text-white group-hover:text-pink-400 transition-colors duration-300 relative z-10">
                    {metrics.compositeScore}<span className="text-lg text-neutral-600 font-normal">/100</span>
                  </h2>
                </div>
                <div className="mt-6 bg-pink-500/5 border border-pink-500/10 px-4 py-1.5 rounded-xl text-[10px] font-mono font-extrabold text-pink-400 uppercase tracking-widest">
                  Score Matrix Verified
                </div>
              </div>

              {/* PROGRESS BAR TRACK LOG CHANNELS */}
              <div className="lg:col-span-2 backdrop-blur-xl bg-neutral-950/20 border border-purple-950/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Cpu size={13} className="text-pink-500" /> Assessment Multiplier Weights
                  </h3>
                  
                  <div className="space-y-6">
                    {/* BAR BLOCK 1 */}
                    <div>
                      <div className="flex justify-between font-mono text-xs mb-1.5">
                        <span className="text-neutral-400 uppercase tracking-wider text-[11px]">Profile Structure Depth</span>
                        <span className="text-pink-400 font-bold">{metrics.breakdown?.profileDepth?.score} <span className="text-neutral-700">/</span> {metrics.breakdown?.profileDepth?.max}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-purple-950/10">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${metrics.breakdown?.profileDepth?.percentage}%` }} transition={{ duration: 1.3, ease: "circOut" }} className="h-full bg-gradient-to-r from-purple-600 to-pink-500" />
                      </div>
                    </div>

                    {/* BAR BLOCK 2 */}
                    <div>
                      <div className="flex justify-between font-mono text-xs mb-1.5">
                        <span className="text-neutral-400 uppercase tracking-wider text-[11px]">Technical Breadth Footprint</span>
                        <span className="text-purple-400 font-bold">{metrics.breakdown?.technicalBreadth?.score} <span className="text-neutral-700">/</span> {metrics.breakdown?.technicalBreadth?.max}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-purple-950/10">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${metrics.breakdown?.technicalBreadth?.percentage}%` }} transition={{ duration: 1.3, ease: "circOut", delay: 0.1 }} className="h-full bg-gradient-to-r from-purple-600 to-indigo-500" />
                      </div>
                    </div>

                    {/* BAR BLOCK 3 */}
                    <div>
                      <div className="flex justify-between font-mono text-xs mb-1.5">
                        <span className="text-neutral-400 uppercase tracking-wider text-[11px]">Market Compliance Velocity</span>
                        <span className="text-rose-400 font-bold">{metrics.breakdown?.marketVelocity?.score} <span className="text-neutral-700">/</span> {metrics.breakdown?.marketVelocity?.max}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-purple-950/10">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${metrics.breakdown?.marketVelocity?.percentage}%` }} transition={{ duration: 1.3, ease: "circOut", delay: 0.2 }} className="h-full bg-gradient-to-r from-pink-600 to-rose-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* METADATA GRID RECONSTRUCTION BULLETS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 border-t border-purple-950/30 pt-5">
                  {[
                    { label: 'Languages', value: metrics.telemetryLog?.trackedLanguages },
                    { label: 'Frameworks', value: metrics.telemetryLog?.trackedFrameworks },
                    { label: 'Experience Blocks', value: metrics.telemetryLog?.experienceBlocks },
                    { label: 'Repo Trace Count', value: metrics.telemetryLog?.compiledProjectAssets }
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/50 border border-purple-950/10 rounded-xl p-2.5 text-center shadow-inner">
                      <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-base font-mono font-extrabold text-neutral-200 mt-0.5">{stat.value ?? 0}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION RECOMMENDATION TRACE LEDGER */}
              <div className="lg:col-span-3 backdrop-blur-xl bg-neutral-950/10 border border-purple-950/20 rounded-2xl p-6 shadow-md">
                <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Database size={13} className="text-pink-500" /> Algorithmic Optimization Ledger
                </h3>
                <div className="space-y-2.5">
                  {metrics.insights?.map((insight, idx) => {
                    const isAlert = insight.includes("Missing") || insight.includes("Expand") || insight.includes("Consider") || insight.includes("Extend");
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 3 }}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs font-mono transition-all ${
                          isAlert ? "bg-rose-950/5 border-rose-500/10 text-rose-300/90" : "bg-purple-950/5 border-purple-500/10 text-purple-300/90"
                        }`}
                      >
                        {isAlert ? <ShieldAlert size={14} className="mt-0.5 text-rose-500 flex-shrink-0" /> : <CheckCircle size={14} className="mt-0.5 text-purple-400 flex-shrink-0" />}
                        <span className="leading-relaxed">{insight}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          ) : (
            /* EMPTY VIEWPORT BOUNDARY DEFAULT STATE */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[25vh] border border-dashed border-purple-950/30 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-neutral-950/10 font-mono text-[11px] text-neutral-500 backdrop-blur-[1px]"
            >
              <Globe size={20} className="text-neutral-700 mb-2 animate-pulse" />
              AWAITING REMOTE HOST INFRASTRUCTURE URL STREAM VALUE INPUT ON PROBE MANAGER...
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}