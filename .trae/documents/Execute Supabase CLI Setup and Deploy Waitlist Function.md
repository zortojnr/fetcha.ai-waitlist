## Overview
Set up Supabase for the project using the existing schema and Edge Function. After approval, I’ll run the CLI commands to set secrets, deploy the function, and wire the frontend env.

## Prerequisites
- Supabase project created
- Values ready:
  - `SUPABASE_URL`: `https://<project-ref>.supabase.co`
  - `SUPABASE_SERVICE_ROLE_KEY`: service role key from Project Settings → API (keep private)

## Step 1: Apply Database Schema
- In Supabase Dashboard → SQL Editor, paste and run:
```
create extension if not exists pgcrypto;
create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  business_type text,
  created_at timestamptz not null default now()
);
```
- Confirms unique email and automatic timestamps.

## Step 2: Configure CLI Secrets
- In the project root, I will set function environment secrets:
```
npx supabase secrets set SUPABASE_URL="https://<project-ref>.supabase.co"
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service_role_key>"
```

## Step 3: Deploy Edge Function
- Deploy the existing function `supabase/functions/waitlist/index.ts`:
```
npx supabase functions deploy waitlist
```
- Resulting endpoint:
  - `POST https://<project-ref>.supabase.co/functions/v1/waitlist`

## Step 4: Wire Frontend Env
- Update `.env`:
```
VITE_WAITLIST_ENDPOINT=https://<project-ref>.supabase.co/functions/v1/waitlist
```
- Frontend submission code is already in `src/lib/api.js` and uses this env var.

## Step 5: Verify
- Quick test via curl/Postman:
```
curl -X POST "https://<project-ref>.supabase.co/functions/v1/waitlist" \
 -H "Content-Type: application/json" \
 -d '{"fullName":"Test User","email":"test@example.com","businessType":"retail"}'
```
- Expect `{ "success": true }`, duplicates return `{ "error": "User already exists" }`.

## Optional: Restrict CORS
- In production, update CORS header in `supabase/functions/waitlist/index.ts`:
  - Set `Access-Control-Allow-Origin` to your domain instead of `*`.

## Optional: Local Dev
- Run local stack: `npx supabase start`
- Serve function locally: `npx supabase functions serve waitlist`
- Point `VITE_WAITLIST_ENDPOINT` to the local URL for testing.

Approve to proceed and I’ll execute these steps with your project values and confirm deployment with the live endpoint.