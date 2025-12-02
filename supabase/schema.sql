create extension if not exists pgcrypto;
create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  business_type text,
  created_at timestamptz not null default now()
);

