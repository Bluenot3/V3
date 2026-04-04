# ZEN Vanguard

ZEN Vanguard is a React and Vite learning platform for AI literacy, agent systems, automation, and beginner-to-builder deployment workflows. It includes gated curriculum modules, a program hub, learner progress tracking, subscription access, and a starter guide that shows how to ship a first Hugging Face Space safely.

The current repository is still a local-first application, but this pass moves it closer to a production baseline by tightening auth and billing behavior, removing client-side secret exposure patterns, simplifying mobile navigation, and adding clearer deployment documentation.

## What is in this app

- Program hub for multiple ZEN learning tracks
- Four core learning modules with interactive labs
- Starter guide for AI, LLMs, automation, and Hugging Face Spaces
- Subscription gating via Stripe-backed server endpoints
- Admin workflow support through server-configured bypass credentials only
- Local API server for Stripe and AI proxy calls

## Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- Routing: React Router
- Data/Auth: Supabase client
- Backend: Express
- Payments: Stripe
- AI proxy: Azure AI / OpenAI-compatible chat completions via backend

## Local development

1. Install dependencies.

```bash
npm install
```

2. Copy the example environment file.

```bash
cp .env.example .env
```

3. Fill in the required environment variables.

4. Start the frontend and API server together.

```bash
npm run dev:full
```

5. Open the frontend at `http://localhost:5173`.

## Preview command

If `vite preview` fails on your machine, the repository now includes a built-in static preview server.
The command now:

- auto-builds `dist` if it is missing
- auto-finds the next open port if `4173` is busy
- auto-starts the API server on `3001` if needed
- keeps server logs visible in the terminal

```bash
npm run preview
```

Optional browser auto-open:

```bash
npm run preview:open
```

Windows launcher (bypasses PowerShell npm script policy issues):

```bat
preview.cmd
```

Default preview URL (first attempt):

- `http://127.0.0.1:4173`

## Production direction

This repository should now follow these rules:

- Do not put private model keys in `VITE_*` environment variables.
- Keep OpenAI, Azure AI, Stripe secret keys, and admin bypass credentials on the server only.
- Use the backend AI proxy route for browser-driven AI interactions.
- Only expose publishable keys to the frontend.
- Test the dashboard, program hub, guide, login flow, paywall flow, and at least one module flow on mobile widths before deployment.

## Environment variables

See [.env.example](/Users/AlexLeschik/OneDrive%20-%20BGCGW/Desktop/Vanguard/VANGUARD/.env.example) for the full list.

### Frontend-safe variables

- `VITE_API_BASE_URL`
- `VITE_ENABLE_DEMO_LOGIN`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Server-only variables

- `API_PORT`
- `AZURE_AI_ENDPOINT`
- `AZURE_AI_KEY`
- `AZURE_AI_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `ADMIN_BYPASS_USERNAME`
- `ADMIN_BYPASS_PASSWORD`
- `CORS_ORIGINS`

## Hugging Face beginner target

The in-app Starter Guide is now the shortest onboarding path for a new learner. At minimum, a beginner should leave this app understanding:

- what AI, machine learning, and LLMs mean
- what automation means beyond prompting
- why secret management matters
- how to deploy one Gradio-based Hugging Face Space
- how to load an API key with `os.getenv(...)`

Minimal Hugging Face README metadata:

```yaml
---
title: My First AI Space
emoji: 🚀
colorFrom: blue
colorTo: cyan
sdk: gradio
sdk_version: 5.49.1
app_file: app.py
pinned: false
short_description: Beginner AI project
---
```

## API server endpoints

- `GET /api/health`
- `POST /api/ai/generate`
- `GET /api/billing/status`
- `POST /api/admin/bypass`
- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/webhook`

## Deployment checklist

- Set every server-only secret in the deployment environment, not in source.
- Configure `CORS_ORIGINS` for the real frontend domain.
- Set Stripe keys and webhook secret before enabling payments.
- Set Azure AI server credentials before enabling live AI features.
- Verify program hub, guide, dashboard, login, paywall, and mobile navigation on a phone viewport.
- Keep `VITE_ENABLE_DEMO_LOGIN=false` in production unless you explicitly want demo access.

## Known follow-up work

This pass improves the architecture and polish, but a full production launch still needs:

- automated tests for auth, billing, and critical routes
- stronger persistence and auditing for admin/billing events
- tighter content QA across all legacy module interactives
- deployment-specific hardening for the final hosting environment
