-- 2. SETUP SCRIPT
-- Run this SECOND, after running the Cleanup script.

-- Create users table
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  picture text,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamptz default now() not null,
  
  -- We renamed the constraint to avoid conflicts with any zombie constraints
  constraint users_profile_id_fkey foreign key (id) references auth.users(id) on delete cascade
);

-- Enable RLS
alter table public.users enable row level security;

-- POLICY: Allow users to insert their own profile
create policy "Users can insert their own data" on public.users
  for insert with check (auth.uid() = id);

-- POLICY: Allow users to view their own profile
create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

-- POLICY: Allow users to update their own profile
create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- TRIGGER: Automatically create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, picture, metadata)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'picture', 'https://api.dicebear.com/7.x/initials/svg?seed=' || new.email),
    jsonb_build_object(
      'totalPoints', 0,
      'createdAt', new.created_at,
      'modules', jsonb_build_object(
          '1', jsonb_build_object('completedSections', '[]'::jsonb, 'completedInteractives', '[]'::jsonb, 'points', 0, 'startedAt', null, 'completedAt', null, 'lastViewedSection', 'overview'),
          '2', jsonb_build_object('completedSections', '[]'::jsonb, 'completedInteractives', '[]'::jsonb, 'points', 0, 'startedAt', null, 'completedAt', null, 'lastViewedSection', 'overview'),
          '3', jsonb_build_object('completedSections', '[]'::jsonb, 'completedInteractives', '[]'::jsonb, 'points', 0, 'startedAt', null, 'completedAt', null, 'lastViewedSection', 'overview'),
          '4', jsonb_build_object('completedSections', '[]'::jsonb, 'completedInteractives', '[]'::jsonb, 'points', 0, 'startedAt', null, 'completedAt', null, 'lastViewedSection', 'overview')
      ),
      'sessionHistory', '[]'::jsonb
    )
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

SELECT 'Setup Complete' as status;
