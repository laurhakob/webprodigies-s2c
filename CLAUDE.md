
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

Convex requires a separate terminal:
```bash
npx convex dev     # Run Convex backend in watch mode
```

## Architecture Overview

This is an AI-powered UI design generation SaaS. Users sketch on an infinite canvas, build style guides from mood boards, and generate production-ready Tailwind HTML via Google Gemini.

### Routing

The app uses Next.js 15 App Router with a `(protected)` route group:

- `/` — Landing page
- `/auth/sign-in`, `/auth/sign-up` — Auth pages
- `/dashboard` — Project list
- `/dashboard/[session]/canvas` — Infinite design canvas (main workspace)
- `/dashboard/[session]/style-guide` — Style guide editor
- `/billing/[user]` — Subscription management

`middleware.ts` enforces auth via Convex Auth, protecting `/dashboard/*` and redirecting authenticated users away from `/auth/*`.

### State Management

Redux Toolkit manages all client state. Key slices in `src/redux/slice/`:
- `shapes` — Canvas shapes, selection, active tool
- `viewport` — Zoom level and pan position
- `projects` — User project list
- `profile` — User profile data
- `chat` — AI chat conversation state

RTK Query API services in `src/redux/api/` handle server communication for projects, billing, style guides, and AI generation.

### Canvas System

The main canvas (`src/components/canvas/`) is an infinite SVG canvas with:
- Shapes stored in Redux (`shapes` slice) as normalized entities
- Rendering via SVG shape components in `canvas/shapes/`
- Complex interaction logic (draw, resize, pan, zoom) in `src/hooks/use-canvas.ts`
- Auto-save via Inngest workflows triggered on shape changes

### Backend: Convex

All persistent data lives in Convex. Schema defined in `convex/schema.ts`:
- `projects` — User design projects with serialized canvas state
- `moodboard` / `inspirations` — Reference images for style generation
- `subscriptions` — Polar.sh subscription records
- `credits_ledger` — Credit usage tracking per user

Convex functions (`convex/*.ts`) are called server-side via `convex/nextjs` helpers in page components, and client-side via the `ConvexProvider` in the root layout.

### AI Generation

API routes in `src/app/api/generate/`:
- `route.ts` — Main generation: takes canvas snapshot + style guide, streams Tailwind HTML using Gemini 2.5 Flash vision
- `style/route.ts` — Style guide generation: analyzes mood board images, returns color palette + typography (Zod-validated)
- `redesign/route.ts`, `workflow/route.ts`, `workflow-redesign/route.ts` — Variants for different generation modes

All generation routes check the user's credit balance in Convex before running and deduct credits on success.

Prompts are centralized in `src/prompts/index.ts` with detailed system prompts for style guide and UI generation.

### Background Jobs: Inngest

`src/inngest/functions.ts` defines two workflows:
- `autosaveProjectWorkflow` — Debounced project saves triggered by canvas changes
- `handlePolarEvent` — Processes Polar.sh webhooks to upsert subscriptions and manage credits

Inngest endpoint: `/api/inngest`

### Billing: Polar.sh

- `src/app/api/billing/checkout/route.ts` — Creates checkout sessions
- `src/app/api/billing/webhook/route.ts` — Receives payment events, triggers Inngest
- Subscription state flows: Polar webhook → Inngest → Convex `subscriptions` table

### Path Alias

`@/*` maps to `src/*` throughout the codebase.

### UI Components

shadcn/ui components (new-york style, neutral base, Tailwind v4) in `src/components/ui/`. Add new shadcn components with:
```bash
npx shadcn@latest add <component>
```

## Environment Variables

```
CONVEX_DEPLOYMENT=             # Convex project slug
NEXT_PUBLIC_CONVEX_URL=        # Public Convex endpoint
GOOGLE_GENERATIVE_AI_API_KEY=  # Google Gemini API key
POLAR_ACCESS_TOKEN=            # Polar.sh API token
POLAR_WEBHOOK_SECRET=          # Polar.sh webhook secret
INNGEST_SIGNING_KEY=           # Inngest signing key
INNGEST_EVENT_KEY=             # Inngest event key
```
