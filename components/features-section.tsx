import { Shield, Zap, Globe, Palette, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your virtual try-on video in under 15 seconds with our optimized AI pipeline.",
  },
  {
    icon: Globe,
    title: "Any Store, Any Product",
    description: "Works with URLs from Zara, H&M, ASOS, Nike, and thousands of other stores.",
  },
  {
    icon: Palette,
    title: "Realistic Results",
    description: "Our AI understands fabric textures, lighting, and body proportions for lifelike videos.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your photos are encrypted and automatically deleted within 24 hours.",
  },
  {
    icon: Clock,
    title: "Video Output",
    description: "Get a smooth 360-degree video showing the outfit from multiple angles.",
  },
  {
    icon: Users,
    title: "All Body Types",
    description: "Trained on diverse datasets to work beautifully with every body shape and size.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Why Choose WearAI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The most advanced virtual try-on technology available
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-card/50"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
