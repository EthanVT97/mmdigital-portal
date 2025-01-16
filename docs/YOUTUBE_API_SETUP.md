# YouTube API Integration Guide

## Prerequisites
- Google Account
- Google Cloud Console access
- YouTube Channel
- Google Ads Account (for advertising)

## Initial Setup

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Enable YouTube Analytics API
5. Enable YouTube Reporting API

### 2. Create Credentials
1. Generate OAuth 2.0 credentials
2. Create API key
3. Configure authorized domains
4. Set up consent screen

### 3. Environment Configuration
Add to your `.env` file:
```env
YOUTUBE_API_KEY=your_api_key
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REDIRECT_URI=your_redirect_uri
```

## API Integration

### 1. Authentication

#### OAuth 2.0 Flow
```typescript
interface YouTubeAuth {
  getAuthUrl(): string;
  getAccessToken(code: string): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>;
  refreshAccessToken(refresh_token: string): Promise<string>;
}

// Example implementation
class YouTubeAuthService implements YouTubeAuth {
  getAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID,
      redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
      scope: 'https://www.googleapis.com/auth/youtube',
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent'
    });
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
  
  // Additional methods implementation
}
```

### 2. Video Management

#### Upload Video
```typescript
interface VideoUpload {
  title: string;
  description: string;
  tags?: string[];
  privacyStatus: 'private' | 'unlisted' | 'public';
  file: File;
}

async function uploadVideo(params: VideoUpload) {
  // Implementation steps:
  // 1. Initialize upload
  // 2. Upload file in chunks
  // 3. Set video metadata
  // 4. Check upload status
}
```

#### Video Analytics
```typescript
interface VideoAnalytics {
  videoId: string;
  metrics: string[];
  startDate: string;
  endDate: string;
}

async function getVideoAnalytics(params: VideoAnalytics) {
  // Implementation
}
```

### 3. Campaign Management

#### Campaign Types
1. **In-Stream Ads**
   - Pre-roll
   - Mid-roll
   - Post-roll

2. **Discovery Ads**
   - Search results
   - Related videos
   - Homepage

3. **Bumper Ads**
   - 6-second non-skippable

#### Campaign Creation
```typescript
interface YTCampaign {
  name: string;
  type: 'IN_STREAM' | 'DISCOVERY' | 'BUMPER';
  budget: {
    amount: number;
    currency: string;
  };
  targeting: {
    locations: string[];
    languages: string[];
    interests: string[];
  };
  bidding: {
    strategy: 'CPV' | 'CPM';
    amount: number;
  };
}

async function createCampaign(campaign: YTCampaign) {
  // Implementation
}
```

## Best Practices

### 1. Video Optimization
- Optimal resolution: 1080p or higher
- Aspect ratio: 16:9
- Frame rate: 24-60 fps
- Audio quality: Clear, normalized

### 2. Content Guidelines
- Follow community guidelines
- Proper metadata
- Engaging thumbnails
- Clear descriptions

### 3. Campaign Optimization
- Target relevant audiences
- Test different ad formats
- Monitor performance
- Optimize based on metrics

## API Reference

### Available Endpoints

1. **Videos**
```typescript
POST /youtube/v3/videos
GET /youtube/v3/videos
PUT /youtube/v3/videos
DELETE /youtube/v3/videos
```

2. **Playlists**
```typescript
POST /youtube/v3/playlists
GET /youtube/v3/playlists
PUT /youtube/v3/playlists
DELETE /youtube/v3/playlists
```

3. **Analytics**
```typescript
GET /youtube/analytics/v2/reports
```

### Quota Limits
- Daily quota: 10,000 units
- Upload quota: 100GB per day
- API requests: Varies by endpoint

## Error Handling

### Common Errors

1. **Authentication Errors**
```typescript
try {
  await authenticateYouTube();
} catch (error) {
  if (error.code === 401) {
    // Handle unauthorized
  } else if (error.code === 403) {
    // Handle forbidden
  }
}
```

2. **Upload Errors**
```typescript
try {
  await uploadVideo(params);
} catch (error) {
  if (error.name === 'QuotaExceeded') {
    // Handle quota
  } else if (error.name === 'InvalidFormat') {
    // Handle format issues
  }
}
```

## Monitoring and Analytics

### Key Metrics
1. **Video Performance**
   - Views
   - Watch time
   - Engagement
   - Subscriber conversion

2. **Campaign Performance**
   - Click-through rate
   - View-through rate
   - Cost per view
   - Conversion rate

### Implementation
```typescript
async function trackMetrics() {
  // Implementation
}
```

## Security Considerations

1. **API Key Protection**
   - Use environment variables
   - Implement rate limiting
   - Monitor usage patterns

2. **OAuth Security**
   - Secure token storage
   - Regular token rotation
   - Proper scope management

## Maintenance

### Regular Tasks
1. **Token Management**
   - Refresh access tokens
   - Update API keys
   - Review permissions

2. **Content Audit**
   - Check video status
   - Update metadata
   - Review analytics

3. **Performance Monitoring**
   - Track API usage
   - Monitor quotas
   - Analyze errors

## Support Resources

- [YouTube API Documentation](https://developers.google.com/youtube/v3)
- [YouTube Analytics API](https://developers.google.com/youtube/analytics)
- [Google Cloud Console](https://console.cloud.google.com/)
- [YouTube Help Center](https://support.google.com/youtube)
