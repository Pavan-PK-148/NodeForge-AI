// server/controllers/portfolioScoringController.js
import Portfolio from '../models/Portfolio.js';
import ai from '../config/ai.js';

/**
 * @desc    Dynamically evaluate portfolio depth and URL vectors via Groq AI
 * @route   POST /api/portfolio/scoring-metrics
 * @access  Private
 */
export const calculatePortfolioMetrics = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { portfolioUrl } = req.body;

    if (!portfolioUrl) {
      return res.status(400).json({
        success: false,
        message: "A target portfolio URL string asset must be provided for verification parsing."
      });
    }

    // Grab database state to inject baseline context parameters if available
    const baselinePortfolio = await Portfolio.findOne({ user: userId }) || {};

    // Formulate a prompt instructing Groq to simulate parsing the URL node alongside database metrics
    const completion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an executive technical auditing system. Analyze the target user portfolio URL alongside their system telemetry. 
          Evaluate the profile across three strict vector categories (Score each from 0 to max available):
          1. Profile Structure Depth (Max 35): Completeness of role mapping, summaries, contact blocks.
          2. Technical Breadth Coefficient (Max 35): Structural usage of language frameworks, architecture paradigms, deployment traces.
          3. Market Velocity Index (Max 30): Aesthetic presentation vector, distribution validity, modern engineering UX cues inferred from context.

          Generate strict diagnostic logs outlining gaps and high-leverage advantages.
          Return ONLY a valid JSON object matching the requested schema. No markdown formatting.`
        },
        {
          role: "user",
          content: `
          TARGET PORTFOLIO URL TO SCAPE/AUDIT: ${portfolioUrl}
          INTERNAL PORTFOLIO MATRIX SYSTEM METRICS: ${JSON.stringify(baselinePortfolio)}

          OUTPUT REPLICABLE OBJECT SPECIFICATION TEMPLATE:
          {
            "compositeScore": 88,
            "breakdown": {
              "profileDepth": { "score": 30, "max": 35, "percentage": 86 },
              "technicalBreadth": { "score": 28, "max": 35, "percentage": 80 },
              "marketVelocity": { "score": 30, "max": 30, "percentage": 100 }
            },
            "telemetryLog": {
              "trackedLanguages": 4,
              "trackedFrameworks": 5,
              "trackedDevopsNodes": 3,
              "experienceBlocks": 2,
              "compiledProjectAssets": 3
            },
            "insights": [
              "High-capacity deployment traces successfully mapped to destination node.",
              "Consider extending semantic descriptions of framework usage on project blocks."
            ]
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedResponse = JSON.parse(completion.choices[0].message.content);
    
    return res.status(200).json({
      success: true,
      evaluatedUrl: portfolioUrl,
      ...parsedResponse
    });

  } catch (error) {
    console.error("[PORTFOLIO DYNAMIC SCORING CONTROLLER FAULT]:", error);
    return res.status(500).json({
      success: false,
      message: "Dynamic validation pipeline failed to return scoring telemetry.",
      error: error.message
    });
  }
};