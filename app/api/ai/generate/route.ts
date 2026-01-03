import { generateText } from "ai"

export const maxDuration = 30

export async function POST(request: Request) {
  try {
    const { prompt, style, layoutType } = await request.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Generate complete HTML website with embedded CSS and JavaScript
    const systemPrompt = `You are an expert web developer. Generate a complete, production-ready HTML website based on the user's description.

IMPORTANT REQUIREMENTS:
1. Return ONLY valid HTML code wrapped in <html> tags
2. Include ALL CSS inside <style> tags in the <head>
3. Include ALL JavaScript inside <script> tags before </body>
4. Make it visually stunning with modern design
5. Ensure responsive design for mobile and desktop
6. Use semantic HTML5 elements
7. No external dependencies - everything must be self-contained
8. No comments in the code
9. Implement smooth animations and transitions
10. Use a modern color palette with gradients

Design Style: ${style || "Modern Minimal"}
Layout Type: ${layoutType || "Single Page"}

Generate the complete website now:`

    const { text } = await generateText({
      model: "groq/mixtral-8x7b-32768",
      system: systemPrompt,
      prompt: prompt,
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    // Extract HTML from response (in case AI adds extra text)
    const htmlMatch = text.match(/<html[\s\S]*?<\/html>/i)
    const generatedCode = htmlMatch ? htmlMatch[0] : text

    return Response.json(
      {
        success: true,
        html: generatedCode,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: "groq/mixtral-8x7b-32768",
          prompt: prompt,
          style: style,
          layoutType: layoutType,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] AI Generation Error:", error)
    return Response.json({ error: "Failed to generate website", details: String(error) }, { status: 500 })
  }
}
