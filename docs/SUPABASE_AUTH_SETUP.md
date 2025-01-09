# Supabase Authentication Setup Guide

## Setting up OAuth Providers in Supabase

### 1. Facebook Setup
1. Go to Supabase Dashboard > Authentication > Providers
2. Find Facebook in the list and click "Edit"
3. Enable the provider
4. Enter your credentials:
   - Client ID (App ID from Facebook)
   - Client Secret (App Secret from Facebook)
5. Required Scopes:
   ```
   email,public_profile,ads_management,pages_manage_ads,pages_read_engagement
   ```

### 2. Google Setup
1. Go to Supabase Dashboard > Authentication > Providers
2. Find Google in the list and click "Edit"
3. Enable the provider
4. Enter your credentials:
   - Client ID
   - Client Secret
5. Required Scopes:
   ```
   https://www.googleapis.com/auth/userinfo.email 
   https://www.googleapis.com/auth/userinfo.profile 
   https://www.googleapis.com/auth/youtube 
   https://www.googleapis.com/auth/adwords
   ```

### 3. TikTok Setup
1. Go to Supabase Dashboard > Authentication > Providers
2. Find TikTok in the list and click "Edit"
3. Enable the provider
4. Enter your credentials:
   - Client Key
   - Client Secret
5. Required Scopes:
   ```
   user.info.basic,video.list,user.account.stats
   ```

### 4. Telegram Setup
Since Telegram uses bot tokens instead of OAuth, we'll store the bot token in the platform_tokens table.

## Important Notes

### Redirect URLs
Make sure to add the following redirect URL to all OAuth providers:
```
https://qbybzxwvggqtvxdfwerg.supabase.co/auth/v1/callback
```

### Required Scopes
Each platform requires specific scopes for ad management:

- Facebook:
  - ads_management
  - pages_manage_ads
  - pages_read_engagement

- Google:
  - YouTube Data API
  - YouTube Analytics API
  - Google Ads API

- TikTok:
  - user.info.basic
  - video.list
  - user.account.stats

### Testing Authentication
1. After setting up each provider, test the authentication flow:
   - Click the "Connect" button for each platform in your dashboard
   - Verify that you can successfully authenticate
   - Check that tokens are stored in the platform_tokens table
   - Verify that you can disconnect and reconnect platforms

### Security Considerations
1. Never commit OAuth credentials to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling for authentication failures
4. Regularly rotate secrets and tokens
5. Monitor authentication logs for suspicious activity
