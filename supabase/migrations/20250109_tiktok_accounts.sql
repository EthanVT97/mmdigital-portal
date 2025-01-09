-- Create TikTok accounts table
create table if not exists public.tiktok_accounts (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    username text not null,
    access_token text not null,
    refresh_token text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create TikTok videos table
create table if not exists public.tiktok_videos (
    id uuid default uuid_generate_v4() primary key,
    account_id uuid references public.tiktok_accounts(id) on delete cascade,
    tiktok_video_id text not null,
    title text not null,
    description text,
    privacy text not null default 'public',
    video_url text,
    thumbnail_url text,
    views_count integer default 0,
    likes_count integer default 0,
    comments_count integer default 0,
    shares_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create TikTok analytics table
create table if not exists public.tiktok_analytics (
    id uuid default uuid_generate_v4() primary key,
    account_id uuid references public.tiktok_accounts(id) on delete cascade,
    date date not null,
    follower_count integer default 0,
    profile_views integer default 0,
    video_views integer default 0,
    likes_count integer default 0,
    comments_count integer default 0,
    shares_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.tiktok_accounts enable row level security;
alter table public.tiktok_videos enable row level security;
alter table public.tiktok_analytics enable row level security;

-- Accounts policies
create policy "Users can view own TikTok accounts"
    on public.tiktok_accounts for select
    using (auth.uid() = user_id);

create policy "Users can insert own TikTok accounts"
    on public.tiktok_accounts for insert
    with check (auth.uid() = user_id);

create policy "Users can update own TikTok accounts"
    on public.tiktok_accounts for update
    using (auth.uid() = user_id);

-- Videos policies
create policy "Users can view own TikTok videos"
    on public.tiktok_videos for select
    using (
        auth.uid() = (
            select user_id 
            from public.tiktok_accounts 
            where id = tiktok_videos.account_id
        )
    );

create policy "Users can insert own TikTok videos"
    on public.tiktok_videos for insert
    with check (
        auth.uid() = (
            select user_id 
            from public.tiktok_accounts 
            where id = tiktok_videos.account_id
        )
    );

-- Analytics policies
create policy "Users can view own TikTok analytics"
    on public.tiktok_analytics for select
    using (
        auth.uid() = (
            select user_id 
            from public.tiktok_accounts 
            where id = tiktok_analytics.account_id
        )
    );

create policy "Users can insert own TikTok analytics"
    on public.tiktok_analytics for insert
    with check (
        auth.uid() = (
            select user_id 
            from public.tiktok_accounts 
            where id = tiktok_analytics.account_id
        )
    );
