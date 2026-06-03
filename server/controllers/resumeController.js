import mongoose from 'mongoose';
import pdf from 'pdf-parse-fork';
import ai from '../config/ai.js';
import Portfolio from '../models/Portfolio.js';
import { generateTailoredResumeSchema } from '../services/aiService.js';
import { extractTextFromBuffer, compileAtsPdfBuffer } from '../utils/pdfParser.js';
import multer from 'multer';

const memoryStorage = multer.memoryStorage();
const uploadHandler = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('resume');

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

// @desc    Generate a tailored variant of a resume and analyze against ATS constraints
// @route   POST /api/portfolio/tailor-resume
export const generateTailoredResume = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    // 💡 NEW: Accepting specific portfolioId from frontend choice parameter
    const { variantType, jobDescription, portfolioId } = req.body;

    if (!variantType) {
      return res.status(400).json({ message: "A targeted structural variant track type must be requested." });
    }

    // Determine whether to find by exact ID or fall back to user's first document
    let query = { user: userId };
    if (portfolioId && mongoose.Types.ObjectId.isValid(portfolioId)) {
      query._id = portfolioId;
    }

    const basePortfolio = await Portfolio.findOne(query);
    if (!basePortfolio) {
      return res.status(404).json({ message: "No foundational portfolio profile discovered to use as a baseline configuration track." });
    }

    // Formulate advanced contextual intelligence prompt matrix
    const completion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an elite, executive-level technical resume optimization and ATS matrix parsing intelligence. 
          Your goal is to optimize a user's resume data structural object into a highly targeted professional variant (${variantType}) to pass corporate compliance algorithms.

          CRITICAL RULES:
          1. Rewrite experience bullet points using the Google X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]").
          2. If a Job Description is supplied, incorporate missing keyword definitions natively into skills blocks and descriptive copy.
          3. Perform a strict ATS audit on the resulting structure and return calculated diagnostic metrics.
          4. Return raw JSON tracking the exact data block template given below. Do not wrap in markdown tags or add extra conversational prose.`
        },
        {
          role: "user",
          content: `
          TARGET PROFESSIONAL VARIANT TRACK: ${variantType}
          TARGET JOB DESCRIPTION (IF APPLICABLE): ${jobDescription || "None provided. Tailor to general industry gold standards for this domain."}

          CURRENT BASELINE DATA BLOCK NODE:
          ${JSON.stringify(basePortfolio)}

          OUTPUT EXPECTED REPLICABLE FORMAT SPECIFICATION SCHEMA:
          {
            "tailoredData": {
              "personalInfo": {
                "title": "Optimized role title aligned to target track",
                "summary": "Tailored narrative matching target variant keywords"
              },
              "experience": [
                {
                  "role": "Optimized position matching target variant nomenclature",
                  "company": "Original company name",
                  "duration": "Original duration tracker",
                  "desc": "Targeted overview paragraph mapping functional frameworks used",
                  "bullets": ["Google XYZ accomplishment statement 1", "Google XYZ accomplishment statement 2"]
                }
              ],
              "projects": [
                {
                  "name": "Original project name",
                  "lang": "Primary language tracker",
                  "desc": "Project overview highlighted to showcase target variant priorities",
                  "techStack": ["Frameworks mapped natively"]
                }
              ],
              "skills": {
                "languages": ["Languages matching track"],
                "frameworks": ["Frameworks matching track"],
                "devops": ["Tools matching track"]
              }
            },
            "atsMatrix": {
              "overallScore": 85, 
              "impactScore": 90, 
              "keywordDensityScore": 78, 
              "identifiedKeywordsMatched": ["React", "TypeScript", "CI/CD Pipeline"], 
              "missingCriticalKeywords": ["Docker", "GraphQL"], 
              "structuralFeedback": ["Bullet points match Google standard metrics", "Consider expanding Cloud configuration footprints"]
            }
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedResponse = JSON.parse(completion.choices[0].message.content);
    return res.status(200).json(parsedResponse);
  } catch (error) {
    console.error('[VARIANT COMPLIANCE ENGINE FAULT]:', error);
    return res.status(500).json({ message: "Variant processing and optimization matrix failed to parse successfully.", error: error.message });
  }
};

export const optimizeResumeMatrix = (req, res) => {
  uploadHandler(req, res, async (multerError) => {
    if (multerError) return res.status(400).json({ success: false, error: multerError.message });

    try {
      const { jobDescription } = req.body;
      const rawFile = req.file;

      if (!rawFile || !jobDescription) {
        return res.status(400).json({ success: false, error: 'Missing required components.' });
      }

      // 1. Core text extraction out of user file
      const rawTextContent = await extractTextFromBuffer(rawFile);

      // 2. Transmit vectors to Groq AI
      const structuredOutputMatrix = await generateTailoredResumeSchema(rawTextContent, jobDescription);

      // 3. Compile clean single-page PDF binary
      const optimizedPdfBinaryBuffer = await compileAtsPdfBuffer(structuredOutputMatrix);

      // 4. Pack both data metrics AND the exact raw extracted text to send to frontend
      const payloadMetrics = {
        atsScore: structuredOutputMatrix.atsScore,
        metrics: structuredOutputMatrix.metrics,
        suggestedRoles: structuredOutputMatrix.suggestedRoles,
        originalRawText: rawTextContent // <-- INJECTED HERE
      };
      
      res.setHeader('X-Resume-Metrics', Buffer.from(JSON.stringify(payloadMetrics)).toString('base64'));
      res.setHeader('Content-Type', 'application/pdf');
      return res.send(optimizedPdfBinaryBuffer);

    } catch (pipelineError) {
      console.error("Resume Controller Failure:", pipelineError);
      return res.status(500).json({ success: false, error: 'Pipeline fault encountered.' });
    }
  });
};