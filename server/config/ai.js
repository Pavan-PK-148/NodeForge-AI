import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const ai = new OpenAI({
    // Use the Groq Key we just set up
    apiKey: process.env.GROQ_API_KEY, 
    // Standard Groq Base URL
    baseURL: process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1", 
});

export default ai;