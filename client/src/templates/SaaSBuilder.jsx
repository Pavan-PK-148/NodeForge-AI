// Stack: React + Framer Motion + React Three Fiber + Drei
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ExternalLink, Terminal, Code2, Briefcase, Mail, MapPin, X } from 'lucide-react';

// ==========================================
// 🌌 THREE.JS BACKGROUND SCENE
// ==========================================
function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 5, 2]} intensity={1.5} color="#4f46e5" />
      <pointLight position={[-2, -2, 2]} intensity={2} color="#2563eb" />
      
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1.2, 64, 64]} position={[2.5, 0.5, -2]}>
          <MeshDistortMaterial color="#1e1b4b" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
         <Sphere args={[0.8, 64, 64]} position={[-3, -1, -3]}>
          <MeshDistortMaterial color="#0f172a" attach="material" distort={0.6} speed={3} roughness={0.1} metalness={1} />
        </Sphere>
      </Float>
    </Canvas>
  );
}

// ==========================================
// 🔥 FRAMER MOTION 3D TILT CARD
// ==========================================
function Card3D({ children, className = "", onClick = null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-colors hover:bg-white/10 hover:border-blue-500/50 cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

// ==========================================
// 🚀 MAIN PORTFOLIO COMPONENT
// ==========================================
export default function DeveloperPro({ data }) {
  // Robust data parsing to prevent crashes
  const s = data || {};
  const personal = s.personalInfo || s.personal || {};
  const projects = Array.isArray(s.projects) ? s.projects : [];
  const experience = Array.isArray(s.experience) ? s.experience : [];
  
  // Flatten skills if they are categorized
  let skills = [];
  if (Array.isArray(s.skills)) {
    skills = s.skills;
  } else if (typeof s.skills === 'object' && s.skills !== null) {
    skills = Object.values(s.skills).flat();
  }

  const [selected, setSelected] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#030407] text-slate-200 overflow-hidden relative font-sans selection:bg-blue-600/30">

      {/* 🌌 THREE.JS BACKGROUND WRAPPER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Background3D />
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12 relative z-10 space-y-16">

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-16">
          
          {/* HERO SECTION */}
          <motion.div variants={itemVariants}>
            <Card3D className="border-t-2 border-t-blue-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                    {personal.fullName || personal.name || 'Anonymous Engine'}
                  </h1>
                  <p className="text-blue-400 font-mono text-sm md:text-base flex items-center gap-2">
                    <Terminal size={16} /> {personal.title || 'Systems Architect'}
                  </p>
                  <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm">
                    {personal.summary || "Building high-performance, scalable web architectures."}
                  </p>
                </div>
                <div className="flex gap-4">
                  {(personal.githubUrl || s.social?.github) && (
                    <a href={personal.githubUrl || s.social?.github} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500 transition-all text-white">
                      <FaGithub size={22} />
                    </a>
                  )}
                  {(personal.linkedinUrl || s.social?.linkedin) && (
                    <a href={personal.linkedinUrl || s.social?.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500 transition-all text-white">
                      <FaLinkedin size={22} />
                    </a>
                  )}
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* SKILLS MATRIX */}
          {skills.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Code2 size={16} /> Technical Arsenal
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-mono text-blue-300 shadow-lg hover:border-blue-500/50 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROJECTS GRID */}
          {projects.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Terminal size={16} /> Production Deployments
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((p, i) => (
                  <Card3D key={i} onClick={() => setSelected(p)}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-white tracking-tight">{p.name || p.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded uppercase">
                        {p.lang || p.language || "App"}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">{p.description || p.desc}</p>
                    <div className="text-xs font-mono text-slate-500 hover:text-blue-400 transition-colors">
                      Click to inspect payload ↗
                    </div>
                  </Card3D>
                ))}
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE LIST */}
          {experience.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Briefcase size={16} /> Operational History
              </h2>
              <div className="space-y-4">
                {experience.map((job, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600/50 group-hover:bg-blue-500 transition-colors" />
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                      <h3 className="text-lg font-bold text-white">{job.role || job.title} <span className="text-blue-400 font-mono text-sm ml-2">@ {job.company}</span></h3>
                      <span className="text-xs font-mono text-slate-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                        {job.duration || `${job.start} - ${job.end}`}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{job.description || job.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT TERMINAL */}
          <motion.div variants={itemVariants}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(37,99,235,0.1)] flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Initialize Connection</h2>
              <p className="text-slate-400 text-sm max-w-md">Secure communications channels are open for collaboration and deployment inquiries.</p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {personal.email && (
                  <a href={`mailto:${personal.email}`} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                    <Mail size={16} /> {personal.email}
                  </a>
                )}
                {personal.location && (
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-mono text-sm">
                    <MapPin size={16} /> {personal.location}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* 🔮 PROJECT INSPECTION MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0f111a] border border-white/10 shadow-2xl p-8 rounded-2xl max-w-lg w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors bg-white/5 p-1 rounded-lg">
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2 pr-8">{selected.name || selected.title}</h3>
              <p className="text-blue-400 font-mono text-xs mb-6 uppercase">{selected.lang || selected.language || "Application"}</p>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                {selected.description || selected.desc || "No comprehensive description provided for this software node."}
              </p>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                {(selected.githubUrl || selected.sourceUrl) && (
                  <a href={selected.githubUrl || selected.sourceUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-mono text-white transition-colors">
                    <FaGithub size={16} /> Source
                  </a>
                )}
                {selected.liveUrl && (
                  <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-mono transition-colors shadow-lg">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}