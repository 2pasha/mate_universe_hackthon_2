# WearAI

AI-powered virtual clothing try-on. Upload your photo and a garment image — WearAI dresses you in the outfit and generates a cinematic 360° video.

## How it works

1. **Upload your photo** — full-body photo of yourself
2. **Add clothing** — upload a garment image or paste a product URL
3. **AI try-on** — [FASHN v1.5](https://fal.ai/models/fal-ai/fashn/tryon) fits the garment onto your photo
4. **360° video** — [Kling Video 2.1 Pro](https://fal.ai/models/fal-ai/kling-video/v2.1/pro/image-to-video) generates a cinematic turntable rotation from the result
5. **Download or share** — save the video or image directly from the result screen

Past generations are saved to localStorage and accessible from the History page.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (New York style) |
| AI — Try-on | fal.ai `fal-ai/fashn/tryon/v1.5` |
| AI — Video | fal.ai `fal-ai/kling-video/v2.1/pro/image-to-video` |
| Storage | localStorage (client-side history) |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your fal.ai API key

Create a `.env.local` file in the project root:

```
FAL_KEY=your_fal_api_key_here
```

Get your key at [fal.ai/dashboard](https://fal.ai/dashboard).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx                  # Landing page
  try/page.tsx              # Try-on wizard + result
  history/page.tsx          # Full history browser
  api/
    try-on/route.ts         # Step 1: FASHN virtual try-on
    generate-video/route.ts # Step 2: Kling 360° video
    fal/proxy/route.ts      # fal.ai proxy (keeps API key server-side)

components/
  upload-wizard.tsx         # 3-step upload flow
  processing-screen.tsx     # Two-phase progress with real API calls
  result-screen.tsx         # Video/image viewer with download + fullscreen
  history-panel.tsx         # Horizontal scrollable history strip
  navbar.tsx
  ...

lib/
  fal.ts                    # fal.ai client config
  history.ts                # localStorage read/write utilities
```

## API routes

| Route | Method | Description |
|---|---|---|
| `POST /api/try-on` | `multipart/form-data` | Accepts `photo` (File) + `clothing` (File) or `clothingUrl` (string). Uploads to fal storage, runs FASHN try-on, returns `{ imageUrl }` |
| `POST /api/generate-video` | `application/json` | Accepts `{ imageUrl }`. Runs Kling image-to-video, returns `{ videoUrl }` |
| `GET /api/fal/proxy` | — | Proxy for client-side fal.ai calls |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `FAL_KEY` | Yes | fal.ai API key from [fal.ai/dashboard](https://fal.ai/dashboard) |

## Deployment notes

- The video generation step (`/api/generate-video`) can take up to 3 minutes. `maxDuration = 180` is set on the route. Vercel Hobby plan caps at 60s — upgrade to Pro or use a long-running background job for production.
- fal.ai CDN URLs are used directly; no additional file storage is needed.
