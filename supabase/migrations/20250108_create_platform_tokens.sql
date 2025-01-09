-- Create platform_tokens table
create table if not exists public.platform_tokens (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    platform text not null,
    token text not null,
    refresh_token text,
    expires_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    -- Add unique constraint to prevent duplicate platform connections per user
    constraint unique_user_platform unique (user_id, platform)
);

-- Enable Row Level Security (RLS)
alter table public.platform_tokens enable row level security;

-- Create policies
create policy "Users can view their own platform tokens"
    on public.platform_tokens for select
    using (auth.uid() = user_id);

create policy "Users can insert their own platform tokens"
    on public.platform_tokens for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own platform tokens"
    on public.platform_tokens for update
    using (auth.uid() = user_id);

create policy "Users can delete their own platform tokens"
    on public.platform_tokens for delete
    using (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger platform_tokens_updated_at
    before update on public.platform_tokens
    for each row
    execute function public.handle_updated_at();

-- Create indexes for better query performance
create index if not exists platform_tokens_user_id_idx on public.platform_tokens(user_id);
create index if not exists platform_tokens_platform_idx on public.platform_tokens(platform);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.platform_tokens to anon, authenticated;
