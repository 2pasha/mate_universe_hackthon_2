"use client"

import { useEffect, useState } from "react"
import { Clock, X } from "lucide-react"
import { deleteEntry, getEntries, type HistoryEntry } from "@/lib/history"

interface HistoryPanelProps {
  activeId?: string
  onSelect: (entry: HistoryEntry) => void
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

export function HistoryPanel({ activeId, onSelect }: HistoryPanelProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [activeId])

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteEntry(id)
    setEntries(getEntries())
  }

  if (entries.length === 0) return null

  return (
    <div className="mt-12">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Past Generations</span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {entries.length}
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {entries.map((entry) => {
          const isActive = entry.id === activeId

          return (
            <div
              key={entry.id}
              className={`group relative flex-none w-36 cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 ${
                isActive
                  ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "border-border/50 hover:border-primary/50"
              }`}
              onClick={() => onSelect(entry)}
            >
              <div className="aspect-[3/4] bg-secondary">
                <img
                  src={entry.tryOnImageUrl}
                  alt="Try-on result"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="bg-card/80 px-2 py-1.5 backdrop-blur-sm">
                <p className="truncate text-xs text-muted-foreground">{formatDate(entry.createdAt)}</p>
                {isActive && (
                  <p className="mt-0.5 text-xs font-medium text-primary">Viewing</p>
                )}
              </div>

              <button
                onClick={(e) => handleDelete(e, entry.id)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
