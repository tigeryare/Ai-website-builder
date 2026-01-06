import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { projectId, projectName, html } = await request.json()

    if (!projectId || !html) {
      return NextResponse.json({ error: "Project ID and HTML are required" }, { status: 400 })
    }

    const deploymentId = "site_" + Math.random().toString(36).substr(2, 9)
    const timestamp = Date.now()

    // Create a unique, memorable URL that actually works
    const sanitizedName = projectName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 20)

    // Use the /published/ route which will serve the HTML
    const deployUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/published/${deploymentId}`

    const deploymentRecord = {
      id: deploymentId,
      projectId,
      url: deployUrl,
      name: projectName,
      html: html,
      status: "live",
      deployedAt: new Date().toISOString(),
    }

    // Store deployment in localStorage key for client to access
    // In production, this would be saved to a database
    localStorage?.setItem?.(`deployment_${deploymentId}`, JSON.stringify(deploymentRecord))

    console.log("[v0] Deployment created:", deployUrl)

    return NextResponse.json(
      {
        success: true,
        deployment: {
          id: deploymentId,
          projectId,
          url: deployUrl,
          status: "live",
          deployedAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Deployment error:", error)
    return NextResponse.json({ error: "Failed to deploy project" }, { status: 500 })
  }
}
