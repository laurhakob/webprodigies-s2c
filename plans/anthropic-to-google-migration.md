# Migrate AI Provider: Anthropic → Google Gemini

## Context

The project currently generates UI HTML and style guides through the Anthropic API via the Vercel AI SDK (`@ai-sdk/anthropic`). Opus 4 is expensive (≈$15/$75 per Mtok input/output), which squeezes margins on the $9.99/10-credit plan — a single `streamText` call with ~5K system prompt tokens and ~8K HTML output costs roughly $0.60–0.70 in raw model spend.

We are migrating to Google Gemini 2.5 Flash across all generation routes. Per user decision, Flash is used everywhere (including HTML generation) to maximise cost savings (~97% reduction vs Opus 4). The codebase already sits on Vercel AI SDK, which abstracts provider differences — so the migration is almost entirely a provider-swap, not a rewrite.

The API key is already in `.env.local` as `GOOGLE_GENERATIVE_AI_API_KEY` (the exact env var name the `@ai-sdk/google` provider reads automatically).

## Decision: Model

All 5 generation routes → `google("gemini-2.5-flash")`.

Rationale: streaming + vision + structured output are all first-class on Gemini 2.5 Flash. The Vercel AI SDK's message format (`{ type: "image", image: base64|url }`) is provider-portable, so image inputs carry over unchanged. `generateObject` with a Zod schema is supported on Gemini via `responseSchema` under the hood. If a quality regression appears on the main HTML route after testing, that single route can be upgraded to `gemini-2.5-pro` independently.

## Migration Steps

### Step 1 — Install the Google provider, remove Anthropic provider

```
npm uninstall @ai-sdk/anthropic
npm install @ai-sdk/google
```

- `ai@^5.0.15` stays as-is (core SDK is provider-agnostic).
- `@ai-sdk/google` should match AI SDK v5 (currently `^2.x`).

### Step 2 — Swap the provider import + model ID in every generation route

Pattern (applied identically to all 5 routes):

```diff
- import { anthropic } from "@ai-sdk/anthropic";
+ import { google } from "@ai-sdk/google";

- model: anthropic("claude-opus-4-20250514"),
+ model: google("gemini-2.5-flash"),
```

The `messages`, `system`, `temperature`, image content blocks, `streamText` / `generateObject` calls, `ReadableStream` wrapping, and response headers all stay identical — Vercel AI SDK normalises them across providers.

Files to edit (exact call-sites surfaced during exploration):

| File | Current line | Change |
|---|---|---|
| `src/app/api/generate/route.ts` | line 1 import; line 129 `anthropic("claude-opus-4-20250514")` | swap import + model |
| `src/app/api/generate/redesign/route.ts` | line 2 import; line 138 `anthropic("claude-opus-4-20250514")` | swap import + model |
| `src/app/api/generate/workflow/route.ts` | line 2 import; line 171 `anthropic("claude-opus-4-20250514")` | swap import + model |
| `src/app/api/generate/workflow-redesign/route.ts` | line 2 import; line 110 `anthropic("claude-opus-4-20250514")` | swap import + model |
| `src/app/api/generate/style/route.ts` | line 2 import; line 171 `anthropic("claude-sonnet-4-20250514")` | swap import + model (still Flash) |

### Step 3 — Environment variables

