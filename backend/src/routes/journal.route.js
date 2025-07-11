import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


router.post("/", async (req, res) => {
  const prompt = `
Generate a journaling prompt starting with "Write 3 things".

Requirements:
- It should be calming, encouraging, and friendly
- Focus on gratitude, self-reflection, or positivity
- Keep it under 50 words
- Don't include any extra formatting, markdown, or bold text
- Return only the prompt sentence
`;

  try {
     const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  temperature: 1.0,
  contents: [
    {
      role: "user",
      parts: [{ text: prompt.trim() }],
    },
  ],
  
});
    console.log("Final prompt:", prompt.trim());

    const text = result?.candidates?.[0]?.content?.parts
  ?.map((p) => p.text)
  ?.join(" ")
  ?.trim();

    console.log("Generated prompt:", text);
    res.status(200).json({ text, raw: JSON.stringify(result, null, 2) });

  } catch (err) {
    console.error("Gemini error:", err);

    if (err.response) {
    console.error("Response error:", err.response.data);
  } else {
    console.error("Error message:", err.message);
  }

    const fallbackPrompt =
      "Write 3 things you experienced today that brought you even a little bit of peace or joy.";

    res.status(500).json({ text: fallbackPrompt });
  }
});

export default router;
