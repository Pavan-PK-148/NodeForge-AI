import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  Play,
  ChevronRight,
  FileText,
  Globe,
  Layers,
  Rocket,
  ShieldCheck,
  Brain,
  BarChart3,
  Star,
  Zap,
  Users,
  Trophy,
  LayoutDashboard,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

// --- Subcomponent: Interactive 3D Card Engine ---
const Card3D = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [12, -12]);
  const rotateY = useTransform(x, [-200, 200], [-12, 12]);

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

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
    // Session token state lookup strategy
    const token = localStorage.getItem("token") || localStorage.getItem("foliofyx_auth_token");
    if (token) {
      setIsLoggedIn(true);
    }

    const moveGlow = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  const stats = [
    { number: "50K+", label: "Portfolios Generated" },
    { number: "98%", label: "Placement Success" },
    { number: "120+", label: "Templates" },
    { number: "24/7", label: "AI Support" },
  ];

  const features = [
    {
      icon: FileText,
      title: "AI Resume Parsing",
      desc: "Extract skills, education, certifications, projects and experience automatically.",
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn Sync",
      desc: "Import professional history, achievements and recommendations instantly.",
    },
    {
      icon: FaGithub,
      title: "GitHub Intelligence",
      desc: "Analyze repositories, coding activity and technology stack.",
    },
    {
      icon: Globe,
      title: "One Click Deployment",
      desc: "Publish your portfolio globally within seconds.",
    },
    {
      icon: Brain,
      title: "AI Content Generator",
      desc: "Generate bios, summaries and project descriptions automatically.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Track recruiter visits, profile views and downloads.",
    },
  ];

  const faqs = [
    {
      question: "How does NodeForge work?",
      answer:
        "Upload your resume, connect GitHub and LinkedIn, choose a template and NodeForge automatically creates your professional portfolio.",
    },
    {
      question: "Do I need coding knowledge?",
      answer: "No. Everything is generated automatically with AI.",
    },
    {
      question: "Can I use a custom domain?",
      answer: "Yes. Connect your own domain and publish instantly.",
    },
    {
      question: "Is GitHub integration required?",
      answer: "No. GitHub is optional but recommended.",
    },
    {
      question: "Can recruiters contact me directly?",
      answer: "Yes. Your portfolio includes direct contact options.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ambient-glow text-white flex flex-col w-full">
      {/* Background Decorators */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-overlay" />

      <div
        className="mouse-glow hidden lg:block"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />

      {/* Navigation Layer */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5 bg-[#05030c]/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold font-mono text-white text-base shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <h1 className="font-bold text-xl font-mono tracking-tight text-white">
              Node<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">FORGE</span>
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-slate-400">
            <a href="#" className="hover:text-white transition duration-300">Home</a>
            <a href="#features" className="hover:text-white transition duration-300">Features</a>
            <a href="#templates" className="hover:text-white transition duration-300">Templates</a>
            <a href="#faq" className="hover:text-white transition duration-300">FAQ</a>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <LayoutDashboard size={14} /> Go To Console
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            className="lg:hidden text-white font-bold text-xl relative z-50 p-2"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 mx-6 mt-2 glass-card rounded-2xl p-6 backdrop-blur-2xl border border-white/10"
          >
            <div className="flex flex-col gap-4 text-center text-sm font-semibold">
              <button onClick={() => setMobileMenu(false)}>Home</button>
              <button onClick={() => setMobileMenu(false)}>Features</button>
              <button onClick={() => setMobileMenu(false)}>Templates</button>
              <button onClick={() => setMobileMenu(false)}>Pricing</button>
              <button onClick={() => setMobileMenu(false)}>About</button>
              <button
                onClick={() => { setMobileMenu(false); navigate("/login"); }}
                className="primary-btn justify-center mt-2 w-full"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Container Frame */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="text-center pt-44 pb-20 max-w-4xl w-full flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-badge"
          >
            <Sparkles size={13} className="text-indigo-400" />
            AI Powered Portfolio Builder
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="hero-title hero-shine text-glow"
          >
            Turn Your Resume
            <br />
            Into A Stunning
            <span className="gradient-text"> Portfolio Website</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="hero-description font-medium"
          >
            Upload your resume, connect GitHub and LinkedIn, and generate a beautiful portfolio website in less than 60 seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full sm:w-auto"
          >
            <button
              onClick={() => navigate("/login")}
              className="primary-btn px-8 py-4 text-sm"
            >
              Start Building
              <ArrowRight size={18} />
            </button>
            <button className="secondary-btn px-8 py-4 text-sm">
              <Play size={16} />
              Watch Demo
            </button>
          </motion.div>
        </section>

        {/* Floating Portfolio Cards Simulation Area */}
        <div className="relative mb-32 hidden lg:flex justify-center items-center h-[280px] w-full max-w-3xl">
          <motion.div
            animate={{ y: [0, -15, 0], rotateY: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-10 p-6 glass-card rounded-2xl w-64 border-glow shadow-2xl"
          >
            <h3 className="font-bold text-lg font-['Space_Grotesk']">Frontend Architect</h3>
            <div className="space-y-3 mt-6">
              <div className="line-full bg-indigo-500/20" />
              <div className="line-half bg-indigo-500/30" />
              <div className="line-full bg-white/5" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0], rotateY: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-10 p-6 glass-card rounded-2xl w-64 border-glow shadow-2xl flex flex-col"
          >
            <FaGithub size={32} className="text-slate-300" />
            <h3 className="font-bold text-lg mt-4 font-['Space_Grotesk']">GitHub Stack</h3>
            <p className="text-slate-400 text-xs mt-2 font-semibold">
              TypeScript • React • Tailwind
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">TRUSTED WORLDWIDE</span>
            <h2 className="section-title">Helping Developers Get Hired</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((item, index) => (
              <Card3D key={index} className="stats-card h-full">
                <h3 className="stats-number">{item.number}</h3>
                <p className="stats-label">{item.label}</p>
              </Card3D>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">FEATURES</span>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-description">Build a professional portfolio without writing code.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card3D key={index} className="feature-card border-glow h-full flex flex-col">
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3 className="feature-title font-['Space_Grotesk']">{feature.title}</h3>
                  <p className="feature-description font-medium">{feature.desc}</p>
                </Card3D>
              );
            })}
          </div>
        </section>

        {/* Bento Grid */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            <Card3D className="bento-large flex flex-col justify-center text-left">
              <Rocket size={40} className="text-indigo-400 mb-4" />
              <h3 className="bento-title font-['Space_Grotesk'] uppercase">Build & Deploy In Minutes</h3>
              <p className="bento-text font-medium">Upload resume. Connect GitHub. Generate portfolio. Publish instantly globally.</p>
            </Card3D>

            <Card3D className="bento-card flex flex-col justify-center text-left">
              <ShieldCheck size={36} className="text-emerald-400 mb-4" />
              <h3 className="bento-title font-['Space_Grotesk'] uppercase">Enterprise Security</h3>
              <p className="bento-text font-medium">All profile data parameters are locked securely under modern system clusters.</p>
            </Card3D>
          </div>
        </section>

        {/* AI & Recruiter Cards */}
        <section className="w-full mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Card3D className="dashboard-card border-glow flex flex-col justify-center">
              <Brain size={40} className="text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] uppercase">AI Content Creation</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium leading-relaxed">
                Generate professional About Me narratives, project summary metrics, and custom bio frames automatically.
              </p>
            </Card3D>

            <Card3D className="dashboard-card border-glow flex flex-col justify-center">
              <Users size={40} className="text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] uppercase">Recruiter Optimized</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium leading-relaxed">
                Carefully optimized templates engineered specifically to elevate visual retention logs and recruiter calls.
              </p>
            </Card3D>
          </div>
        </section>

        {/* Process Steps */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">PROCESS</span>
            <h2 className="section-title">Create In 4 Easy Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
              { step: "01", title: "Upload Resume" },
              { step: "02", title: "Connect GitHub" },
              { step: "03", title: "Choose Template" },
              { step: "04", title: "Deploy Website" },
            ].map((item, index) => (
              <Card3D key={index} className="process-card h-full flex flex-col justify-between">
                <div className="process-number font-['Space_Grotesk']">{item.step}</div>
                <h3 className="process-title tracking-tight text-slate-200">{item.title}</h3>
              </Card3D>
            ))}
          </div>
        </section>

        {/* Templates Grid Area */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">TEMPLATES</span>
            <h2 className="section-title">Premium Portfolio Designs</h2>
            <p className="section-description">Choose from professionally crafted production layout shells.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {["Developer Pro", "Creative Nexus", "Corporate Elite"].map((template, index) => (
              <Card3D key={index} className="template-card h-full flex flex-col group">
                <div className="template-preview relative overflow-hidden">
                  <motion.div
                    animate={{ rotate: [0, 4, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-indigo-400/40 group-hover:scale-110 transition duration-500"
                  >
                    <Layers size={64} />
                  </motion.div>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between bg-[#030207]/40">
                  <div>
                    <h3 className="font-bold text-base tracking-tight text-white">{template}</h3>
                    <p className="text-slate-400 text-xs mt-1 font-medium">Premium fully responsive layout architecture skin.</p>
                  </div>
                  <button className="explore-btn mt-4 self-start">
                    Preview Layout <ChevronRight size={14} />
                  </button>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* Live System Preview Sandbox */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">LIVE PREVIEW</span>
            <h2 className="section-title">See Your Portfolio Before Publishing</h2>
          </div>

          <Card3D className="portfolio-preview w-full">
            <div className="browser-header">
              <div className="browser-dot red" />
              <div className="browser-dot yellow" />
              <div className="browser-dot green" />
            </div>
            <div className="preview-content">
              <div className="preview-sidebar flex flex-col items-center">
                <div className="avatar-circle" />
                <div className="space-y-3 mt-6 w-full">
                  <div className="line-full" />
                  <div className="line-half" />
                </div>
              </div>
              <div className="preview-main flex flex-col gap-6">
                <div className="hero-box" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="mini-card" />
                  <div className="mini-card" />
                  <div className="mini-card" />
                </div>
              </div>
            </div>
          </Card3D>
        </section>

        {/* Analytics & Metrics Cards Row */}
        <section className="w-full mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Card3D className="dashboard-card flex flex-col justify-between h-full">
              <div>
                <BarChart3 size={40} className="text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold font-['Space_Grotesk']">Recruiter Analytics</h3>
                <p className="text-slate-400 text-sm mt-1 font-medium leading-relaxed">
                  Track dynamic recruiter click footprints, custom view durations, and active CV resource download tags.
                </p>
              </div>
              <div className="analytics-bars mt-6 w-full">
                <div className="analytics-bar w-full" />
                <div className="analytics-bar w-[80%]" />
                <div className="analytics-bar w-[55%]" />
              </div>
            </Card3D>

            <Card3D className="dashboard-card flex flex-col justify-start h-full">
              <Trophy size={40} className="text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold font-['Space_Grotesk']">Achievement Showcase</h3>
              <p className="text-slate-400 text-sm mt-1 font-medium leading-relaxed">
                Render secure certification badges, production honors, scholarship logs, and remote internship metrics beautifully.
              </p>
            </Card3D>
          </div>
        </section>

        {/* Testimonials Review Slider Blocks */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">TESTIMONIALS</span>
            <h2 className="section-title">Loved By Developers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { name: "Rahul", review: "Built my portfolio in 5 minutes and received multiple interview calls." },
              { name: "Priya", review: "The GitHub integration saved hours of manual work." },
              { name: "Arjun", review: "The AI generated portfolio looked better than my own design." },
            ].map((item, index) => (
              <Card3D key={index} className="testimonial-card flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-300 text-xs font-medium leading-relaxed">"{item.review}"</p>
                </div>
                <h4 className="font-bold text-sm mt-6 text-white font-['Space_Grotesk']">— {item.name}</h4>
              </Card3D>
            ))}
          </div>
        </section>

        {/* FAQ Container Module */}
        <section className="w-full mb-32 border-t border-white/5 pt-16">
          <div className="text-center mb-16">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="faq-header hover:bg-white/[0.02] transition"
                >
                  <span className="font-semibold text-sm tracking-tight">{faq.question}</span>
                  <span className="text-indigo-400 font-bold text-lg">{activeFaq === index ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* High-Impact CTA Module Box */}
        <section className="w-full mb-32">
          <div className="premium-cta border-glow w-full">
            <Zap size={44} className="text-amber-400 mb-4" />
            <h2 className="cta-title">
              Transform Your Resume
              <br />
              Into A Portfolio Website
              <span className="gradient-text"> In 60 Seconds</span>
            </h2>
            <p className="cta-description font-medium">
              Join thousands of developers, students and professionals who are building stunning portfolios using AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full sm:w-auto">
              <button onClick={() => navigate("/login")} className="primary-btn px-6 py-3.5">
                Start Building Free
              </button>
              <button className="secondary-btn px-6 py-3.5">View Templates</button>
            </div>
          </div>
        </section>

        {/* Newsletter Deck Block */}
        <section className="w-full mb-24">
          <div className="newsletter-card border border-white/5 bg-white/[0.01]">
            <h3 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight uppercase">Stay Updated</h3>
            <p className="text-slate-400 text-xs font-medium mt-1">Get product updates, layout skins, and automated asset features directly.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter security email key" className="newsletter-input font-medium" />
              <button className="primary-btn justify-center">Subscribe</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Segment Area */}
      <footer className="footer w-full shrink-0 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="footer-logo">Folio<span className="text-indigo-400">FYX</span></h3>
              <p className="footer-text font-medium">AI Powered Portfolio Workspace Framework for Developers.</p>
            </div>
            <div>
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-links font-medium">
                <li>Features</li>
                <li>Templates</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links font-medium">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Social Portal</h4>
              <div className="flex gap-3 mt-2">
                <a href="#" className="social-icon"><FaGithub size={16} /></a>
                <a href="#" className="social-icon"><FaLinkedin size={16} /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 NodeForge Pipeline Systems. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;