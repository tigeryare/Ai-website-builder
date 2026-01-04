"use client"

import { useState, useEffect } from "react"
import BuilderLayout from "@/components/builder-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STORAGE_KEY = "builder_state"

interface BuilderState {
  prompt: string
  generatedCode: string
  style: string
  layoutType: string
  projectName: string
  lastSaved: string
}

export default function Builder() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isNewProject, setIsNewProject] = useState(true)
  const [style, setStyle] = useState("Modern Minimal")
  const [layoutType, setLayoutType] = useState("Single Page")
  const [error, setError] = useState("")
  const [projectName, setProjectName] = useState("Untitled Project")
  const [isMounted, setIsMounted] = useState(false)
  const [showSecurityInfo, setShowSecurityInfo] = useState(false)
  const [contentAnalysis, setContentAnalysis] = useState("")

  useEffect(() => {
    setIsMounted(true)
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      try {
        const state: BuilderState = JSON.parse(savedState)
        setPrompt(state.prompt)
        setGeneratedCode(state.generatedCode)
        setStyle(state.style)
        setLayoutType(state.layoutType)
        setProjectName(state.projectName)
        setIsNewProject(!state.generatedCode)
        if (state.generatedCode) {
          setShowPreview(true)
        }
      } catch (e) {
        console.error("Failed to load saved state:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const state: BuilderState = {
      prompt,
      generatedCode,
      style,
      layoutType,
      projectName,
      lastSaved: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [prompt, generatedCode, style, layoutType, projectName, isMounted])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError("")
    setShowPreview(true)
    analyzeContent()

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, layoutType }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate website")
      }

      setGeneratedCode(data.html)
    } catch (err) {
      setError(String(err))
      console.error("[v0] Generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const analyzeContent = () => {
    const analysis = []
    if (prompt.toLowerCase().includes("payment") || prompt.toLowerCase().includes("stripe")) {
      analysis.push("Payment processing detected - ensure SSL/HTTPS is enabled")
    }
    if (prompt.toLowerCase().includes("form") || prompt.toLowerCase().includes("submit")) {
      analysis.push("Form data detected - implement proper validation")
    }
    if (prompt.toLowerCase().includes("login") || prompt.toLowerCase().includes("auth")) {
      analysis.push("Authentication required - use secure password hashing")
    }
    if (prompt.toLowerCase().includes("user") || prompt.toLowerCase().includes("account")) {
      analysis.push("User data handling - implement data protection compliance")
    }
    setContentAnalysis(analysis.length > 0 ? analysis.join(" • ") : "No security issues detected")
  }

  const handleNewProject = () => {
    setPrompt("")
    setGeneratedCode("")
    setShowPreview(false)
    setProjectName("Untitled Project")
    setStyle("Modern Minimal")
    setLayoutType("Single Page")
    setIsNewProject(true)
    setShowSecurityInfo(false)
    setContentAnalysis("")
    localStorage.removeItem(STORAGE_KEY)
  }

  // Welcome screen for new projects
  if (isNewProject && !showPreview) {
    return (
      <BuilderLayout>
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
            {/* 3D Cube Logo */}
            <div className="mb-8 relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e0e7ff" />
                  </linearGradient>
                </defs>
                <path
                  d="M 30 30 L 70 30 L 70 70 L 30 70 Z"
                  fill="url(#cubeGradient)"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />
                <path d="M 30 30 L 50 15 L 70 30 L 50 45 Z" fill="#f3f4f6" stroke="#4f46e5" strokeWidth="2" />
                <path d="M 70 30 L 85 40 L 85 80 L 70 70 Z" fill="#e5e7eb" stroke="#4f46e5" strokeWidth="2" />
                <text x="50" y="58" fontSize="28" fontWeight="bold" fill="#4f46e5" textAnchor="middle" dy="0.3em">
                  B
                </text>
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Build Your App
            </h1>
            <p className="text-lg text-muted-foreground mb-12">Turn your startup idea into reality</p>

            {/* Input Card */}
            <div className="w-full max-w-xl glass-effect p-6 rounded-2xl border border-primary/20 shadow-lg">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Let's build a Landing Page for ..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                />

                <div className="flex gap-2">
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition" title="Add feature">
                    <svg
                      className="w-5 h-5 text-muted-foreground hover:text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition" title="AI suggestions">
                    <svg
                      className="w-5 h-5 text-muted-foreground hover:text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                handleGenerate()
                setIsNewProject(false)
              }}
              disabled={isGenerating || !prompt.trim()}
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-base h-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Start Building
            </Button>
          </div>
        </div>
      </BuilderLayout>
    )
  }

  return (
    <BuilderLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="glass-effect p-4 mb-4 rounded-xl flex items-center justify-between">
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name..."
              className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground font-semibold text-lg"
            />
            <button
              onClick={handleNewProject}
              className="ml-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
              title="Start a new project"
            >
              New
            </button>
          </div>

          {/* Prompt Input */}
          <div className="glass-effect p-6 rounded-xl flex-1 flex flex-col mb-4">
            <label className="text-sm font-medium mb-3">Describe Your Website</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A modern landing page for a SaaS product with a hero section, features grid, testimonials, and pricing table. Use a blue and purple gradient theme..."
              className="flex-1 bg-input border border-border/50 rounded-lg p-3 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {error && (
              <div className="mt-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate Website
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="glass-effect p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">SECURITY</p>
              <button
                onClick={() => setShowSecurityInfo(!showSecurityInfo)}
                className="text-xs text-primary hover:underline"
              >
                {showSecurityInfo ? "Hide" : "Show"}
              </button>
            </div>
            {showSecurityInfo && contentAnalysis && (
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg text-xs text-foreground">
                {contentAnalysis}
              </div>
            )}
            {!showSecurityInfo && (
              <p className="text-xs text-muted-foreground">
                Click "Show" to see security recommendations based on your content
              </p>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-full lg:w-2/3">
          {showPreview && generatedCode ? (
            <div className="glass-effect p-2 rounded-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 px-4 pt-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-medium">
                    Preview
                  </button>
                  <button className="px-3 py-1 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted/50">
                    Code
                  </button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2"
                      />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4m-4 0l5 5m11-5v4m0-4h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="flex-1 bg-gradient-to-br from-white/5 to-white/10 rounded-lg overflow-auto">
                <iframe
                  srcDoc={generatedCode}
                  title="Website Preview"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          ) : (
            <div className="glass-effect rounded-xl h-full flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground mb-2">Your AI-generated website preview</p>
              <p className="text-xs text-muted-foreground/70">
                Describe your vision and click "Generate Website" to see the magic happen
              </p>
            </div>
          )}
        </div>
      </div>
    </BuilderLayout>
  )
}
