import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Star, Cpu, Layers, MessageSquare, BookOpen, 
  MapPin, Mail, ExternalLink, Briefcase, 
  Terminal, ShieldCheck, X, Award, ChevronRight, Activity
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// Interactive Pseudo-3D Card Wrapper - Light Theme Tuned
function Card3D({ children, className = "" }) {
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
    
    // Limits angular rotation to maximum 6 degrees for a softer feel
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
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`bg-white/60 border border-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.12)] hover:border-sky-200/50 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function LuminaPro({ data }) {
  // Deep multi-tier schema parsing with strict defensive fallbacks
  const s = data || {};
  const personal = s.personalInfo || s.personal || {};
  const githubMetrics = s.githubMetrics || s.stats || {};
  const social = s.social || {};

  const [selectedArtifact, setSelectedArtifact] = useState(null);

  // Safe structural data translations ensuring absolute runtime stability
  const cleanExperience = Array.isArray(s.experience) ? s.experience : [];
  const cleanProjects = Array.isArray(s.projects) ? s.projects : [];
  const cleanLinkedin = Array.isArray(s.linkedinPosts) ? s.linkedinPosts : [];
  const cleanEducation = Array.isArray(s.education) ? s.education : [];
  const cleanLanguages = Array.isArray(s.languages) ? s.languages : [];
  const cleanCertificates = Array.isArray(s.achievements) ? s.achievements : Array.isArray(s.certifications) ? s.certifications : [];

  // Automated layout matching for raw flat skill inventories
  const skillsData = s.skills || {};
  const languagesList = Array.isArray(skillsData.languages) ? skillsData.languages : [];
  const frameworksList = Array.isArray(skillsData.frameworks) || Array.isArray(skillsData.libraries) 
    ? (skillsData.frameworks || skillsData.libraries) 
    : [];
  const toolsList = Array.isArray(skillsData.tools) || Array.isArray(skillsData.databases)
    ? (skillsData.tools || skillsData.databases)
    : [];

  const hasStructuredSkills = languagesList.length > 0 || frameworksList.length > 0 || toolsList.length > 0;
  const flatFallbackSkills = !hasStructuredSkills ? (Array.isArray(s.skills) ? s.skills : typeof s.skills === 'object' ? Object.values(s.skills).flat() : []) : [];

  const handleCopyEndpoint = () => {
    const targetEmail = personal.email || 'hello@example.com';
    navigator.clipboard.writeText(targetEmail);
    toast.success("Email address copied to clipboard!");
  };

  // Performance orchestration mapping
  const viewStaggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemFadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-3 sm:p-6 lg:p-12 relative overflow-x-hidden flex flex-col justify-center perspective-1000 selection:bg-sky-200 selection:text-sky-900">
      
      {/* Light Ambient Fluid Fields & Soft Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-sky-300/20 via-blue-200/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-violet-300/20 via-fuchsia-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={viewStaggerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full relative z-10 space-y-8"
      >
        
        {/* ================= 3D GLASS HERO ================= */}
        <motion.header variants={itemFadeUpVariants} className="w-full">
          <Card3D className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-sky-400/10 to-transparent blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 translate-z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 border border-sky-200 rounded-full text-[10px] text-sky-700 font-bold uppercase tracking-widest w-max">
                <Sparkles size={12} className="text-sky-500" /> 
                Open to Opportunities
              </div>
              {githubMetrics.contributionsThisYear && (
                <div className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full w-max shadow-sm">
                  {githubMetrics.contributionsThisYear} Contributions this year
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-8 transform-style-3d">
              <div className="space-y-2 translate-z-30">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {personal.fullName || personal.name || "Alex Mercer"}
                </h1>
                <p className="text-sm sm:text-base text-slate-500 font-medium tracking-wide flex items-center flex-wrap gap-2">
                  <span className="text-sky-600 font-bold">{personal.title || "Software Engineer"}</span>
                  {personal.location && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-slate-400" /> {personal.location}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 translate-z-20 w-full md:w-auto">
                {personal.email && (
                  <button 
                    onClick={handleCopyEndpoint}
                    className="text-sm text-slate-700 font-medium bg-white hover:bg-sky-50 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 transition-colors group grow md:grow-0"
                  >
                    <span className="truncate max-w-[180px] sm:max-w-none">{personal.email}</span>
                    <Mail size={16} className="text-sky-500 group-hover:scale-110 transition-transform shrink-0" />
                  </button>
                )}
                
                <div className="flex items-center gap-2 bg-white/50 border border-slate-200 p-1.5 rounded-2xl shrink-0 shadow-sm">
                  {(personal.githubUrl || social.github) && (
                    <a href={personal.githubUrl || social.github} target="_blank" rel="noreferrer" className="p-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
                      <FaGithub size={18} />
                    </a>
                  )}
                  {(personal.linkedinUrl || social.linkedin) && (
                    <a href={personal.linkedinUrl || social.linkedin} target="_blank" rel="noreferrer" className="p-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noreferrer" className="p-2.5 text-slate-600 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-all">
                      <FaTwitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {(s.summary || personal.bio) && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-6 border-t border-slate-200/50 mt-8 font-medium translate-z-10 max-w-4xl">
                {s.summary || personal.bio}
              </p>
            )}
          </Card3D>
        </motion.header>

        {/* ================= QUICK STATS ================= */}
        {Object.keys(githubMetrics).length > 0 && (
          <motion.div variants={itemFadeUpVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Github Stars", value: githubMetrics.totalStars || githubMetrics.stars || "0", color: "text-amber-500", bg: "bg-amber-100" },
              { label: "Repositories", value: githubMetrics.totalRepositories || githubMetrics.repositories || "0", color: "text-blue-500", bg: "bg-blue-100" },
              { label: "Projects", value: cleanProjects.length, color: "text-rose-500", bg: "bg-rose-100" },
              { label: "Certifications", value: cleanCertificates.length, color: "text-emerald-500", bg: "bg-emerald-100" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/60 border border-white/80 rounded-2xl p-5 text-center backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                <div className="text-2xl font-black text-slate-800 mt-1 flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stat.bg} shadow-[0_0_8px_currentColor] ${stat.color}`} />
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ================= TWO COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* COLUMN A: SKILLS & EDUCATION */}
          <div className="space-y-6 flex flex-col">
            
            {/* Tech Stack */}
            <motion.div variants={itemFadeUpVariants} className="w-full">
              <Card3D>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-5">
                  <Cpu size={16} className="text-sky-500" /> Technology Stack
                </h3>
                <div className="space-y-4 text-xs">
                  {hasStructuredSkills ? (
                    <>
                      {languagesList.length > 0 && (
                        <div>
                          <span className="text-slate-700 block font-bold mb-2 text-[11px] uppercase tracking-wider">Languages</span>
                          <div className="flex flex-wrap gap-2">
                            {languagesList.map((l, idx) => (
                              <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-600 font-medium shadow-sm">{l}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {frameworksList.length > 0 && (
                        <div className="pt-2">
                          <span className="text-slate-700 block font-bold mb-2 text-[11px] uppercase tracking-wider">Frameworks</span>
                          <div className="flex flex-wrap gap-2">
                            {frameworksList.map((f, idx) => (
                              <span key={idx} className="bg-sky-50 border border-sky-100 px-3 py-1 rounded-lg text-sky-700 font-medium shadow-sm">{f}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {toolsList.length > 0 && (
                        <div className="pt-2">
                          <span className="text-slate-700 block font-bold mb-2 text-[11px] uppercase tracking-wider">Tools & Cloud</span>
                          <div className="flex flex-wrap gap-2">
                            {toolsList.map((t, idx) => (
                              <span key={idx} className="bg-violet-50 border border-violet-100 px-3 py-1 rounded-lg text-violet-700 font-medium shadow-sm">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <span className="text-slate-700 block font-bold mb-2 text-[11px] uppercase tracking-wider">Core Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {flatFallbackSkills.map((skill, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-600 font-medium shadow-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card3D>
            </motion.div>

            {/* Language Proficiency Slider */}
            {cleanLanguages.length > 0 && (
              <motion.div variants={itemFadeUpVariants} className="w-full">
                <Card3D>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-5">
                    <Activity size={16} className="text-rose-400" /> Languages
                  </h3>
                  <div className="space-y-4">
                    {cleanLanguages.map((lang, i) => (
                      <div key={i} className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-medium">
                          <span className="text-slate-700">{lang.name}</span>
                          <span className="text-slate-400">{lang.pct || lang.value}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                            style={{ width: `${lang.pct || lang.value || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card3D>
              </motion.div>
            )}

            {/* Education History */}
            {cleanEducation.length > 0 && (
              <motion.div variants={itemFadeUpVariants} className="w-full">
                <Card3D>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-5">
                    <BookOpen size={16} className="text-violet-500" /> Education
                  </h3>
                  <div className="space-y-5">
                    {cleanEducation.map((edu, idx) => (
                      <div key={idx} className="relative pl-4 group">
                        <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-violet-300 group-hover:bg-violet-500 rounded-full transition-colors shadow-[0_0_0_4px_rgba(139,92,246,0.1)]" />
                        <div className="font-bold text-slate-800 text-sm">{edu.degree}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {edu.school || edu.institution}
                        </div>
                        <div className="text-sky-600 text-[11px] font-medium mt-1">
                          {edu.year || `${edu.start} – ${edu.end}`}
                        </div>
                        {edu.score && (
                          <div className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded mt-1.5">
                            Score: {edu.score}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card3D>
              </motion.div>
            )}
          </div>

          {/* COLUMN B: EXPERIENCE */}
          <div className="md:col-span-2 space-y-6">
            <motion.div variants={itemFadeUpVariants} className="w-full">
              <Card3D>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-6">
                  <Layers size={16} className="text-rose-400" /> Work Experience
                </h3>
                <div className="space-y-4">
                  {cleanExperience.map((job, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/40 hover:bg-white/80 border border-slate-200/60 hover:border-sky-200 p-5 sm:p-6 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                            {job.role || job.title}
                          </h4>
                          <div className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                            <Briefcase size={14} className="text-slate-400" /> 
                            {job.company} {job.type && <span className="text-slate-300">•</span>} {job.type}
                          </div>
                        </div>
                        <span className="text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          {job.duration || `${job.start} – ${job.end}`}
                        </span>
                      </div>

                      {(job.desc || job.description) && (
                        <p className="text-sm text-slate-600 leading-relaxed mt-3">
                          {job.desc || job.description}
                        </p>
                      )}

                      {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                        <ul className="text-sm text-slate-600 space-y-2 mt-4">
                          {job.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {Array.isArray(job.techStack) && job.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
                          {job.techStack.map((tech, ti) => (
                            <span key={ti} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md uppercase tracking-wider">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card3D>
            </motion.div>
          </div>

        </div>

        {/* ================= FULL-WIDTH BOTTOM ARRAYS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Projects */}
          <motion.div variants={itemFadeUpVariants} className="w-full">
            <Card3D>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-5">
                <FaGithub size={16} className="text-slate-700" /> Featured Projects
              </h3>
              <div className="space-y-4">
                {cleanProjects.map((p, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 bg-white border border-slate-200 hover:border-sky-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="space-y-1.5 w-full sm:max-w-[70%]">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                          {p.name || p.title}
                        </span>
                        {p.status && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider">
                            {p.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {p.desc || p.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-sm font-bold text-amber-500 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                        <Star size={14} fill="currentColor" /> 
                        <span>{p.stars || "0"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {(p.githubUrl || p.sourceUrl) && (
                          <a href={p.githubUrl || p.sourceUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                            <FaGithub size={16} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-all">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.div>

          {/* LinkedIn Posts / Activity */}
          <motion.div variants={itemFadeUpVariants} className="w-full">
            <Card3D>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-5">
                <MessageSquare size={16} className="text-blue-500" /> Recent Activity
              </h3>
              <div className="space-y-4">
                {cleanLinkedin.map((post, idx) => (
                  <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5 text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">
                        <FaLinkedin size={14} /> Update
                      </span>
                      <span>{post.date || post.timeAgo}</span>
                    </div>
                    <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                    {post.engagements && (
                      <span className="inline-block text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        👍 {post.engagements} Engagements
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* ================= CERTIFICATIONS ================= */}
        {cleanCertificates.length > 0 && (
          <motion.section variants={itemFadeUpVariants} className="w-full">
            <Card3D>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-5">
                <Award size={16} className="text-emerald-500" /> Licenses & Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cleanCertificates.map((cert, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedArtifact(cert)}
                    className="p-4 bg-white border border-slate-200 hover:border-emerald-200 rounded-2xl flex items-center justify-between cursor-pointer group hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                        <ShieldCheck size={18} />
                      </div>
                      <div className="truncate space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 truncate transition-colors">
                          {cert.title || cert.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate font-medium">
                          {cert.issuer} {cert.date && `• ${cert.date}`}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.section>
        )}

        {/* ================= FOOTER ================= */}
        <footer className="text-center text-xs text-slate-400 font-medium pt-8 pb-4">
          <div>© {new Date().getFullYear()} {personal.name || "Alex Mercer"}. All rights reserved.</div>
        </footer>

      </motion.div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedArtifact && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArtifact(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-100 max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-emerald-500" /> Certificate Details
                </span>
                <button onClick={() => setSelectedArtifact(null)} className="text-slate-400 hover:text-slate-700 bg-white p-1 rounded-full shadow-sm transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 space-y-5 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
                  <ShieldCheck size={32} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-black text-slate-800">{selectedArtifact.title || selectedArtifact.name}</h4>
                  <p className="text-sm text-slate-600 font-bold">{selectedArtifact.issuer}</p>
                  {(selectedArtifact.date || selectedArtifact.validity) && (
                    <p className="text-xs text-slate-400 font-medium">Issued: {selectedArtifact.date}</p>
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    toast.success("Verification link copied!");
                    setSelectedArtifact(null);
                  }}
                  className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-xl shadow-md hover:bg-sky-600 hover:shadow-sky-500/20 transition-all cursor-pointer"
                >
                  Verify Credential
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}