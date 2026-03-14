"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out WearAI",
    price: "$0",
    period: "forever",
    features: [
      "3 try-on videos per month",
      "Standard quality output",
      "Basic clothing detection",
      "24-hour photo storage",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For fashion enthusiasts",
    price: "$19",
    period: "per month",
    features: [
      "50 try-on videos per month",
      "HD video quality",
      "Advanced AI processing",
      "Priority processing queue",
      "Download in multiple formats",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    description: "For teams and retailers",
    price: "$99",
    period: "per month",
    features: [
      "Unlimited try-on videos",
      "4K video quality",
      "API access",
      "Custom branding",
      "Analytics dashboard",
      "White-label solution",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that works best for you. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                plan.popular
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border/50 bg-card/30 hover:border-border'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        plan.popular ? 'bg-primary/20' : 'bg-secondary'
                      }`}>
                        <Check className={`h-3 w-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Have questions?{" "}
          <a href="#" className="text-primary underline-offset-4 hover:underline">
            Check out our FAQ
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary underline-offset-4 hover:underline">
            contact us
          </a>
        </p>
      </div>
    </section>
  )
}
