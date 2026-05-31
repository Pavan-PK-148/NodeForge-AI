import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Icosahedron, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { 
  Terminal, Star, GitFork, MapPin, Cpu, BookOpen, 
  Briefcase, MessageSquare, Award, ExternalLink, 
  Code2, ShieldCheck, CornerDownRight,
  TerminalSquare, X, Send, Copy, Layers,
  Activity, GraduationCap, Check
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// ==========================================
// 🌌 REACT THREE FIBER: HOLOGRAPHIC BACKGROUND
// ==========================================
function HologramNexus() {
  const groupRef = useRef();

  useFrame((state) => {
    // Safely pull state time to bypass Clock deprecations gracefully
    const t = state.clock?.getElapsedTime() || 0;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, -5, -10]} intensity={3} color="#8b5cf6" />
      
      <Stars radius={150} depth={50} count={5000} factor={4} saturation={1} fade speed={1.5} />
      
      {/* Floating Geometric Data Nodes */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[2.5, 0]} position={[6, 2, -8]}>
          <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
        </Icosahedron>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere args={[1.5, 32, 32]} position={[-6, -3, -10]}>
          <MeshDistortMaterial color="#8b5cf6" distort={0.4} speed={2} wireframe transparent opacity={0.4} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={3}>
        <Icosahedron args={[1, 1]} position={[0, 6, -15]}>
          <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.2} />
        </Icosahedron>
      </Float>
    </group>
  );
}

