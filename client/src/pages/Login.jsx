import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowLeft 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioBuilderContext';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setIsAuthenticated } = usePortfolio();

  useEffect(() => {
    const moveGlow = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveGlow);
    return () => window.removeEventListener('mousemove', moveGlow);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading('Verifying credentials...');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true); 

      toast.dismiss(loadToast);
      toast.success('Access granted.');
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss(loadToast);
      toast.error('Login failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-ambient-glow text-white relative flex items-center justify-center p-4 sm:p-6 lg:p-8 w-full overflow-hidden">
      <div className="mouse-glow hidden md:block" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />
      <div className="orb orb-1 opacity-25" />
      <div className="orb orb-2 opacity-25" />
      <div className="grid-overlay" />

      <button onClick={() => navigate('/')} className="absolute top-6 left-6 z-50 bg-white/5 border border-white/10 text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
        <ArrowLeft size={14} /> Back to Hub
      </button>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 mx-auto">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:flex lg:col-span-6 flex-col space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest w-fit">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Secure Workspace Port
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-['Space_Grotesk'] uppercase tracking-tight leading-[0.95]">
            Access Your <br /><span className="gradient-text">Design Engine</span>
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-sm leading-relaxed">
            Connect your data repositories, upload raw profile resumes, and scale into highly dynamic, high-performance web portfolios instantly.
          </p>
          <div className="space-y-4 pt-4 max-w-sm border-t border-white/5">
            {['Direct GitHub Repository Synchronization', 'Real-time LinkedIn Node Deployment Mapping', 'Sub-second Performance Optimization Engine'].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <div className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400"><ShieldCheck className="w-3.5 h-3.5" /></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl relative border border-white/10 flex flex-col backdrop-blur-2xl">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight uppercase text-white">Welcome Back</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Sign in to access your custom control panel</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@example.com" className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:bg-black/60 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium text-white outline-none transition-all placeholder:text-slate-600" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:bg-black/60 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium text-white outline-none transition-all placeholder:text-slate-600" />
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 mt-2">
                Verify Credentials <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-5 text-center">
              <div className="absolute inset-y-1/2 left-0 right-0 border-b border-white/5 z-0" />
              <span className="relative z-10 bg-[#040308] px-3 text-[9px] font-bold uppercase tracking-widest text-slate-500">OR</span>
            </div>

            <button onClick={() => { toast.success('Google verification pipeline initialized.'); navigate('/dashboard'); }} className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer text-slate-200">
              <FcGoogle className="w-4 h-4" /> Continue via Google Ecosystem
            </button>

            <div className="mt-6 text-center text-xs text-slate-400 font-medium">
              Don't have a space profile? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-bold transition-all">Sign up</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}