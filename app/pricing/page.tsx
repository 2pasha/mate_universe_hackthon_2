import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Pricing - WearAI",
  description: "Choose the perfect WearAI plan for your needs. From free trials to enterprise solutions.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '64px 64px'
            }}
          />
          <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
          <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
        </div>

        <PricingSection />
      </div>

      <CTASection />
      <Footer />
    </main>
  )
}
