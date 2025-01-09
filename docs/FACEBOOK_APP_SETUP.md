# Facebook App Setup Guide

This guide explains how to configure your Facebook App for use with Supabase OAuth integration.

## Prerequisites

1. A Facebook Developer Account
2. A Facebook App created in the [Facebook Developer Console](https://developers.facebook.com/apps/)
3. Facebook App ID and Secret
4. PowerShell installed on your machine

## Setup Steps

### 1. Create Facebook App (if not already done)

1. Go to [Facebook Developer Console](https://developers.facebook.com/apps/)
2. Click "Create App"
3. Select "Consumer" as the app type
4. Fill in your app details
5. Add the "Facebook Login" product to your app

### 2. Configure Environment Variables

Make sure your `.env` file has the following variables set:

```env
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### 3. Run the Setup Script

1. Open PowerShell as Administrator
2. Navigate to your project directory
3. Run the setup script:

```powershell
./scripts/setup_facebook_app.ps1
```

The script will:
- Configure OAuth redirect URIs
- Set up app domains
- Enable and configure Facebook Login
- Set required permissions

### 4. Verify Configuration

After running the script, verify the following in the [Facebook Developer Console](https://developers.facebook.com/apps/):

1. **Facebook Login > Settings**
   - Valid OAuth Redirect URIs: `https://qbybzxwvggqtvxdfwerg.supabase.co/auth/v1/callback`
   - Client OAuth Login: Enabled
   - Web OAuth Login: Enabled
   - Force Web OAuth Reauthentication: Enabled

2. **App Settings > Basic**
   - App Domains includes: `qbybzxwvggqtvxdfwerg.supabase.co`
   - Site URL is set to: `http://localhost:5175`

3. **Permissions**
   Verify the following permissions are enabled:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`

## Troubleshooting

If you encounter any issues:

1. **Script Execution Policy**
   If you get a script execution error, you may need to allow script execution:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **API Errors**
   - Verify your App ID and App Secret are correct
   - Ensure your app is in Development Mode
   - Check that you have the necessary permissions

3. **OAuth Errors**
   - Verify the redirect URI exactly matches what's configured in Supabase
   - Ensure your app is properly configured in the Supabase dashboard

## Support

If you need help:
1. Check the Facebook Developer Documentation
2. Review the Supabase Authentication Documentation
3. Open an issue in the project repository

## Security Notes

- Never commit your Facebook App Secret to version control
- Always use environment variables for sensitive information
- Regularly rotate your app secret for security
- Keep your app in Development Mode until ready for production
