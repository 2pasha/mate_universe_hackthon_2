"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Upload, 
  Link2, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Check,
  ImageIcon,
  Loader2
} from "lucide-react"

interface UploadWizardProps {
  onComplete: (data: { photo: File | null; clothing: { type: 'url' | 'file'; value: string | File } }) => void
}

export function UploadWizard({ onComplete }: UploadWizardProps) {
  const [step, setStep] = useState(1)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [clothingType, setClothingType] = useState<'url' | 'file' | null>(null)
  const [clothingUrl, setClothingUrl] = useState("")
  const [clothingFile, setClothingFile] = useState<File | null>(null)
  const [clothingPreview, setClothingPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isValidatingUrl, setIsValidatingUrl] = useState(false)

  const handlePhotoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }, [])

  const handlePhotoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }, [])

  const handleClothingFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setClothingFile(file)
      setClothingPreview(URL.createObjectURL(file))
      setClothingType('file')
    }
  }, [])

  const handleClothingFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setClothingFile(file)
      setClothingPreview(URL.createObjectURL(file))
      setClothingType('file')
    }
  }, [])

  const handleUrlSubmit = async () => {
    if (!clothingUrl) return
    setIsValidatingUrl(true)
    // Simulate URL validation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setClothingType('url')
    setIsValidatingUrl(false)
    setClothingPreview('/api/placeholder/200/300') // Placeholder for fetched image
  }

  const handleComplete = () => {
    if (photo && (clothingUrl || clothingFile)) {
      onComplete({
        photo,
        clothing: clothingType === 'url' 
          ? { type: 'url', value: clothingUrl }
          : { type: 'file', value: clothingFile! }
      })
    }
  }

  const clearPhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
  }

  const clearClothing = () => {
    setClothingType(null)
    setClothingUrl("")
    setClothingFile(null)
    setClothingPreview(null)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress Indicator */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {step > 1 ? <Check className="h-4 w-4" /> : '1'}
          </div>
          <span className="hidden text-sm font-medium sm:inline">Your Photo</span>
        </div>
        <div className={`h-0.5 w-16 transition-colors ${step > 1 ? 'bg-primary' : 'bg-muted'}`} />
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {step > 2 ? <Check className="h-4 w-4" /> : '2'}
          </div>
          <span className="hidden text-sm font-medium sm:inline">Add Clothing</span>
        </div>
        <div className={`h-0.5 w-16 transition-colors ${step > 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            3
          </div>
          <span className="hidden text-sm font-medium sm:inline">Generate</span>
        </div>
      </div>

      {/* Step 1: Upload Photo */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
              Upload Your Photo
            </h2>
            <p className="mt-2 text-muted-foreground">
              Take or upload a full-body photo for best results
            </p>
          </div>

          {!photoPreview ? (
            <div
              className={`relative flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border/60 bg-card/30 hover:border-primary/50 hover:bg-card/50'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handlePhotoDrop}
              onClick={() => document.getElementById('photo-input')?.click()}
            >
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoSelect}
              />
              
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <p className="mt-6 text-lg font-medium">
                Drag & drop your photo here
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                or click to browse
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Supports JPG, PNG up to 10MB
              </p>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30">
              <img
                src={photoPreview}
                alt="Your photo"
                className="mx-auto max-h-[400px] object-contain"
              />
              <button
                onClick={clearPhoto}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              size="lg"
              className="gap-2"
              disabled={!photo}
              onClick={() => setStep(2)}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Add Clothing */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
              Add Clothing
            </h2>
            <p className="mt-2 text-muted-foreground">
              Paste a product URL or upload a clothing image
            </p>
          </div>

          {!clothingPreview ? (
            <div className="space-y-6">
              {/* URL Input */}
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Link2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Paste Product URL</h3>
                    <p className="text-sm text-muted-foreground">From any online store</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Input
                    type="url"
                    placeholder="https://store.com/product/..."
                    value={clothingUrl}
                    onChange={(e) => setClothingUrl(e.target.value)}
                    className="flex-1 border-border/60 bg-secondary"
                  />
                  <Button 
                    onClick={handleUrlSubmit}
                    disabled={!clothingUrl || isValidatingUrl}
                  >
                    {isValidatingUrl ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Fetch'
                    )}
                  </Button>
                </div>
              </div>

              {/* OR Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-4 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* File Upload */}
              <div
                className={`cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-8 transition-all ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border/60 bg-card/30 hover:border-primary/50 hover:bg-card/50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleClothingFileDrop}
                onClick={() => document.getElementById('clothing-input')?.click()}
              >
                <input
                  id="clothing-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleClothingFileSelect}
                />
                
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <ImageIcon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="mt-4 font-medium">Upload Clothing Image</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Drag & drop or click to browse
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-4">
              <div className="flex items-start gap-4">
                <img
                  src={clothingPreview}
                  alt="Clothing item"
                  className="h-40 w-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="font-medium">
                      {clothingType === 'url' ? 'Product detected' : 'Image uploaded'}
                    </span>
                  </div>
                  {clothingType === 'url' && (
                    <p className="mt-2 truncate text-sm text-muted-foreground">
                      {clothingUrl}
                    </p>
                  )}
                </div>
                <button
                  onClick={clearClothing}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              size="lg"
              className="gap-2"
              disabled={!clothingPreview}
              onClick={() => setStep(3)}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Generate */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
              Ready to Generate
            </h2>
            <p className="mt-2 text-muted-foreground">
              Review your selections and start the AI transformation
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Photo Preview */}
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">Your Photo</p>
              <img
                src={photoPreview!}
                alt="Your photo"
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
            </div>

            {/* Clothing Preview */}
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">Clothing Item</p>
              <div className="flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-secondary">
                {clothingPreview ? (
                  <img
                    src={clothingPreview}
                    alt="Clothing"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setStep(2)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={handleComplete}
            >
              Generate Video
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
