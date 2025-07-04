import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { mood } = req.body;

  const prompt = mood
    ? `Give a short daily self-care challenge for someone feeling mood level ${mood}/5 only in single line and don't show any bold lines and extra information`
    : "Give a short daily mental health self-care challenge only in single line and don't show any bold lines and extra information";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Optional: disables slow "reasoning" phase
        },
      },
    });

    res.status(200).json({ text: response.text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ text: "Challenge generation failed." });
  }
}
