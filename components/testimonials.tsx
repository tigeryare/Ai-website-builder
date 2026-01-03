"use client"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechStartup",
      content: "BuildAI saved us weeks of development time. We went from idea to live website in under an hour.",
      avatar: "👩‍💼",
    },
    {
      name: "Marcus Johnson",
      role: "Product Designer",
      content: "The AI understands design principles better than any tool I've used. Absolutely game-changing.",
      avatar: "👨‍💼",
    },
    {
      name: "Elena Rodriguez",
      role: "E-commerce Owner",
      content: "Finally, a tool that lets non-technical people build professional websites. Game changer.",
      avatar: "👩‍🔬",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-soft">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of entrepreneurs and creators building their dreams with BuildAI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-effect p-8 flex flex-col">
              <p className="text-foreground mb-6 flex-1 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
