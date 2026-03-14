"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { UploadWizard } from "@/components/upload-wizard"
import { ProcessingScreen } from "@/components/processing-screen"
import { ResultScreen } from "@/components/result-screen"
import { HistoryPanel } from "@/components/history-panel"
import { saveEntry } from "@/lib/history"
import type { HistoryEntry } from "@/lib/history"
import { Shield } from "lucide-react"

type AppState = "upload" | "processing" | "result"

export interface UploadData {
  photo: File
  clothing: { type: "url" | "file"; value: string | File }
}

export interface ResultData {
  tryOnImageUrl: string
  videoUrl: string
}

export default function TryPage() {
  const [state, setState] = useState<AppState>("upload")
  const [uploadData, setUploadData] = useState<UploadData | null>(null)
  const [resultData, setResultData] = useState<ResultData | null>(null)
  const [activeHistoryId, setActiveHistoryId] = useState<string | undefined>(undefined)

  const handleUploadComplete = (data: UploadData) => {
    setUploadData(data)
    setState("processing")
  }

  const handleProcessingComplete = (data: ResultData) => {
    const entry = saveEntry(data)
    setActiveHistoryId(entry.id)
    setResultData(data)
    setState("result")
  }

  const handleHistorySelect = (entry: HistoryEntry) => {
    setActiveHistoryId(entry.id)
    setResultData({ tryOnImageUrl: entry.tryOnImageUrl, videoUrl: entry.videoUrl })
    setState("result")
  }

  const handleReset = () => {
    setUploadData(null)
    setResultData(null)
    setActiveHistoryId(undefined)
    setState("upload")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="relative pt-24">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent/20 blur-[128px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-12">
          {state === "upload" && (
            <>
              <UploadWizard onComplete={handleUploadComplete} />
              <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Your photos are encrypted and deleted within 24 hours</span>
              </div>
              <HistoryPanel activeId={activeHistoryId} onSelect={handleHistorySelect} />
            </>
          )}

          {state === "processing" && uploadData && (
            <ProcessingScreen
              uploadData={uploadData}
              onComplete={handleProcessingComplete}
              onError={handleReset}
            />
          )}

          {state === "result" && resultData && (
            <>
              <ResultScreen
                tryOnImageUrl={resultData.tryOnImageUrl}
                videoUrl={resultData.videoUrl}
                onReset={handleReset}
              />
              <HistoryPanel activeId={activeHistoryId} onSelect={handleHistorySelect} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