- `.env.local` already contains `GOOGLE_GENERATIVE_AI_API_KEY` (the provider's default env name — zero-config pickup).
- Delete `ANTHROPIC_API_KEY` from `.env.local` (optional, safe since no code reads it after Step 2).
- Update `CLAUDE.md` Environment Variables block: replace `ANTHROPIC_API_KEY=` line with `GOOGLE_GENERATIVE_AI_API_KEY=`.

### Step 4 — Verify Zod schema compatibility for the style route

`src/app/api/generate/style/route.ts` passes a complex Zod schema (tuples, `.length(N)`, `.regex(...)`, `z.literal(...)`) to `generateObject`. Gemini's `responseSchema` feature (invoked under the hood by the AI SDK) is stricter than Anthropic's about some Zod features:

- `z.tuple([...])` → supported via JSON Schema `prefixItems`. AI SDK handles this.
- `.length(N)` on arrays → translates to `minItems`/`maxItems`. Supported.
- `.regex(...)` on strings → supported as `pattern` in Gemini.
- `z.literal(...)` → supported as `const`/`enum`.
- `.optional()` fields → supported.

Expected to work out of the box. If Gemini rejects the schema at runtime, the fallback is to relax `.length(N)` to `.min(N).max(N)` or drop the `.regex` on `hexColor` and validate post-hoc. This is a contingency, not an expected change.

### Step 5 — Test each route end-to-end

Run `npm run dev` and exercise each flow in the browser:

1. **`/api/generate`** — draw a wireframe frame on canvas + have a style guide + trigger generation. Confirm: HTML streams in, custom `.c-*` color classes render, IDs are kebab-case, credit count drops by 1.
2. **`/api/generate/style`** — open style guide editor, add mood-board images, click Generate. Confirm: JSON returns, all 5 color sections populate with correct swatch counts (4/4/6/3/2), 3 typography sections render, credit drops by 1. Watch for schema validation errors in the server console.
3. **`/api/generate/redesign`** — from an existing generated UI, use the chat panel to request a change. Confirm: wireframe snapshot + current HTML get sent, new HTML streams back, credit drops by 1.
4. **`/api/generate/workflow`** — generate a complementary page (Dashboard / Settings / Profile / Data Listing). Confirm: HTML streams, credit drops by 1.
5. **`/api/generate/workflow-redesign`** — redesign a workflow page via chat (text-only, no image). Confirm: HTML streams, credit drops by **4** (this route's higher cost is app-level, unchanged).

Spot-check rendered output quality against a known-good Opus 4 generation: color contrast (WCAG AA), spacing (`py-16 px-6` minimum), section semantics, no Tailwind arbitrary colors. If Flash produces visibly worse HTML on route #1 (main generation), upgrade just that one route to `google("gemini-2.5-pro")` — change isolated to a single line.

### Step 6 — Clean up references

- Update the "AI Generation" section in `CLAUDE.md` where it says "streams Tailwind HTML using Claude Opus 4 vision" → reference Gemini 2.5 Flash.
- Run `npm run lint` to catch any stray imports.

## Critical Files (Summary)

- `src/app/api/generate/route.ts`
- `src/app/api/generate/style/route.ts`
- `src/app/api/generate/redesign/route.ts`
- `src/app/api/generate/workflow/route.ts`
- `src/app/api/generate/workflow-redesign/route.ts`
- `package.json` (dependency swap)
- `.env.local` (optional cleanup of `ANTHROPIC_API_KEY`)
- `CLAUDE.md` (docs refresh)

## Non-changes (important)

Nothing else needs to move:

- Client stream parser in `src/hooks/use-canvas.ts` — reads raw text, provider-agnostic.
- RTK Query services in `src/redux/api/generation/` — HTTP contract unchanged.
- Canvas snapshot pipeline (`src/lib/frame-snapshot.ts`) — still produces PNG base64, Gemini accepts identical format via AI SDK.
- Credit ledger / Convex (`ConsumeCreditsQuery`, `CreditsBalanceQuery`) — app-level, provider-independent. Credit costs (1 / 1 / 1 / 1 / 4) stay the same.
- All prompts in `src/prompts/index.ts` — Gemini handles the same system-prompt shape; no rewrite needed.
- Inngest workflows, Polar billing, middleware, auth — untouched.

## Verification Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds (type-checks Gemini provider types / linting and type check is disabled in our next config file, no need to cehck types or lint erors, there might be some minor errors which prevent build process, but doesnt affect on project at all)
- [ ] All 5 routes tested manually in browser per Step 5
- [ ] Style guide route returns Zod-valid JSON (no schema rejection errors in console)
- [ ] Credits deduct correctly (1 credit for routes 1–4, 4 credits for workflow-redesign)
- [ ] HTML output quality subjectively acceptable vs. prior Opus 4 output; if not, escalate route 1 to `gemini-2.5-pro`
