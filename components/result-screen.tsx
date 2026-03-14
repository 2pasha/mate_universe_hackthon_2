"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Download, Heart, Link2, Loader2, Maximize2, Pause, Play, RefreshCw, Share2, Twitter } from "lucide-react"

interface ResultScreenProps {
  tryOnImageUrl: string
  videoUrl: string
  onReset: () => void
}

type ViewMode = "video" | "image"

export function ResultScreen({ tryOnImageUrl, videoUrl, onReset }: ResultScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("video")
  const [isPlaying, setIsPlaying] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleFullscreen = () => {
    if (!videoRef.current) return
    videoRef.current.requestFullscreen()
  }

  const handleDownload = async () => {
    const url = viewMode === "video" ? videoUrl : tryOnImageUrl
    const filename = viewMode === "video" ? "tryon-360-video.mp4" : "tryon-image.jpg"

    setIsDownloading(true)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(url, "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-green-500">
          <Check className="h-4 w-4" />
          <span className="text-sm font-medium">Generation Complete</span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
          Your Virtual Try-On is Ready
        </h2>
        <p className="mt-2 text-muted-foreground">AI-generated try-on image and 360° video</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setViewMode("video")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            viewMode === "video"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          360° Video
        </button>
        <button
          onClick={() => setViewMode("image")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            viewMode === "image"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          Try-On Image
        </button>
      </div>

      <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl">
        {viewMode === "video" ? (
          <div className="group relative flex justify-center bg-black">
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              playsInline
              className="max-h-[70vh] w-auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </div>
            </button>
          </div>
        ) : (
          <div className="flex justify-center bg-secondary">
            <img
              src={tryOnImageUrl}
              alt="Virtual try-on result"
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border/50 bg-card/50 px-4 py-3">
          <div className="flex items-center gap-2">
            {viewMode === "video" && (
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            )}
            <span className="text-sm text-muted-foreground">
              {viewMode === "video" ? "AI Generated 360° View" : "AI Try-On Result"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {viewMode === "video" && (
              <button
                onClick={handleFullscreen}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
                title="Fullscreen"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                isSaved ? "bg-pink-500/20 text-pink-500" : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90" onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isDownloading ? "Downloading..." : `Download ${viewMode === "video" ? "Video" : "Image"}`}
        </Button>

        <div className="relative">
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          {showShareMenu && (
            <div className="absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-border/50 bg-card/95 shadow-xl backdrop-blur-xl">
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary">
                <Twitter className="h-4 w-4" />
                Share on Twitter
              </button>
            </div>
          )}
        </div>

        <Button size="lg" variant="outline" className="gap-2" onClick={onReset}>
          <RefreshCw className="h-4 w-4" />
          Try Another
        </Button>
      </div>

      <div className="flex items-center justify-center gap-8 text-center">
        <div>
          <div className="text-2xl font-bold text-primary">2-Step</div>
          <div className="text-sm text-muted-foreground">AI Pipeline</div>
        </div>
        <div className="h-8 w-px bg-border" />
        <div>
          <div className="text-2xl font-bold text-primary">HD</div>
          <div className="text-sm text-muted-foreground">Video Quality</div>
        </div>
        <div className="h-8 w-px bg-border" />
        <div>
          <div className="text-2xl font-bold text-primary">360°</div>
          <div className="text-sm text-muted-foreground">View Angles</div>
        </div>
      </div>
    </div>
  )
}
