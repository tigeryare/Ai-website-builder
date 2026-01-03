"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-lg text-foreground">Team Ten</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition">
              Docs
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="cursor-pointer hover:bg-muted/50 transition-colors">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-all hover:shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-border/50 pt-4 space-y-3">
            <Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="/docs" className="block text-sm text-muted-foreground hover:text-foreground transition">
              Docs
            </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="w-full">
                <Button variant="ghost" size="sm" className="w-full cursor-pointer" onClick={() => setIsOpen(false)}>
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