// ==========================================
// 🔥 FRAMER MOTION: 3D KINETIC GLASS CARD
// ==========================================
function HoloCard({ children, className = "", onClick = null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative p-5 sm:p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-colors hover:border-cyan-500/40 hover:bg-black/50 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// ==========================================
// 🚀 MAIN PORTFOLIO COMPONENT
// ==========================================
export default function DeveloperPro({ data }) {
  // State initialization with localStorage fallback to keep persistence over refreshes
  const [persistentData, setPersistentData] = useState(() => {
    if (data && Object.keys(data).length > 0) {
      localStorage.setItem('developer_pro_portfolio_data', JSON.stringify(data));
      return data;
    }
    const cached = localStorage.getItem('developer_pro_portfolio_data');
    return cached ? JSON.parse(cached) : {};
  });

  // Keep state perfectly in sync whenever data updates via dynamic props
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setPersistentData(data);
      localStorage.setItem('developer_pro_portfolio_data', JSON.stringify(data));
    }
  }, [data]);

  const s = persistentData || {};
  const personal = s.personalInfo || {};
  const githubMetrics = s.githubMetrics || {};
  const social = s.social || {};

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  // Safe normalized multi-tier extraction arrays
  const cleanExperience = Array.isArray(s.experience) ? s.experience : [];
  const cleanProjects = Array.isArray(s.projects) ? s.projects : [];
  const cleanEducation = Array.isArray(s.education) ? s.education : [];
  const cleanLinkedin = Array.isArray(s.linkedinPosts) ? s.linkedinPosts : [];

  // Deep skill structure allocations
  const skillsObject = s.skills && typeof s.skills === 'object' && !Array.isArray(s.skills) ? s.skills : {};
  const cleanLanguages = Array.isArray(skillsObject.languages) ? skillsObject.languages : [];
  const cleanFrameworks = Array.isArray(skillsObject.frameworks) ? skillsObject.frameworks : [];
  const cleanDevops = Array.isArray(skillsObject.devops) ? skillsObject.devops : [];

  const handleCopyEmail = () => {
    const targetEmail = personal.email || 'alex.mercer@node.io';
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    toast.success("Secure routing endpoint copied!");
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) {
      toast.error("Transmission manifest incomplete.");
      return;
    }
    toast.success("Signal packet successfully routed to terminal host!");
    setFormState({ name: '', email: '', message: '' });
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } } };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-300 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-50">
      
      {/* 🌌 FIXED 3D CANVAS BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <HologramNexus />
        </Canvas>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 space-y-10 relative z-10"
      >
        
        {/* ================= HEADER TERMINAL ================= */}
        <motion.div variants={itemVariants}>
          <HoloCard className="border-t-4 border-t-cyan-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> SYSTEM_ONLINE
                </div>
                <div>
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                    {personal.fullName || "Initialize Name"}
                  </h1>
                  <p className="text-sm text-cyan-400 font-bold tracking-wide mt-2 flex items-center gap-2 uppercase font-mono">
                    <TerminalSquare size={16} /> {personal.title || "Full-Stack Developer"}
                  </p>
                </div>
                {(personal.bio || personal.summary) && (
                  <p className="text-sm text-slate-400 font-medium max-w-2xl">
                    {personal.bio || personal.summary}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
                <div className="space-y-2 text-sm font-mono text-slate-400">
                  <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <MapPin size={14} className="text-cyan-500" /> {personal.location || "Global Coordinates"}
                  </div>
                  {personal.email && (
                    <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                      <Send size={14} className="text-cyan-500" /> {personal.email}
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-2">
                  {personal.githubUrl && (
                    <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500 text-white rounded-xl transition-all">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {personal.linkedin && (
                    <a href={personal.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500 text-white rounded-xl transition-all">
                      <FaLinkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </HoloCard>
        </motion.div>

        {/* ================= METRICS TELEMETRY GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Stars", val: githubMetrics.totalStars ?? "0", icon: <Star size={18} className="text-yellow-400" fill="currentColor" />, color: "hover:border-yellow-400/50" },
            { label: "Active Repos", val: githubMetrics.totalRepositories ?? "0", icon: <GitFork size={18} className="text-cyan-400" />, color: "hover:border-cyan-400/50" },
            { label: "Yearly Commits", val: githubMetrics.contributionsThisYear ?? "0", icon: <Activity size={18} className="text-emerald-400" />, color: "hover:border-emerald-400/50" },
            { label: "System Status", val: "ONLINE", icon: <Cpu size={18} className="text-violet-400" />, color: "hover:border-violet-400/50", valColor: "text-violet-400" }
          ].map((m, i) => (
            <motion.div key={i} variants={itemVariants}>
              <HoloCard className={`flex flex-col items-center justify-center p-6 text-center group ${m.color}`}>
                <div className="p-3 rounded-2xl bg-white/5 mb-3 group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div className={`text-2xl font-black text-white ${m.valColor || ''}`}>{m.val}</div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1">{m.label}</div>
              </HoloCard>
            </motion.div>
          ))}
        </div>

        {/* ================= MAIN SPLIT ARCHITECTURE ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ABOUT, EXPERIENCE, PROJECTS */}
          <div className="xl:col-span-7 space-y-8">
            
            {/* EXECUTIVE SUMMARY */}
            <motion.div variants={itemVariants}>
              <HoloCard>
                <h3 className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase tracking-widest mb-4">
                  <Terminal size={16} /> Executive Context
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {personal.summary || "No specific executive overview has been recorded in data streams yet."}
                </p>
              </HoloCard>
            </motion.div>

            {/* EXPERIENCES CHRONOLOGY */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="flex items-center gap-2 text-violet-400 font-bold text-xs font-mono uppercase tracking-widest pl-2">
                <Briefcase size={16} /> Operational History
              </h3>
              <div className="space-y-4">
                {cleanExperience.map((job, idx) => (
                  <HoloCard key={job._id || job.id || idx} className="group hover:border-violet-500/30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                          {job.role || job.title || "Software Engineer"}
                        </h4>
                        <div className="text-sm text-cyan-400 font-mono flex items-center gap-2 mt-1">
                          <CornerDownRight size={14} /> {job.company || job.organization}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-3 py-1 bg-white/10 rounded-full border border-white/10 text-slate-300 shrink-0">
                        {job.duration || job.year || "Present"}
                      </span>
                    </div>
                    {(job.desc || job.description) && (
                      <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                        {job.desc || job.description}
                      </p>
                    )}
                  </HoloCard>
                ))}
                {cleanExperience.length === 0 && (
                  <div className="text-sm font-mono text-slate-600 p-4 border border-dashed border-white/5 rounded-2xl text-center">
                    // Operational trace logs empty.
                  </div>
                )}
              </div>
            </motion.div>

            {/* PROJECTS DEPLOYMENTS */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono uppercase tracking-widest pl-2">
                <Code2 size={16} /> Production Deployments
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {cleanProjects.map((proj, idx) => (
                  <HoloCard key={proj._id || proj.id || idx} className="flex flex-col h-full hover:border-emerald-500/30">
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        {/* Fallback parameters supporting both GitHub models and resume structures */}
                        <h4 className="font-bold text-white text-md leading-tight">
                          {proj.name || proj.title || "Deployment Node"}
                        </h4>
                        <span className="text-[9px] font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded shrink-0">
                          {proj.lang || proj.language || "App"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed">
                        {proj.desc || proj.description || "No specific configuration data or structural records logged for this target stack deployment."}
                      </p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-end gap-3">
                      {(proj.sourceUrl || proj.githubUrl) && (
                        <a href={proj.sourceUrl || proj.githubUrl} target="_blank" rel="noreferrer" className="p-1.5 bg-white/5 hover:bg-white/20 rounded-md transition-colors text-slate-300">
                          <FaGithub size={14} />
                        </a>
                      )}
                      {(proj.liveUrl || proj.homepage) && (
                        <a href={proj.liveUrl || proj.homepage} target="_blank" rel="noreferrer" className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-900 rounded-md transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </HoloCard>
                ))}
                {cleanProjects.length === 0 && (
                  <div className="col-span-2 text-sm font-mono text-slate-600 p-4 border border-dashed border-white/5 rounded-2xl text-center">
                    // No repository manifests loaded.
                  </div>
                )}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: SKILLS, LANGUAGES, EDUCATION */}
          <div className="xl:col-span-5 space-y-8">
            
            {/* CAPABILITY ARCHITECTURE GROUPED */}
            <motion.div variants={itemVariants}>
              <HoloCard>
                <h3 className="flex items-center gap-2 text-pink-400 font-bold text-xs font-mono uppercase tracking-widest mb-4">
                  <Cpu size={16} /> Capability Architecture
                </h3>
                <div className="space-y-4">
                  {/* Languages Block */}
                  {cleanLanguages.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">// Core Languages</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cleanLanguages.filter(Boolean).map((lang, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-slate-300">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Frameworks Block */}
                  {cleanFrameworks.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">// Frameworks & Engines</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cleanFrameworks.filter(Boolean).map((fw, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-violet-300">
                            {fw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DevOps & Tools Block */}
                  {cleanDevops.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[9px] text-slate-500 font-mono uppercase">// DevOps & Cloud Matrix</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cleanDevops.filter(Boolean).map((tool, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-emerald-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {cleanLanguages.length === 0 && cleanFrameworks.length === 0 && cleanDevops.length === 0 && (
                    <div className="text-xs font-mono text-slate-600">
                      // Dynamic indexes missing allocations.
                    </div>
                  )}
                </div>
              </HoloCard>
            </motion.div>

            {/* SCHOLASTIC ROOTS */}
            {cleanEducation.length > 0 && (
              <motion.div variants={itemVariants}>
                <HoloCard>
                  <h3 className="flex items-center gap-2 text-orange-400 font-bold text-xs font-mono uppercase tracking-widest mb-4">
                    <GraduationCap size={16} /> Scholastic Roots
                  </h3>
                  <div className="space-y-4">
                    {cleanEducation.map((edu, idx) => (
                      <div key={edu._id || edu.id || idx} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <BookOpen size={16} className="text-orange-400" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">{edu.degree || edu.fieldOfStudy}</h5>
                          <p className="text-xs text-slate-400 font-mono mt-1">{edu.school || edu.institution}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-1">{edu.year || edu.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </HoloCard>
              </motion.div>
            )}

            {/* BROADCAST FEED LINKEDIN POOL */}
            {cleanLinkedin.length > 0 && (
              <motion.div variants={itemVariants}>
                <HoloCard>
                  <h3 className="flex items-center gap-2 text-[#0077b5] font-bold text-xs font-mono uppercase tracking-widest mb-4">
                    <MessageSquare size={16} /> Broadcast Feed
                  </h3>
                  <div className="space-y-4">
                    {cleanLinkedin.map((post, idx) => (
                      <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 hover:border-[#0077b5]/40 transition-colors">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1.5 text-[#0077b5]"><FaLinkedin size={12} /> Sync Node</span>
                          <span>{post.date}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{post.content}</p>
                      </div>
                    ))}
                  </div>
                </HoloCard>
              </motion.div>
            )}

          </div>
        </div>

        {/* ================= CONTACT TRANSPORT MODULE ================= */}
        <motion.div variants={itemVariants} className="pt-8">
          <HoloCard className="border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500" />
            <div className="grid md:grid-cols-2 gap-8 p-4 sm:p-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">Initialize Link</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Open a secure channel for collaborations, architecture planning, or engineering inquiries.
                </p>
                {personal.email && (
                  <button 
                    onClick={handleCopyEmail}
                    className="w-full py-4 px-5 bg-black/40 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 rounded-xl flex items-center justify-between text-sm text-white transition-all font-mono group"
                  >
                    <span className="truncate">{personal.email}</span>
                    {copiedEmail ? <Check size={16} className="text-emerald-400 shrink-0" /> : <Copy size={16} className="text-cyan-400 shrink-0 group-hover:scale-110" />}
                  </button>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="IDENTIFIER" required value={formState.name} onChange={e => setFormState(p => ({ ...p, name: e.target.value }))} className="w-full bg-black/40 border border-white/10 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-600 transition-colors" />
                  <input type="email" placeholder="ROUTE (EMAIL)" required value={formState.email} onChange={e => setFormState(p => ({ ...p, email: e.target.value }))} className="w-full bg-black/40 border border-white/10 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-600 transition-colors" />
                </div>
                <textarea rows={4} placeholder="PACKET PAYLOAD..." required value={formState.message} onChange={e => setFormState(p => ({ ...p, message: e.target.value }))} className="w-full bg-black/40 border border-white/10 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-600 transition-colors resize-none" />
                <button type="submit" className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                  <Send size={16} /> Dispatch Transmission
                </button>
              </form>
            </div>
          </HoloCard>
        </motion.div>

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-500 font-mono py-8">
          <div>© {new Date().getFullYear()} {personal.fullName || "Developer Core"} // QUANTUM BUILD</div>
        </footer>

      </motion.div>

    </div>
  );
}