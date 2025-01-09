-- Create google_campaigns table
CREATE TABLE google_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    budget DECIMAL NOT NULL,
    status TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create google_ad_groups table
CREATE TABLE google_ad_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES google_campaigns(id),
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create google_keywords table
CREATE TABLE google_keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ad_group_id UUID REFERENCES google_ad_groups(id),
    keyword TEXT NOT NULL,
    match_type TEXT NOT NULL,
    bid_amount DECIMAL NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create google_ads table
CREATE TABLE google_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ad_group_id UUID REFERENCES google_ad_groups(id),
    headline TEXT NOT NULL,
    description TEXT NOT NULL,
    final_url TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create google_analytics table
CREATE TABLE google_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES google_campaigns(id),
    date DATE NOT NULL,
    impressions INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    cost DECIMAL NOT NULL DEFAULT 0,
    conversions INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('UTC'::text, now()) NOT NULL
);

-- Create function to get campaign analytics
CREATE OR REPLACE FUNCTION get_campaign_analytics(
    p_campaign_id UUID,
    p_start_date TEXT,
    p_end_date TEXT
)
RETURNS TABLE (
    date DATE,
    impressions INTEGER,
    clicks INTEGER,
    cost DECIMAL,
    conversions INTEGER,
    ctr DECIMAL,
    cpc DECIMAL,
    conversion_rate DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ga.date,
        ga.impressions,
        ga.clicks,
        ga.cost,
        ga.conversions,
        CASE 
            WHEN ga.impressions > 0 THEN (ga.clicks::DECIMAL / ga.impressions) * 100
            ELSE 0
        END as ctr,
        CASE 
            WHEN ga.clicks > 0 THEN ga.cost / ga.clicks
            ELSE 0
        END as cpc,
        CASE 
            WHEN ga.clicks > 0 THEN (ga.conversions::DECIMAL / ga.clicks) * 100
            ELSE 0
        END as conversion_rate
    FROM
        google_analytics ga
    WHERE
        ga.campaign_id = p_campaign_id
        AND ga.date BETWEEN p_start_date::DATE AND p_end_date::DATE
    ORDER BY
        ga.date ASC;
END;
$$ LANGUAGE plpgsql;
