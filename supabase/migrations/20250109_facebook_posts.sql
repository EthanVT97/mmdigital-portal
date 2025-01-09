-- Create facebook_posts table
CREATE TABLE IF NOT EXISTS facebook_posts (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    page_id TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    link_url TEXT,
    visibility TEXT DEFAULT 'public',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'draft',
    engagement JSONB DEFAULT '{"likes": 0, "comments": 0, "shares": 0}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create RLS policies
ALTER TABLE facebook_posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own posts
CREATE POLICY "Users can view their own posts"
    ON facebook_posts
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own posts
CREATE POLICY "Users can insert their own posts"
    ON facebook_posts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own posts"
    ON facebook_posts
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts"
    ON facebook_posts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_facebook_posts_user_id ON facebook_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_facebook_posts_page_id ON facebook_posts(page_id);
CREATE INDEX IF NOT EXISTS idx_facebook_posts_status ON facebook_posts(status);
CREATE INDEX IF NOT EXISTS idx_facebook_posts_scheduled_for ON facebook_posts(scheduled_for);
