"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-primary">✨ Powered by AI</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Build Stunning Websites in Seconds
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your ideas into production-ready websites using cutting-edge AI. No coding required. Deploy
          instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Start Building Now
            </Button>
          </Link>
          <Link href="/docs">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border/50 hover:bg-muted/50 bg-transparent cursor-pointer transition-all"
            >
              View Documentation
            </Button>
          </Link>
        </div>

        {/* Hero Preview Card - Enhanced styling to match mockup design */}
        <div className="mt-16 rounded-3xl overflow-hidden glass-effect p-1 max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-cyan-900/40 aspect-video flex flex-col items-center justify-center border border-primary/20">
            {/* Icon */}
            <div className="w-20 h-20 mb-4 bg-slate-700/50 rounded-full flex items-center justify-center border border-primary/30">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a1 1 0 011-1h8a1 1 0 011 1v2m0 0a2 2 0 100-4H5a2 2 0 100 4m0 0v5a2 2 0 002 2h6a2 2 0 002-2v-5m0 0H5" />
              </svg>
            </div>
            <p className="text-muted-foreground text-lg">Your AI-generated website preview</p>
          </div>
        </div>

        {/* Stats - Improved spacing and styling */}
        <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              10K+
            </p>
            <p className="text-sm text-muted-foreground mt-2">Sites Created</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              99.9%
            </p>
            <p className="text-sm text-muted-foreground mt-2">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              5min
            </p>
            <p className="text-sm text-muted-foreground mt-2">Deploy Time</p>
          </div>
        </div>
      </div>
    </section>
  )
}
