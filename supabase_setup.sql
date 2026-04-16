-- 2. SETUP SCRIPT
-- Run this SECOND, after running the Cleanup script.

-- Create user_profiles table
create table public.user_profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  name text not null,
  picture text not null,
  total_points integer default 0 not null,
  final_certification_id text,
  final_certification_hash text,
  is_entitled boolean default false not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.user_profiles enable row level security;
create policy "Users can insert their own profile" on public.user_profiles for insert with check (auth.uid() = id);
create policy "Users can view their own profile" on public.user_profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.user_profiles for update using (auth.uid() = id);

-- Create module_progress table
create table public.module_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  module_id integer not null,
  completed_sections jsonb default '[]'::jsonb not null,
  completed_interactives jsonb default '[]'::jsonb not null,
  points integer default 0 not null,
  started_at timestamptz,
  completed_at timestamptz,
  last_viewed_section text default 'overview' not null,
  certificate_id text,
  certificate_hash text,
  updated_at timestamptz default now() not null,
  unique (user_id, module_id)
);

-- Enable RLS
alter table public.module_progress enable row level security;
create policy "Users can manage their module progress" on public.module_progress for all using (auth.uid() = user_id);

-- Create session_history table
create table public.session_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  module_id integer not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  sections_viewed jsonb default '[]'::jsonb not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.session_history enable row level security;
create policy "Users can manage their session history" on public.session_history for all using (auth.uid() = user_id);

-- TRIGGER: Automatically create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, name, picture)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'picture', 'https://api.dicebear.com/7.x/initials/svg?seed=' || new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

SELECT 'Setup Complete' as status;
