"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 lg:flex-row lg:items-center lg:gap-16 lg:py-32">
        {/* Left Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Virtual Try-On</span>
          </div>

          {/* Headline */}
          <h1 className="text-balance font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Try on clothes{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              before you buy
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
            Upload your photo, paste any product link, and watch AI transform you into a model wearing that outfit in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2 bg-primary px-8 hover:bg-primary/90">
              <Link href="/try">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-border/60 bg-transparent">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Photos deleted after 24h</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">10,000+</span> videos generated
            </div>
          </div>
        </div>

        {/* Right Content - Video Demo */}
        <div className="mt-16 flex-1 lg:mt-0">
          <div className="relative mx-auto max-w-lg">
            {/* Glassmorphism card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-2 backdrop-blur-xl">
              {/* Demo Video Placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
                {/* Before/After Animation */}
                <div className="absolute inset-0 flex">
                  {/* Before side */}
                  <div className="relative flex-1 border-r border-primary/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-4 h-32 w-24 rounded-lg bg-muted" />
                        <span className="text-xs text-muted-foreground">Your Photo</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur-sm">
                      Before
                    </div>
                  </div>
                  {/* After side */}
                  <div className="relative flex-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-4 h-32 w-24 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30" />
                        <span className="text-xs text-muted-foreground">AI Result</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-full bg-primary/80 px-3 py-1 text-xs text-primary-foreground backdrop-blur-sm">
                      After
                    </div>
                  </div>
                </div>
                
                {/* Play button overlay */}
                <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-110">
                  <Play className="h-6 w-6 fill-current" />
                </button>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 top-1/4 rounded-lg border border-border/50 bg-card/80 p-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary/20" />
                <div>
                  <div className="text-xs font-medium">Product detected</div>
                  <div className="text-xs text-muted-foreground">Blue Denim Jacket</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/4 rounded-lg border border-border/50 bg-card/80 p-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                  <Zap className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-xs font-medium">Processing</div>
                  <div className="text-xs text-muted-foreground">~15 seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
