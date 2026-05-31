import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PageWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative bg-[#090d16] text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      {/* Top Progress Loading Indicator simulation */}
      {loading && (
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 z-50"
        />
      )}

      {/* Ambient background graphics */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 10 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}