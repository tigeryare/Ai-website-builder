"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { useEffect, useState } from "react"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
