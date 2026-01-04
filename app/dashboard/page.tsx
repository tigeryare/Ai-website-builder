"use client"
import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: "draft" | "published" | "building"
  createdAt: string
  updatedAt: string
  url?: string
  thumbnail?: string
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedProjects = localStorage.getItem("userProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
    setIsLoading(false)
  }, [])

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "published":
        return "bg-accent/20 text-accent"
      case "building":
        return "bg-secondary/20 text-secondary"
      case "draft":
        return "bg-muted/50 text-muted-foreground"
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and create your AI-powered websites</p>
        </div>
        <Link href="/builder">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-effect p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="glass-effect p-6">
          <p className="text-sm text-muted-foreground mb-1">Published</p>
          <p className="text-3xl font-bold text-accent">{projects.filter((p) => p.status === "published").length}</p>
        </div>
        <div className="glass-effect p-6">
          <p className="text-sm text-muted-foreground mb-1">This Month</p>
          <p className="text-3xl font-bold text-secondary">{projects.length}</p>
        </div>
      </div>

      {/* Projects Table or Empty State */}
      {isLoading ? (
        <div className="glass-effect p-6 text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-effect p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <p className="text-lg font-semibold mb-2">No projects yet</p>
          <p className="text-muted-foreground mb-6">Create your first AI-powered website using the builder</p>
          <Link href="/builder">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Start Building
            </Button>
          </Link>
        </div>
      ) : (
        <div className="glass-effect overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Project Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{project.createdAt}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{project.updatedAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/builder/${project.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        {project.status === "published" && project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
