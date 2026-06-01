import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  Play,
  ChevronRight,
  FileText,
  Globe,
  Layers,
  Rocket,
  ShieldCheck,
  Brain,
  BarChart3,
  Star,
  Zap,
  Users,
  Trophy,
  LayoutDashboard,
  Terminal,
  Activity,
  Maximize2
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

// --- Subcomponent: Premium Interactive 3D Card Engine ---
const Card3D = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotational 3D transformations mapping mouse vectors
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  // Dynamic light sheen layer transformations to simulate reflective surfaces
  const sheenX = useTransform(x, [-300, 300], ["0%", "100%"]);
  const sheenY = useTransform(y, [-300, 300], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl transition-all duration-200 ease-out shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] group hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] ${className}`}
      >
        {/* Dynamic Refraction Glare / Sheen Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--sheen-x)_var(--sheen-y),rgba(255,255,255,0.08)_0%,transparent_60%)]"
          style={{
            style: {
              "--sheen-x": sheenX,
              "--sheen-y": sheenY,
            }
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("foliofyx_auth_token");
    if (token) {
      setIsLoggedIn(true);
    }

    const moveGlow = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  const stats = [
    { number: "50K+", label: "Portfolios Generated", color: "from-purple-400 to-indigo-500" },
    { number: "98%", label: "Placement Success", color: "from-cyan-400 to-emerald-400" },
    { number: "120+", label: "Premium Layouts", color: "from-pink-400 to-rose-500" },
    { number: "24/7", label: "AI Engine Support", color: "from-amber-400 to-orange-500" },
  ];

  const features = [
    {
      icon: FileText,
      title: "AI Resume Parsing",
      desc: "Extract skills, experience, and deep tech-stack structures automatically via algorithmic parsing.",
      color: "group-hover:text-purple-400"
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn Matrix Sync",
      desc: "Import your full professional history, project achievements, and text assets in a single click.",
      color: "group-hover:text-blue-400"
    },
    {
      icon: FaGithub,
      title: "GitHub Intelligence",
      desc: "Automatically map repository statistics, languages, activity metrics, and live deployment loops.",
      color: "group-hover:text-cyan-400"
    },
    {
      icon: Globe,
      title: "Instant Global CDN",
      desc: "Publish your customized layout shell instantly onto globally edge-cached networks safely.",
      color: "group-hover:text-emerald-400"
    },
    {
      icon: Brain,
      title: "AI Narrative Generator",
      desc: "Generate professional summaries, about-me frames, and technical descriptions with tailored prompts.",
      color: "group-hover:text-pink-400"
    },
    {
      icon: BarChart3,
      title: "Recruiter Analytics",
      desc: "Track traffic, clicks, profile views, and telemetry actions directly through your dashboard cluster.",
      color: "group-hover:text-amber-400"
    },
  ];

  const faqs = [
    {
      question: "How does NodeForge build my asset?",
      answer: "Upload your resume or link your public profiles. Our AI structures the metadata parameters, extracts matching development skills, and injects them directly into our responsive system templates instantly.",
    },
    {
      question: "Do I need design or code experience?",
      answer: "No coding or configuration management is required. NodeForge features a sandboxed visual controls layer that outputs responsive, production-ready static architectures natively.",
    },
    {
      question: "Can I manage custom domains?",
      answer: "Yes. Every account tier features configuration routing support to hook up custom CNAME records and lock them securely with automated SSL protection layers.",
    },
    {
      question: "Is linking GitHub an absolute requirement?",
      answer: "No, GitHub data is entirely optional. However, utilizing the profile pipeline generates comprehensive live metrics charts that recruiters highly prioritize.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030014] text-white flex flex-col w-full font-sans antialiased">
      
      {/* --- INJECTED UTILITY STYLES FOR CORE 3D RENDERING --- */}
      <style>{`
        html { scroll-behavior: smooth; }
        .cyber-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
        }
        .text-glow-purple { text-shadow: 0 0 40px rgba(168,85,247,0.4); }
        .border-glow-purple:hover { box-shadow: 0 0 30px rgba(139,92,246,0.25); }
      `}</style>

      {/* --- PREMIUM BACKDROP LIT ARCHITECTURE --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-purple-900/15 blur-[160px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-blue-900/15 blur-[180px]" />
        <div className="absolute bottom-[10%] left-[15%] w-[45%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px]" />
        <div className="absolute inset-0 cyber-grid opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030014_90%)]" />
      </div>

      {/* Real-time Dynamic Mouse Spotlight Trailing Filter */}
      <div
        className="pointer-events-none fixed z-30 opacity-60 hidden lg:block w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,rgba(6,182,212,0.02)_40%,transparent_70%)] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />

      {/* --- FIXED HEAD NAVIGATION BAR LAYER --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/[0.06] bg-[#030014]/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold font-mono text-white text-lg shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:scale-105 transition-all">
              N
            </div>
            <h1 className="font-bold text-xl tracking-wider font-mono text-white uppercase">
              Node<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">FORGE</span>
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-slate-400">
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Home</a>
            <a href="#features" className="hover:text-purple-400 transition-colors duration-200">Features</a>
            <a href="#templates" className="hover:text-purple-400 transition-colors duration-200">Templates</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors duration-200">FAQ</a>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <LayoutDashboard size={14} /> Go To Console
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300 hover:border-purple-500/30 cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            className="lg:hidden text-white relative z-50 p-2 text-xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-6 right-6 z-40 bg-[#07041a]/95 backdrop-blur-2xl rounded-2xl p-6 border border-white/15 shadow-2xl flex flex-col gap-5 text-center text-sm font-semibold tracking-wider"
          >
            <a href="#" onClick={() => setMobileMenu(false)} className="text-slate-300 py-2">Home</a>
            <a href="#features" onClick={() => setMobileMenu(false)} className="text-slate-300 py-2">Features</a>
            <a href="#templates" onClick={() => setMobileMenu(false)} className="text-slate-300 py-2">Templates</a>
            <a href="#faq" onClick={() => setMobileMenu(false)} className="text-slate-300 py-2">FAQ</a>
            <button
              onClick={() => { setMobileMenu(false); navigate("/login"); }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold uppercase text-xs tracking-widest mt-2"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENT WORKSPACE WRAPPER --- */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col items-center">
        
        {/* HERO HEADER CALLOUT SEGMENT */}
        <section className="text-center pt-44 pb-20 max-w-4xl w-full flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-badge"
          >
            <Sparkles size={13} className="text-indigo-400" />
            AI Powered Portfolio Builder
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="hero-title hero-shine text-glow"
          >
            Turn Your Resume
            <br />
            Into A Stunning
            <span className="gradient-text"> Portfolio Website</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="hero-description font-medium"
          >
            Upload your resume, connect GitHub and LinkedIn, and generate a beautiful portfolio website in less than 60 seconds.
          </motion.p>

          <motion.div
  variants={fadeUp}
  initial="hidden"
  animate="show"
  transition={{ delay: 0.35 }}
  className="flex flex-col sm:flex-row gap-5 justify-center mt-12 w-full sm:w-auto"
>
  <button
    onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-slate-200 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_4px_30px_rgba(255,255,255,0.15)] cursor-pointer"
  >
    {isLoggedIn ? "Go to Console" : "Start Building"}
    <ArrowRight size={16} />
  </button>
  
  <button 
    onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
  >
    <Play size={14} className="fill-current" />
    Watch Architecture Demo
  </button>
</motion.div>
        </section>

        {/* HIGH-IMPACT 3D INTERACTIVE SIMULATION AREA */}
        <section className="w-full relative mb-40 hidden lg:flex justify-center items-center h-[340px] max-w-5xl">
          {/* Left Wing Layer Node */}
          <motion.div
            animate={{ y: [0, -12, 0], rotateX: [12, 16, 12], rotateY: [20, 25, 20] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute left-[8%] z-10 p-6 rounded-2xl w-72 border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-2xl shadow-2xl shadow-purple-500/5 transition-colors border-glow-purple"
          >
            <div className="flex items-center gap-2 text-purple-400 mb-6">
              <Terminal size={16} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">Active Workspace</span>
            </div>
            <h3 className="font-bold text-xl uppercase font-mono text-white tracking-wide">Frontend Core</h3>
            <div className="space-y-3 mt-6">
              <div className="h-2 rounded bg-purple-500/30 w-full" />
              <div className="h-2 rounded bg-purple-500/20 w-[70%]" />
              <div className="h-2 rounded bg-white/[0.04] w-full" />
            </div>
          </motion.div>

          {/* Central Layer Grid Node */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotateX: [18, 14, 18], rotateY: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute z-20 p-8 rounded-3xl w-[440px] border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-black/60 backdrop-blur-3xl shadow-[0_20px_50px_rgba(139,92,246,0.15)] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[10px] uppercase text-purple-400 tracking-widest font-bold">NodeForge Engine v1.0</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg">P</div>
              <div>
                <h4 className="font-bold text-lg text-white font-mono tracking-wide uppercase">Pavan Kalyan</h4>
                <p className="text-xs font-mono text-cyan-400 tracking-wider">Full-Stack Architect</p>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5"><Activity size={12} className="text-emerald-400" /> API Online</span>
              <span className="text-purple-400 font-bold">Secure SSL</span>
            </div>
          </motion.div>

          {/* Right Wing Layer Node */}
          <motion.div
            animate={{ y: [0, 12, 0], rotateX: [10, 6, 10], rotateY: [-24, -18, -24] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute right-[8%] z-10 p-6 rounded-2xl w-72 border border-white/10 bg-gradient-to-bl from-white/[0.06] to-transparent backdrop-blur-2xl shadow-2xl shadow-cyan-500/5 border-glow-purple flex flex-col"
          >
            <FaGithub size={28} className="text-cyan-400 mb-6" />
            <h3 className="font-bold text-xl uppercase font-mono text-white tracking-wide">Telemetry Log</h3>
            <p className="text-slate-400 text-xs font-mono font-medium mt-3 leading-relaxed">
              TypeScript • React • Express Cluster
            </p>
            <div className="mt-5 pt-4 border-t border-white/[0.06] h-8 w-full bg-cyan-500/5 rounded flex items-center px-3 text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase font-bold">
              Data Core Synced
            </div>
          </motion.div>
        </section>

        {/* GLOBAL NETWORK TELEMETRY METRICS SECTION */}
        <section className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold tracking-widest uppercase">CLUSTER TELEMETRY</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">Scalable Platform Ecosystem</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stats.map((item, index) => (
              <Card3D key={index} className="p-8 flex flex-col justify-center items-center text-center">
                <h3 className={`text-4xl sm:text-5xl font-black font-mono tracking-tighter bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.number}
                </h3>
                <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mt-3 font-mono">{item.label}</p>
              </Card3D>
            ))}
          </div>
        </section>

        {/* PLATFORM FEATURES GRID ARCHITECTURE */}
        <section id="features" className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-bold tracking-widest uppercase">ARCHITECTURAL FEATURES</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">Integrated Infrastructure Matrix</h2>
            <p className="text-slate-400 text-sm mt-3 font-medium max-w-lg mx-auto tracking-wide">Complete visual design control maps directly to zero manual code operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card3D key={index} className="p-8 h-full flex flex-col justify-start text-left group">
                  <div className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 transition-colors duration-300 ${feature.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-lg uppercase font-mono text-white tracking-wide mt-6">{feature.title}</h3>
                  <p className="text-slate-400 text-xs font-medium mt-3 tracking-wide leading-relaxed">{feature.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        {/* INTEGRATED BENTO GRAPHIC MATRIX */}
        <section className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            <Card3D className="lg:col-span-2 p-10 flex flex-col justify-center items-start text-left min-h-[260px]">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Rocket size={20} />
              </div>
              <h3 className="text-2xl font-bold font-mono uppercase tracking-wide text-white">Continuous Deployment Pipelines</h3>
              <p className="text-slate-400 text-xs font-medium mt-3 tracking-wide leading-relaxed max-w-xl">
                Upload your localized dataset structures. Our system instantly parses and serializes properties, delivering highly responsive layouts straight to secure cloud architecture endpoints.
              </p>
            </Card3D>

            <Card3D className="p-10 flex flex-col justify-center items-start text-left min-h-[260px]">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xl font-bold font-mono uppercase tracking-wide text-white">Cryptographic Data Safeguards</h3>
              <p className="text-slate-400 text-xs font-medium mt-3 tracking-wide leading-relaxed">
                All profile authentication keys, user tokens, and private dataset parameters remain fully guarded under rigorous cloud-hosted cryptography.
              </p>
            </Card3D>
          </div>
        </section>

        {/* AI CAPABILITIES & TARGET VISUALIZATION MODULE ROW */}
        <section className="w-full mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Card3D className="p-10 flex flex-col justify-center text-left border-glow-purple">
              <Brain size={32} className="text-pink-400 mb-6" />
              <h3 className="text-2xl font-bold font-mono uppercase tracking-wide text-white">Neural Text Compilation</h3>
              <p className="text-slate-400 text-xs font-medium mt-3 tracking-wide leading-relaxed">
                Automate technical summaries and developer experience notes. Our built-in formatting layout layers structure summaries cleanly to catch technical recruiter screens.
              </p>
            </Card3D>

            <Card3D className="p-10 flex flex-col justify-center text-left border-glow-purple">
              <Users size={32} className="text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold font-mono uppercase tracking-wide text-white">Retentive Architecture Modeling</h3>
              <p className="text-slate-400 text-xs font-medium mt-3 tracking-wide leading-relaxed">
                Every layout option is directly engineered around visibility data. Build structured matrices emphasizing code repositories, code languages, and metrics that prove delivery competence.
              </p>
            </Card3D>
          </div>
        </section>

        {/* SYSTEM WORKFLOW PROCESS MODULE */}
        <section className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold tracking-widest uppercase">WORKFLOW STEPS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">Automated Provisioning Node Lifecycle</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { step: "01", title: "Ingest PDF Document Assets" },
              { step: "02", title: "Map Cloud Code Repositories" },
              { step: "03", title: "Initialize Skin Template Shell" },
              { step: "04", title: "Deploy Production Live Server" },
            ].map((item, index) => (
              <Card3D key={index} className="p-8 min-h-[180px] flex flex-col justify-between items-start">
                <div className="font-mono text-3xl font-black text-purple-500/40 tracking-tighter">{item.step}</div>
                <h3 className="font-mono font-bold text-sm tracking-wide uppercase text-slate-200 mt-6">{item.title}</h3>
              </Card3D>
            ))}
          </div>
        </section>

        {/* PREMIUM TEMPLATES GRID MODULE SYSTEM */}
        <section id="templates" className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-bold tracking-widest uppercase">PRODUCTION SCHEMAS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">Premium Microservice Interface Skins</h2>
            <p className="text-slate-400 text-sm mt-3 font-medium max-w-lg mx-auto tracking-wide">Fully componentized skin modules optimized for maximum desktop rendering speeds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
  { name: "Cyberpunk Developer", desc: "High-octane terminal themes with heavy neon accents, telemetry counters, and dark layout layers." },
  { name: "Fluid Creative", desc: "A clean, asymmetrical design emphasizing canvas visuals, smooth state shifts, and sleek transitions." },
  { name: "Executive Elite", desc: "An enterprise-grade layout structured with solid grids, clean font frameworks, and corporate spacing styles." }
].map((template, index) => (
  <Card3D key={index} className="flex flex-col h-full bg-[#050312]/50 group">
    <div className="h-44 relative overflow-hidden bg-gradient-to-b from-purple-950/20 to-black/40 flex items-center justify-center border-b border-white/[0.06]">
      <motion.div
        animate={{ rotate: [0, 3, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-300"
      >
        <Layers size={54} />
      </motion.div>
    </div>
    <div className="p-6 flex flex-col flex-1 justify-between bg-black/40">
      <div>
        <h3 className="font-bold text-base uppercase font-mono tracking-wider text-white">{template.name}</h3>
        <p className="text-slate-400 text-xs font-medium mt-2 tracking-wide leading-relaxed">{template.desc}</p>
      </div>
      
      <button 
        onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase text-purple-400 hover:text-purple-300 transition-colors mt-6 self-start cursor-pointer"
      >
        Preview Layout <ChevronRight size={14} />
      </button>
    </div>
  </Card3D>
))}
          </div>
        </section>

        {/* ACCURATE INTEGRATED SANDBOX LIVE CANVAS SIMULATION */}
        <section className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold tracking-widest uppercase">SANDBOX WORKSPACE</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">Real-time Telemetry Dashboard Sync</h2>
          </div>

          <Card3D className="w-full p-0 border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
            <div className="h-12 border-b border-white/[0.08] bg-[#07041a] flex items-center justify-between px-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <div className="px-4 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400 tracking-wider w-64 text-center truncate">
                https://nodeforge148.netlify.app/p/pavan-kalyan
              </div>
              <Maximize2 size={12} className="text-slate-500" />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[280px] bg-[#03010c]/80">
              <div className="border border-white/[0.06] bg-white/[0.01] rounded-xl p-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-xl" />
                <div className="h-2 rounded bg-white/10 w-24 mt-4" />
                <div className="h-1.5 rounded bg-white/5 w-16 mt-2" />
              </div>
              <div className="md:col-span-3 border border-white/[0.06] bg-white/[0.01] rounded-xl p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-3 rounded bg-purple-500/20 w-[40%]" />
                  <div className="h-2 rounded bg-white/5 w-full" />
                  <div className="h-2 rounded bg-white/5 w-[90%]" />
                  <div className="h-2 rounded bg-white/5 w-[95%]" />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="h-10 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
                  <div className="h-10 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
                  <div className="h-10 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
                </div>
              </div>
            </div>
          </Card3D>
        </section>

        {/* TELEMETRY ANALYTICS & LOG CONTEXT CARDS ROW */}
        <section className="w-full mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Card3D className="p-10 flex flex-col justify-between items-start min-h-[280px]">
              <div className="w-full">
                <BarChart3 size={32} className="text-cyan-400 mb-6" />
                <h3 className="text-2xl font-bold font-mono uppercase tracking-wide text-white">Continuous Clicks Footprint</h3>
                <p className="text-slate-400 text-xs font-medium mt-2 tracking-wide leading-relaxed">
                  Analyze recruiter view counters, direct resume file downloads, and click logs natively straight from your dashboard console.
                </p>
              </div>
              <div className="flex gap-2 items-end w-full h-12 mt-6">
                <div className="bg-gradient-to-t from-cyan-600 to-cyan-400 h-full w-full rounded-sm" />
                <div className="bg-gradient-to-t from-cyan-600 to-cyan-400 h-[75%] w-full rounded-sm" />
                <div className="bg-gradient-to-t from-cyan-600 to-cyan-400 h-[45%] w-full rounded-sm" />
                <div className="bg-gradient-to-t from-cyan-600 to-cyan-400 h-[90%] w-full rounded-sm" />
              </div>
            </Card3D>

            <Card3D className="p-10 flex flex-col justify-start items-start min-h-[280px]">
              <Trophy size={32} className="text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold font-mono uppercase tracking-wide text-white">Verified Honors Matrix</h3>
              <p className="text-slate-400 text-xs font-medium mt-2 tracking-wide leading-relaxed">
                Render technology stack certifications, open-source organization profiles, scholarship milestones, and hackathon wins in custom dynamic presentation nodes.
              </p>
            </Card3D>
          </div>
        </section>

        {/* AUTHENTICATED USER REVIEW ROW */}
        <section className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 text-[10px] font-bold tracking-widest uppercase">COMMUNITY INTEGRATION</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">Developer Success Telemetry</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { name: "Rahul S.", review: "Provisioned my portfolio matrix in under 5 minutes. The layout retainment logs tracking recruiter clicks got me 3 direct interviews within a week." },
              { name: "Priya M.", review: "The automated GitHub stack integration is spectacular. It parses repositories seamlessly, saving hours of manual asset building." },
              { name: "Arjun K.", review: "The AI text compiler generated clean summary bios that aligned with my resume parameters perfectly. Highly recommended framework." },
            ].map((item, index) => (
              <Card3D key={index} className="p-8 flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <div className="flex gap-1 mb-5 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-300 text-xs font-medium tracking-wide leading-relaxed">"{item.review}"</p>
                </div>
                <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-purple-400 mt-6">— {item.name}</h4>
              </Card3D>
            ))}
          </div>
        </section>

        {/* ACCORDION FAQ PACKET COMPONENT MODULE */}
        <section id="faq" className="w-full mb-40 border-t border-white/[0.06] pt-24">
          <div className="text-center mb-20">
            <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-bold tracking-widest uppercase">SUPPORT FAQS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase font-mono mt-4">System Operations Ledger</h2>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden transition-colors duration-200 hover:border-white/10">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors hover:bg-white/[0.01]"
                >
                  <span className="font-mono text-sm tracking-wide text-slate-200 uppercase">{faq.question}</span>
                  <span className="text-purple-400 font-bold text-lg leading-none">{activeFaq === index ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 pt-1 text-slate-400 text-xs font-medium tracking-wide leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* HIGH-IMPACT SECURE CONTEXT SYSTEM MATCHING CTA BOX */}
        <section className="w-full mb-40">
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-indigo-950/20 to-black/80 p-12 text-center flex flex-col items-center shadow-[0_0_50px_rgba(139,92,246,0.1)]">
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
            <Zap size={36} className="text-amber-400 mb-6 animate-bounce" />
            <h2 className="text-3xl sm:text-5xl font-mono font-black uppercase tracking-tight text-white leading-tight">
              Transform Your Metadata
              <br />
              Into A Live Deployment Node
            </h2>
            <p className="mt-4 text-slate-400 text-xs sm:text-sm font-medium tracking-wide max-w-xl leading-relaxed">
              Join thousands of technical engineers, architects, and developers who deploy clean, automated data layouts securely with NodeForge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full sm:w-auto">
              <button onClick={() => navigate("/login")} className="px-8 py-4 bg-white text-black hover:bg-slate-200 text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer">
                Start Building Free
              </button>
              <a href="#templates" className="px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition-all flex items-center justify-center">
                View Layout Shells
              </a>
            </div>
          </div>
        </section>

        {/* UPDATE DISPATCH NEWSLETTER COMPONENT DECK */}
        <section className="w-full mb-28">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-xl font-bold font-mono uppercase tracking-wider text-white">System Logs Newsletter</h3>
              <p className="text-slate-400 text-xs font-medium mt-1 tracking-wide">Receive updates on new layout engines, schema profiles, and integration components directly.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto max-w-md flex-1">
              <input
                type="email"
                placeholder="Enter core communications email key"
                className="flex-1 min-w-[200px] px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold uppercase text-xs tracking-widest rounded-xl shadow-lg transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* --- REUSABLE STRUCTURE FOOTER MATRIX --- */}
      <footer className="w-full border-t border-white/[0.06] bg-[#02000d]/80 backdrop-blur-xl shrink-0 relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="font-bold text-xl tracking-wider font-mono uppercase text-white">Node<span className="text-purple-400">FORGE</span></h3>
              <p className="text-slate-400 text-xs font-medium tracking-wide leading-relaxed">
                Automated continuous integration visual workspace context engine for developers.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-black tracking-widest uppercase text-purple-400 mb-4">Core Ecosystem</h4>
              <ul className="space-y-2.5 text-xs font-medium text-slate-400 tracking-wide">
                <li><a href="#features" className="hover:text-white transition-colors">Platform Features</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Layout Shell Skins</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Developer Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-black tracking-widest uppercase text-purple-400 mb-4">Node Logistics</h4>
              <ul className="space-y-2.5 text-xs font-medium text-slate-400 tracking-wide">
                <li><a href="#" className="hover:text-white transition-colors">Security Metrics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cloud Ingestion Specs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Status Systems</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-black tracking-widest uppercase text-purple-400 mb-4">Social Telemetry</h4>
              <div className="flex gap-4 mt-2">
  <a 
    href="https://github.com/Pavan-PK-148" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/30 transition-all"
  >
    <FaGithub size={15} />
  </a>
  <a 
    href="https://www.linkedin.com/in/pavan-kalyan-srinivas-robba-723b43347/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/30 transition-all"
  >
    <FaLinkedin size={15} />
  </a>
</div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/[0.04] text-center font-mono text-[10px] text-slate-500 tracking-widest uppercase">
            © 2026 NodeForge Architectural Systems. Secure Decentralized Operations Confirmed.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;