"use client"

import { useEffect, useState } from "react"
import { Sparkles, Shirt, User, Wand2 } from "lucide-react"

interface ProcessingScreenProps {
  onComplete: () => void
}

const processingSteps = [
  { icon: User, label: "Analyzing your photo", duration: 2000 },
  { icon: Shirt, label: "Processing clothing item", duration: 2500 },
  { icon: Wand2, label: "Applying AI magic", duration: 3000 },
  { icon: Sparkles, label: "Generating video", duration: 2500 },
]

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalDuration = processingSteps.reduce((acc, step) => acc + step.duration, 0)
    let elapsed = 0

    const progressInterval = setInterval(() => {
      elapsed += 100
      setProgress(Math.min((elapsed / totalDuration) * 100, 100))
    }, 100)

    let stepTimeout: NodeJS.Timeout
    
    const runStep = (stepIndex: number) => {
      if (stepIndex >= processingSteps.length) {
        clearInterval(progressInterval)
        setTimeout(onComplete, 500)
        return
      }

      setCurrentStep(stepIndex)
      stepTimeout = setTimeout(() => {
        runStep(stepIndex + 1)
      }, processingSteps[stepIndex].duration)
    }

    runStep(0)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(stepTimeout)
    }
  }, [onComplete])

  const CurrentIcon = processingSteps[currentStep]?.icon || Sparkles

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      {/* Animation Container */}
      <div className="relative mb-12">
        {/* Outer rings */}
        <div className="absolute inset-0 -m-8 animate-ping rounded-full border-2 border-primary/20" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-0 -m-4 animate-ping rounded-full border border-primary/30" style={{ animationDuration: '1.5s' }} />
        
        {/* Main container */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          {/* Rotating gradient ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, oklch(0.58 0.22 285), transparent)',
              animation: 'spin 2s linear infinite'
            }}
          />
          
          {/* Inner circle */}
          <div className="absolute inset-2 rounded-full bg-background" />
          
          {/* Icon */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <CurrentIcon className="h-12 w-12 text-primary animate-pulse" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -right-4 top-0 h-3 w-3 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '0s' }} />
        <div className="absolute -left-2 bottom-8 h-2 w-2 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '0.3s' }} />
        <div className="absolute -right-6 bottom-4 h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: '0.6s' }} />
      </div>

      {/* Processing Text */}
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
          Creating Your Try-On
        </h2>
        <p className="mt-3 text-lg text-primary">
          {processingSteps[currentStep]?.label}...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-full max-w-md">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Step Indicators */}
      <div className="mt-10 flex items-center gap-3">
        {processingSteps.map((step, index) => (
          <div
            key={step.label}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              index < currentStep
                ? 'bg-primary text-primary-foreground'
                : index === currentStep
                ? 'bg-primary/20 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            <step.icon className="h-5 w-5" />
          </div>
        ))}
      </div>

      {/* Estimated Time */}
      <p className="mt-8 text-sm text-muted-foreground">
        Estimated time remaining: ~{Math.ceil((100 - progress) / 10)} seconds
      </p>
    </div>
  )
}
