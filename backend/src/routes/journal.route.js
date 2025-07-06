import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const text = `
Generate a journaling prompt starting with "Write 3 things".

Requirements:
- It should be calming, encouraging, and friendly
- Focus on gratitude, self-reflection, or positivity
- Keep it under 50 words
- Don't include any extra formatting, markdown, or bold text
- Return only the prompt sentence
`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-pro" }); // or gemini-1.5-pro
    const result = await model.generateContent(text);
    const response = await result.response;
    const text = response.text().trim();

    res.status(200).json({ text: text });
  } catch (err) {
    console.error("Gemini error:", err);

    // fallback journaling prompt
    const fallbackPrompt =
      "Write 3 things you experienced today that brought you even a little bit of peace or joy.";

    res.status(500).json({ text: fallbackPrompt });
  }
}
