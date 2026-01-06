"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function PublishedSitePage() {
  const params = useParams()
  const id = params.id as string
  const [htmlContent, setHtmlContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Retrieve the HTML from sessionStorage or localStorage
    const storedDeployment = sessionStorage.getItem(`deployment_${id}`) || localStorage.getItem(`deployment_${id}`)

    if (storedDeployment) {
      try {
        const deployment = JSON.parse(storedDeployment)
        setHtmlContent(deployment.html)
      } catch (error) {
        console.error("[v0] Failed to parse deployment:", error)
      }
    }
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">Loading website...</div>
      </div>
    )
  }

  if (!htmlContent) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">Website not found</div>
      </div>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}
