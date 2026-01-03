"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out BuildAI",
      features: ["5 websites", "Basic AI generation", "Custom domain", "Community support", "Monthly deployments: 50"],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For active creators and small teams",
      features: [
        "Unlimited websites",
        "Advanced AI generation",
        "Custom domains",
        "Priority email support",
        "Monthly deployments: 1000",
        "Advanced analytics",
        "API access",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and agencies",
      features: [
        "Everything in Professional",
        "Dedicated support",
        "Custom integrations",
        "White-label options",
        "Advanced security",
        "SLA guarantee",
        "Priority AI queue",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you. No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`glass-effect p-8 rounded-2xl flex flex-col ${plan.highlighted ? "ring-2 ring-primary scale-105" : ""}`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold w-fit">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                </div>

                <Link href="/signup" className="mb-6">
                  <Button
                    className={`w-full font-semibold ${
                      plan.highlighted
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "border-border/50 bg-transparent hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground mb-4">FEATURES</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-soft">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel anytime without penalties. Your access continues until the end of your billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Our Starter plan is completely free. Upgrade anytime if you need more features.",
              },
              {
                q: "Can I change plans later?",
                a: "Absolutely. You can upgrade or downgrade your plan at any time with changes taking effect immediately.",
              },
            ].map((faq, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg">
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
