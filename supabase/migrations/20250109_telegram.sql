-- Create telegram_bots table
CREATE TABLE telegram_bots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bot_token TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create telegram_channels table
CREATE TABLE telegram_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id TEXT NOT NULL,
    title TEXT NOT NULL,
    username TEXT,
    members_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create telegram_posts table
CREATE TABLE telegram_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id TEXT NOT NULL,
    message TEXT NOT NULL,
    media_urls TEXT[] DEFAULT '{}',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create telegram_members table
CREATE TABLE telegram_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create telegram_analytics table
CREATE TABLE telegram_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    reactions INTEGER DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create function to get telegram analytics
CREATE OR REPLACE FUNCTION get_telegram_analytics(
    p_channel_id TEXT,
    p_start_date TEXT,
    p_end_date TEXT
)
RETURNS TABLE (
    date DATE,
    views INTEGER,
    shares INTEGER,
    reactions INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ta.date,
        ta.views,
        ta.shares,
        ta.reactions
    FROM
        telegram_analytics ta
    WHERE
        ta.channel_id = p_channel_id
        AND ta.date BETWEEN p_start_date::DATE AND p_end_date::DATE
    ORDER BY
        ta.date ASC;
END;
$$ LANGUAGE plpgsql;
