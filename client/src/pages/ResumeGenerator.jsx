import React, {
  useState,
  useRef,
  useMemo,
  Suspense,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useNavigate } from 'react-router-dom';

import * as THREE from "three";

import { motion, AnimatePresence } from "framer-motion";

import {
  Sparkles,
  UploadCloud,
  Download,
  Eye,
  FileCode,
  Layers,
  Briefcase,
  GraduationCap,
  FileCheck,
  ArrowLeft,
} from "lucide-react";

import toast from "react-hot-toast";
import axios from "axios";

/* =========================
   PARTICLE FIELD
========================= */

function ParticleField() {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);

    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    ref.current.rotation.x = t / 30;
    ref.current.rotation.y = t / 40;
  });

  const navigate = useNavigate();

const handleNavigation = () => {

  navigate('/resume-enhance');
};
  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/* =========================
   PROGRESS RING
========================= */

function ScoreRing({ score }) {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="88"
          cy="88"
          r="70"
          stroke="#262626"
          strokeWidth="10"
          fill="transparent"
        />

        <motion.circle
          cx="88"
          cy="88"
          r="70"
          stroke="#8b5cf6"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 2 }}
          style={{
            pathLength: score / 100,
            strokeDasharray: 440,
            strokeDashoffset: 0,
          }}
        />
      </svg>

      <div className="absolute text-center">
        <h1 className="text-5xl font-black">{score}%</h1>
        <p className="text-sm text-zinc-400">ATS SCORE</p>
      </div>
    </div>
  );
}

