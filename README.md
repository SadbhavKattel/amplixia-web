# Amplixia — Website

Production-grade marketing + lead-generation site for Amplixia Private Limited.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma · Server Actions**, deployable to **Vercel** (or any Node 18+ host).

The site is engineered as a real product: typed end-to-end, accessibility- and performance-conscious, security-headered by default, and built around a hardened lead-capture pipeline (Zod validation → rate limit → Turnstile → Resend → Postgres).

---

## Architecture overview

```
src/
├── app/
│   ├── (legal)/           Legal pages (route group, no URL segment)
│   ├── about/             About
│   ├── actions/           Server Actions (typed, server-only)
│   │   └── lead.ts        Lead pipeline: validate → ratelimit → captcha → store → notify
│   ├── book/              Consultation booking page
│   ├── careers/
│   ├── case-studies/
│   ├── contact/           Contact + brief form
│   ├── industries/
│   ├── insights/          Blog placeholder (MDX-ready)
│   ├── services/          Service hub + dynamic [slug] routes
│   ├── solutions/
│   ├── error.tsx          Top-level error boundary
│   ├── globals.css        Tailwind layers + design tokens
│   ├── icon.tsx           Edge-rendered favicon
│   ├── layout.tsx         Root layout: header, footer, JSON-LD
│   ├── not-found.tsx
│   ├── opengraph-image.tsx Edge-rendered OG image
│   ├── page.tsx           Home
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── forms/             Contact form + Turnstile wrapper
│   ├── layout/            Header, Footer, Logo
│   ├── sections/          Composable home/page sections
│   └── ui/                Button, Input, Section, Card, Badge — primitives only
├── content/               Source-of-truth content (services, FAQs, etc.)
└── lib/
    ├── email.ts           Resend transport + lead email template
    ├── env.ts             Zod-validated environment
    ├── hash.ts            Salted SHA-256 (IP triage)
    ├── prisma.ts          Singleton Prisma client
    ├── rate-limit.ts      Upstash sliding window + in-memory dev fallback
    ├── seo.ts             Metadata helper, JSON-LD, site config
    ├── turnstile.ts       Server-side captcha verification
    ├── utils.ts           cn(), absoluteUrl()
    └── validations/lead.ts Lead Zod schema + label maps
```

### Why these choices

- **Server Actions over `/api` routes** for the lead form. They give us typed payloads end-to-end, no client-side network code, and natural progressive enhancement.
- **Static-by-default routes** (Home, Services, About, etc.) — no runtime DB calls on the marketing surface, sub-second TTFB on Vercel.
- **Content as TypeScript** in `src/content/`. Strong typing, great DX, and zero CMS overhead until a CMS is justified. MDX/Sanity can be slotted in for `/insights` without touching the rest.
- **Vendor-neutral lead pipeline.** Resend / Upstash / Turnstile are good defaults; each is swappable behind a small abstraction.

---

## Getting started

```bash
# 1. Install
npm install   # or pnpm install

# 2. Configure env
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SITE_URL at minimum. Other vars enable optional capabilities.

# 3. (Optional) database
# Provision a Postgres (Neon / Supabase / RDS), set DATABASE_URL, then:
npm run db:push        # apply schema to a fresh DB
# Or:
npm run db:migrate     # create a migration (recommended for prod)

# 4. Run
npm run dev
```

The site runs without a database, without Resend, without Upstash, and without Turnstile — those services activate progressively as their env vars are set. The lead form will log to console in fully-bare local mode so you can verify the path end-to-end before wiring infrastructure.

---

## Environment variables

| Var | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, OG) | Recommended |
| `DATABASE_URL` | Postgres connection string | For lead persistence |
| `RESEND_API_KEY` | Resend transactional email | For lead notifications |
| `LEAD_NOTIFICATION_FROM` | `Name <addr>` sender | With Resend |
| `LEAD_NOTIFICATION_TO` | Where lead emails arrive | With Resend |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Distributed rate limit | For prod |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile bot protection | Recommended for prod |

