# Omiya Clinic

Next.js 16 (App Router) + Supabase baseline.

## Setup

```bash
pnpm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
pnpm dev
```

## Stack

- Next.js 16 (App Router, `src/` layout, Turbopack)
- React 19.2
- Tailwind CSS v4
- TypeScript 5
- Supabase (`@supabase/ssr` + `@supabase/supabase-js`)

## Supabase helpers

- `src/lib/supabase/client.ts` — browser client
- `src/lib/supabase/server.ts` — server client (RSC, Server Actions, Route Handlers)
- `src/lib/supabase/proxy.ts` — session refresh helper used by `src/proxy.ts`
- `src/proxy.ts` — Next.js 16 proxy (formerly middleware) that refreshes the session cookie on every request
