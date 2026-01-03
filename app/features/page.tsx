"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Features() {
  const features = [
    {
      title: "AI-Powered Generation",
      description: "Describe your vision in natural language and our AI generates fully functional websites instantly.",
      icon: "⚡",
      color: "from-primary/20 to-primary/5",
    },
    {
      title: "Visual Editor",
      description: "Fine-tune every detail with our intuitive visual builder. No coding knowledge required.",
      icon: "🎨",
      description: "Refine colors, fonts, layouts, and components with a drag-and-drop interface.",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      title: "One-Click Deploy",
      description: "Deploy to production with a single click. We handle hosting, SSL, and maintenance.",
      icon: "🚀",
      color: "from-accent/20 to-accent/5",
    },
    {
      title: "Responsive Design",
      description: "Every website is automatically optimized for mobile, tablet, and desktop screens.",
      icon: "📱",
      color: "from-primary/20 to-primary/5",
    },
    {
      title: "SEO Optimized",
      description: "Built-in SEO best practices help your site rank higher in search results.",
      icon: "🔍",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      title: "Custom Domain",
      description: "Connect your own domain or use our free subdomain with automatic SSL certificates.",
      icon: "🌐",
      color: "from-accent/20 to-accent/5",
    },
    {
      title: "API Integration",
      description: "Connect to popular services like Stripe, Slack, and more with pre-built integrations.",
      icon: "⚙️",
      color: "from-primary/20 to-primary/5",
    },
    {
      title: "Analytics Dashboard",
      description: "Track visitors, conversions, and performance metrics with detailed analytics.",
      icon: "📊",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      title: "Version Control",
      description: "Rollback to previous versions anytime. Keep a complete history of all changes.",
      icon: "⏱️",
      color: "from-accent/20 to-accent/5",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">Powerful Features for Creators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build professional websites without limitations.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass-effect p-6 bg-gradient-to-br ${feature.color} hover:bg-white/8 transition duration-300 group`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center glass-effect p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to experience the power?</h2>
          <p className="text-muted-foreground mb-6">Start building amazing websites today. No credit card required.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
