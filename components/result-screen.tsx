"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Download, 
  Share2, 
  RefreshCw, 
  Play, 
  Pause, 
  Maximize2,
  Heart,
  Check,
  Twitter,
  Link2
} from "lucide-react"

interface ResultScreenProps {
  onReset: () => void
}

export function ResultScreen({ onReset }: ResultScreenProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-green-500">
          <Check className="h-4 w-4" />
          <span className="text-sm font-medium">Generation Complete</span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
          Your Virtual Try-On is Ready
        </h2>
        <p className="mt-2 text-muted-foreground">
          Here is your AI-generated try-on video
        </p>
      </div>

      {/* Video Player */}
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl">
        {/* Video Container */}
        <div className="relative aspect-[9/16] max-h-[600px] bg-secondary md:aspect-video">
          {/* Placeholder video content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-full">
              {/* Simulated video with gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
              
              {/* Person silhouette placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-64 w-48 rounded-t-full bg-gradient-to-b from-primary/30 to-accent/30" />
                  <div className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full bg-muted" />
                </div>
              </div>

              {/* Play/Pause overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 transition-opacity hover:opacity-100"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </div>
              </button>

              {/* Video playing indicator */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="text-xs font-medium">Playing</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="flex items-center justify-between border-t border-border/50 bg-card/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <div className="text-sm text-muted-foreground">
              0:08 / 0:15
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                isSaved 
                  ? 'bg-pink-500/20 text-pink-500' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Download Video
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

          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-border/50 bg-card/95 shadow-xl backdrop-blur-xl">
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary">
                <Twitter className="h-4 w-4" />
                Share on Twitter
              </button>
            </div>
          )}
        </div>

        <Button 
          size="lg" 
          variant="outline" 
          className="gap-2"
          onClick={onReset}
        >
          <RefreshCw className="h-4 w-4" />
          Try Another
        </Button>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-8 text-center">
        <div>
          <div className="text-2xl font-bold text-primary">15s</div>
          <div className="text-sm text-muted-foreground">Generation Time</div>
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
