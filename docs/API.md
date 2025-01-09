# API Documentation

## Authentication

### Social Login
- **Facebook Login**
  - Endpoint: `/api/auth/facebook`
  - Method: `POST`
  - Description: Facebook OAuth authentication
  - Required Permissions: `pages_manage_posts`, `pages_read_engagement`

- **Google Login**
  - Endpoint: `/api/auth/google`
  - Method: `POST`
  - Description: Google OAuth authentication
  - Required Scopes: `https://www.googleapis.com/auth/adwords`

- **TikTok Login**
  - Endpoint: `/api/auth/tiktok`
  - Method: `POST`
  - Description: TikTok OAuth authentication
  - Required Permissions: `video.create`, `video.list`

- **Telegram Login**
  - Endpoint: `/api/auth/telegram`
  - Method: `POST`
  - Description: Telegram Bot Token authentication

## Facebook Marketing API

### Pages
- **List Pages**
  - Endpoint: `/api/facebook/pages`
  - Method: `GET`
  - Description: Get list of managed Facebook pages

- **Page Analytics**
  - Endpoint: `/api/facebook/pages/{pageId}/analytics`
  - Method: `GET`
  - Description: Get page insights and analytics

### Posts
- **Create Post**
  - Endpoint: `/api/facebook/posts`
  - Method: `POST`
  - Description: Create new Facebook post
  - Body Parameters:
    ```json
    {
      "pageId": "string",
      "message": "string",
      "media": "file[]",
      "scheduledTime": "string (optional)"
    }
    ```

## TikTok Marketing API

### Videos
- **Upload Video**
  - Endpoint: `/api/tiktok/videos`
  - Method: `POST`
  - Description: Upload new TikTok video
  - Body Parameters:
    ```json
    {
      "video": "file",
      "description": "string",
      "sound": "string",
      "scheduledTime": "string (optional)"
    }
    ```

- **Video Analytics**
  - Endpoint: `/api/tiktok/videos/{videoId}/analytics`
  - Method: `GET`
  - Description: Get video performance analytics

## Google Ads API

### Campaigns
- **List Campaigns**
  - Endpoint: `/api/google/campaigns`
  - Method: `GET`
  - Description: Get list of Google Ad campaigns

- **Create Campaign**
  - Endpoint: `/api/google/campaigns`
  - Method: `POST`
  - Description: Create new Google Ad campaign
  - Body Parameters:
    ```json
    {
      "name": "string",
      "type": "string",
      "budget": "number",
      "startDate": "string",
      "endDate": "string (optional)"
    }
    ```

## Telegram Marketing API

### Bots
- **Create Bot**
  - Endpoint: `/api/telegram/bots`
  - Method: `POST`
  - Description: Register new Telegram bot
  - Body Parameters:
    ```json
    {
      "token": "string",
      "name": "string"
    }
    ```

- **Send Message**
  - Endpoint: `/api/telegram/bots/{botId}/send`
  - Method: `POST`
  - Description: Send message via bot
  - Body Parameters:
    ```json
    {
      "chatId": "string",
      "message": "string",
      "media": "file[] (optional)"
    }
    ```

## Error Codes

- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Invalid or expired token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error
