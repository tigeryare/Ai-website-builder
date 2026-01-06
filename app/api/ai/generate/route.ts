import { generateText } from "ai"

export const maxDuration = 30

export async function POST(request: Request) {
  try {
    const { prompt, style, layoutType } = await request.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert web developer and UI/UX designer. Generate a complete, production-ready, BEAUTIFUL HTML website based on the user's description.

CRITICAL DESIGN REQUIREMENTS:
1. Create STUNNING, modern, eye-catching designs that look professional and expensive
2. Use modern color schemes: gradients, vibrant colors, or sophisticated neutrals
3. Implement smooth animations, hover effects, and transitions throughout
4. Include glassmorphism effects, shadows, and depth where appropriate
5. Use modern typography with proper hierarchy and spacing
6. Ensure perfect responsive design - works flawlessly on mobile, tablet, and desktop
7. Include calls-to-action buttons with hover animations
8. Create visually balanced layouts with proper whitespace
9. Add subtle background animations or patterns for visual interest
10. Use CSS Grid and Flexbox for modern layouts

TECHNICAL REQUIREMENTS:
1. Return ONLY valid, complete HTML code wrapped in <html> tags
2. Include ALL CSS inside <style> tags in the <head> - make it beautiful!
3. Include ALL JavaScript inside <script> tags before </body>
4. Self-contained - NO external dependencies or CDN links
5. No HTML comments - clean code only
6. Optimize for performance and user experience
7. Implement proper semantic HTML5 elements
8. Add favicon and meta tags

Design Style: ${style || "Modern Minimal with Gradients"}
Layout Type: ${layoutType || "Single Page"}

Create an exceptionally beautiful, modern website now:`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 4000,
      temperature: 0.8,
    })

    // Extract HTML from response
    const htmlMatch = text.match(/<html[\s\S]*?<\/html>/i)
    const generatedCode = htmlMatch ? htmlMatch[0] : text

    return Response.json(
      {
        success: true,
        html: generatedCode,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: "gpt-4o-mini",
          prompt: prompt,
          style: style,
          layoutType: layoutType,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] AI Generation Error:", error)
    return Response.json(
      {
        error: "Failed to generate website",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
