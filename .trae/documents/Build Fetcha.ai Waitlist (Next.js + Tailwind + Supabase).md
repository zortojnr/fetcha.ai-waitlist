# Overview
Implement a premium, mobile-first waitlist landing page for fetcha.ai using React (Vite) and Tailwind CSS. Handle form submission via a Supabase Edge Function that inserts into `waitlist_entries` with duplicate email protection. Deliver a deployment-ready project with SEO, glow animations, and fast performance.

## Stack Choice
- React (Vite) for lean SPA and fast builds
- Tailwind CSS for dark, cinematic UI
- Fetch API for form submission
- Supabase (Postgres + Edge Functions) for backend
- `react-helmet-async` for SEO and OG tags

## Project Structure
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- `index.html` with root `#app`
- `src/main.jsx`, `src/App.jsx`
- `src/components/Navbar.jsx`, `src/components/HeroGlow.jsx`, `src/components/BenefitCard.jsx`, `src/components/WaitlistForm.jsx`, `src/components/SocialProof.jsx`, `src/components/Footer.jsx`
- `src/lib/api.js` (`submitWaitlist` uses `fetch`)
- `src/styles/globals.css` for Tailwind base
- `public/favicon.ico`, `public/og.png`, `public/demo.jpg` or lightweight `demo.mp4`
- `.env` with `VITE_WAITLIST_ENDPOINT`

## UI Implementation
- Dark mode base with deep slate background
- Cinematic glow: gradient layers via `HeroGlow`
- Rounded cards, soft shadows, blurred backdrop
- Sections:
  - Navbar: logo text + “Get Early Access” anchor
  - Hero: headline “Turn your product photos into cinematic AI videos”, subtext, CTA, demo asset
  - Benefits: 3–4 cards
  - Waitlist form card: Full Name, Email, Business Type (dropdown), submit
  - Social proof placeholders
  - Footer

## Tailwind Setup & Styling
- Configure `content` paths for `index.html`, `src/**/*.{js,jsx}`
- Extend theme with brand colors (gold/orange glow, deep slate background)
- Utility classes for gradients, hover transitions, focus rings
- CSS keyframes via Tailwind for glow animation

## Form Logic & UX
- Controlled inputs with `useState`
- Client-side validation: required `fullName`, `email`
- Disable button while loading; prevent double submit
- Success and error banners; reset on success
- Duplicate handling based on backend response

## Frontend API Integration
- `src/lib/api.js`:
  - `submitWaitlist({ fullName, email, businessType })`
  - `fetch(import.meta.env.VITE_WAITLIST_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(...) })`
  - Parse JSON; map `{ success: true }` or `{ error: '...' }`

## Supabase Database Schema
```sql
create extension if not exists pgcrypto;
create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  business_type text,
  created_at timestamptz not null default now()
);
```

## Supabase Edge Function: `waitlist`
- Endpoint: `POST https://YOURPROJECT.supabase.co/functions/v1/waitlist`
- Validates JSON body, inserts row, handles duplicate emails
- Uses service role key inside the function

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const { fullName, email, businessType } = await req.json()
    if (!fullName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('waitlist_entries')
      .insert({ full_name: fullName, email, business_type: businessType ?? null })

    if (error) {
      const isDuplicate = (error.code === '23505')
      const message = isDuplicate ? 'User already exists' : 'Insert failed'
      const status = isDuplicate ? 200 : 500
      return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
  }
})
```

## CORS
- Allow `POST, OPTIONS`, headers `content-type, apikey`
- `Access-Control-Allow-Origin` set to your domain in production

## SEO & Metadata
- `react-helmet-async` in `App.jsx` to set title, description, OG image, canonical
- `public/favicon.ico`, `public/og.png`
- Semantic HTML; accessible labels on inputs

## Performance Targets
- Lightweight SPA; only React + Tailwind + Helmet
- Minified demo asset; lazy load if video
- Tailwind purge keeps CSS small
- Preconnect to Supabase functions origin

## Acceptance Criteria Mapping
- Frontend: validated fields, responsive UI, success/error banners, loading state, double-submit prevention
- Backend: table insert, duplicate handled via unique constraint, correct JSON shapes
- Overall: fast initial load, premium visuals, works on mobile/desktop, modular for referral/emails later

## Setup & Deployment Steps
- Scaffold: `npm create vite@latest waitlist.com -- --template react`
- Install: `npm i -D tailwindcss postcss autoprefixer` `npm i react-helmet-async`
- Init Tailwind: `npx tailwindcss init -p`; wire `globals.css`
- Create Supabase project; set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- Apply SQL schema in Supabase SQL editor
- Deploy function: `supabase functions deploy waitlist`
- Set `VITE_WAITLIST_ENDPOINT` in `.env`
- Build: `npm run build`; deploy to static hosting (Netlify/Vercel) with env var

## Deliverables
- Complete React + Vite project with Tailwind
- Form submission wired to Supabase Edge Function
- SQL schema for `waitlist_entries`
- Edge Function code with CORS
- SEO setup, favicon, brand colors
- Instructions to connect to Supabase and deploy

Confirm and I’ll scaffold the project, implement the UI, integrate Supabase, and deliver a ready-to-deploy solution.