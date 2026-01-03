"use client"

export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "AI-Powered Generation",
      description: "Describe your vision in plain text. Our AI generates beautiful, functional websites instantly.",
    },
    {
      icon: "🎨",
      title: "Smart Design System",
      description: "Automatically adapts colors, layouts, and typography based on your brand and content.",
    },
    {
      icon: "🚀",
      title: "One-Click Deploy",
      description: "Deploy your website to production with a single click. No DevOps knowledge needed.",
    },
    {
      icon: "🔧",
      title: "Full Customization",
      description: "Edit, refine, and customize every element through an intuitive visual builder.",
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "Your site looks perfect on mobile, tablet, and desktop. Mobile-first by default.",
    },
    {
      icon: "⚙️",
      title: "Backend Ready",
      description: "Includes API structure, authentication, and database integration support.",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build, customize, and deploy professional websites without any technical limitations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect p-6 hover:bg-white/8 transition duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
