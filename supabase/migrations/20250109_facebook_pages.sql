-- Create facebook_pages table
CREATE TABLE IF NOT EXISTS facebook_pages (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    page_id TEXT NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create RLS policies
ALTER TABLE facebook_pages ENABLE ROW LEVEL SECURITY;

-- Users can only see their own pages
CREATE POLICY "Users can view their own pages"
    ON facebook_pages
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own pages
CREATE POLICY "Users can insert their own pages"
    ON facebook_pages
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own pages
CREATE POLICY "Users can update their own pages"
    ON facebook_pages
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own pages
CREATE POLICY "Users can delete their own pages"
    ON facebook_pages
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_facebook_pages_user_id ON facebook_pages(user_id);

-- Create unique constraint on user_id and page_id
ALTER TABLE facebook_pages ADD CONSTRAINT unique_user_page UNIQUE (user_id, page_id);

CREATE TABLE facebook_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES facebook_pages(id) ON DELETE CASCADE,
    provider_post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    link_url TEXT,
    status TEXT NOT NULL DEFAULT 'published',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    targeting JSONB,
    feed_targeting JSONB,
    privacy JSONB,
    engagement JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for facebook_posts
ALTER TABLE facebook_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own facebook posts"
    ON facebook_posts
    FOR SELECT
    USING (
        page_id IN (
            SELECT id FROM facebook_pages
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own facebook posts"
    ON facebook_posts
    FOR INSERT
    WITH CHECK (
        page_id IN (
            SELECT id FROM facebook_pages
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own facebook posts"
    ON facebook_posts
    FOR UPDATE
    USING (
        page_id IN (
            SELECT id FROM facebook_pages
            WHERE user_id = auth.uid()
        )
    )
    WITH CHECK (
        page_id IN (
            SELECT id FROM facebook_pages
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own facebook posts"
    ON facebook_posts
    FOR DELETE
    USING (
        page_id IN (
            SELECT id FROM facebook_pages
            WHERE user_id = auth.uid()
        )
    );

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_facebook_posts_updated_at
    BEFORE UPDATE ON facebook_posts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
