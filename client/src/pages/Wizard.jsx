import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Loader2, 
  Cpu, 
  Network, 
  Terminal,
  Zap
} from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePortfolio } from '../context/PortfolioBuilderContext';

export default function Wizard() {
  const navigate = useNavigate();
  const { setPortfolioData, syncWithGitHubProfile } = usePortfolio();
  
  // Pipeline Workflow States
  const [currentStep, setCurrentStep] = useState(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // 3D Parallax Tracking Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Maps cursor movement into 3D degrees of rotation (-10 to 10)
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

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

  // Drag and Drop Pipeline Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      toast.success(`Loaded Matrix: ${file.name}`, {
        icon: '📄',
        style: { background: '#0b0816', color: '#fff', border: '1px solid rgba(99, 102, 241, 0.2)' }
      });
    } else {
      toast.error('Invalid schema. Please drop a valid PDF file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const runMasterAggregation = async () => {
    setIsExtracting(true);
    const loadToast = toast.loading('Synchronizing downstream matrix pipelines...');

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);

      const token = localStorage.getItem('token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio/upload-resume`, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error('Session expired or unauthorized node access.');
        throw new Error('Resume parsing failed');
      }
      
      const parsedResume = await res.json();

      let githubData = null;
      if (githubUser) {
        githubData = await syncWithGitHubProfile(githubUser);
      }

      setPortfolioData(prev => ({
        ...(prev || {}),
        ...parsedResume,
        personalInfo: { 
          ...(prev?.personalInfo || {}), 
          ...(parsedResume.personalInfo || {}), 
          linkedin: linkedinUrl 
        },
        githubMetrics: githubData?.githubMetrics || prev?.githubMetrics || { totalStars: 0, totalRepositories: 0 }
      }));

      toast.success('Pipeline orchestration complete!', { id: loadToast });
      navigate('/builder');
    } catch (error) {
      console.error(error);
      toast.error('Pipeline synchronization failed.', { id: loadToast });
    } finally {
      setIsExtracting(false);
    }
  };

  const processExtractionStep = () => {
    if (currentStep === 1 && !resumeFile) return toast.error('Upload your Resume PDF.');
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else runMasterAggregation();
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#040209] text-slate-200 relative flex flex-col justify-between overflow-x-hidden selection:bg-indigo-500/30 selection:text-white perspectives-container"
      style={{ perspective: '1200px' }}
    >
      
      {/* Dynamic Structural Ambient Glow Layout */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-40" />

      {/* Header Navigation Link Wrapper */}
      <header className="border-b border-white/5 bg-[#070512]/60 backdrop-blur-xl px-8 py-4 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/dashboard')}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold font-mono text-white text-xs shadow-md shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
              Ω
            </div>
            <span className="text-sm font-bold font-mono text-white tracking-wider uppercase">
              Node<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">FORGE</span> <span className="text-slate-500 font-light font-sans lowercase">// ingest_node</span>
            </span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            Abort_Build
          </button>
        </div>
      </header>

      {/* Main Orchestrator Workspace Component */}
      <main className="max-w-xl w-full mx-auto px-6 py-12 relative z-30 my-auto flex flex-col justify-center">
        
        {/* Step Context Subheading Display */}
        <div className="mb-6 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 border border-indigo-500/20 tracking-widest shadow-inner">
            <Network size={11} className="animate-pulse text-purple-400" /> Compilation Pipeline Step {currentStep} of 3
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight font-mono bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Setup Workspace Matrix
          </h1>
        </div>

        {/* Step Process Progression Indicator Node */}
        <div className="flex items-center justify-between mb-8 px-4 max-w-sm mx-auto w-full">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all duration-500 ${
                currentStep >= step 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40 scale-105' 
                  : 'bg-[#0b0816] text-slate-600 border border-white/5'
              }`}>
                {currentStep > step ? <CheckCircle2 className="w-4 h-4 text-emerald-300 stroke-[2.5]" /> : `0${step}`}
              </div>
              {step < 3 && (
                <div className={`h-[2px] flex-1 mx-2 rounded-full transition-all duration-700 ${
                  currentStep > step ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/5'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Hardware Accelerated 3D Transformed Card Container */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden p-0.5 group"
        >
          {/* Subtle Dynamic Border Backlight Core */}
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div 
            style={{ transform: 'translateZ(20px)' }}
            className="bg-[#0b0816]/95 rounded-[14px] p-6 sm:p-8 flex flex-col justify-between relative min-h-[360px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.001)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.001)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
            
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 relative z-10"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-bold font-mono uppercase text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-400" /> 01 // Ingest Core Resume File
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">Upload your latest professional PDF layout. Drop the node stream canvas to extract structural layout data entity mappings.</p>
                  </div>

                  {/* Drag and Drop Structural Component Zone */}
                  <label 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer group/upload transition-all duration-300 min-h-[170px] relative overflow-hidden ${
                      isDragging 
                        ? 'border-indigo-400 bg-indigo-500/10 shadow-[0_0_25px_rgba(99,102,241,0.15)] scale-[0.99]' 
                        : 'border-dashed border-white/10 hover:border-indigo-500/30 bg-black/40'
                    }`}
                  >
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    
                    {/* Animated scanning pulse background bar when file hover occurs */}
                    {isDragging && (
                      <motion.div 
                        initial={{ y: "-100%" }}
                        animate={{ y: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60 pointer-events-none"
                      />
                    )}

                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 ${
                      isDragging ? 'bg-indigo-500 text-white scale-110' : 'group-hover/upload:scale-105 group-hover/upload:bg-indigo-600/10 group-hover/upload:text-indigo-400 text-slate-400'
                    }`}>
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    
                    <div className="text-center space-y-1 relative z-10">
                      <span className="text-xs font-bold text-slate-300 block truncate max-w-xs px-2">
                        {resumeFile ? resumeFile.name : (isDragging ? "Release to drop component stream" : "Drop local PDF or click to browse")}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">Max structural allocation limit: 10MB</span>
                    </div>
                  </label>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 relative z-10"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-bold font-mono uppercase text-white flex items-center gap-2">
                      <FaLinkedin className="w-4 h-4 text-indigo-400" /> 02 // Connect LinkedIn Instance
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">Provide your target public identifier URL endpoint profile to map secondary biographical overview frameworks.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">Target Public Profile Address</label>
                    <div className="relative group/input">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none border-r border-white/5 pr-3">
                        <FaLinkedin className="w-3.5 h-3.5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                      </div>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-black/50 border border-white/10 focus:border-indigo-500/40 rounded-xl py-3.5 pl-14 pr-4 focus:outline-none text-slate-200 text-xs font-mono tracking-wide placeholder:text-slate-700 transition-all shadow-inner focus:shadow-[0_0_20px_rgba(99,102,241,0.05)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 relative z-10"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-bold font-mono uppercase text-white flex items-center gap-2">
                      <FaGithub className="w-4 h-4 text-emerald-400" /> 03 // Hydrate Git Repositories
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">Specify your unique global handle token identifier. We request live repository metrics and active ledger tracking.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">GitHub Handle Handle/Token</label>
                    <div className="relative group/input">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none border-r border-white/5 pr-3">
                        <FaGithub className="w-3.5 h-3.5 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={githubUser}
                        onChange={(e) => setGithubUser(e.target.value)}
                        placeholder="e.g., torvalds"
                        className="w-full bg-black/50 border border-white/10 focus:border-emerald-500/30 rounded-xl py-3.5 pl-14 pr-4 focus:outline-none text-slate-200 text-xs font-mono tracking-wide placeholder:text-slate-700 transition-all shadow-inner focus:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigational Control Row Layout Node */}
            <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-6 relative z-20">
              <button
                disabled={currentStep === 1 || isExtracting}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev_Node
              </button>

              <button
                disabled={isExtracting}
                onClick={processExtractionStep}
                className="bg-white hover:bg-slate-100 text-black text-[11px] font-mono font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-xl hover:shadow-indigo-500/10 active:scale-95 disabled:opacity-40"
              >
                {isExtracting ? (
                  <>Processing_Matrices <Loader2 className="w-3.5 h-3.5 animate-spin" /></>
                ) : currentStep === 3 ? (
                  <>Assemble_Portfolio <Cpu className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" /></>
                ) : (
                  <>Next_Step <ArrowRight className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" /></>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Status Sandbox Display */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          <Terminal size={11} className="text-indigo-500 animate-pulse" /> Tokenized sandbox state initialized
        </div>
      </main>

      {/* Symmetrical Isolation Footer Layer */}
      <footer className="py-5 text-center text-[10px] font-mono uppercase tracking-widest text-slate-600 relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-center gap-2">
        <Zap size={10} className="text-yellow-500/50" /> Secure isolated pipeline layer. Data configurations are instance encrypted.
      </footer>
    </div>
  );
}