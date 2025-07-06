import { GoogleGenAI } from "@google/genai"

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "your-api-key-here")

export async function POST(request) {
  try {
    const { message } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `${message}
    
    Requirements:
    - Start with "Write 3 things"
    - Make it warm, personal, and encouraging
    - Keep it under 50 words
    - Focus on gratitude and positivity
    - Make it feel like a gentle friend is asking
    - Vary the specific focus (could be about today, this week, people, experiences, small moments, etc.)
    
    Return only the prompt text, nothing else.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return Response.json({ prompt: text.trim() })
  } catch (error) {
    console.error("Error generating prompt:", error)

    // Fallback prompts if API fails
    const fallbackPrompts = [
      "Write 3 things that made you smile today, no matter how small they might seem.",
      "Write 3 things you're grateful for in this moment - they could be as simple as the air you breathe or as meaningful as the people you love.",
      "Write 3 things that brought you comfort or joy this week, even during challenging times.",
      "Write 3 things about your surroundings right now that you appreciate - perhaps the warmth of sunlight, a cozy space, or sounds that bring you peace.",
      "Write 3 things about yourself that you're thankful for today - your strengths, efforts, or simply your resilience.",
    ]

    const randomPrompt = fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)]

    return Response.json({ prompt: randomPrompt })
  }
}
