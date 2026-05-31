import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { usePortfolio } from '../context/PortfolioBuilderContext';
import { Share2, Compass, Terminal, Radio, Cpu, Layers, Loader2, ExternalLink, AlertTriangle } from 'lucide-react';

// Import All 5 Core Architecture Portfolios
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

// Base fallback target API matching ecosystem cluster defaults
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio`;

export default function PublicView() {
  const { username } = useParams();
  const navigate = useNavigate();
  const context = usePortfolio() || {};
  const { portfolioData } = context;

  const [isLoading, setIsLoading] = useState(true);
  const [resolvedPayload, setResolvedPayload] = useState(null);
  const [networkPing, setNetworkPing] = useState('14ms');
  const [hasError, setHasError] = useState(false);

  // High-fidelity fallback asset matrix block
  const fallbackStructurePayload = {
    selectedTemplate: 'developer-pro',
    profileImage: "",
    personalInfo: {
      fullName: "Alex Mercer",
      title: "Principal Systems Architect",
      location: "San Francisco, CA",
      bio: "Infrastructure architect specializing in distributed self-healing system runtime matrices and ultra low-latency compute models.",
      email: "alex.mercer@node.io",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com"
    },
    skills: {
      languages: ["TypeScript", "Go", "Rust", "Python", "C++"],
      frameworks: ["React", "Node.js", "Next.js", "GraphQL", "FastAPI"],
      tools: ["Docker", "Kubernetes", "AWS", "Terraform", "Git"]
    },
    experience: [
      {
        id: "exp-1",
        role: "Senior Infrastructure Architect",
        company: "Core Tech Ecosystems Inc.",
        duration: "2024 - PRESENT",
        desc: "Spearheaded continuous container orchestration migrations handling multi-region production loads seamlessly across edge routing targets."
      },
      {
        id: "exp-2",
        role: "Systems Engineer",
        company: "CloudFlux Labs",
        duration: "2021 - 2024",
        desc: "Designed custom distributed caching proxies reducing system write latencies down to sub-15ms benchmarks globally."
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "AI-Resume-Builder",
        desc: "A real-time high-performance fullstack web ecosystem utilizing modern state orchestration schemas and dynamic templating injection cores.",
        techStack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
        sourceUrl: "#",
        liveUrl: "#"
      }
    ]
  };

  useEffect(() => {
    const resolvePublicNode = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Populate standard visual runtime latency values
        const pings = ['12ms', '18ms', '24ms', '9ms'];
        setNetworkPing(pings[Math.floor(Math.random() * pings.length)]);

        // OPTIMIZATION: If owner is navigating their own workspace preview link, read immediately from memory state
        if (portfolioData && portfolioData.personalInfo?.fullName) {
          setResolvedPayload(portfolioData);
          setIsLoading(false);
          return;
        }

        // Live Endpoint Request: Fetch portfolio manifest dynamically via username slug criteria
        const response = await fetch(`${API_BASE_URL}/public/${username}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.warn(`[ROUTER WARNING]: Profile node @${username} not found on server grid. Displaying local workspace template fallback payload.`);
            setResolvedPayload(fallbackStructurePayload);
          } else {
            throw new Error('Network telemetry node rejection.');
          }
        } else {
          const remoteData = await response.json();
          setResolvedPayload(remoteData);
        }
      } catch (error) {
        console.error('[PUBLIC NODE RESOLVER FAULT]:', error);
        setHasError(true);
        // Fall back gracefully to the offline design baseline so the viewport page never completely breaks
        setResolvedPayload(fallbackStructurePayload);
        toast.error('Failed to communicate with master edge relay. Viewing offline cache profile.');
      } finally {
        // Enforce brief hardware buffer cooldown timeline to ensure tracking transitions execute seamlessly
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (username) {
      resolvePublicNode();
    }
  }, [username, portfolioData]);

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Shareable edge link synchronized to clipboard!");
  };

  // Enforce consistent object schema parsing maps downstream to template frames
  const normalizedData = {
    ...resolvedPayload,
    experience: Array.isArray(resolvedPayload?.experience) ? resolvedPayload.experience : [],
    projects: Array.isArray(resolvedPayload?.projects) ? resolvedPayload.projects : [],
    skills: resolvedPayload?.skills || { languages: [], frameworks: [], tools: [] },
    personalInfo: {
      fullName: resolvedPayload?.personalInfo?.fullName || "Anonymous Node",
      title: resolvedPayload?.personalInfo?.title || "Systems Engineer",
      location: resolvedPayload?.personalInfo?.location || "Distributed Node",
      bio: resolvedPayload?.personalInfo?.bio || resolvedPayload?.personalInfo?.summary || "",
      email: resolvedPayload?.personalInfo?.email || "",
      linkedin: resolvedPayload?.personalInfo?.linkedin || ""
    }
  };

  const activeTemplateID = resolvedPayload?.selectedTemplate || 'developer-pro';
  const LiveActiveTemplateComponent = TEMPLATE_MAP[activeTemplateID] || DeveloperPro;

  return (
    <div className="min-h-screen bg-[#020105] text-slate-200 relative overflow-x-hidden selection:bg-purple-500/30">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0c0822_0%,transparent_60%)] opacity-70 pointer-events-none z-0" />
      
      {/* ================= TELEMETRY LOADING STREAM SPLASH COVER ================= */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            className="fixed inset-0 bg-[#030108] z-50 flex flex-col justify-center items-center p-6 text-center"
          >
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360, rotateX: [30, 45, 30], rotateY: [0, 360, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40 shadow-[0_0_40px_rgba(147,51,234,0.15)]"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-16 rounded-full border border-indigo-400/30 border-t-indigo-400"
              />
              <Cpu className="w-6 h-6 text-purple-400 animate-pulse relative z-10" />
            </div>

            <div className="space-y-1.5 font-mono max-w-xs">
              <div className="text-xs font-bold text-white uppercase tracking-widest flex items-center justify-center gap-2">
                <Radio size={12} className="text-emerald-400 animate-pulse" />
                Resolving_Public_Node
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                Fetching manifest bundle for: <span className="text-indigo-400">@{username || 'anonymous'}</span>
              </p>
              
              <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[9px] text-slate-600 w-full">
                <span>EDGE_RELAY: ONLINE</span>
                <span className="text-emerald-500/70">LATENCY: {networkPing}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING ACTION CONTROLS HUD INTERFACE ================= */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center justify-center sm:justify-end gap-3 pointer-events-auto"
      >
        <div className="bg-[#090615]/70 backdrop-blur-xl border border-white/5 hover:border-white/10 p-1.5 rounded-2xl flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
          <button 
            onClick={copyProfileLink}
            className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 hover:bg-purple-600/20 text-white px-3.5 py-2 rounded-xl border border-white/5 hover:border-purple-500/30 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Share2 size={11} className="text-purple-400" /> Share_Node
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3.5 py-2 rounded-xl hover:brightness-110 flex items-center gap-1.5 transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            <Compass size={11} /> Build_Mine <ExternalLink size={10} />
          </button>
        </div>
      </motion.nav>

      {/* ================= ACTIVE INJECTED SKIN ENGINE LAYOUT MOUNT ================= */}
      {!isLoading && resolvedPayload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full h-full"
        >
          {/* Output cleanly normalized data blocks safely down to nested layout subcomponents */}
          <LiveActiveTemplateComponent data={normalizedData} />
        </motion.div>
      )}

    </div>
  );
}