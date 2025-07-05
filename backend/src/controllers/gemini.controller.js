// controllers/gemini.controller.js (already correct structure per official SDK)
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateChallenge = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: "Valid prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate challenge", details: error.message });
  }
};

