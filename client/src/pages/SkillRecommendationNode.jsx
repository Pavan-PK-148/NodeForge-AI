import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowLeft, Cpu, TrendingUp, Download, 
  Briefcase, FileText, User, ChevronRight, BarChart3, CheckCircle2, UploadCloud, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import SoftAurora from '../components/SoftAurora';

export default function SkillRecommendationNode() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const allowedExtensions = ['json', 'pdf', 'doc', 'docx', 'txt'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (allowedExtensions.includes(fileExtension) || file.type.includes('json') || file.type.includes('pdf')) {
      setSelectedFile(file);
      toast.success(`${file.name} successfully cached!`);
    } else {
      toast.error("Invalid file format layer. Please upload a JSON, PDF, DOCX, or TXT asset.");
    }
  };

  const removeSelectedFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerAnalysisPipeline = async () => {
    if (!selectedFile) {
      toast.error("Please provide an active resume target asset before initializing compilation.");
      return;
    }

    setIsLoading(true);
    setReportData(null);

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('variantType', "Market Demand & Predictive Growth Diagnostics");

    // 1. Extract your application token (Adjust key string if stored under another token key name)
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resume/generate-tailored`,
        formData,
        { 
          headers: { 
            'Content-Type': 'multipart/form-data',
            // 2. Attach the required Bearer Token structural wrapper for authMiddleware to intercept
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          withCredentials: true
        }
      );

      setReportData(response.data);
      toast.success("Intelligence report matrix fully compiled!");
    } catch (err) {
      console.error("Pipeline engine breakdown:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired or unauthorized. Please log back into your profile.");
      } else {
        toast.error(err.response?.data?.message || "Pipeline analysis execution failure. Please verify backend API connectivity.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!reportData) return;
    
    const fileContent = `===========================================================
TECHNICAL AUDIT REPORT: DEMAND MATRIX & PREDICTIVE GROWTH
===========================================================
CANDIDATE RESOURCE MAPPING: ${reportData.candidateName || "Extracted Profile"}
GENERATED RUNTIME STAMP: ${new Date().toLocaleString()}

1. CURRENT INSTALLED SKILLS MARKET VALUATION DATA MATRIX:
${(reportData.inDemandSkills || []).map(s => `- [${s.skill}]: Market Demand: ${s.demandScore}% | Vector Track: ${s.growthTrend} (${s.status})`).join('\n')}

2. CRITICAL ENGINEERING DELTA RECOMMENDATIONS:
${(reportData.skillRecommendations || []).map(r => `- [RECOMMENDED]: ${r.name} | Valuation Layer: ${r.marketValue} | Project Lift: ${r.growthVector}`).join('\n')}

3. SUGGESTED TARGET CORRIDOR ALIGNMENTS:
${(reportData.suggestedRoles || []).map(j => `- ${j.roleTitle} (Proximity Score Index: ${j.matchingVector})`).join('\n')}

===========================================================
END OF INTEL MATRIX PIPELINE DOCUMENT STRUCT
===========================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI_Tech_Report_${(reportData.candidateName || "Candidate").replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Structural intelligence layout downloaded.");
  };

  return (
    <div className="min-h-screen bg-[#020204] text-slate-100 relative w-full overflow-x-hidden selection:bg-purple-500/40 font-sans">
      
      <div className="fixed inset-0 w-full h-full z-0 opacity-75 pointer-events-none mix-blend-screen">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.2}
          color1="#3b0066"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[180px] pointer-events-none rounded-full z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
        
        <div className="mb-12 pb-8 border border-white/[0.07] backdrop-blur-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl p-6 bg-white/[0.02] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(168,85,247,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-purple-500/40 transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft size={18} className="text-slate-300" />
              </motion.button>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Cpu className="text-purple-400 animate-pulse" size={32} />
                The Smart Skill Recommendation Node
              </h1>
            </div>
            <p className="text-sm text-slate-400 mt-3 max-w-3xl leading-relaxed ml-15">
              Upload your resume profile to execute deep semantic parsing evaluation pipelines mapping capabilities directly against real-time industry demand structures.
            </p>
          </div>
        </div>

        {!reportData && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-black/50 border border-white/[0.1] rounded-2xl p-8 md:p-10 backdrop-blur-2xl relative z-10 shadow-[0_20px_50px_rgba(120,119,198,0.15)] max-w-2xl mx-auto my-16 space-y-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Initialize Profile Insight Audit</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Provide your file track transcript layout below to initiate high-fidelity optimization matrix operations.
              </p>
            </div>

            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full py-12 px-6 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-4 group text-center backdrop-blur-md ${
                isDragActive 
                  ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                  : 'border-white/20 bg-white/[0.01] hover:border-purple-500/40 hover:bg-white/[0.02]'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept=".json,.pdf,.doc,.docx,.txt"
              />

              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                isDragActive 
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300 scale-110' 
                  : 'bg-white/5 border-white/10 text-purple-400 group-hover:scale-105 group-hover:border-purple-500/30'
              }`}>
                <UploadCloud size={32} className="animate-bounce" style={{ animationDuration: '3s' }} />
              </div>

              {!selectedFile ? (
                <div>
                  <p className="text-base text-slate-200 font-bold tracking-wide">
                    Drag and drop file here, or <span className="text-purple-400 hover:underline">browse files</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Supports JSON, PDF, DOCX or TXT configurations</p>
                </div>
              ) : (
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between gap-4 max-w-md mx-auto w-full"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText size={20} className="text-purple-400 flex-shrink-0" />
                    <div className="text-left min-w-0">
                      <p className="text-sm font-bold text-slate-200 truncate">{selectedFile.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={removeSelectedFile}
                    className="p-1 rounded-md bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/5 transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <motion.button
              whileHover={selectedFile ? { scale: 1.02, boxShadow: "0 0 25px rgba(147, 51, 234, 0.5)" } : {}} 
              whileTap={selectedFile ? { scale: 0.98 } : {}}
              onClick={triggerAnalysisPipeline}
              disabled={!selectedFile}
              className={`w-full text-white font-bold text-sm px-8 py-4.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                selectedFile 
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 cursor-pointer opacity-100' 
                  : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed opacity-50'
              }`}
            >
              Compile Demand & Growth Report
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40 relative z-10 bg-black/30 backdrop-blur-xl border border-white/5 rounded-2xl max-w-2xl mx-auto my-12 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-xl border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin mb-6" />
              <p className="font-mono text-xs md:text-sm text-purple-400 tracking-widest uppercase font-bold animate-pulse">Running Semantic Parsing Analysis Engines...</p>
            </motion.div>
          )}

          {!isLoading && reportData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 80 }}
              className="space-y-8 relative z-10"
            >
              <div className="bg-black/60 border border-white/[0.1] backdrop-blur-2xl rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-xl">
                    <User size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded text-purple-300">Active Audit Target</span>
                    <h2 className="text-2xl font-extrabold text-white mt-1.5 tracking-tight">{reportData.candidateName}</h2>
                  </div>
                </div>
                <div className="flex gap-4 w-full md:w-auto items-center">
                  <button
                    onClick={() => { setReportData(null); setSelectedFile(null); }}
                    className="bg-white/5 border border-white/10 text-slate-300 font-semibold text-xs px-5 py-3 rounded-xl hover:text-white hover:bg-white/10 transition-all cursor-pointer hover:border-white/20"
                  >
                    Reset & Re-upload
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(147, 51, 234, 0.3)" }} 
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownloadReport}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/30 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer flex-1 md:flex-none justify-center shadow-lg"
                  >
                    <Download size={15} /> Download Report (.TXT)
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 bg-black/60 border border-white/[0.1] backdrop-blur-2xl rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <BarChart3 size={18} /> Structural Market Demand Weights
                    </h3>
                    <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">Live Density Distribution</span>
                  </div>
                  <div className="space-y-5 pt-2">
                    {reportData.inDemandSkills?.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="space-y-2 p-3 rounded-xl bg-white/[0.01] border border-white/[0.02]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-100 text-base flex items-center gap-2.5">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            {item.skill}
                          </span>
                          <span className="font-mono text-purple-400 font-extrabold text-base bg-purple-500/10 px-2 py-0.5 border border-purple-500/20 rounded">{item.demandScore}% Density</span>
                        </div>
                        <div className="w-full h-3 bg-white/[0.04] border border-white/10 rounded-full overflow-hidden p-[2px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.demandScore}%` }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                          />
                        </div>
                        <div className="flex justify-between text-xs font-mono pt-1">
                          <span className="text-slate-400 font-medium tracking-wide">{item.status}</span>
                          <span className="text-emerald-400 font-bold tracking-wide">{item.growthTrend}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/60 border border-white/[0.1] backdrop-blur-2xl rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                      <Briefcase size={18} /> Recommended Role Horizons
                    </h3>
                    <span className="text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold">Matches</span>
                  </div>
                  <div className="space-y-4">
                    {reportData.suggestedRoles?.map((job, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(59,130,246,0.4)' }}
                        className="p-4 bg-white/[0.02] border border-white/10 rounded-xl transition-all shadow-md flex flex-col justify-between"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                      >
                        <h4 className="text-base font-extrabold text-slate-100 tracking-wide leading-snug">{job.roleTitle}</h4>
                        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400">Compliance Match Index</span>
                          <span className="text-xs font-mono font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-1 border border-blue-500/20 rounded-md shadow-sm">
                            {job.matchingVector}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 bg-black/60 border border-purple-500/30 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                      <TrendingUp size={18} className="text-pink-400" /> Delta Skill Mapping Multipliers (Deficits Omitted)
                    </h3>
                    <span className="text-xs font-mono text-slate-400 bg-purple-500/5 px-2.5 py-0.5 rounded border border-purple-500/10 italic">Predictive Horizon Model</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {reportData.skillRecommendations?.map((rec, index) => (
                      <motion.div 
                        key={index} 
                        whileHover={{ scale: 1.01, borderColor: 'rgba(236,72,153,0.3)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                        className="bg-white/[0.01] border border-white/[0.08] p-5 rounded-xl flex items-start gap-4 transition-all duration-300 shadow-sm"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/30 text-purple-400 mt-0.5 flex-shrink-0 shadow-inner">
                          <Sparkles size={18} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="text-base font-extrabold text-slate-100 tracking-wide">{rec.name}</h4>
                            <span className="text-xs font-mono font-extrabold bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded border border-pink-500/20 shadow-sm">{rec.growthVector}</span>
                          </div>
                          <p className="text-xs md:text-sm text-slate-400 font-normal leading-relaxed">{rec.marketValue}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}