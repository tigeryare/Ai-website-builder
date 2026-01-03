"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

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

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-2xl overflow-hidden glass-effect p-1">
          <div className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 9V7a1 1 0 011-1h8a1 1 0 011 1v2m0 0a2 2 0 100-4H5a2 2 0 100 4m0 0v5a2 2 0 002 2h6a2 2 0 002-2v-5m0 0H5" />
                </svg>
              </div>
              <p className="text-muted-foreground">Your AI-generated website preview</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div>
            <p className="text-3xl font-bold text-primary">10K+</p>
            <p className="text-sm text-muted-foreground mt-1">Sites Created</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-secondary">99.9%</p>
            <p className="text-sm text-muted-foreground mt-1">Uptime</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-accent">5min</p>
            <p className="text-sm text-muted-foreground mt-1">Deploy Time</p>
          </div>
        </div>
      </div>
    </section>
  )
}
