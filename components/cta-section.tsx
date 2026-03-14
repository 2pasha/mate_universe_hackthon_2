import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-12 text-center md:p-20">
          {/* Background effects */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Ready to transform your shopping experience?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join thousands of users who never buy ill-fitting clothes again. Start your free trial today.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="gap-2 bg-primary px-8 hover:bg-primary/90">
                <Link href="/try">
                  Try WearAI Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border/60 bg-transparent">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. 3 free try-ons included.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