Without `UPSTASH_*` the rate limiter falls back to in-memory (per-instance, fine for low-traffic single-region). Without `TURNSTILE_*` captcha is no-op.

---

## Lead pipeline

The lead-capture path is the hardened part of the system. It runs entirely server-side via a server action:

1. **IP fingerprint** from `x-forwarded-for` / `x-real-ip`.
2. **Sliding-window rate limit** — 5 submissions / 10 min / IP.
3. **Zod validation** with friendly per-field errors.
4. **Honeypot** — silent success for bots that fill the hidden `website` field.
5. **Cloudflare Turnstile** verified server-side against the secret key.
6. **Persist** to Postgres (best-effort; failure does not block the lead).
7. **Notify** via Resend (best-effort; failure does not block the lead).
8. **Audit metadata** — IP **hashed** (not stored raw), user agent, referrer.

Every step is independently optional so a fresh deploy works before infrastructure is wired up.

---

## Content model

`src/content/services.ts` is the source of truth for the services hub and the dynamic
`/services/[slug]` routes (`generateStaticParams` is used — every service page is fully
prerendered). Edit content there; routes and metadata regenerate automatically.

`src/content/case-studies.ts` and `src/content/testimonials.ts` ship intentionally empty.
**We don't fabricate quotes or metrics.** Populate only with real, attributable data.

---

## SEO

- Per-page `<Metadata>` via `pageMetadata()` helper — canonical, OG, Twitter, robots all set.
- `Organization` and `WebSite` JSON-LD on every page (root layout).
- `app/robots.ts` and `app/sitemap.ts` — sitemap includes every static route + every dynamic service slug.
- `opengraph-image.tsx` — edge-rendered, dynamic OG.
- Semantic HTML, single H1 per page, skip-to-content link, focus-visible rings, `prefers-reduced-motion` respected.

---

## Performance

- Static-rendered marketing routes; no runtime DB on the read path.
- Fonts preloaded via `next/font` (Inter, JetBrains Mono).
- `optimizePackageImports` enabled for `lucide-react` and `framer-motion`.
- AVIF/WebP via `next/image`.
- Tailwind purges to per-route CSS; no unused styles ship.

Target: Lighthouse 95+ on Performance / Accessibility / Best Practices / SEO. Verify post-deploy with `npx lighthouse https://<your-deploy>` or PageSpeed Insights.

---

## Security

- Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy headers (see `next.config.ts`).
- `poweredByHeader` disabled.
- Server Actions only — no public lead-write endpoint to abuse.
- Honeypot + Turnstile + rate limit defense in depth.
- IPs hashed at rest, never stored raw.
- HTML-escaped email rendering.
- Input length caps everywhere; Zod is authoritative on all incoming data.

For SOC 2 / ISO alignment in production, add structured logging (e.g. Datadog), a WAF in front of the deployment, automated dependency review, and dependency pinning.

---

## Deploying to Vercel

1. Push to a Git remote and import the repo into Vercel.
2. Set environment variables in the project settings (mirror `.env.example`).
3. `Production Branch: main`. Build command and output are auto-detected.
4. Add the apex + `www` domain. Set `NEXT_PUBLIC_SITE_URL` to the apex URL.
5. (Optional) Add a Vercel Cron to run a periodic lead-export or hygiene job.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm start` | Run production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run db:generate` | Prisma client |
| `npm run db:push` | Push schema (dev) |
| `npm run db:migrate` | Create+apply migration |
| `npm run db:studio` | Prisma Studio |

---

## What's intentionally not included (and why)

- **Fabricated testimonials, logos, or metrics.** Populate from real engagements only.
- **A blog CMS.** `/insights` is wired as a route; drop in MDX or Sanity when there's content to publish.
- **Analytics SDK.** Add Plausible / PostHog / Vercel Analytics intentionally — `app/layout.tsx` is the right place.
- **Auth.** No auth surface exists yet. When admin tooling is needed, add Clerk or Auth.js scoped to `/admin`.

---

## License

Proprietary — © Amplixia Private Limited. All rights reserved.
