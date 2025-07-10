import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_CHATBOT_API_KEY }); 
router.post("/", async (req, res) => {
  const { messages } = req.body;

  console.log("Received:", messages);

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
  }

  // ✅ Convert to Gemini format
  const formatted = messages.map((msg) => ({
    role: msg.role === "bot" ? "model" : msg.role, // convert 'bot' to 'model'
    parts: [{ text: msg.text }],
  }));

  // ✅ Add system prompt for tone & memory
  const systemInstruction = {
    role: "user",
    parts: [
      {
        text:
          "You are a warm, kind-hearted mental health chatbot named Ember. " +
          "Talk in a supportive, empathetic tone. Add gentle emojis like 💙, 🌱, ☀️, etc other emojis too but avoid bold or starred text (**). " +
          "Always remember what the user shares in the conversation.",
      },
    ],
  };

  const contents = [systemInstruction, ...formatted];

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t come up with a helpful response.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Chatbot failed to respond." });
  }
});

export default router;
