
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Briefcase, Star, MapPin, Mail, ChevronRight, 
  GraduationCap, GitFork, ShieldCheck, ExternalLink, 
  Terminal, Layers, Send, Copy, Check, X, Info
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// High-Fidelity 3D Perspective Wrapper Component
function ExecutiveCard3D({ children, className = "" }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const element = cardRef.current;
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Constrain angular motion to a refined corporate presentation limit
    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`bg-white border border-slate-200/80 p-5 sm:p-6 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] hover:border-slate-900/20 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function CorporateElite({ data }) {
  // Safe cross-tier object schema unpacking
  const s = data || {};
  const personal = s.personalInfo || s.personal || {};
  const githubMetrics = s.githubMetrics || s.stats || {};
  const social = s.social || {};

  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [messageState, setMessageState] = useState({ name: '', email: '', message: '' });

  // Array alignment mapping ensuring absolute component isolation
  const cleanExperience = Array.isArray(s.experience) ? s.experience : [];
  const cleanProjects = Array.isArray(s.projects) ? s.projects : [];
  const cleanLinkedin = Array.isArray(s.linkedinPosts) ? s.linkedinPosts : [];
  const cleanEducation = Array.isArray(s.education) ? s.education : [];
  const cleanCertificates = Array.isArray(s.achievements) ? s.achievements : Array.isArray(s.certifications) ? s.certifications : [];
  const cleanLanguages = Array.isArray(s.languages) ? s.languages : [];

  // Skill matrix normalization layer
  const skillsData = s.skills || {};
  const langSkills = Array.isArray(skillsData.languages) ? skillsData.languages : [];
  const devopsSkills = Array.isArray(skillsData.devops) || Array.isArray(skillsData.cloud) 
    ? (skillsData.devops || skillsData.cloud) 
    : [];
  const coreFrameworks = Array.isArray(skillsData.frameworks) ? skillsData.frameworks : [];

  const hasStructuredSkills = langSkills.length > 0 || devopsSkills.length > 0 || coreFrameworks.length > 0;
  const flatSkills = !hasStructuredSkills ? (Array.isArray(s.skills) ? s.skills : typeof s.skills === 'object' ? Object.values(s.skills).flat() : []) : [];

  const handleCopyContact = () => {
    const activeEmail = personal.email || 'executive.delegate@corporate.io';
    navigator.clipboard.writeText(activeEmail);
    setCopiedLink(true);
    toast.success("Secure email route copied to clipboard.");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDispatchSignal = (e) => {
    e.preventDefault();
    if (!messageState.email || !messageState.message) {
      toast.error("Required manifest lines missing.");
      return;
    }
    toast.success("Communication packet queued into operational pipeline.");
    setMessageState({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans p-4 sm:p-8 lg:p-16 relative selection:bg-slate-900 selection:text-white overflow-x-hidden perspective-1000">
      
      {/* Structural Accent Geometries */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[350px] bg-gradient-to-bl from-slate-200/40 via-slate-100/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-10 relative z-10"
      >
        
        {/* ================= EXECUTIVE PRESENTATION TITLE HEADER ================= */}
        <motion.header variants={elementVariants} className="w-full">
          <ExecutiveCard3D className="!p-8 border-b-4 border-b-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-widest font-bold rounded-bl-xl border-l border-b border-slate-800">
              // SECURE_PROFILE_VERIFIED
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-2 transform-style-3d">
              <div className="space-y-2 translate-z-30">
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
                  {personal.fullName || personal.name || "Executive Representative"}
                </h1>
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} className="text-slate-900" />
                  {personal.title || "Director of Engineering Ops"}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-600 space-y-1.5 md:text-right bg-slate-50 p-4 rounded-xl border border-slate-200/60 translate-z-20 w-full md:w-auto">
                <div className="flex items-center md:justify-end gap-1.5 text-slate-900 font-bold">
                  <MapPin size={13} className="text-slate-400" /> 
                  <span>{personal.location || "Global Operations"}</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 hover:text-slate-900 transition-colors break-all">
                  {personal.email || "delegate@firmware.io"}
                </div>
                {personal.website && (
                  <div className="text-[10px] text-indigo-600 hover:underline flex items-center md:justify-end gap-1 pt-0.5">
                    <ExternalLink size={10} /> {personal.website}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 translate-z-10">
              {personal.tagline ? (
                <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wide">
                  KPI MAP // {personal.tagline}
                </p>
              ) : <div />}
              
              <div className="flex items-center gap-2">
                {(personal.githubUrl || social.github) && (
                  <a href={personal.githubUrl || social.github} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-900 text-slate-700 hover:text-white rounded-xl transition-all shadow-sm">
                    <FaGithub size={15} />
                  </a>
                )}
                {(personal.linkedinUrl || social.linkedin) && (
                  <a href={personal.linkedinUrl || social.linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-900 text-slate-700 hover:text-white rounded-xl transition-all shadow-sm">
                    <FaLinkedin size={15} />
                  </a>
                )}
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-900 text-slate-700 hover:text-white rounded-xl transition-all shadow-sm">
                    <FaTwitter size={15} />
                  </a>
                )}
              </div>
            </div>
          </ExecutiveCard3D>
        </motion.header>

        {/* ================= RESTRUCTURING OPERATIONAL METRICS ================= */}
        <motion.div variants={elementVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { tag: "GITHUB STARS", val: githubMetrics.totalStars || githubMetrics.stars || "0", sub: "Aggregated Units" },
            { tag: "INDEXED CODEBASES", val: githubMetrics.totalRepositories || githubMetrics.repositories || "0", sub: "Public Instances" },
            { tag: "ANNUAL WORK METRIX", val: githubMetrics.contributionsThisYear || githubMetrics.contributions || "0", sub: "Contributions Verified" },
            { tag: "DELEGATION KEYS", val: cleanProjects.length, sub: "Mapped Assets" }
          ].map((metric, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-400 transition-colors">
              <span className="text-[9px] text-slate-400 uppercase font-mono font-black tracking-widest block">{metric.tag}</span>
              <span className="text-xl font-bold text-slate-900 block mt-0.5">{metric.val}</span>
              <span className="text-[9px] text-slate-400 block font-sans mt-0.5">{metric.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* ================= CORE CONTEXT PROFILE OVERVIEW ================= */}
        {(s.summary || personal.bio) && (
          <motion.div variants={elementVariants}>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-4xl border-l-4 border-slate-950 pl-5 py-2 bg-white rounded-r-xl border border-l-0 border-slate-200/60 shadow-sm font-sans italic">
              "{s.summary || personal.bio}"
            </p>
          </motion.div>
        )}

        {/* ================= MASTER ARCHITECTURE TWO-COLUMN SPLIT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT TELEMETRY COLUMN (HISTORIES & REPOS) */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Work History Operations */}
            <motion.section variants={elementVariants} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 flex items-center gap-2">
                <Briefcase size={14} className="text-slate-900" /> 02 // Operational Engagement Chronicles
              </h3>
              <div className="space-y-4">
                {cleanExperience.map((job, i) => (
                  <div key={i} className="bg-white border border-slate-200 hover:border-slate-400 p-5 rounded-xl transition-colors space-y-2 group shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-black text-slate-900 gap-1">
                      <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                        {job.role || job.title}
                      </span>
                      <span className="text-slate-500 font-mono font-medium bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] w-max">
                        {job.duration || `${job.start} – ${job.end}`}
                      </span>
                    </div>
                    
                    <div className="text-[11px] text-slate-500 font-mono font-bold flex items-center gap-1">
                      <span>{job.company}</span>
                      {job.type && <span className="text-slate-300 font-normal">| {job.type}</span>}
                    </div>

                    {(job.desc || job.description) && (
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-light pt-1">
                        {job.desc || job.description}
                      </p>
                    )}

                    {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                      <ul className="text-xs text-slate-600 space-y-1 pt-1.5 list-disc list-inside font-sans">
                        {job.bullets.map((b, bi) => (
                          <li key={bi} className="marker:text-slate-400">{b}</li>
                        ))}
                      </ul>
                    )}

                    {Array.isArray(job.techStack) && job.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {job.techStack.map((tech, ti) => (
                          <span key={ti} className="text-[9px] font-mono bg-slate-50 border border-slate-200/80 text-slate-700 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Target Software Repositories Matrix */}
            <motion.section variants={elementVariants} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 flex items-center gap-2">
                <FaGithub size={14} /> 03 // Production Repositories Index
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cleanProjects.map((proj, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedProject(proj)}
                    className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-900 rounded-xl flex flex-col justify-between h-40 group transition-all cursor-pointer shadow-sm relative overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-slate-900 underline group-hover:text-indigo-600 transition-colors font-sans truncate max-w-[160px]">
                          {proj.name || proj.title}
                        </span>
                        <span className="text-[9px] font-mono bg-slate-100 border px-1.5 py-0.2 rounded text-slate-600 shrink-0 uppercase">
                          {proj.language || proj.lang || "Source"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light font-sans line-clamp-3 leading-relaxed">
                        {proj.desc || proj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-mono text-[11px]">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-amber-600 flex items-center gap-0.5">
                          <Star size={11} fill="currentColor" /> {proj.stars || "0"}
                        </span>
                        {proj.forks !== undefined && (
                          <span className="text-slate-400 flex items-center gap-0.5">
                            <GitFork size={11} /> {proj.forks}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-wider flex items-center gap-0.5">
                        Inspect <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* RIGHT TELEMETRY COLUMN (CAPABILITIES, EDUCATION, PIPELINES) */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Structured Capabilities Matrices */}
            <motion.section variants={elementVariants} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2">
                04 // Core Capability Taxonomy
              </h3>
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 text-xs font-medium shadow-sm">
                {hasStructuredSkills ? (
                  <>
                    {langSkills.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[10px] uppercase font-mono font-bold text-slate-400">// System Dialects</div>
                        <div className="flex flex-wrap gap-1">
                          {langSkills.map((l, idx) => (
                            <span key={idx} className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-slate-800 font-mono text-[11px]">{l}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {coreFrameworks.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] uppercase font-mono font-bold text-slate-400">// Frame Routines</div>
                        <div className="flex flex-wrap gap-1">
                          {coreFrameworks.map((f, idx) => (
                            <span key={idx} className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-slate-800 font-mono text-[11px]">{f}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {devopsSkills.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] uppercase font-mono font-bold text-slate-400">// Cloud Topologies</div>
                        <div className="flex flex-wrap gap-1">
                          {devopsSkills.map((d, idx) => (
                            <span key={idx} className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-slate-800 font-mono text-[11px]">{d}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-400">// Mapped Stack Capabilities</div>
                    <div className="flex flex-wrap gap-1">
                      {flatSkills.map((skill, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-slate-800 font-mono text-[11px]">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Language Proficiency Linear Bars */}
            {cleanLanguages.length > 0 && (
              <motion.section variants={elementVariants} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2">
                  05 // Dialect Densities
                </h3>
                <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3 shadow-sm">
                  {cleanLanguages.map((lang, i) => (
                    <div key={i} className="space-y-1 text-xs">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-slate-700 font-bold">{lang.name}</span>
                        <span className="text-slate-900 font-black">{lang.pct || lang.value}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 rounded-full transition-all duration-500" 
                          style={{ width: `${lang.pct || lang.value || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Verified Certifications Node */}
            {cleanCertificates.length > 0 && (
              <motion.section variants={elementVariants} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2">
                  06 // Credentials & Proof
                </h3>
                <div className="space-y-2">
                  {cleanCertificates.map((cert, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-sm">
                      <div className="p-1.5 rounded-lg bg-slate-900 text-white shrink-0">
                        <Award size={14} />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-900 font-sans truncate">{cert.title || cert.name}</h4>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* LinkedIn Pipeline Broadcast Channel */}
            {cleanLinkedin.length > 0 && (
              <motion.section variants={elementVariants} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2">
                  07 // Syndicated Logging Stream
                </h3>
                <div className="space-y-3">
                  {cleanLinkedin.map((post, idx) => (
                    <div key={idx} className="text-xs bg-white border border-slate-200 p-4 rounded-xl space-y-1.5 shadow-sm">
                      <div className="flex justify-between items-center font-mono text-[9px] text-slate-400">
                        <span className="text-indigo-600 font-bold flex items-center gap-1"><FaLinkedin /> LOG NODE</span>
                        <span>{post.date || post.timeAgo}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-3 leading-relaxed font-sans font-light">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Academic Matrix Infrastructure */}
            {cleanEducation.length > 0 && (
              <motion.section variants={elementVariants} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 flex items-center gap-1.5">
                  <GraduationCap size={15} /> 08 // Scholastic Roots
                </h3>
                <div className="space-y-3">
                  {cleanEducation.map((edu, idx) => (
                    <div key={idx} className="text-xs bg-white border border-slate-200 p-4 rounded-xl space-y-1 shadow-sm">
                      <div className="font-bold text-slate-900 font-sans">{edu.degree}</div>
                      <div className="text-slate-500 font-light font-sans flex items-center justify-between text-[11px]">
                        <span>{edu.school || edu.institution}</span>
                        <span className="font-mono text-slate-400">{edu.year || `${edu.start} – ${edu.end}`}</span>
                      </div>
                      {edu.score && (
                        <div className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded w-max mt-1 border border-emerald-100">
                          SCORE // {edu.score}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

          </div>
        </div>

        {/* ================= HIGH-LEVEL DISPATCH CONNECTION PORTAL ================= */}
        <motion.section variants={elementVariants} className="pt-4 border-t border-slate-200">
          <div className="bg-white border border-slate-900 border-2 rounded-2xl overflow-hidden shadow-md">
            <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-white font-mono font-bold flex items-center gap-2">
                <Layers size={13} className="text-slate-400" />
                Operational Gateway Conduits
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 font-sans">Establish Secure Route</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Route architectural briefings or strategic consultation tickets into the integrated communications tier.
                </p>
                <div className="pt-1">
                  <button 
                    onClick={handleCopyContact}
                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-mono text-slate-800 transition-all"
                  >
                    <span className="truncate pr-2">{personal.email || 'delegate@firmware.io'}</span>
                    {copiedLink ? <Check size={14} className="text-emerald-600 shrink-0" /> : <Copy size={13} className="text-slate-400 shrink-0" />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleDispatchSignal} className="md:col-span-7 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="CLIENT_ID (NAME)" 
                    value={messageState.name}
                    onChange={e => setMessageState(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl px-3 py-2 text-xs text-slate-900 uppercase font-mono transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="CLIENT_ROUTE (EMAIL) *" 
                    required
                    value={messageState.email}
                    onChange={e => setMessageState(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl px-3 py-2 text-xs text-slate-900 transition-colors"
                  />
                </div>
                <textarea 
                  rows={2} 
                  placeholder="COMMUNICATION MANIFEST PAYLOAD MATRIX BODY... *" 
                  required
                  value={messageState.message}
                  onChange={e => setMessageState(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white outline-none rounded-xl px-3 py-2 text-xs text-slate-900 transition-colors resize-none font-sans"
                />
                <button 
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Send size={12} /> Dispatch Link Transmission
                </button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* ================= COMPONENT AUDIT FOOTER ================= */}
        <footer className="text-center text-[10px] font-mono text-slate-400 pt-4 border-t border-slate-200/60 max-w-xs mx-auto">
          <div>© {new Date().getFullYear()} {personal.name || "Executive Portfolio"} // COMP_REF_CORP</div>
          <div className="text-slate-300 mt-0.5">SYS_KEY_INDEX: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
        </footer>

      </motion.div>

      {/* ================= MODAL DIALOG OVERLAY: DETAILED PROJECT VERIFICATION ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 15 }}
              className="bg-white border border-slate-900 border-2 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
                <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                  <Info size={14} /> Repository Configuration Mapping
                </span>
                <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-black text-slate-900 font-sans uppercase">{selectedProject.name || selectedProject.title}</h4>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.2 bg-slate-100 border border-slate-200 rounded text-slate-600 uppercase">
                      {selectedProject.language || selectedProject.lang || "Active Node"}
                    </span>
                  </div>
                  {selectedProject.homepage && (
                    <a href={selectedProject.homepage} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-0.5 font-mono">
                      {selectedProject.homepage} ↗
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {selectedProject.desc || selectedProject.description || "No supplemental manifest logs recorded for this production model identifier branch."}
                </p>

                {Array.isArray(selectedProject.techStack) && selectedProject.techStack.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">// Substrate Layout</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.techStack.map((tech, ti) => (
                        <span key={ti} className="text-[9px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[11px] font-mono text-slate-500 flex justify-between items-center">
                  <span>METRICS_EVAL: SUCCESS</span>
                  <span className="text-amber-600 font-bold flex items-center gap-0.5">
                    <Star size={11} fill="currentColor" /> {selectedProject.stars || "0"} Stars
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {(selectedProject.githubUrl || selectedProject.sourceUrl) && (
                    <a 
                      href={selectedProject.githubUrl || selectedProject.sourceUrl} target="_blank" rel="noreferrer"
                      className="py-2 px-3 border border-slate-200 hover:border-slate-900 rounded-xl text-center text-xs font-mono font-bold text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FaGithub size={13} /> Inspect Source
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} target="_blank" rel="noreferrer"
                      className="py-2 px-3 bg-slate-900 hover:bg-slate-800 rounded-xl text-center text-xs font-mono font-bold text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink size={12} /> Live Link Node
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
