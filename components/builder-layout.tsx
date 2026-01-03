"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Minimal Sidebar */}
      <div className="w-16 border-r border-border/50 bg-gradient-to-b from-card to-background flex flex-col items-center py-6 space-y-6">
        <Link href="/dashboard" className="p-2 hover:bg-primary/10 rounded-lg transition">
          <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <div className="flex-1" />

        <button className="p-2 hover:bg-primary/10 rounded-lg transition group relative" title="Help">
          <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        <button className="p-2 hover:bg-muted rounded-lg transition" title="Settings">
          <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">AI Website Builder</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-border/50 bg-transparent hover:bg-muted/50">
              Save Draft
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Publish Website
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-6">{children}</div>
      </div>
    </div>
  )
}
