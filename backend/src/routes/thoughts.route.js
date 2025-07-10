import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_THOUGHTS_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { thoughtsOnly, difficulty = "easy", count = 5, originalThought, userAnswer } = req.body;

  let levelPrompt = "";

  if (difficulty === "easy") {
    levelPrompt = "very common daily self-critical thoughts";
  } else if (difficulty === "medium") {
    levelPrompt = "negative thoughts that involve some cognitive distortions or overthinking";
  } else if (difficulty === "hard") {
    levelPrompt = "deep negative beliefs or harsh self-judgmental thoughts that are hard to challenge";
  }

  console.log("Difficulty received:", difficulty);
  console.log("Level prompt selected:", levelPrompt);


  // 🔹 Case 1: Only generate negative thoughts
  if (thoughtsOnly) {
    const sessionSalt = Math.floor(Math.random() * 10000); // add randomness to avoid repeated answers

    const prompt = `Session ${sessionSalt} — Give me ${count} ${levelPrompt}, each in a single sentence, without numbering or explanation. Return each in a new line. Always give new, unique thoughts. Avoid repeating earlier responses.`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const thoughts = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      return res.status(200).json({ thoughts });
    } catch (error) {
      console.error("Thought Generation Error:", error);
      return res.status(500).json({ error: "Failed to generate thoughts." });
    }
  }

  // 🔹 Case 2: Evaluate user reframe
  if (originalThought && userAnswer) {
    const prompt = `
Evaluate this user-submitted reframe of a negative thought.
Original negative thought: "${originalThought}"
User's reframe: "${userAnswer}"
Return score from 1 to 5 based on positivity and helpfulness.
If score is less than or equal to 3, also suggest a better positive thought (reframe).
Format response strictly like this:
Score: X
GeminiReframe: <line here only if score <= 3>
`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const lines = text.split("\n").map((l) => l.trim());
      const scoreLine = lines.find((line) => line.startsWith("Score:"));
      const reframeLine = lines.find((line) => line.startsWith("GeminiReframe:"));

      const score = parseInt(scoreLine?.split(":")[1]?.trim()) || 1;
      const geminiReframe = score <= 3
        ? (reframeLine?.split(":")[1]?.trim() || "Try thinking of yourself with more compassion.")
        : null;

      return res.status(200).json({
        score,
        geminiReframe,
      });
    } catch (error) {
      console.error("Evaluation Error:", error);
      return res.status(500).json({ error: "Failed to evaluate answer." });
    }
  }

  return res.status(400).json({ error: "Invalid request payload" });
}
