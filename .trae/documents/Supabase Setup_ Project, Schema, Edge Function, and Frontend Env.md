## Overview
Set up Supabase backend for the waitlist: create project, apply SQL schema, deploy the `waitlist` Edge Function with secrets/CORS, and connect the React frontend via environment variables.

## 1) Create Supabase Project
- Sign in and create a new project
- Note values:
  - `SUPABASE_URL`: `https://<project-ref>.supabase.co`
  - `SUPABASE_SERVICE_ROLE_KEY`: from Project Settings → API (never expose on the frontend)

## 2) Apply Database Schema
- Open SQL editor and run the schema from `supabase/schema.sql`:
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
- Unique `email` enforces duplicates handling at insert time
- (Optional) Enable RLS; Edge Function uses service role and can bypass RLS safely

## 3) Install Supabase CLI (Windows)
- Option A (Scoop): `scoop install supabase`
- Option B (Binary): download from releases and add to PATH
- Verify: `supabase --version`

## 4) Link Project and Set Function Secrets
- Initialize in repo root if needed: `supabase init`
- Set secrets to be available in Edge Functions:
```
supabase secrets set SUPABASE_URL="https://<project-ref>.supabase.co"
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service_role_key>"
```

## 5) Deploy the Edge Function
- Function code is ready in `supabase/functions/waitlist/index.ts:9-36`
- Deploy:
```
supabase functions deploy waitlist
```
- Get endpoint:
  - `POST https://<project-ref>.supabase.co/functions/v1/waitlist`

## 6) CORS Configuration
- Current function returns CORS headers allowing `*`
- For production, set:
  - `Access-Control-Allow-Origin`: `https://your-frontend-domain`
- Update constant in `supabase/functions/waitlist/index.ts` if you want to restrict origin

## 7) Connect Frontend
- Set `VITE_WAITLIST_ENDPOINT` in `.env`:
```
VITE_WAITLIST_ENDPOINT=https://<project-ref>.supabase.co/functions/v1/waitlist
```
- Frontend submit path: `src/lib/api.js:1-16`

## 8) Validation
- Test with curl/Postman:
```
curl -X POST "https://<project-ref>.supabase.co/functions/v1/waitlist" \
 -H "Content-Type: application/json" \
 -d '{"fullName":"Test User","email":"test@example.com","businessType":"retail"}'
```
- Expect `{ "success": true }`
- Duplicate email returns `{ "error": "User already exists" }`

## 9) Optional Local Dev
- Run local stack: `supabase start`
- Invoke function locally: `supabase functions serve waitlist`
- Point `VITE_WAITLIST_ENDPOINT` to local URL for testing when serving functions

## Result
Backend is live with table + Edge Function, frontend posts to Supabase, duplicates handled gracefully, and CORS configured. Confirm and I’ll execute the CLI steps and wire the environment variables for you.