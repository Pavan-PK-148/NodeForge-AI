import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Terminal 
} from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePortfolio } from '../context/PortfolioBuilderContext';

export default function Wizard() {
  const navigate = useNavigate();
  const { setPortfolioData, syncWithGitHubProfile } = usePortfolio();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUser, setGithubUser] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      toast.success(`Loaded: ${e.target.files[0].name}`);
    }
  };

  const runMasterAggregation = async () => {
  setIsExtracting(true);
  const loadToast = toast.loading('Synchronizing downstream matrix pipelines...');

  try {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    // 1. Pull the token from where your application stores it (e.g., localStorage)
    const token = localStorage.getItem('token'); // Or sessionStorage.getItem('token'), etc.

    // 2. Build your headers object dynamically
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
    <div className="min-h-screen bg-[#040209] text-slate-200 relative flex flex-col justify-between overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      
      {/* Decorative Structural Core Lights */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* Ribbon Navigation Bar */}
      <header className="border-b border-white/5 bg-[#070512]/60 backdrop-blur-xl px-8 py-4 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold font-mono text-white text-xs shadow-md shadow-indigo-500/20">
              Ω
            </div>
            <span className="text-sm font-bold font-mono text-white tracking-wider uppercase">
              Node<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">FORGE</span> <span className="text-slate-500 font-light font-sans lowercase">// ingest_node</span>
            </span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-red-400 transition-colors bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            Abort_Build
          </button>
        </div>
      </header>

      {/* Processing Center */}
      <main className="max-w-xl w-full mx-auto px-6 py-16 relative z-10 my-auto">
        
        {/* Dynamic Multi-Step Informational Header Card */}
        <div className="mb-8 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/10 tracking-widest">
            <Network size={11} className="animate-pulse" /> Compilation Pipeline Step {currentStep} of 3
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight font-mono">
            Setup Workspace Matrix
          </h1>
        </div>

        {/* Step Indicator Top Bar */}
        <div className="flex items-center justify-between mb-8 px-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                currentStep >= step 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40' 
                  : 'bg-[#0b0816] text-slate-600 border border-white/5'
              }`}>
                {currentStep > step ? <CheckCircle2 className="w-4 h-4 text-emerald-300 stroke-[2.5]" /> : `0${step}`}
              </div>
              {step < 3 && (
                <div className={`h-[1px] flex-1 mx-3 rounded-full transition-all duration-500 ${
                  currentStep > step ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/5'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Card Container with Content Alternation */}
        <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] shadow-2xl backdrop-blur-3xl overflow-hidden p-0.5">
          
          <div className="bg-[#0b0816]/90 rounded-[13px] p-6 sm:p-8 flex flex-col justify-between relative min-h-[350px]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.001)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.001)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />
            
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold font-mono uppercase text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-400" /> 01 // Ingest Core Resume File
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">Upload your latest professional PDF layout. We will dynamically extract structural entity data mappings.</p>
                  </div>

                  <label className="border border-dashed border-white/10 hover:border-indigo-500/40 rounded-xl bg-black/30 p-8 flex flex-col items-center justify-center gap-4 cursor-pointer group transition-all duration-300 min-h-[160px]">
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 text-slate-400 transition-all duration-300">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-xs font-bold text-slate-300 block truncate max-w-xs">
                        {resumeFile ? resumeFile.name : 'Choose or drop local PDF file'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">Max structural allocation limit: 10MB</span>
                    </div>
                  </label>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold font-mono uppercase text-white flex items-center gap-2">
                      <FaLinkedin className="w-4 h-4 text-indigo-400" /> 02 // Connect LinkedIn Instance
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">Provide your target public identifier URL endpoint profile to map secondary biographical overview frameworks.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">Target Public Profile Address</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none border-r border-white/5 pr-3">
                        <FaLinkedin className="w-3.5 h-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      </div>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-black/40 border border-white/10 focus:border-indigo-500/40 rounded-xl py-3.5 pl-14 pr-4 focus:outline-none text-slate-200 text-xs font-mono tracking-wide placeholder:text-slate-700 transition-colors shadow-inner"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold font-mono uppercase text-white flex items-center gap-2">
                      <FaGithub className="w-4 h-4 text-emerald-400" /> 03 // Hydrate Git Repositories
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">Specify your unique global handle token identifier. We request live repository metrics and active ledger tracking.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">GitHub Handle Handle/Token</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none border-r border-white/5 pr-3">
                        <FaGithub className="w-3.5 h-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={githubUser}
                        onChange={(e) => setGithubUser(e.target.value)}
                        placeholder="e.g., torvalds"
                        className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/30 rounded-xl py-3.5 pl-14 pr-4 focus:outline-none text-slate-200 text-xs font-mono tracking-wide placeholder:text-slate-700 transition-colors shadow-inner"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigational Row Buttons */}
            <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-8 relative z-20">
              <button
                disabled={currentStep === 1 || isExtracting}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev_Node
              </button>

              <button
                disabled={isExtracting}
                onClick={processExtractionStep}
                className="bg-white hover:bg-slate-100 text-black text-[11px] font-mono font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xl disabled:opacity-40"
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
        </div>

        {/* Context Live Terminal Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          <Terminal size={11} className="text-indigo-500" /> Tokenized sandbox state initialized
        </div>
      </main>

      {/* Symmetrical Footer Wrapper */}
      <footer className="py-6 text-center text-[10px] font-mono uppercase tracking-widest text-slate-600 relative z-10 border-t border-white/5 bg-black/20">
        Secure isolated pipeline layer. Data configurations are instance encrypted.
      </footer>
    </div>
  );
}