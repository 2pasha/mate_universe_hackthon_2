"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useRef, useState } from "react"

export function HeroSection() {
  const [sliderValue, setSliderValue] = useState(52)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const dividerStyle = useMemo(() => ({ left: `${sliderValue}%` }), [sliderValue])
  const beforeClipStyle = useMemo(
    () => ({
      clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
      WebkitClipPath: `inset(0 ${100 - sliderValue}% 0 0)`
    }),
    [sliderValue]
  )

  const updateFromPointer = (clientX: number) => {
    const node = sliderRef.current
    if (!node) return
    const { left, width } = node.getBoundingClientRect()
    const positionX = Math.min(Math.max(clientX - left, 0), width)
    const nextValue = Math.round((positionX / width) * 100)
    setSliderValue(nextValue)
  }

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

          {/* CTA Button */}
          <div className="mt-10 flex">
            <Button size="lg" asChild className="gap-2 bg-primary px-8 hover:bg-primary/90">
              <Link href="/try">
                Try on your first outfit — free
                <ArrowRight className="h-4 w-4" />
              </Link>
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
              <span className="font-semibold text-foreground">save 10,000</span> of your nerves
            </div>
          </div>
        </div>

        {/* Right Content - Before/After Slider */}
        <div className="mt-16 flex-1 lg:mt-0">
          <div className="relative mx-auto max-w-lg">
            {/* Glassmorphism card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-2 backdrop-blur-xl">
              {/* Before/After Slider */}
              <div
                ref={sliderRef}
                className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary select-none"
                style={{ touchAction: "none" }}
                onPointerDown={(event) => {
                  event.preventDefault()
                  setIsDragging(true)
                  updateFromPointer(event.clientX)
                  event.currentTarget.setPointerCapture(event.pointerId)
                }}
                onPointerMove={(event) => {
                  if (isDragging) updateFromPointer(event.clientX)
                }}
                onPointerUp={() => setIsDragging(false)}
                onPointerLeave={() => setIsDragging(false)}
                onPointerCancel={() => setIsDragging(false)}
              >
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src="/hero-after.png"
                    alt="After"
                    fill
                    className="object-cover object-center select-none"
                    draggable={false}
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0" style={beforeClipStyle}>
                  <Image
                    src="/hero-before.png"
                    alt="Before"
                    fill
                    className="object-cover object-center select-none"
                    draggable={false}
                    priority
                  />
                </div>

                {/* Divider */}
                <div className="absolute inset-y-0" style={dividerStyle}>
                  <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-primary/80" />
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-background/80 p-2 shadow-lg backdrop-blur">
                    <div className="h-10 w-10 rounded-full bg-primary/90" />
                  </div>
                </div>

                {/* Range input */}
                <input
                  aria-label="Before and after slider"
                  className="pointer-events-none absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                  max={100}
                  min={0}
                  onChange={(event) => setSliderValue(Number(event.target.value))}
                  type="range"
                  value={sliderValue}
                />

                {/* Labels */}
                <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur-sm">
                  Before
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-primary/80 px-3 py-1 text-xs text-primary-foreground backdrop-blur-sm">
                  After
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 top-1/4 rounded-lg border border-border/50 bg-card/80 p-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary/20" />
                <div>
                  <div className="text-xs font-medium">Product detected</div>
                  <div className="text-xs text-muted-foreground">Black Jacket</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/4 rounded-lg border border-border/50 bg-card/80 p-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                  <Zap className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-xs font-medium">Rendering your look</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
