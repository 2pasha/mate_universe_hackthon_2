import { NextRequest, NextResponse } from "next/server"
import { fal } from "@/lib/fal"

export const maxDuration = 120

interface FashnOutput {
  images: Array<{ url: string; content_type: string; file_name: string; file_size: number }>
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const photoFile = formData.get("photo") as File | null
    const clothingFile = formData.get("clothing") as File | null
    const clothingUrl = formData.get("clothingUrl") as string | null

    if (!photoFile) {
      return NextResponse.json({ error: "Person photo is required" }, { status: 400 })
    }

    if (!clothingFile && !clothingUrl) {
      return NextResponse.json({ error: "Clothing image or URL is required" }, { status: 400 })
    }

    const modelImageUrl = await fal.storage.upload(photoFile)

    const garmentImageUrl = clothingFile
      ? await fal.storage.upload(clothingFile)
      : (clothingUrl as string)

    const result = await fal.subscribe("fal-ai/fashn/tryon/v1.5", {
      input: {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
        category: "auto",
        mode: "balanced",
        garment_photo_type: "auto",
        num_samples: 1,
        output_format: "jpeg",
      },
    })

    const output = result.data as FashnOutput
    const imageUrl = output?.images?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: "No image was generated" }, { status: 500 })
    }

    return NextResponse.json({ imageUrl })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Try-on failed"
    console.error("[try-on]", message)

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
