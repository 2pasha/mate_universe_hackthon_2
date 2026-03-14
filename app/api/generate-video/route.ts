import { NextRequest, NextResponse } from "next/server"
import { fal } from "@/lib/fal"

export const maxDuration = 180

interface KlingVideoOutput {
  video: { url: string; content_type: string; file_name: string; file_size: number }
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Try-on image URL is required" }, { status: 400 })
    }

    const result = await fal.subscribe("fal-ai/kling-video/v2.1/pro/image-to-video", {
      input: {
        prompt:
          "Fashion model slowly rotates 360 degrees, full-body turntable view, clean white studio background, smooth cinematic motion, professional fashion showcase",
        image_url: imageUrl,
        duration: "5",
        aspect_ratio: "9:16",
        cfg_scale: 0.5,
        negative_prompt: "blur, distort, low quality, jitter, shaky, jump cut",
      },
    })

    const output = result.data as KlingVideoOutput
    const videoUrl = output?.video?.url

    if (!videoUrl) {
      return NextResponse.json({ error: "No video was generated" }, { status: 500 })
    }

    return NextResponse.json({ videoUrl })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Video generation failed"
    console.error("[generate-video]", message)

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
