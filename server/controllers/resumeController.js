// --- controllers/resumeController.js ---
import pdf from 'pdf-parse-fork';
import ai from '../config/ai.js';
import Portfolio from '../models/Portfolio.js';

export const parseResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No resume asset file uploaded." });

    const data = await pdf(req.file.buffer);
    
    const completion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: `You are an advanced automated resume parsing intelligence. Extract information from the text and return a strictly formed JSON object matching this structure exactly. Do not wrap the response in markdown blocks:
          {
            "personalInfo": {
              "fullName": "Full legal name string",
              "title": "Target position or professional headline",
              "email": "Email address string",
              "location": "City, Country or Remote string",
              "summary": "Detailed professional resume profile summary",
              "bio": "Engaging two-sentence career intro bio"
            },
            "experience": [
              {
                "role": "Job title/position",
                "company": "Company name",
                "duration": "E.g., 2024 - Present or July 2022 - Jan 2026",
                "desc": "A continuous descriptive overview paragraph of the core responsibilities",
                "bullets": ["Detailed dynamic accomplishment sentence 1", "Detailed dynamic accomplishment sentence 2"]
              }
            ],
            "projects": [
              {
                "name": "Project name or title",
                "lang": "Primary programming language used e.g., JavaScript",
                "desc": "A concise summary description of what the project does and its features",
                "techStack": ["React", "Tailwind CSS", "Node.js"],
                "liveUrl": "URL string if available, otherwise empty string",
                "sourceUrl": "URL string if available, otherwise empty string"
              }
            ],
            "education": [
              {
                "degree": "B.S. in Computer Science, High School Diploma, etc.",
                "school": "University or Institution name",
                "year": "Graduation year e.g. 2025"
              }
            ],
            "skills": {
              "languages": ["JavaScript", "Python", "Java"],
              "frameworks": ["React", "Node.js", "Django"],
              "devops": ["Git", "Docker", "AWS", "Kubernetes", "Linux"]
            }
          }`
        },
        { role: "user", content: data.text.substring(0, 10000) }
      ],
      response_format: { type: "json_object" }
    });

    const raw = JSON.parse(completion.choices[0].message.content);
    
    // Construct database document update map
    const updatePayload = {
      "personalInfo.fullName": raw.personalInfo?.fullName || "Professional Developer",
      "personalInfo.title": raw.personalInfo?.title || "Full-Stack Engineer",
      "personalInfo.email": raw.personalInfo?.email || "",
      "personalInfo.location": raw.personalInfo?.location || "Global Node",
      "personalInfo.summary": raw.personalInfo?.summary || "",
      "personalInfo.bio": raw.personalInfo?.bio || raw.personalInfo?.summary?.substring(0, 150) || "",
      
      experience: (raw.experience || []).map(e => ({
        role: e.role || "Software Developer",
        company: e.company || "Enterprise Solutions",
        duration: e.duration || "Present",
        desc: e.desc || "",
        bullets: Array.isArray(e.bullets) ? e.bullets : []
      })),

      // NEW: Added explicit parsing handling for projects extracted from PDF
      projects: (raw.projects || []).map(p => ({
        name: p.name || "Unnamed Application",
        lang: p.lang || "JavaScript",
        desc: p.desc || "No descriptive summary cataloged on project profile.",
        stars: 0,
        techStack: Array.isArray(p.techStack) ? p.techStack : [p.lang || 'Software Core'],
        homepage: p.liveUrl || "",
        liveUrl: p.liveUrl || "",
        sourceUrl: p.sourceUrl || ""
      })),

      education: (raw.education || []).map(edu => ({
        degree: edu.degree || "Degree Metric",
        school: edu.school || "Educational Institution",
        year: edu.year || ""
      })),

      skills: {
        languages: Array.isArray(raw.skills?.languages) ? raw.skills.languages : [],
        frameworks: Array.isArray(raw.skills?.frameworks) ? raw.skills.frameworks : [],
        devops: Array.isArray(raw.skills?.devops) ? raw.skills.devops : Array.isArray(raw.skills?.tools) ? raw.skills.tools : []
      }
    };

    const doc = await Portfolio.findOneAndUpdate(
      { user: req.user._id }, 
      { $set: updatePayload }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    res.status(200).json(doc);
  } catch (err) {
    console.error('[CRITICAL PARSER FAULT]:', err);
    res.status(500).json({ error: "Failed to parse resume information structures completely.", details: err.message });
  }
};