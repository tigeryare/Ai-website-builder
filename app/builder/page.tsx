"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import BuilderLayout from "@/components/builder-layout"
import { Plus, Zap, HelpCircle, Settings, X, Maximize2, ChevronDown } from "lucide-react"
import { AIChatbot } from "@/components/ai-chatbot"

interface Project {
  id: string
  name: string
  prompt: string
  code: string
  createdAt: string
  updatedAt: string
  deployedUrl?: string
}

interface BuilderState {
  prompt: string
  generatedCode: string
  style: string
  layoutType: string
  projectName: string
  lastSaved: string
}

const STORAGE_KEY = "builder_state"
const PROJECTS_KEY = "projects"
const LAST_ACTIVE_PROJECT_KEY = "lastActiveProjectId"

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("")
  const [code, setCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [showProjectMenu, setShowProjectMenu] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string>("")
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_KEY)
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects)
      setProjects(parsedProjects)

      const lastActiveId = localStorage.getItem(LAST_ACTIVE_PROJECT_KEY)
      if (lastActiveId && parsedProjects.find((p: Project) => p.id === lastActiveId)) {
        loadProject(lastActiveId)
      }
    }

    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      const { prompt: savedPrompt, code: savedCode, projectId } = JSON.parse(savedState)
      setPrompt(savedPrompt)
      setCode(savedCode)
      setCurrentProjectId(projectId)
    }
  }, [])

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (prompt || code) {
        const projectId = currentProjectId || "project_" + Date.now()

        const updatedProjects = projects.filter((p) => p.id !== projectId)
        const newProject: Project = {
          id: projectId,
          name: prompt.substring(0, 50) || "Untitled Project",
          prompt,
          code,
          createdAt: projects.find((p) => p.id === projectId)?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const newProjects = [...updatedProjects, newProject]
        setProjects(newProjects)
        setCurrentProjectId(projectId)

        localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects))
        localStorage.setItem(LAST_ACTIVE_PROJECT_KEY, projectId)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ prompt, code, projectId }))
      }
    }, 1000)

    return () => clearTimeout(saveTimeout)
  }, [prompt, code, currentProjectId, projects])

  const loadProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      setPrompt(project.prompt)
      setCode(project.code)
      setCurrentProjectId(projectId)
      localStorage.setItem(LAST_ACTIVE_PROJECT_KEY, projectId)
      setShowProjectMenu(false)
    }
  }

  const handleNewProject = () => {
    setPrompt("")
    setCode("")
    setCurrentProjectId(null)
    setPublishedUrl("")
    localStorage.removeItem(LAST_ACTIVE_PROJECT_KEY)
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate website")
      }

      const data = await response.json()
      setCode(data.html)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("[v0] Generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = async () => {
    if (!code) {
      setError("Generate a website first before publishing")
      return
    }

    setIsPublishing(true)
    setError("")

    try {
      const projectId = currentProjectId || "project_" + Date.now()
      const projectName = (projects.find((p) => p.id === projectId)?.name || "my-site")
        .toLowerCase()
        .replace(/\s+/g, "-")

      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          projectName,
          html: code,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to publish website")
      }

      const data = await response.json()

      const updatedProjects = projects.map((p) => (p.id === projectId ? { ...p, deployedUrl: data.deployment.url } : p))
      setProjects(updatedProjects)
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects))

      setPublishedUrl(data.deployment.url)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish")
      console.error("[v0] Publish error:", err)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publishedUrl)
      setCopiedToClipboard(true)
      setTimeout(() => setCopiedToClipboard(false), 2000)
    } catch {
      setError("Failed to copy URL")
    }
  }

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    try {
      alert("Draft saved successfully!")
    } catch (error) {
      console.error("[v0] Failed to save draft:", error)
      alert("Failed to save draft")
    } finally {
      setIsSavingDraft(false)
    }
  }

  const handleAddFeature = () => {
    const features = [
      "Hero Section",
      "Features Grid",
      "Pricing Table",
      "Contact Form",
      "Testimonials",
      "FAQ Section",
      "Team Members",
      "Blog Section",
    ]
    const randomFeature = features[Math.floor(Math.random() * features.length)]
    setPrompt((prev) => (prev ? `${prev}, add ${randomFeature}` : randomFeature))
  }

  const handleAISuggestions = () => {
    const suggestions = [
      "Add a modern hero section",
      "Include social media links",
      "Add testimonials section",
      "Create a pricing comparison table",
      "Add FAQ section",
      "Include newsletter signup",
    ]
    setSuggestions(suggestions)
    setShowSuggestions(true)
  }

  const addSuggestion = (suggestion: string) => {
    setPrompt((prev) => (prev ? `${prev}, ${suggestion}` : suggestion))
    setShowSuggestions(false)
  }

  const currentProject = projects.find((p) => p.id === currentProjectId)

  return (
    <BuilderLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="glass-effect p-4 mb-4 rounded-xl relative">
            <button
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className="w-full flex items-center justify-between p-3 bg-background/50 border border-border/50 rounded-lg hover:border-primary/50 transition"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {currentProject ? currentProject.name.substring(0, 30) : "Select Project"}
              </span>
              <ChevronDown size={16} />
            </button>

            {showProjectMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => loadProject(project.id)}
                    className="w-full text-left px-4 py-2 hover:bg-muted/50 border-b border-border/30 last:border-b-0 transition text-sm"
                  >
                    <div className="font-medium text-foreground">{project.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
                <button
                  onClick={handleNewProject}
                  className="w-full text-left px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition"
                >
                  + New Project
                </button>
              </div>
            )}
          </div>

          <div className="glass-effect p-5 mb-4 rounded-xl flex-1 flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your website... (e.g., 'Create a modern SaaS landing page with hero section, features, and pricing')"
              className="flex-1 bg-input border border-border/50 rounded-lg p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddFeature}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition hover:ring-1 hover:ring-primary/30"
                title="Add suggested features"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={handleAISuggestions}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition hover:ring-1 hover:ring-primary/30"
                title="Get AI suggestions"
              >
                <Zap size={18} />
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition hover:ring-1 hover:ring-primary/30"
                title="Get writing tips"
              >
                <HelpCircle size={18} />
              </button>
              <button
                onClick={() => setShowSecurity(!showSecurity)}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition hover:ring-1 hover:ring-primary/30"
                title="Security information"
              >
                <Settings size={18} />
              </button>
            </div>

            {showHelp && (
              <div className="mt-3 p-3 bg-primary/10 rounded-lg text-sm text-foreground border border-primary/20">
                <strong>Tips:</strong> Be specific about design style, features needed, and target audience. Example:
                "Professional landing page for a fintech app with blue gradient background"
              </div>
            )}

            {showSuggestions && (
              <div className="mt-3 space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => addSuggestion(suggestion)}
                    className="w-full text-left p-2 bg-muted/50 hover:bg-muted rounded-lg text-sm transition hover:ring-1 hover:ring-primary/20"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            )}

            {showSecurity && (
              <div className="mt-3 p-3 bg-orange-500/10 rounded-lg text-sm text-foreground border border-orange-500/20">
                <strong>Security:</strong> Your generated code is stored locally. Payment forms should use secure
                payment processors. User data requires encryption and compliance.
              </div>
            )}

            {error && (
              <div className="mt-3 p-3 bg-destructive/20 rounded-lg text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            {publishedUrl && (
              <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="text-sm font-semibold text-green-600 mb-2">Website Published Successfully!</div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={publishedUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-background/50 border border-border/50 rounded-lg text-sm text-foreground"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      copiedToClipboard
                        ? "bg-green-600 text-white"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {copiedToClipboard ? "Copied!" : "Copy"}
                  </button>
                </div>
                <a
                  href={publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 underline"
                >
                  Visit published site →
                </a>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition hover:shadow-lg"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing || !code}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold transition hover:shadow-lg"
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            </div>

            <Button
              onClick={handleSaveDraft}
              disabled={isSavingDraft}
              className="w-full mt-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transition hover:shadow-md"
            >
              {isSavingDraft ? "Saving..." : "Save Draft"}
            </Button>
          </div>
        </div>

        {showPreview && (
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="glass-effect p-4 rounded-xl flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === "preview"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === "code"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  Code
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFullscreen(true)}
                  className="p-2 hover:bg-muted rounded-lg transition hover:ring-1 hover:ring-primary/30"
                  title="Fullscreen"
                >
                  <Maximize2 size={18} />
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-muted rounded-lg transition hover:ring-1 hover:ring-primary/30"
                  title="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 glass-effect rounded-xl overflow-hidden shadow-xl">
              {activeTab === "preview" ? (
                code ? (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full border-0"
                    title="Website preview"
                    sandbox="allow-same-origin"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="mb-2 text-4xl">🎨</div>
                      <p>Your AI-generated website preview</p>
                    </div>
                  </div>
                )
              ) : (
                <pre className="w-full h-full p-4 overflow-auto text-sm bg-background/50 text-foreground font-mono">
                  <code>{code || "No code generated yet"}</code>
                </pre>
              )}
            </div>
          </div>
        )}

        {showFullscreen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="w-full h-full max-w-6xl max-h-[90vh] bg-background rounded-xl shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-border glass-effect">
                <h2 className="text-lg font-semibold text-foreground">Website Preview</h2>
                <button onClick={() => setShowFullscreen(false)} className="p-2 hover:bg-muted rounded-lg transition">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                {code ? (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full border-0"
                    title="Fullscreen preview"
                    sandbox="allow-same-origin"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Generate a website first
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <AIChatbot />
    </BuilderLayout>
  )
}
