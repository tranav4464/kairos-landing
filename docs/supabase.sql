-- Enable UUID
create extension if not exists "uuid-ossp";

-- Subscribers table
create table if not exists public.subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  role text,
  challenge text,
  time text,
  created_at timestamptz not null default now()
);

-- Live stats table (single-row counter)
create table if not exists public.live_stats (
  id uuid primary key default uuid_generate_v4(),
  total_signups int not null default 0,
  updated_at timestamptz not null default now()
);

-- Seed one row if empty
insert into public.live_stats (total_signups)
select 842
where not exists (select 1 from public.live_stats);

-- Increment RPC (preferred to avoid race conditions)
create or replace function public.increment_live_signups()
returns void
language plpgsql
as $$
begin
  update public.live_stats
  set total_signups = total_signups + 1,
      updated_at = now()
  where id = (select id from public.live_stats limit 1);
end;
$$;

-- RLS: enabled; restrict direct inserts from client
alter table public.subscribers enable row level security;
alter table public.live_stats enable row level security;

-- (Policies can remain locked down; API uses service role key.)



