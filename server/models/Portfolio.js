// --- models/Portfolio.js ---
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lang: { type: String, default: 'JavaScript' },
  desc: { type: String, default: '' },
  stars: { type: Number, default: 0 },
  techStack: [{ type: String }],
  homepage: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  sourceUrl: { type: String, default: '' }
});

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, default: 'Present' },
  desc: { type: String, default: '' },
  bullets: [{ type: String }]
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String, default: '' }
});

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  selectedTemplate: { type: String, default: 'developer-pro' },
  profileImage: { type: String, default: '' },
  
  personalInfo: {
    fullName: { type: String, default: 'Initialize Name' }, // Mongoose handles defaults automatically!
    title: { type: String, default: 'Full-Stack Developer' },
    location: { type: String, default: 'Global' },
    summary: { type: String, default: '' },
    bio: { type: String, default: '' },
    email: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },

  // Using Mixed to safely support languages, frameworks, devops, tools, etc.
  skills: { type: mongoose.Schema.Types.Mixed, default: { languages: [], frameworks: [], devops: [] } },
  
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  education: [EducationSchema],
  
  githubMetrics: {
    totalStars: { type: Number, default: 0 },
    totalRepositories: { type: Number, default: 0 },
    contributionsThisYear: { type: Number, default: 0 }
  }
}, { timestamps: true });


export default mongoose.model('Portfolio', PortfolioSchema);