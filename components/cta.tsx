"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of creators building production-ready websites in minutes, not weeks.
        </p>

        <Link href="/signup">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
            Start Building for Free
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground mt-6">No credit card required. No setup fees. Start instantly.</p>
      </div>
    </section>
  )
}
