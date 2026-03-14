"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, Shirt, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ResultData, UploadData } from "@/app/try/page"

interface ProcessingScreenProps {
  uploadData: UploadData
  onComplete: (data: ResultData) => void
  onError: () => void
}

type PhaseStatus = "pending" | "active" | "done" | "error"

interface Phase {
  id: "tryon" | "video"
  label: string
  subLabel: string
  Icon: React.ElementType
  status: PhaseStatus
}

const initialPhases: Phase[] = [
  {
    id: "tryon",
    label: "Applying Clothing",
    subLabel: "AI is fitting the garment to your photo",
    Icon: Shirt,
    status: "pending",
  },
  {
    id: "video",
    label: "Generating 360° Video",
    subLabel: "Creating cinematic rotation view",
    Icon: Video,
    status: "pending",
  },
]

export function ProcessingScreen({ uploadData, onComplete, onError }: ProcessingScreenProps) {
  const [phases, setPhases] = useState<Phase[]>(initialPhases)
  const [activePhaseId, setActivePhaseId] = useState<"tryon" | "video">("tryon")
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const hasStarted = useRef(false)

  const updatePhaseStatus = (id: Phase["id"], status: PhaseStatus) => {
    setPhases((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const run = async () => {
      try {
        updatePhaseStatus("tryon", "active")
        setActivePhaseId("tryon")
        setProgress(5)

        const formData = new FormData()
        formData.append("photo", uploadData.photo)

        if (uploadData.clothing.type === "file" && uploadData.clothing.value instanceof File) {
          formData.append("clothing", uploadData.clothing.value)
        } else if (uploadData.clothing.type === "url" && typeof uploadData.clothing.value === "string") {
          formData.append("clothingUrl", uploadData.clothing.value)
        }

        const tryOnRes = await fetch("/api/try-on", { method: "POST", body: formData })

        if (!tryOnRes.ok) {
          const { error } = await tryOnRes.json()
          throw new Error(error || "Try-on failed")
        }

        const { imageUrl: tryOnImageUrl } = await tryOnRes.json()
        setProgress(50)
        updatePhaseStatus("tryon", "done")

        updatePhaseStatus("video", "active")
        setActivePhaseId("video")
        setProgress(55)

        const videoRes = await fetch("/api/generate-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: tryOnImageUrl }),
        })

        if (!videoRes.ok) {
          const { error } = await videoRes.json()
          throw new Error(error || "Video generation failed")
        }

        const { videoUrl } = await videoRes.json()
        setProgress(100)
        updatePhaseStatus("video", "done")

        setTimeout(() => onComplete({ tryOnImageUrl, videoUrl }), 600)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong"
        setErrorMessage(message)
        setPhases((prev) => prev.map((p) => (p.status === "active" ? { ...p, status: "error" } : p)))
      }
    }

    run()
  }, [uploadData, onComplete])

  useEffect(() => {
    if (progress >= 100 || errorMessage) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (activePhaseId === "tryon" && prev < 45) return prev + 0.4
        if (activePhaseId === "video" && prev < 92) return prev + 0.2

        return prev
      })
    }, 600)

    return () => clearInterval(interval)
  }, [progress, errorMessage, activePhaseId])

  if (errorMessage) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="mt-6 text-xl font-bold">Something went wrong</h2>
        <p className="mt-2 max-w-sm text-muted-foreground">{errorMessage}</p>
        <Button onClick={onError} variant="outline" className="mt-6">
          Try Again
        </Button>
      </div>
    )
  }

  const activePhase = phases.find((p) => p.id === activePhaseId)
  const ActiveIcon = activePhase?.Icon ?? Shirt

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="relative mb-12">
        <div
          className="absolute inset-0 -m-8 animate-ping rounded-full border-2 border-primary/20"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute inset-0 -m-4 animate-ping rounded-full border border-primary/30"
          style={{ animationDuration: "1.5s" }}
        />

        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, oklch(0.58 0.22 285), transparent)",
              animation: "spin 2s linear infinite",
            }}
          />
          <div className="absolute inset-2 rounded-full bg-background" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <ActiveIcon className="h-12 w-12 animate-pulse text-primary" />
          </div>
        </div>

        <div
          className="absolute -right-4 top-0 h-3 w-3 animate-bounce rounded-full bg-primary/60"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute -left-2 bottom-8 h-2 w-2 animate-bounce rounded-full bg-accent/60"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute -right-6 bottom-4 h-2 w-2 animate-bounce rounded-full bg-primary/40"
          style={{ animationDelay: "0.6s" }}
        />
      </div>

      <div className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
          {activePhase?.label}
        </h2>
        <p className="mt-3 text-lg text-primary">{activePhase?.subLabel}</p>
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
      </div>

      <div className="mt-10 flex items-center gap-4">
        {phases.map((phase, index) => {
          const Icon = phase.Icon
          const isDone = phase.status === "done"
          const isActive = phase.status === "active"

          return (
            <div key={phase.id} className="flex items-center gap-4">
              {index > 0 && (
                <div
                  className={`h-px w-12 transition-colors ${isDone || isActive ? "bg-primary" : "bg-secondary"}`}
                />
              )}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary/20 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-xs font-medium ${isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {phase.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">This may take up to 2–3 minutes. Please keep this tab open.</p>
    </div>
  )
}
