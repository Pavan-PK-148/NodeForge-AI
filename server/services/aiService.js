// server/service/aiService.js

export const generateTailoredResumeSchema = async (rawText, jobDescription) => {
  const prompt = `
    You are an expert ATS Optimization Engine. 
    Analyze the raw resume text and target requirements to generate an optimized single-page professional profile.

    CRITICAL RESTRUCTURING INSTRUCTIONS:
    1. Extract all personal identities, explicit skills, experience history, technical projects, internships, and educational credentials.
    2. Rewrite experiences into highly dense, quantifiable impact statements using action verbs.
    3. Keep every text block crisp and short. The text must be compact enough so it strictly fits on a single A4 page template without overflow.

    RAW RESUME:
    ${rawText}

    TARGET REQUIREMENTS:
    ${jobDescription}

    You must respond ONLY with a valid JSON object matching this exact structure:
    {
      "fullName": "Candidate Name",
      "title": "Optimized Target Professional Title",
      "subtitle": "City, Country • Email • Phone • Portfolio / LinkedIn Links",
      "atsScore": 95,
      "summary": "High-density action-oriented professional summary matching target keywords.",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
      "experience": [
        {
          "role": "Job Title",
          "company": "Company Name",
          "period": "Dates Active",
          "bullets": ["Action bullet 1 showing impact metrics", "Action bullet 2"]
        }
      ],
      "internships": [
        {
          "role": "Internship Title",
          "company": "Company Name",
          "period": "Dates Active",
          "bullets": ["Technical execution milestone bullet"]
        }
      ],
      "projects": [
        {
          "name": "Project Name",
          "tech": "Stack Used (e.g. React, Node, WebGL)",
          "bullets": ["Concise achievement bullet sentence", "Secondary engineering bullet"]
        }
      ],
      "certifications": ["Certification or Degree Name 1", "Certification Name 2"],
      "metrics": {
        "advantages": ["Advantage 1"],
        "gaps": ["Gap 1"]
      },
      "suggestedRoles": ["Path 1", "Path 2"]
    }
  `;

  const baseUrl = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
  const apiKey = process.env.GROQ_API_KEY;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an expert ATS parser that outputs strictly formed JSON objects." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (!response.ok) throw new Error(`Network error code: ${response.status}`);
    const jsonResult = await response.json();
    return JSON.parse(jsonResult.choices[0].message.content);
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};