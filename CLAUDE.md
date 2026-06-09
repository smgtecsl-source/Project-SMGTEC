# CLAUDE.md

## Build & Development Commands

This is a Full-Stack application targetable for deployment on **Cloudflare Pages** utilizing React on the frontend and Cloudflare Pages Functions (`/functions/api`) on the backend.

### Core CLI Scripts
* **Development Server**: `npm run dev` (Runs Vite locally on `http://localhost:3000`)
* **Production Build**: `npm run build` (Vite compilation & prepares output directory in `dist/` with a standard 404 fallback page: `cp dist/index.html dist/404.html`)
* **Linting / Type Checking**: `npm run lint` (`tsc --noEmit` validates TypeScript type safety across the application)
* **Preview Production**: `npm run preview` (Locally preview the production bundle)
* **Clean Project**: `npm run clean` (Removes temporary build directories and files: `rm -rf dist server.js`)

---

## Project Structure & Architecture

```text
├── assets/                  # Shared vector assets and resources
├── functions/               # Cloudflare Pages Functions (Backend Endpoints)
│   └── api/
│       └── calculate-risk.ts # IT risk calculation audit, Turnstile and HubSpot integrations
├── public/                  # Static assets distributed publicly
│   ├── _headers             # Custom Response Headers (Security policies)
│   └── _redirects           # Cloudflare Pages SPA Routing fallback config
├── src/                     # React Client Source
│   ├── components/          # High-fidelity custom components & calculations
│   │   ├── booking/        # Cal.com meeting booking interfaces
│   │   ├── gdpr/            # Cookie dynamic consent banner banners
│   │   ├── industries/      # Industry vertical cards
│   │   └── ...              # Downtime, Risk Calculators, Sovereign Creed, etc.
│   ├── config/              # Shared static properties (WhatsApp, etc.)
│   ├── lib/                 # Core Initializations & SDK configurations
│   │   └── msalConfig.ts    # Microsoft Authentication Library config (caches on localStorage)
│   ├── App.tsx              # Primary layout routing, multi-language context, & main view tree
│   ├── index.css            # Tailwind CSS @import base layer
│   ├── main.tsx             # DOM entry point
│   └── types.ts             # Shared type definitions and application contracts
├── metadata.json            # AI studio config metadata specs
├── package.json             # Manifest of scripts & dependencies
└── vite.config.ts           # Bundler configuration with tailwind/react plugins
```

---

## Code & Integration Guidelines

### 1. Style & Styling
* **Framework**: Tailwind CSS (loaded strictly via `@import "tailwindcss";` in `src/index.css` via `@tailwindcss/vite` plugin).
* **Grid & Bento Layouts**: Use modular cards with high-contrast borders (`border-white/5`), translucent dark backdrops (`bg-neutral-900/60`, `backdrop-blur-md`), and glowing micro-interaction hover styles matching the sleek modern theme.
* **Component Modularity**: Divide distinct interfaces into descriptive TSX files under `/src/components` - do not overload `App.tsx` with bulky component structures.

### 2. TypeScript & Type Safety
* **Imports**: Use explicit named imports at the top-level. Do not use object destructuring for typescript module imports, and avoid using `import type` when dealing with actual enum values.
* **Enums**: Always declare standard TypeScript `enum` models when enforcing structural configurations; do *not* declare `const enum` variants.
* **Type Definitions**: Place all major domain, calculation result, or API contract interface types directly in `src/types.ts`.

### 3. State & Persistence
* **State Engines**: Keep local data interactions backed secure with ephemeral context providers and `localStorage` caching where needed (e.g., storing the user's cookie banner selection or caching specific authorization payloads).
* **MSAL Authentication**: Initialize Microsoft Account login procedures inside `src/lib/msalConfig.ts` mapped with `localStorage` token caches.

### 4. Background Endpoint APIs (Cloudflare Functions)
* **Routing Strategy**: Direct API proxy requests from frontend components directly to `/api/*` endpoints. Behind the scenes, Cloudflare Pages seamlessly maps them to `/functions/api/*`.
* **Environment Integrity**: Access secret keys and integrations via the runtime environment payload:
  * `context.env.HUBSPOT_SERVICE_KEY`: Controls direct lead generation mappings (creates HubSpot contacts, links companies, and initiates Deals under the IT Audit category).
  * `context.env.CLOUDFLARE_TURNSTILE_SECRET_KEY`: Triggers immediate token status verification against `https://challenges.cloudflare.com/turnstile/v0/siteverify` to safeguard API requests.