export default function ResumeGenerator() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [pdfUrl, setPdfUrl] = useState(null);

  const [previewMode, setPreviewMode] = useState("after");

  const [metrics, setMetrics] = useState(null);

  const fileInputRef = useRef(null);

  const beforeFileUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  const stages = [
    {
      label: "Initializing Neural Core",
      icon: Layers,
    },
    {
      label: "Extracting Technical Keywords",
      icon: FileCode,
    },
    {
      label: "Analyzing Experience",
      icon: Briefcase,
    },
    {
      label: "Evaluating Education",
      icon: GraduationCap,
    },
    {
      label: "Generating ATS Optimized PDF",
      icon: FileCheck,
    },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      toast.success("Resume Uploaded");
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      return toast.error("Please upload your resume");
    }

    if (!jobDescription.trim()) {
      return toast.error("Please paste job description");
    }

    try {
      setIsGenerating(true);

      let fakeProgress = 0;

      const interval = setInterval(() => {
        fakeProgress += 5;

        if (fakeProgress <= 95) {
          setProgress(fakeProgress);
        }
      }, 250);

      const formData = new FormData();

      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resume/optimize`,
        formData,
        {
          responseType: "blob",
        }
      );

      clearInterval(interval);

      setProgress(100);

      setPdfUrl(
        URL.createObjectURL(
          new Blob([response.data], {
            type: "application/pdf",
          })
        )
      );

      setMetrics({
        atsScore: 94,
        strengths: [
          "Strong keyword optimization",
          "ATS compatible formatting",
          "High recruiter readability",
          "Improved action verbs",
        ],
        gaps: [
          "Cloud deployment tools missing",
          "Need more quantified metrics",
        ],
      });

      setTimeout(() => {
        setIsGenerating(false);

        toast.success("Resume Optimized Successfully");
      }, 1000);
    } catch (err) {
      console.log(err);

      toast.error("Pipeline failed");

      setIsGenerating(false);
    }
  };

  const navigate = useNavigate();

const handleNavigation = () => {
  navigate('/resume-enhance');
  window.scrollTo(0, 0);
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* 3D BACKGROUND */}

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      {/* GRADIENT BLOBS */}

      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-700/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-pink-600/20 blur-3xl rounded-full" />

      <div className="relative z-10 p-8 md:p-14">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30">
            <Sparkles className="text-purple-400 w-8 h-8" />
          </div>

          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Neural Resume Engine
            </h1>

            <p className="text-zinc-400 mt-2">
              AI-powered ATS optimization platform
            </p>
          </div>
        </motion.div>

        {/* FORM */}

        {!isGenerating && !pdfUrl && (
          <div className="grid lg:grid-cols-2 gap-10">

            {/* UPLOAD */}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-xl font-bold mb-6">
                Upload Resume
              </h2>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current.click()}
                className="w-full h-72 rounded-3xl border-2 border-dashed border-purple-500/40 bg-gradient-to-b from-purple-500/10 to-transparent flex flex-col items-center justify-center gap-5"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                >
                  <UploadCloud className="w-16 h-16 text-purple-400" />
                </motion.div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold">
                    {file ? file.name : "Upload PDF Resume"}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    Drag & Drop or Click
                  </p>
                </div>
              </motion.button>
            </motion.div>

            {/* JOB DESCRIPTION */}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-xl font-bold mb-6">
                Job Description
              </h2>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description..."
                className="w-full h-72 rounded-3xl bg-black/40 border border-white/10 p-6 outline-none focus:border-purple-500 transition-all resize-none"
              />

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleGenerate}
                className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg shadow-2xl cursor-pointer"
              >
                Generate Optimized Resume
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* PROCESSING */}

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mt-20"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">

              <h2 className="text-4xl font-black mb-10 text-center">
                AI Processing Pipeline
              </h2>

              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-10">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-6">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="p-4 rounded-xl bg-purple-500/20">
                        <Icon className="text-purple-400" />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">
                          {stage.label}
                        </p>
                      </div>

                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* RESULT */}

{!isGenerating && pdfUrl && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid lg:grid-cols-3 gap-8"
  >

    {/* PDF */}

    <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

      {/* TOP BAR */}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

        {/* LEFT SECTION */}

        <div className="flex items-center gap-4">

          {/* BACK BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate("/dashboard")}
            className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:border-purple-500 transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </motion.button>

          {/* PREVIEW BUTTONS */}

          <div className="flex gap-4">
            <button
              onClick={() => setPreviewMode("before")}
              className={`px-5 py-2 rounded-xl transition-all cursor-pointer${
                previewMode === "before"
                  ? "bg-purple-600 shadow-lg shadow-purple-500/30 cursor-pointer"
                  : "bg-white/10 hover:bg-white/20 cursor-pointer"
              }`}
            >
              Before
            </button>

            <button
              onClick={() => setPreviewMode("after")}
              className={`px-5 py-2 rounded-xl transition-all ${
                previewMode === "after"
                  ? "bg-purple-600 shadow-lg shadow-purple-500/30 cursor-pointer"
                  : "bg-white/10 hover:bg-white/20 cursor-pointer"
              }`}
            >
              After
            </button>
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}

        <motion.a
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          href={pdfUrl}
          download
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/30"
        >
          <Download size={18} />
          Download
        </motion.a>
      </div>

      {/* PDF VIEWER */}

      <motion.iframe
        key={previewMode}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        src={
          previewMode === "before"
            ? beforeFileUrl
            : pdfUrl
        }
        className="w-full h-[750px] rounded-2xl bg-white border border-white/10"
      />
    </div>

    {/* ANALYTICS */}

    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="flex justify-center mb-10">
        <ScoreRing score={metrics?.atsScore} />
      </div>

      {/* STRENGTHS */}

      <div className="mb-10">
        <h3 className="text-sm uppercase tracking-wider text-emerald-400 font-bold mb-4">
          Strengths
        </h3>

        <div className="space-y-3">
          {metrics?.strengths.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                x: 5,
                scale: 1.02,
              }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      {/* IMPROVEMENTS */}

      <div>
        <h3 className="text-sm uppercase tracking-wider text-amber-400 font-bold mb-4">
          Improvements
        </h3>

        <div className="space-y-3">
          {metrics?.gaps.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                x: 5,
                scale: 1.02,
              }}
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)}

      </div>
    </div>
  );
}
