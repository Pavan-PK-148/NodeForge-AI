import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Sparkles, Star, Cpu, Layers, MessageSquare, BookOpen, 
  MapPin, Mail, Globe, ExternalLink, Briefcase, GraduationCap, 
  Terminal, ShieldCheck, X, Award, ChevronRight, Activity,
  Send, Copy, Check, Info, Atom, Eye
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// Dynamic Ambient Particle System for Deep Spatial Ambiance
function ParticleCanvas() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-500/30 blur-[1px]"
          style={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', Math.random() > 0.5 ? '5vw' : '-5vw']
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

// Next-Gen Holographic 3D Card Engine with Dynamic Sheen Light Tracking
function HolographicCard3D({ children, className = "", intensity = 12 }) {
  const cardRef = useRef(null);
  
  // High-performance hardware accelerated motion channels
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 180, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);
  
  // Interactive sheen lighting calculations
  const sheenX = useSpring(useTransform(x, [-0.5, 0.5], [120, -20]), springConfig);
  const sheenY = useSpring(useTransform(y, [-0.5, 0.5], [120, -20]), springConfig);
  const sheenOpacity = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const width = box.width;
    const height = box.height;
    const mouseX = e.clientX - box.left;
    const mouseY = e.clientY - box.top;
    
    // Normalize coordinates around central vector axis
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
    sheenOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    sheenOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className={`bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.6)] hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(147,51,234,0.1)] transition-colors duration-500 relative overflow-hidden group/card ${className}`}
    >
      {/* Light Sheen Matrix Overlay Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_var(--sheen-x)_var(--sheen-y),rgba(255,255,255,0.08)_0%,transparent_50%)]"
        style={{
          '--sheen-x': useTransform(sheenX, (v) => `${v}%`),
          '--sheen-y': useTransform(sheenY, (v) => `${v}%`),
          opacity: sheenOpacity
        }}
      />
      
      {/* Dynamic Grid Pattern Substrate */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Render Sub-components into Multi-depth Perspective Space */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function AlchemistGlowHyper3D({ data }) {
  const s = data || {};
  const personal = s.personalInfo || s.personal || {};
  const githubMetrics = s.githubMetrics || s.stats || {};
  const social = s.social || {};

  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [copiedRoute, setCopiedRoute] = useState(false);
  const [formState, setFormState] = useState({ id: '', endpoint: '', payload: '' });

  // Fallback Data Matrices Normalization Layer
  const cleanExperience = Array.isArray(s.experience) ? s.experience : [];
  const cleanProjects = Array.isArray(s.projects) ? s.projects : [];
  const cleanLinkedin = Array.isArray(s.linkedinPosts) ? s.linkedinPosts : [];
  const cleanEducation = Array.isArray(s.education) ? s.education : [];
  const cleanLanguages = Array.isArray(s.languages) ? s.languages : [];
  const cleanCertificates = Array.isArray(s.achievements) ? s.achievements : Array.isArray(s.certifications) ? s.certifications : [];

  const skillsData = s.skills || {};
  const languagesList = Array.isArray(skillsData.languages) ? skillsData.languages : [];
  const frameworksList = Array.isArray(skillsData.frameworks) || Array.isArray(skillsData.libraries) ? (skillsData.frameworks || skillsData.libraries) : [];
  const toolsList = Array.isArray(skillsData.tools) || Array.isArray(skillsData.databases) ? (skillsData.tools || skillsData.databases) : [];

  const hasStructuredSkills = languagesList.length > 0 || frameworksList.length > 0 || toolsList.length > 0;
  const flatFallbackSkills = !hasStructuredSkills ? (Array.isArray(s.skills) ? s.skills : typeof s.skills === 'object' ? Object.values(s.skills).flat() : []) : [];

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(personal.email || 'alex.mercer@node.io');
    setCopiedRoute(true);
    toast.success("Synchronized hyper-route copied.");
    setTimeout(() => setCopiedRoute(false), 3000);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (!formState.endpoint || !formState.payload) {
      toast.error("Packet transmission payload fields missing.");
      return;
    }
    toast.success("Signal link deployed down into core architecture ledger.");
    setFormState({ id: '', endpoint: '', payload: '' });
  };

  // Orchestrated Entry Sequence Keyframes
  const viewStaggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemScaleUpVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  return (
    <div className="min-h-screen bg-[#020106] text-[#e2e8f0] font-sans p-3 sm:p-6 lg:p-12 relative overflow-x-hidden flex flex-col justify-center perspective-1200 selection:bg-fuchsia-500/40 selection:text-white">
      
      {/* Background Matrix Pipeline Foundations */}
      <ParticleCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0c081e_0%,transparent_70%)] opacity-80 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <motion.div 
        variants={viewStaggerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full relative z-10 space-y-6"
      >
        
        {/* ================= HERO HUB HEADER CONTROL INTERFACE ================= */}
        <motion.header variants={itemScaleUpVariants} className="w-full">
          <HolographicCard3D intensity={6} className="border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-slate-950/40 to-transparent">
            
            {/* Upper Telemetry Link Tagging */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 [transform:translateZ(40px)]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-full text-[10px] text-purple-300 font-mono font-bold uppercase tracking-widest w-max">
                <Atom size={12} className="animate-spin text-purple-400" style={{ animationDuration: '4s' }} /> 
                HYPER_SPACE_NODE // ONLINE
              </div>
              {githubMetrics.contributionsThisYear && (
                <div className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-md w-max shadow-inner">
                  COMMITS_RECORDED: {githubMetrics.contributionsThisYear}
                </div>
              )}
            </div>

            {/* Core Identification Blocks */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
              <div className="space-y-2 [transform:translateZ(50px)]">
                <motion.h1 
                  className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
                  whileHover={{ skewX: -2 }}
                >
                  {personal.fullName || personal.name || "Alex Mercer"}
                </motion.h1>
                <p className="text-xs sm:text-sm text-indigo-300 font-bold tracking-widest uppercase flex items-center flex-wrap gap-3">
                  <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">{personal.title || "Systems Software Architect"}</span>
                  {personal.location && (
                    <span className="text-slate-500 font-normal flex items-center gap-1 normal-case font-mono border-l border-white/10 pl-3">
                      <MapPin size={12} className="text-purple-400" /> {personal.location}
                    </span>
                  )}
                </p>
              </div>

              {/* Action Handlers & Communication Clusters */}
              <div className="flex flex-wrap items-center gap-3 [transform:translateZ(45px)] w-full md:w-auto">
                {personal.email && (
                  <button 
                    onClick={handleCopyEndpoint}
                    className="text-xs text-slate-300 font-mono bg-black/50 hover:bg-purple-950/40 px-4 py-3 rounded-2xl border border-white/10 hover:border-purple-500/40 flex items-center justify-between gap-4 transition-all group grow md:grow-0 shadow-md shadow-black/40"
                  >
                    <span className="truncate max-w-[160px] sm:max-w-none">{personal.email}</span>
                    <Mail size={13} className="text-purple-400 group-hover:rotate-12 transition-transform shrink-0" />
                  </button>
                )}
                
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-2xl shrink-0">
                  {[(personal.githubUrl || social.github, <FaGithub size={16} />, "hover:bg-purple-500/20 hover:border-purple-500/40"),
                    (personal.linkedinUrl || social.linkedin, <FaLinkedin size={16} />, "hover:bg-blue-500/20 hover:border-blue-500/40"),
                    (social.twitter, <FaTwitter size={16} />, "hover:bg-fuchsia-500/20 hover:border-fuchsia-500/40")]
                    .filter(item => item[0])
                    .map((link, idx) => (
                      <a key={idx} href={link[0]} target="_blank" rel="noreferrer" className={`p-2.5 bg-black/30 text-white rounded-xl transition-all border border-transparent ${link[2]}`}>
                        {link[1]}
                      </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Personal Core Summary */}
            {(s.summary || personal.bio) && (
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light pt-5 border-t border-white/10 mt-6 font-sans [transform:translateZ(30px)]">
                {s.summary || personal.bio}
              </p>
            )}
          </HolographicCard3D>
        </motion.header>

        {/* ================= CORE QUANTUM STATISTICAL DATA GRID ================= */}
        {Object.keys(githubMetrics).length > 0 && (
          <motion.div variants={itemScaleUpVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Repository Stars", value: githubMetrics.totalStars || githubMetrics.stars || "0", gradient: "from-amber-500/10 to-transparent", color: "text-amber-400" },
              { label: "Active Codebases", value: githubMetrics.totalRepositories || githubMetrics.repositories || "0", gradient: "from-purple-500/10 to-transparent", color: "text-purple-400" },
              { label: "System Deployments", value: cleanProjects.length, gradient: "from-indigo-500/10 to-transparent", color: "text-indigo-400" },
              { label: "Accreditation Nodes", value: cleanCertificates.length, gradient: "from-emerald-500/10 to-transparent", color: "text-emerald-400" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4, scale: 1.02 }}
                className={`bg-gradient-to-b ${stat.gradient} bg-slate-950/40 border border-white/5 rounded-2xl p-4 text-center backdrop-blur-md shadow-xl flex flex-col justify-center items-center relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{stat.label}</div>
                <div className={`text-2xl font-bold font-mono mt-1 ${stat.color} tracking-tight`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= BI-AXIAL LAYOUT MULTI-LEVEL PERSPECTIVE SPACES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN A: CAPABILITIES & EDUCATION MAPS (5 COLS) */}
          <div className="md:col-span-5 space-y-6 flex flex-col">
            
            {/* Engineering Inventories */}
            <motion.div variants={itemScaleUpVariants} className="w-full">
              <HolographicCard3D intensity={15}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 [transform:translateZ(25px)]">
                  <Cpu size={14} className="text-purple-400" /> Technology Inventory
                </h3>
                <div className="space-y-4 text-xs [transform:translateZ(15px)]">
                  {hasStructuredSkills ? (
                    <>
                      {languagesList.length > 0 && (
                        <div className="group/tech">
                          <span className="text-purple-300 block font-bold mb-1.5 font-mono text-[11px]">// Core Dialects</span>
                          <div className="flex flex-wrap gap-1.5">
                            {languagesList.map((l, idx) => (
                              <span key={idx} className="bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 px-2 py-0.5 rounded-lg text-white text-[10px] font-mono transition-colors">{l}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {frameworksList.length > 0 && (
                        <div className="pt-1 group/tech">
                          <span className="text-indigo-300 block font-bold mb-1.5 font-mono text-[11px]">// Libraries & Engines</span>
                          <div className="flex flex-wrap gap-1.5">
                            {frameworksList.map((f, idx) => (
                              <span key={idx} className="bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 px-2 py-0.5 rounded-lg text-slate-200 text-[10px] font-mono transition-colors">{f}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {toolsList.length > 0 && (
                        <div className="pt-1 group/tech">
                          <span className="text-pink-300 block font-bold mb-1.5 font-mono text-[11px]">// Architecture & Clouds</span>
                          <div className="flex flex-wrap gap-1.5">
                            {toolsList.map((t, idx) => (
                              <span key={idx} className="bg-white/5 hover:bg-pink-500/20 border border-white/5 hover:border-pink-500/30 px-2 py-0.5 rounded-lg text-slate-300 text-[10px] font-mono transition-colors">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <span className="text-purple-300 block font-bold mb-1.5 font-mono text-[11px]">// Node Capabilities</span>
                      <div className="flex flex-wrap gap-1.5">
                        {flatFallbackSkills.map((skill, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg text-white text-[10px] font-mono">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </HolographicCard3D>
            </motion.div>

            {/* Language Linear Metrics Sliders */}
            {cleanLanguages.length > 0 && (
              <motion.div variants={itemScaleUpVariants} className="w-full">
                <HolographicCard3D intensity={20}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 [transform:translateZ(25px)]">
                    <Activity size={14} className="text-pink-400" /> Dialect Engine Density
                  </h3>
                  <div className="space-y-4 [transform:translateZ(15px)]">
                    {cleanLanguages.map((lang, i) => (
                      <div key={i} className="space-y-1.5 text-xs group">
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{lang.name}</span>
                          <span className="text-purple-400 font-bold">{lang.pct || lang.value}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.pct || lang.value || 0}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </HolographicCard3D>
              </motion.div>
            )}

            {/* Scholastic Infrastructure Matrix */}
            {cleanEducation.length > 0 && (
              <motion.div variants={itemScaleUpVariants} className="w-full">
                <HolographicCard3D intensity={15}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 [transform:translateZ(25px)]">
                    <BookOpen size={14} className="text-indigo-400" /> Academic Repositories
                  </h3>
                  <div className="space-y-4 [transform:translateZ(15px)]">
                    {cleanEducation.map((edu, idx) => (
                      <div key={idx} className="text-xs space-y-1 relative pl-4 group">
                        <div className="absolute left-0 top-1 w-1 h-3 bg-indigo-500/30 group-hover:bg-indigo-400 group-hover:h-4 rounded-full transition-all" />
                        <div className="font-bold text-white font-sans group-hover:text-indigo-300 transition-colors">{edu.degree}</div>
                        <div className="text-slate-400 font-light font-sans text-[11px]">
                          {edu.school || edu.institution} — <span className="font-mono text-purple-400 font-semibold">{edu.year || `${edu.start} – ${edu.end}`}</span>
                        </div>
                        {edu.score && (
                          <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-1.5 py-0.2 rounded mt-1">
                            SCORE: {edu.score}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </HolographicCard3D>
              </motion.div>
            )}
          </div>

          {/* COLUMN B: CHRONICLES CHANNELS HISTORIC RECORDS STREAM (7 COLS) */}
          <div className="md:col-span-7 space-y-6">
            <motion.div variants={itemScaleUpVariants} className="w-full">
              <HolographicCard3D intensity={8}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-6 [transform:translateZ(30px)]">
                  <Layers size={14} className="text-pink-400" /> Operational Engagements Matrix
                </h3>
                <div className="space-y-4 pl-0.5 [transform:translateZ(15px)]">
                  {cleanExperience.map((job, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-slate-900/30 hover:bg-slate-900/60 border border-white/5 hover:border-purple-500/30 p-5 rounded-2xl space-y-3 transition-all duration-300 group shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold gap-2">
                        <span className="text-sm font-sans text-white group-hover:text-purple-300 transition-colors">
                          {job.role || job.title}
                        </span>
                        <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-lg text-[10px] font-mono w-max">
                          {job.duration || `${job.start} – ${job.end}`}
                        </span>
                      </div>
                      
                      <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5 font-mono">
                        <Briefcase size={11} className="text-indigo-400" /> 
                        {job.company} {job.type && <span className="text-slate-600 font-normal border-l border-white/10 pl-2">• {job.type}</span>}
                      </div>

                      {(job.desc || job.description) && (
                        <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                          {job.desc || job.description}
                        </p>
                      )}

                      {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                        <ul className="text-xs text-slate-400 space-y-1.5 pl-1 list-none font-sans">
                          {job.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2">
                              <span className="text-purple-400 font-mono shrink-0 mt-0.5">›</span>
                              <span className="font-light text-slate-300">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {Array.isArray(job.techStack) && job.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.techStack.map((tech, ti) => (
                            <span key={ti} className="text-[9px] font-mono bg-black/40 border border-white/5 text-indigo-300 px-2 py-0.5 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </HolographicCard3D>
            </motion.div>
          </div>

        </div>

        {/* ================= REPOSITORIES & SYNDICATED BROADCAST INFRASTRUCTURE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Codebase Hubs */}
          <motion.div variants={itemScaleUpVariants} className="w-full">
            <HolographicCard3D intensity={10}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 [transform:translateZ(25px)]">
                <FaGithub size={14} className="text-slate-200" /> Source Repositories Index
              </h3>
              <div className="space-y-3 [transform:translateZ(15px)]">
                {cleanProjects.map((p, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-slate-950/50 border border-white/5 hover:border-purple-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-all shadow-md relative overflow-hidden"
                  >
                    <div className="space-y-1 truncate w-full sm:max-w-[70%]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors font-sans truncate">
                          {p.name || p.title}
                        </span>
                        {p.language && (
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase">
                            {p.language || p.lang}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-light font-sans truncate">
                        {p.desc || p.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                      <div className="text-xs font-mono font-bold text-[#e0af68] flex items-center gap-1">
                        <Star size={11} fill="currentColor" /> 
                        <span className="text-[11px]">{p.stars || "0"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {(p.githubUrl || p.sourceUrl) && (
                          <a href={p.githubUrl || p.sourceUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors border border-white/5">
                            <FaGithub size={12} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all border border-purple-500/10">
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </HolographicCard3D>
          </motion.div>

          {/* LinkedIn Transmission Stream */}
          <motion.div variants={itemScaleUpVariants} className="w-full">
            <HolographicCard3D intensity={10}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 [transform:translateZ(25px)]">
                <MessageSquare size={14} className="text-blue-400" /> Logged Serialization Feed
              </h3>
              <div className="space-y-3 [transform:translateZ(15px)]">
                {cleanLinkedin.map((post, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl space-y-2 hover:bg-slate-900/30 transition-colors shadow-md border-l-2 border-l-blue-500/30">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                        <FaLinkedin size={11} /> LIVE_BROADCAST_NODE
                      </span>
                      <span>{post.date || post.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light font-sans">
                      {post.content}
                    </p>
                    {post.engagements && (
                      <span className="inline-block text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {post.engagements}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </HolographicCard3D>
          </motion.div>
        </div>

        {/* ================= CRYPTOGRAPHIC PROOF VERIFICATIONS ================= */}
        {cleanCertificates.length > 0 && (
          <motion.section variants={itemScaleUpVariants} className="w-full">
            <HolographicCard3D intensity={5}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 [transform:translateZ(20px)]">
                <Award size={14} className="text-amber-400" /> Cryptographic Ledger Accreditations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 [transform:translateZ(15px)]">
                {cleanCertificates.map((cert, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setSelectedArtifact(cert)}
                    className="p-4 bg-slate-950/60 hover:bg-slate-900/40 border border-white/5 hover:border-purple-500/30 rounded-2xl flex items-center justify-between cursor-pointer group transition-all shadow-md"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                        <ShieldCheck size={15} />
                      </div>
                      <div className="truncate space-y-0.5">
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-400 font-sans truncate transition-colors">
                          {cert.title || cert.name}
                        </h4>
                        <p className="text-[10px] font-mono text-slate-500 truncate">
                          {cert.issuer} {cert.date && `• ${cert.date}`}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </motion.div>
                ))}
              </div>
            </HolographicCard3D>
          </motion.section>
        )}

        {/* ================= HIGH-LEVEL DISPATCH CONNECTION PORTAL ================= */}
        <motion.section variants={itemScaleUpVariants} className="w-full">
          <HolographicCard3D intensity={4} className="border-purple-500/20 bg-gradient-to-tr from-purple-950/20 via-slate-950/50 to-transparent">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center [transform:translateZ(20px)]">
              <div className="md:col-span-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <Terminal size={14} className="text-purple-400" /> // SECURE_TRANSMISSION_BUS
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Open a synchronized bridge connection. Inject encrypted strategy parameters or raw briefing payloads straight down into the local cache engine.
                </p>
                <div className="pt-1">
                  <button 
                    onClick={handleCopyEndpoint}
                    className="w-full py-2.5 px-3.5 bg-black/50 hover:bg-black/80 border border-white/15 hover:border-white/20 rounded-xl flex items-center justify-between text-xs font-mono text-slate-300 transition-all shadow-inner"
                  >
                    <span className="truncate pr-2">{personal.email || 'alex.mercer@node.io'}</span>
                    {copiedRoute ? <Check size={14} className="text-emerald-400 shrink-0" /> : <Copy size={13} className="text-purple-400 shrink-0" />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleFormSubmission} className="md:col-span-7 space-y-3 [transform:translateZ(30px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="IDENTITY_STRING (NAME)" 
                    value={formState.id}
                    onChange={e => setFormState(p => ({ ...p, id: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 focus:border-purple-500/40 focus:bg-black/60 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 font-mono transition-colors uppercase"
                  />
                  <input 
                    type="email" 
                    placeholder="ROUTING_ENDPOINT (EMAIL) *" 
                    required
                    value={formState.endpoint}
                    onChange={e => setFormState(p => ({ ...p, endpoint: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 focus:border-purple-500/40 focus:bg-black/60 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 font-mono transition-colors"
                  />
                </div>
                <textarea 
                  rows={2} 
                  placeholder="TRANSMISSION_PAYLOAD_MANIFEST_BODY... *" 
                  required
                  value={formState.payload}
                  onChange={e => setFormState(p => ({ ...p, payload: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 focus:border-purple-500/40 focus:bg-black/60 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 transition-colors resize-none font-sans"
                />
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs font-mono rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Send size={12} /> Dispatch Transmission Link
                </button>
              </form>
            </div>
          </HolographicCard3D>
        </motion.section>

        {/* ================= PLATFORM SYSTEM AUDIT TRACK ================= */}
        <footer className="text-center text-[10px] font-mono text-slate-600 pt-6 border-t border-white/5 max-w-xs mx-auto">
          <div>© {new Date().getFullYear()} {personal.name || "Alex Mercer"} // STABLE_RECONCILIATION</div>
          <div className="text-slate-800 tracking-wider mt-0.5">MATRIX_HASH: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
        </footer>

      </motion.div>

      {/* ================= DEEP HIGH-FIDELITY MODAL MODAL VALIDATION OVERLAY ================= */}
      <AnimatePresence>
        {selectedArtifact && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 perspective-1200"
            onClick={() => setSelectedArtifact(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, rotateX: 15 }} 
              animate={{ scale: 1, y: 0, rotateX: 0 }} 
              exit={{ scale: 0.9, y: 30, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="bg-[#090710] border border-white/10 max-w-sm w-full rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(147,51,234,0.25)] relative"
              onClick={e => e.stopPropagation()}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between [transform:translateZ(20px)]">
                <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                  <Terminal size={13} /> Secured Verification Engine
                </span>
                <button onClick={() => setSelectedArtifact(null)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={15} />
                </button>
              </div>
              
              <div className="p-6 space-y-4 text-center [transform:translateZ(40px)]">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 border border-purple-500/20 shadow-inner">
                  <Award size={28} />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-sans">{selectedArtifact.title || selectedArtifact.name}</h4>
                  <p className="text-xs text-amber-400 font-bold font-mono uppercase tracking-wider">{selectedArtifact.issuer}</p>
                  {(selectedArtifact.date || selectedArtifact.validity) && (
                    <p className="text-[10px] font-mono text-slate-500">SIGN_BLOCK: {selectedArtifact.date} {selectedArtifact.validity && `| ${selectedArtifact.validity}`}</p>
                  )}
                </div>
                
                <div className="bg-black/60 border border-white/5 p-3 rounded-xl text-left text-[10px] font-mono space-y-1 text-slate-400 shadow-inner">
                  <p className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck size={11} /> // BLOCKCHAIN_VERIFIED_OK
                  </p>
                  <p className="truncate text-slate-500">PUB_KEY: 0x{Math.random().toString(16).substr(2, 16).toUpperCase()}</p>
                  <p className="text-[9px] text-purple-400/70">ENCRYPTION: HARDWARE_LAYER_ENFORCED</p>
                </div>
                
                <button 
                  onClick={() => {
                    toast.success("Cryptographic payload compiled.");
                    setSelectedArtifact(null);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-500 via-fuchsia-600 to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all font-sans cursor-pointer uppercase tracking-wider"
                >
                  Download Sealed Attestation Token
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}