## Overview
Push the latest changes to GitHub and set up deployability on Vercel for the Vite React project. Configure environment variables, verify build/output settings, and ensure CORS compatibility with the Supabase Function.

## GitHub Push
- Ensure clean working tree and commit recent changes:
  - `git add -A`
  - `git commit -m "chore: responsive fixes, dropdown visibility, countdown, supabase wiring"`
  - `git push origin main`
- Repo: `https://github.com/zortojnr/fetcha.ai-waitlist`

## Vercel Project Setup
- Import the GitHub repo into Vercel (New Project → Import Git Repository)
- Framework auto-detection: Vercel recognizes Vite
- Build settings (confirm defaults or set explicitly):
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Environment Variables (Project Settings → Environment Variables):
  - `VITE_WAITLIST_ENDPOINT=https://pnsdcilxttznaxwjswgo.supabase.co/functions/v1/waitlist`
- Optional: set Node version via Project → Settings (Node 18+ or 20+)

## Optional vercel.json (not required but acceptable)
- If you want to pin configuration:
```
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Supabase Function CORS
- Current function allows `*`. For production, optionally restrict origin to your Vercel domain
  - In `supabase/functions/waitlist/index.ts` set `Access-Control-Allow-Origin` to `https://<your-vercel-domain>`

## Verification
- Trigger a Vercel deployment from the GitHub push
- Open the Vercel preview URL
- Test:
  - Hero renders (glow + countdown)
  - Pricing and comparison responsive
  - Waitlist form submits successfully to Supabase Function
  - Duplicate email returns `{ error: "User already exists" }`

## Deliverables
- GitHub main branch updated with latest code
- Vercel project configured to build and deploy the app
- Environment variable set for API endpoint
- Guidance on optional CORS tightening for production

Approve, and I’ll run the git push, assist with Vercel project creation, add the environment variable, and confirm a successful preview deployment.