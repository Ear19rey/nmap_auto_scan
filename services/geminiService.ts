import { GoogleGenAI } from "@google/genai";
import { SCRIPT_CONTENT } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const explainScriptSection = async (section: string): Promise<string> => {
  const genAI = getAI();
  if (!genAI) {
    return "API Key not configured. Unable to fetch AI explanation.";
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are a Cybersecurity Expert and Red Team Lead.
        
        Context: The user is looking at a bash automation script for Nmap.
        The full script is:
        \`\`\`bash
        ${SCRIPT_CONTENT}
        \`\`\`
        
        The user is asking for an explanation of this specific section or concept: "${section}".
        
        Provide a concise, technical, yet easy-to-understand explanation. 
        Focus on what the flags do (e.g., -sC, -sV, -O) and why a Red Teamer would use them.
        Keep it under 3 short paragraphs.
      `,
    });

    return response.text || "No explanation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please try again later.";
  }
};
