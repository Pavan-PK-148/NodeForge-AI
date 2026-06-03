import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { usePortfolio } from '../context/PortfolioBuilderContext';
import { 
  Globe, User, Briefcase, Code, Settings, Image, 
  Loader2, Mail, Plus, Trash2, Save, BookOpen, 
  FolderGit, CheckCircle2, Sliders, Eye
} from 'lucide-react';
import { FaLinkedin } from "react-icons/fa";

// Import Custom Portfolio Template Engines
import DeveloperPro from '../templates/DeveloperPro';
import CreativeNexus from '../templates/CreativeNexus';
import CorporateElite from '../templates/CorporateElite';
import SaaSBuilder from '../templates/SaaSBuilder';
import AlchemistGlow from '../templates/AlchemistGlow';

const TEMPLATE_MAP = {
  'developer-pro': DeveloperPro,
  'creative-nexus': CreativeNexus,
  'corporate-elite': CorporateElite,
  'saas-builder': SaaSBuilder,
  'alchemist-glow': AlchemistGlow
};

export default function Builder() {
  const navigate = useNavigate();
  
  const { 
    portfolioData, 
    setPortfolioData, 
    savePortfolioDraft 
  } = usePortfolio() || {};
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const templateOptions = [
    { id: 'developer-pro', name: 'Cyberpunk Developer' },
    { id: 'creative-nexus', name: 'Fluid Creative' },
    { id: 'corporate-elite', name: 'Executive Elite' },
    { id: 'saas-builder', name: 'SaaS Launchpad' },
    { id: 'alchemist-glow', name: 'Aurora Alchemist' }
  ];

  // Defensive normalization layer to secure robust structural rendering models
  const safePersonalInfo = portfolioData?.personalInfo || {};
  const normalizedData = {
    ...portfolioData,
    experience: Array.isArray(portfolioData?.experience) ? portfolioData.experience : [],
    projects: Array.isArray(portfolioData?.projects) ? portfolioData.projects : [],
    education: Array.isArray(portfolioData?.education) ? portfolioData.education : [],
    skills: portfolioData?.skills || { languages: [], frameworks: [], devops: [] },
    githubMetrics: portfolioData?.githubMetrics || { totalStars: 0, totalRepositories: 0, contributionsThisYear: 0 },
    personalInfo: {
      ...safePersonalInfo,
      fullName: safePersonalInfo.fullName || 'Initialize Name',
      title: safePersonalInfo.title || 'Full-Stack Developer',
      location: safePersonalInfo.location || 'Global',
      summary: safePersonalInfo.summary || '',
      bio: safePersonalInfo.bio || '',
      email: safePersonalInfo.email || '',
      linkedin: safePersonalInfo.linkedin || '',
      initials: safePersonalInfo.fullName?.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase() || 'DV'
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const temporaryAssetUrl = URL.createObjectURL(file);
      setPortfolioData(prev => ({ ...prev, profileImage: temporaryAssetUrl }));
      toast.success('Profile avatar asset synchronized.');
    }
  };

  const patchPersonalInfo = (key, value) => {
    setPortfolioData(prev => ({
      ...(prev || {}),
      personalInfo: {
        ...(prev?.personalInfo || {}),
        [key]: value
      }
    }));
  };

  // EXPERIENCE ENGINE HANDLERS
  const updateExperienceItem = (id, key, value) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: (prev?.experience || []).map(exp => exp._id === id || exp.id === id ? { ...exp, [key]: value } : exp)
    }));
  };

  const addExperienceItem = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineer',
      company: 'Enterprise Infrastructure',
      duration: '2026 — PRESENT',
      desc: 'Architecting end-to-end user state matrices and data streams.'
    };
    setPortfolioData(prev => ({ ...prev, experience: [newItem, ...(prev?.experience || [])] }));
    toast.success('New professional role block initialized.');
  };

  const deleteExperienceItem = (id) => {
    setPortfolioData(prev => ({ 
      ...prev, 
      experience: (prev?.experience || []).filter(exp => exp._id !== id && exp.id !== id) 
    }));
    toast.error('Experience block context unmounted.');
  };

  // PROJECTS ENGINE HANDLERS
  const updateProjectItem = (id, key, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: (prev?.projects || []).map(proj => proj._id === id || proj.id === id ? { ...proj, [key]: value } : proj)
    }));
  };

  const addProjectItem = () => {
    const newItem = {
      id: `proj-${Date.now()}`,
      name: 'Alpha Node Engine',
      lang: 'TypeScript',
      desc: 'Distributed microservice cluster balancing continuous asset computations.',
      sourceUrl: '',
      liveUrl: ''
    };
    setPortfolioData(prev => ({ ...prev, projects: [...(prev?.projects || []), newItem] }));
    toast.success('Custom project node mapped.');
  };

  const deleteProjectItem = (id) => {
    setPortfolioData(prev => ({ 
      ...prev, 
      projects: (prev?.projects || []).filter(proj => proj._id !== id && proj.id !== id) 
    }));
    toast.error('Project record unmapped.');
  };

  // EDUCATION ENGINE HANDLERS
  const updateEducationItem = (id, key, value) => {
    setPortfolioData(prev => ({
      ...prev,
      education: (prev?.education || []).map(edu => edu._id === id || edu.id === id ? { ...edu, [key]: value } : edu)
    }));
  };

  const addEducationItem = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      school: 'Global Tech Institute',
      year: '2026'
    };
    setPortfolioData(prev => ({ ...prev, education: [...(prev?.education || []), newItem] }));
    toast.success('Education history trace injected.');
  };

  const deleteEducationItem = (id) => {
    setPortfolioData(prev => ({ 
      ...prev, 
      education: (prev?.education || []).filter(edu => edu._id !== id && edu.id !== id) 
    }));
    toast.error('Education item deleted.');
  };

  // SKILLS MUTATOR KEYED TO SCHEMA MIXED DEFINITIONS
  const handleSkillsChange = (category, valueString) => {
    const splitSkills = valueString.split(',').map(s => s.trim());
    setPortfolioData(prev => {
      const activeSkills = prev?.skills && typeof prev.skills === 'object' && !Array.isArray(prev.skills) ? prev.skills : {};
      return {
        ...prev,
        skills: {
          ...activeSkills,
          [category]: splitSkills
        }
      };
    });
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      if (!savePortfolioDraft) {
        throw new Error("Save function undefined on portfolio context instance.");
      }

      // Deep sanitize all document tracks to prevent schema casting failures
      const cleanDataPayload = {
        ...normalizedData,
        experience: normalizedData.experience.map((item) => {
          const itemCopy = { ...item };
          // 1. Remove non-schema frontend tracking tags completely
          delete itemCopy.id; 
          // 2. Eliminate invalid empty string IDs so MongoDB can initialize genuine keys
          if (itemCopy._id === "" || !itemCopy._id) {
            delete itemCopy._id;
          }
          return itemCopy;
        }),
        projects: normalizedData.projects.map((item) => {
          const itemCopy = { ...item };
          delete itemCopy.id;
          if (itemCopy._id === "" || !itemCopy._id) {
            delete itemCopy._id;
          }
          return itemCopy;
        }),
        education: normalizedData.education.map((item) => {
          const itemCopy = { ...item };
          delete itemCopy.id;
          if (itemCopy._id === "" || !itemCopy._id) {
            delete itemCopy._id;
          }
          return itemCopy;
        })
      };

      const success = await savePortfolioDraft(cleanDataPayload);
      if (success) {
        toast.success('Portfolio draft states committed securely.');
      } else {
        toast.error('Data ledger rejected payload sync.');
      }
    } catch (error) {
      console.error('Save Draft execution aborted:', error);
      toast.error('Synchronization failure. Check payload parameters.');
    } finally {
      setIsSaving(false);
    }
  };

  const runDeploymentEngine = async () => {
    setIsDeploying(true);
    try {
      if (!savePortfolioDraft) {
        throw new Error("Save function undefined on portfolio context instance.");
      }

      // Deep sanitize all document tracks before production compilation execution
      const cleanDataPayload = {
        ...normalizedData,
        experience: normalizedData.experience.map((item) => {
          const itemCopy = { ...item };
          delete itemCopy.id;
          if (itemCopy._id === "" || !itemCopy._id) {
            delete itemCopy._id;
          }
          return itemCopy;
        }),
        projects: normalizedData.projects.map((item) => {
          const itemCopy = { ...item };
          delete itemCopy.id;
          if (itemCopy._id === "" || !itemCopy._id) {
            delete itemCopy._id;
          }
          return itemCopy;
        }),
        education: normalizedData.education.map((item) => {
          const itemCopy = { ...item };
          delete itemCopy.id;
          if (itemCopy._id === "" || !itemCopy._id) {
            delete itemCopy._id;
          }
          return itemCopy;
        })
      };

      const saveSuccess = await savePortfolioDraft(cleanDataPayload);
      if (!saveSuccess) {
        setIsDeploying(false);
        toast.error('Pre-deployment baseline compilation failed.');
        return;
      }

      const deployPromise = new Promise((resolve) => setTimeout(resolve, 2000));

      toast.promise(deployPromise, {
        loading: 'Compiling structural modules & launching live server routes...',
        success: (savedRecord) => {
          setIsDeploying(false);
          const targetId = portfolioData?._id || portfolioData?.id;
          const uniqueSlug = `/p/${targetId}`;
          return (
            <div className="flex flex-col gap-1 text-xs">
              <span className="font-bold text-white">Portfolio running on live server blocks!</span>
              <span 
                className="text-purple-400 underline cursor-pointer font-mono block mt-1" 
                onClick={() => navigate(uniqueSlug)}
              >
                View public node instance
              </span>
            </div>
          );
        },
        error: 'Manifest compilation error.',
      }, { duration: 5000 });

    } catch (error) {
      console.error('Deployment compiler error:', error);
      toast.error('Pipeline compilation failure.');
      setIsDeploying(false);
    }
  };

  const TargetPreviewLayout = TEMPLATE_MAP[portfolioData?.selectedTemplate] || DeveloperPro;

  return (
    <div className="h-screen bg-[#020105] flex flex-col overflow-hidden text-slate-200">
      
      {/* Upper Telemetry Header Controls */}
      <header className="h-16 border-b border-white/5 bg-[#08060f]/90 backdrop-blur-xl px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Studio_Engine_v2.6
            </span>
          </div>
          
          <div className="hidden xl:flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
            {templateOptions.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setPortfolioData(prev => ({ ...prev, selectedTemplate: t.id }));
                  toast.success(`Matrix re-routed to ${t.name}`);
                }}
                className={`text-[10px] px-3 py-1.5 font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer relative ${
                  portfolioData?.selectedTemplate === t.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {portfolioData?.selectedTemplate === t.id && (
                  <motion.div layoutId="activeTemplateGlow" className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg -z-10 shadow-[0_0_15px_rgba(147,51,234,0.4)]" />
                )}
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-xs font-mono tracking-wide text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Exit dashboard
          </button>

          <button
            disabled={isSaving || isDeploying}
            onClick={handleManualSave}
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold font-mono uppercase px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" /> : <Save className="w-3.5 h-3.5 text-slate-400" />}
            Save_Draft
          </button>

          <button
            disabled={isDeploying || isSaving}
            onClick={runDeploymentEngine}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white text-xs font-bold font-mono uppercase px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-40 shadow-[0_0_20px_rgba(147,51,234,0.2)] cursor-pointer"
          >
            {isDeploying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
            Build_Manifest
          </button>
        </div>
      </header>

      {/* Main Structural Viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Control Panel Mutation Block */}
        <aside className="w-full md:w-[480px] border-r border-white/5 bg-[#05030a] flex flex-col overflow-hidden shrink-0 z-10 shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-6 border-b border-white/5 bg-black/40 sticky top-0 z-20 backdrop-blur-md">
            {[
              { id: 'profile', icon: User, label: 'Bio' },
              { id: 'experience', icon: Briefcase, label: 'Exp' },
              { id: 'projects', icon: FolderGit, label: 'Proj' },
              { id: 'education', icon: BookOpen, label: 'Edu' },
              { id: 'skills', icon: Code, label: 'Skills' },
              { id: 'metrics', icon: Settings, label: 'Sync' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 flex flex-col items-center gap-1 text-[9px] font-mono font-bold tracking-wider uppercase transition-all relative cursor-pointer ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500" />
                )}
                <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-purple-400' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            <AnimatePresence mode="wait">
              
              {/* CORE PROFILE SUBFIELDS BIOGRAPHY */}
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">// PROFILE_IMAGE_NODE</label>
                    <div className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-[#0d0a14] border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
                        {portfolioData?.profileImage ? (
                          <img src={portfolioData.profileImage} alt="Profile Asset" className="w-full h-full object-cover" />
                        ) : (
                          <Image className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                      <label className="bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 font-mono text-[11px] px-3 py-2 rounded-xl border border-purple-500/20 cursor-pointer transition-all">
                        Change Image Matrix
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        value={normalizedData.personalInfo.fullName}
                        onChange={(e) => patchPersonalInfo('fullName', e.target.value)}
                        className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Job Title</label>
                      <input
                        type="text"
                        value={normalizedData.personalInfo.title}
                        onChange={(e) => patchPersonalInfo('title', e.target.value)}
                        className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Mail size={11} className="text-purple-400" /> System Contact Gateway (Email)
                    </label>
                    <input
                      type="email"
                      value={normalizedData.personalInfo.email}
                      onChange={(e) => patchPersonalInfo('email', e.target.value)}
                      className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <FaLinkedin size={11} className="text-blue-400" /> LinkedIn Network
                      </label>
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/..."
                        value={normalizedData.personalInfo.linkedin}
                        onChange={(e) => patchPersonalInfo('linkedin', e.target.value)}
                        className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <User size={11} className="text-slate-400" /> Node Coordinates
                      </label>
                      <input
                        type="text"
                        value={normalizedData.personalInfo.location}
                        onChange={(e) => patchPersonalInfo('location', e.target.value)}
                        className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Brief Bio Intro Line</label>
                    <input
                      type="text"
                      value={normalizedData.personalInfo.bio}
                      onChange={(e) => patchPersonalInfo('bio', e.target.value)}
                      className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-slate-300 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Full Executive Summary</label>
                    <textarea
                      rows={4}
                      value={normalizedData.personalInfo.summary}
                      onChange={(e) => patchPersonalInfo('summary', e.target.value)}
                      className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-slate-300 outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>
                </motion.div>
              )}

              {/* EXPERIENCES STREAM MODULE */}
              {activeTab === 'experience' && (
                <motion.div key="experience" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">// WORK_CHRONOLOGY_STREAM</span>
                    <button 
                      onClick={addExperienceItem}
                      className="p-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg flex items-center gap-1 text-[10px] font-mono transition-all cursor-pointer"
                    >
                      <Plus size={12} /> Add_Role
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {normalizedData.experience.map((exp, index) => {
                      const uid = exp._id || exp.id || index;
                      return (
                        <motion.div 
                          key={uid}
                          layout
                          className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 relative group/exp hover:border-purple-500/20 transition-colors"
                        >
                          <button 
                            onClick={() => deleteExperienceItem(uid)}
                            className="absolute top-3 right-3 p-1.5 opacity-0 group-hover/exp:opacity-100 text-slate-500 hover:text-rose-400 transition-all rounded-lg bg-black/40 border border-white/5 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Role / Title</label>
                              <input 
                                type="text" 
                                value={exp.role || ''} 
                                onChange={(e) => updateExperienceItem(uid, 'role', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Enterprise Node</label>
                              <input 
                                type="text" 
                                value={exp.company || ''} 
                                onChange={(e) => updateExperienceItem(uid, 'company', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Temporal Timeline</label>
                            <input 
                              type="text" 
                              value={exp.duration || ''} 
                              onChange={(e) => updateExperienceItem(uid, 'duration', e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-purple-300 outline-none font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Role Execution Summary</label>
                            <textarea 
                              rows={3} 
                              value={exp.desc || ''} 
                              onChange={(e) => updateExperienceItem(uid, 'desc', e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 outline-none resize-none leading-relaxed"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    {normalizedData.experience.length === 0 && (
                      <div className="text-center py-8 border border-dashed border-white/5 rounded-2xl text-slate-600 font-mono text-xs">
                        No continuous work records mounted.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* PROJECTS ARCHIVE COMPONENT */}
              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">// DEPLOYED_PROJECT_MAP</span>
                    <button 
                      onClick={addProjectItem}
                      className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg flex items-center gap-1 text-[10px] font-mono transition-all cursor-pointer"
                    >
                      <Plus size={12} /> Add_Project
                    </button>
                  </div>

                  <div className="space-y-4">
                    {normalizedData.projects.map((proj, index) => {
                      const pid = proj._id || proj.id || index;
                      return (
                        <div key={pid} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 relative group/proj">
                          <button 
                            onClick={() => deleteProjectItem(pid)}
                            className="absolute top-3 right-3 p-1.5 opacity-0 group-hover/proj:opacity-100 text-slate-500 hover:text-rose-400 transition-all rounded-lg bg-black/40 border border-white/5 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Application Name</label>
                              <input 
                                type="text" 
                                value={proj.name || ''} 
                                onChange={(e) => updateProjectItem(pid, 'name', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Primary Language/Stack</label>
                              <input 
                                type="text" 
                                value={proj.lang || ''} 
                                onChange={(e) => updateProjectItem(pid, 'lang', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-indigo-300 outline-none font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Project Architecture Abstract</label>
                            <textarea 
                              rows={2} 
                              value={proj.desc || ''} 
                              onChange={(e) => updateProjectItem(pid, 'desc', e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 outline-none resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Code Repository URL</label>
                              <input 
                                type="text" 
                                placeholder="https://github.com/..."
                                value={proj.sourceUrl || ''} 
                                onChange={(e) => updateProjectItem(pid, 'sourceUrl', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-400 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Live Host Production Link</label>
                              <input 
                                type="text" 
                                placeholder="https://live-app.com"
                                value={proj.liveUrl || proj.homepage || ''} 
                                onChange={(e) => updateProjectItem(pid, 'liveUrl', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-400 outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ACADEMIC HISTORY LEDGER */}
              {activeTab === 'education' && (
                <motion.div key="education" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">// ACADEMIC_LEDGER_BLOCKS</span>
                    <button 
                      onClick={addEducationItem}
                      className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg flex items-center gap-1 text-[10px] font-mono transition-all cursor-pointer"
                    >
                      <Plus size={12} /> Add_Education
                    </button>
                  </div>

                  <div className="space-y-4">
                    {normalizedData.education.map((edu, index) => {
                      const edid = edu._id || edu.id || index;
                      return (
                        <div key={edid} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 relative group/edu">
                          <button 
                            onClick={() => deleteEducationItem(edid)}
                            className="absolute top-3 right-3 p-1.5 opacity-0 group-hover/edu:opacity-100 text-slate-500 hover:text-rose-400 transition-all rounded-lg bg-black/40 border border-white/5 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <div className="space-y-1">
                            <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Degree Matrix / Focus</label>
                            <input 
                              type="text" 
                              value={edu.degree || ''} 
                              onChange={(e) => updateEducationItem(edid, 'degree', e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2 space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">School / University</label>
                              <input 
                                type="text" 
                                value={edu.school || ''} 
                                onChange={(e) => updateEducationItem(edid, 'school', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-mono font-bold text-slate-500 uppercase">Year</label>
                              <input 
                                type="text" 
                                value={edu.year || ''} 
                                onChange={(e) => updateEducationItem(edid, 'year', e.target.value)}
                                className="w-full bg-black/30 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-emerald-400 outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TECHNICAL SKILLS KEYED EXPLICITLY TO MONGO SCHEMA */}
              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">// CAPABILITY_INDEX_MUTATORS</span>
                  
                  {['languages', 'frameworks', 'devops'].map((cat) => {
                    const trackingArray = Array.isArray(normalizedData.skills?.[cat]) ? normalizedData.skills[cat] : [];
                    return (
                      <div key={cat} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
                        <label className="text-[10px] font-mono font-bold text-indigo-400 uppercase block capitalize">
                          // {cat === 'languages' ? 'Core Languages' : cat === 'frameworks' ? 'Frameworks & Engines' : 'DevOps & Architectures'}
                        </label>
                        <input
                          type="text"
                          placeholder="Split inputs via commas..."
                          value={trackingArray.join(', ')}
                          onChange={(e) => handleSkillsChange(cat, e.target.value)}
                          className="w-full bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 outline-none transition-colors"
                        />
                        <div className="flex flex-wrap gap-1 pt-1">
                          {trackingArray.filter(Boolean).map((s, idx) => (
                            <span key={idx} className="bg-purple-500/10 text-purple-300 border border-purple-500/10 px-2 py-0.5 rounded text-[9px] font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* INTEGRATION STATUS & METRICS DEPLOYMENT */}
              {activeTab === 'metrics' && (
                <motion.div key="metrics" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">// DATA_LEDGER_SYNC_TELEMETRY</span>
                  
                  <div className="grid grid-cols-3 gap-2 bg-black/40 p-3 rounded-2xl border border-white/5 font-mono text-center">
                    <div className="p-2 bg-white/[0.02] rounded-xl">
                      <div className="text-[10px] text-slate-500">Repositories</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {normalizedData.githubMetrics?.totalRepositories || 0}
                      </div>
                    </div>
                    <div className="p-2 bg-white/[0.02] rounded-xl">
                      <div className="text-[10px] text-slate-500">Total Stars</div>
                      <div className="text-sm font-bold text-amber-400 mt-1">
                        {normalizedData.githubMetrics?.totalStars || 0} ✨
                      </div>
                    </div>
                    <div className="p-2 bg-white/[0.02] rounded-xl">
                      <div className="text-[10px] text-slate-500">Commits</div>
                      <div className="text-sm font-bold text-purple-400 mt-1">
                        {normalizedData.githubMetrics?.contributionsThisYear || 0}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-950/20 to-black/40 border border-emerald-500/10 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-mono font-bold text-white">GitHub API Route Buffer</div>
                      <div className="text-[10px] font-mono text-slate-500">Repocounters synced to cluster models</div>
                    </div>
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-950/20 to-black/40 border border-purple-500/10 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-mono font-bold text-white">LinkedIn Extraction State</div>
                      <div className="text-[10px] font-mono text-slate-500">Gateway URL active in personal fields</div>
                    </div>
                    <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Right Fluid Real-Time Immersive Visual Sandbox Viewport */}
        <section className="flex-1 bg-[#05040a] overflow-hidden relative p-4 sm:p-8 flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0e0922_0%,transparent_75%)] opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          <div className="w-full h-full border border-white/5 rounded-3xl overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.8)] relative bg-black/40 flex flex-col backdrop-blur-sm">
            <div className="h-10 border-b border-white/5 bg-black/60 px-4 flex items-center justify-between text-slate-500 z-20 shrink-0 font-mono text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Sliders size={11} className="text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Canvas_Live_Viewport</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-slate-400">
                <Eye size={10} /> Active_Preview
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={portfolioData?.selectedTemplate}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.015 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full min-h-max"
                >
                  <TargetPreviewLayout data={normalizedData} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
