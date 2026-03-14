import { Upload, Link2, Sparkles, Video } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Photo",
    description: "Take a full-body photo or upload an existing one. Our AI works with any body type.",
  },
  {
    icon: Link2,
    title: "Add Clothing",
    description: "Paste a product URL from any store, or upload clothing images directly.",
  },
  {
    icon: Sparkles,
    title: "AI Magic",
    description: "Our advanced AI processes your inputs and generates a realistic try-on video.",
  },
  {
    icon: Video,
    title: "View & Share",
    description: "Preview your result, download the video, or share it directly with friends.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to virtually try on any outfit
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="group relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="absolute -top-2 right-1/2 translate-x-8 text-xs font-medium text-muted-foreground">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                  <step.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
