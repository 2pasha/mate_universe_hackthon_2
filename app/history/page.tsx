"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { deleteEntry, getEntries, type HistoryEntry } from "@/lib/history"
import { Clock, Download, Pause, Play, Plus, Trash2, Video } from "lucide-react"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function EntryViewer({ entry, onClose }: { entry: HistoryEntry; onClose: () => void }) {
  const [viewMode, setViewMode] = useState<"video" | "image">("video")
  const [isPlaying, setIsPlaying] = useState(true)

  const handleDownload = () => {
    const url = viewMode === "video" ? entry.videoUrl : entry.tryOnImageUrl
    const filename = viewMode === "video" ? "tryon-360-video.mp4" : "tryon-image.jpg"
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <DialogContent className="max-w-2xl border-border/50 bg-card/95 p-0 backdrop-blur-xl">
      <DialogTitle className="sr-only">Try-on result from {formatDate(entry.createdAt)}</DialogTitle>

      <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
        <div>
          <p className="font-semibold">Virtual Try-On Result</p>
          <p className="text-sm text-muted-foreground">{formatDate(entry.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("video")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              viewMode === "video"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            360° Video
          </button>
          <button
            onClick={() => setViewMode("image")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              viewMode === "image"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Image
          </button>
        </div>
      </div>

      <div className="bg-secondary">
        {viewMode === "video" ? (
          <div className="relative aspect-video">
            <video
              src={entry.videoUrl}
              autoPlay
              loop
              playsInline
              className="h-full w-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={(e) => {
                const video = e.currentTarget
                isPlaying ? video.pause() : video.play()
              }}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={entry.tryOnImageUrl}
              alt="Try-on result"
              className="max-h-[500px] w-auto object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <Button size="sm" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download {viewMode === "video" ? "Video" : "Image"}
        </Button>
        <Button size="sm" variant="ghost" onClick={onClose} className="text-muted-foreground">
          Close
        </Button>
      </div>
    </DialogContent>
  )
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [selected, setSelected] = useState<HistoryEntry | null>(null)

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteEntry(id)
    setEntries(getEntries())
    if (selected?.id === id) setSelected(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="relative pt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Your Generations</span>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
                History
              </h1>
              <p className="mt-2 text-muted-foreground">
                {entries.length === 0
                  ? "No generations yet"
                  : `${entries.length} generation${entries.length !== 1 ? "s" : ""} saved`}
              </p>
            </div>

            <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
              <Link href="/try">
                <Plus className="h-4 w-4" />
                New Try-On
              </Link>
            </Button>
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/20 py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">No generations yet</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Try on your first outfit and it will appear here
              </p>
              <Button asChild className="mt-6 gap-2 bg-primary hover:bg-primary/90">
                <Link href="/try">
                  <Plus className="h-4 w-4" />
                  Start Try-On
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/50 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  onClick={() => setSelected(entry)}
                >
                  <div className="aspect-[3/4] bg-secondary">
                    <img
                      src={entry.tryOnImageUrl}
                      alt="Try-on result"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="bg-card/80 px-3 py-2 backdrop-blur-sm">
                    <p className="truncate text-xs text-muted-foreground">{formatDate(entry.createdAt)}</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Play className="h-4 w-4 translate-x-0.5" />
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, entry.id)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && <EntryViewer entry={selected} onClose={() => setSelected(null)} />}
      </Dialog>
    </main>
  )
}
