export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
}

export interface FacebookPostTargeting {
  age_min?: number;
  age_max?: number;
  genders?: ('male' | 'female')[];
  geo_locations?: {
    countries?: string[];
    cities?: Array<{ key: string; name: string; }>;
  };
}

export interface FacebookFeedTargeting {
  fan_only?: boolean;
  countries?: string[];
  education_statuses?: string[];
  relationship_statuses?: string[];
}

export interface BusinessSuitePost {
  id: string;
  message: string;
  link?: string;
  scheduled_publish_time?: number;
  status: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED';
  created_time: string;
  targeting?: FacebookPostTargeting;
  feed_targeting?: FacebookFeedTargeting;
  place?: string;
  tags?: string[];
  privacy?: {
    value: 'EVERYONE' | 'ALL_FRIENDS' | 'SELF';
    allow?: string[];
    deny?: string[];
  };
}

export interface Post extends BusinessSuitePost {
  imageUrl?: string;
  scheduledFor?: Date;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    impressions: number;
    reach: number;
    clicks: number;
  };
}

export interface InsightValue {
  value: number;
  end_time: string;
}

export interface PageInsights {
  impressions: InsightValue[];
  engagement: InsightValue[];
  fans: InsightValue[];
}

export interface PostInsights {
  data: Array<{
    name: string;
    period: string;
    values: Array<{
      value: number | Record<string, number>;
    }>;
  }>;
}

export interface AudienceInsights {
  demographics: {
    age_gender: Record<string, number>;
    countries: Record<string, number>;
  };
}
