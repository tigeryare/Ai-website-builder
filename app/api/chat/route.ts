import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || messages.length === 0) {
      return Response.json({ error: "Messages required" }, { status: 400 })
    }

    const systemPrompt = `You are a helpful website builder assistant. Help users refine their website ideas and write better prompts for AI website generation.
    
When users describe what they want, provide:
1. Suggestions to improve their idea
2. Questions to clarify their vision
3. Design recommendations
4. Feature suggestions that would work well

Be concise, friendly, and practical. Focus on helping them create better websites.`

    const lastMessage = messages[messages.length - 1]

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: lastMessage.content,
      maxTokens: 500,
      temperature: 0.7,
    })

    return Response.json({
      success: true,
      message: text,
    })
  } catch (error) {
    console.error("[v0] Chat error:", error)
    return Response.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
