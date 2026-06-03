import axios from 'axios';
import mongoose from 'mongoose';
import pdfParse from 'pdf-parse-fork';
import Portfolio from '../models/Portfolio.js';

/**
 * POST /api/resume/generate-tailored
 * Compiles a deep market capability audit report using the user's custom file attachment context.
 */
export const generateTailoredResume = async (req, res) => {
  try {
    let resumeDataString = "";

    // 1. Process uploaded file matrix parameters first (if provided)
    if (req.file) {
      const mimeType = req.file.mimetype || "";
      const originalName = req.file.originalname ? req.file.originalname.toLowerCase() : "";
      
      if (mimeType.includes('json') || originalName.endsWith('.json')) {
        try {
          const parsedJson = JSON.parse(req.file.buffer.toString('utf-8'));
          resumeDataString = JSON.stringify(parsedJson);
        } catch (e) {
          resumeDataString = req.file.buffer.toString('utf-8');
        }
      } 
      // Safe execution wrapping for binary PDF streams
      else if (mimeType.includes('pdf') || originalName.endsWith('.pdf')) {
        try {
          const parseBuffer = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;
          const pdfData = await parseBuffer(req.file.buffer);
          resumeDataString = pdfData.text; 
          
          if (!resumeDataString || resumeDataString.trim().length === 0) {
            throw new Error("Parsed PDF layout vector returned empty string streams.");
          }
        } catch (pdfError) {
          console.error("PDF Extraction error:", pdfError.message);
          return res.status(422).json({ 
            message: "Failed to extract clean readable text layout structures from your PDF asset." 
          });
        }
      } 
      // Default to standard string decoding for markdown/txt assets
      else {
        resumeDataString = req.file.buffer.toString('utf-8'); 
      }
    } 
    
    // 2. Resolve database fallback context parameters ONLY if no file matrix exists
    if (!resumeDataString || resumeDataString.trim().length === 0) {
      const userId = req.user?.id || req.user?._id;
      
      // Defensively guard authentication boundaries
      if (!userId) {
        return res.status(401).json({ 
          message: "Unauthorized access node. Please guarantee your session auth headers are active." 
        });
      }

      const portfolioId = req.body ? req.body.portfolioId : null;
      let query = { user: userId };

      if (portfolioId && mongoose.Types.ObjectId.isValid(portfolioId)) {
        query._id = portfolioId;
      }

      const basePortfolio = await Portfolio.findOne(query).sort({ updatedAt: -1 });
      if (!basePortfolio) {
        return res.status(404).json({ 
          message: "No custom uploaded asset tracks or matching user database track found." 
        });
      }
      resumeDataString = JSON.stringify(basePortfolio);
    }

    // Dynamic processing prompt context for Groq LLM API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an elite enterprise workforce intelligence engine and resume capability parsing algorithm.
            Your mandate is to read a user's resume data structure configuration dynamically and provide a high-fidelity market demand alignment report.

            CRITICAL RULES:
            1. DYNAMIC DOMAIN DETECTION: Carefully analyze the skills, frameworks, tools, and job descriptions within the raw resume content text stream. Do NOT default to Full-Stack Developer or Software Engineer profiles. 
               If you detect tools like Figma, Adobe Creative Cloud, Sketch, InVision, or design concepts like Wireframing, User Research, Design Systems, Typography, UI/UX Design, Prototyping, Usability Testing, Interaction Design, and UX Architecture, you must classify this profile completely under the UI/UX Design and Product Design domain ecosystem.
            2. Extract explicit candidate details, matching their true personal identity and field track structure context. Do not use fallback placeholder values.
            3. Match those explicit entries against live industry parameters specific to their detected domain. Provide realistic market metrics (0-100 demand scores) and specific trend descriptors.
            4. Detect highly beneficial tech recommendations, tools, or framework complements omitted from their active stack (e.g., for UI/UX profiles, suggest components like Framer, Storybook design token systems, Webflow, Design System Governance, Micro-interactions, or Conversational/Voice Interface Design Tracks).
            5. Suggest top tier, highly aligned roles they can realistically target given their profile track context (e.g., UI/UX Designer, Interaction Designer, Lead Product Designer, Experience Architect).
            6. Return strict, parse-ready JSON properties following the explicit blueprint schema definition provided below. Do not append conversational text.`
          },
          {
            role: "user",
            content: `
            CANDIDATE ENTRY RECORD NODE TEXT CONTENT CONTENTSTREAM:
            ${resumeDataString}

            OUTPUT EXPECTED STRICT SCHEMA DESIGN FORMAT SPECIFICATION LAYOUT:
            {
              "candidateName": "Full candidate name parsed strictly from the very top lines of text data or metadata tracks",
              "inDemandSkills": [
                {
                  "skill": "Name of highly valued active skill/tool found inside dataset (e.g., Figma, Wireframing)",
                  "demandScore": 95,
                  "growthTrend": "+18% Market Velocity Index",
                  "status": "HIGH CAPACITY FOCUS"
                }
              ],
              "skillRecommendations": [
                {
                  "name": "Name of missing premium technology, tool, or design methodology track omitted",
                  "marketValue": "An analytical sentence describing exactly what opportunity value index is lost by missing this parameter",
                  "growthVector": "+24% Lift"
                }
              ],
              "suggestedRoles": [
                {
                  "roleTitle": "Optimized, targeted professional role classification title mapping logically onto capabilities discovered (e.g., UI/UX Designer, Product Designer)",
                  "matchingVector": "94% Compliance Fit"
                }
              ]
            }`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const parsedResponse = JSON.parse(response.data.choices[0].message.content);
    return res.status(200).json(parsedResponse);

  } catch (error) {
    console.error('[VARIANT COMPLIANCE ENGINE FAULT]:', error.response?.data || error.message);
    return res.status(500).json({ 
      message: "Variant processing and optimization matrix failed to parse successfully.", 
      error: error.message 
    });
  }
};