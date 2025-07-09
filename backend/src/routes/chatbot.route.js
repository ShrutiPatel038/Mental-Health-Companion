// backend/src/routes/chatbot.route.js
import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Message is required" });
  }

  const message = `
You are Calmly, a compassionate and friendly mental health chatbot. 
Respond in a supportive and understanding tone.
Use some emojis to express empathy and calmness (e.g., 🌿😊💙).
Avoid **bold text** (do not use markdown).
Keep your answers short, kind, and thoughtful.

User: "${prompt}"
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    // For @google/genai, the text is directly accessible like this:
    res.status(200).json({ reply: response.text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ reply: "Sorry, something went wrong. Please try again later." });
  }
});

export default router;
