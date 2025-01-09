# OAuth Setup Guide

This guide explains how to set up OAuth for each social media platform in the Adverto Portal.

## Facebook Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add the Facebook Login product
4. Configure OAuth settings:
   - Valid OAuth Redirect URIs: `http://localhost:8083/auth/facebook/callback`
   - Permissions needed:
     - `ads_management`
     - `pages_manage_ads`
     - `pages_read_engagement`
5. Copy the App ID and App Secret to your `.env` file

## Google (YouTube & Ads) Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - YouTube Data API v3
   - YouTube Analytics API
   - Google Ads API
4. Configure OAuth consent screen:
   - Add scopes:
     - `https://www.googleapis.com/auth/youtube`
     - `https://www.googleapis.com/auth/adwords`
5. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:8083/auth/google/callback`
6. Copy the Client ID and Client Secret to your `.env` file

## TikTok Setup

1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Create a new app
3. Configure OAuth settings:
   - Redirect URI: `http://localhost:8083/auth/tiktok/callback`
   - Permissions needed:
     - `user.info.basic`
     - `video.list`
     - `user.account.stats`
4. Copy the Client Key and Client Secret to your `.env` file

## Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable and configure each provider:
   - Facebook
   - Google
   - TikTok
4. Update the callback URLs in each platform's developer console to include Supabase URLs

## Environment Variables

Make sure to set these variables in your `.env` file:

```bash
# Facebook
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_FACEBOOK_APP_SECRET=your_facebook_app_secret

# Google
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret

# TikTok
VITE_TIKTOK_CLIENT_KEY=your_tiktok_client_key
VITE_TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
```

## Security Notes

1. Never commit your `.env` file to version control
2. Store all sensitive keys and tokens securely
3. Use environment variables for all sensitive data
4. Implement proper error handling for OAuth failures
5. Use HTTPS in production
6. Regularly rotate secrets and tokens

## Testing OAuth Integration

1. Start your development server
2. Try connecting each platform from the dashboard
3. Verify that tokens are being stored securely in Supabase
4. Test error scenarios and token refresh flows
5. Verify that disconnecting platforms works correctly
