# TikTok Marketing API Documentation

## Authentication

### Connect TikTok Account
```http
POST /api/tiktok/auth/connect
```

**Request Body:**
```json
{
  "username": "@username",
  "password": "password"
}
```

**Response:**
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 3600
}
```

### Refresh Token
```http
POST /api/tiktok/auth/refresh
```

**Request Headers:**
```
Authorization: Bearer refresh_token
```

## Content Management

### Upload Video
```http
POST /api/tiktok/video/upload
```

**Request Headers:**
```
Authorization: Bearer access_token
Content-Type: multipart/form-data
```

**Request Body:**
```
title: string
description: string
video: File
privacy: "public" | "private" | "friends"
```

**Response:**
```json
{
  "video_id": "string",
  "video_url": "string"
}
```

### Get Videos
```http
GET /api/tiktok/videos
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 10)
```

## Analytics

### Get Account Analytics
```http
GET /api/tiktok/analytics/account
```

**Query Parameters:**
```
days: number (default: 7)
```

**Response:**
```json
{
  "follower_count": number,
  "profile_views": number,
  "video_views": number,
  "likes": number
}
```

### Get Video Analytics
```http
GET /api/tiktok/analytics/video/:videoId
```

**Response:**
```json
{
  "views": number,
  "likes": number,
  "comments": number,
  "shares": number
}
```

## Error Handling

### Error Responses
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": object
  }
}
```

### Error Codes
- `TIKTOK_AUTH_ERROR`: Authentication failed
- `TIKTOK_API_ERROR`: API request failed
- `TIKTOK_RATE_LIMIT`: Rate limit exceeded
- `TIKTOK_VALIDATION_ERROR`: Input validation failed

## Rate Limits
- Authentication: 5 requests per hour
- Video Upload: 10 uploads per hour
- Analytics: 30 requests per 15 minutes
- General API: 100 requests per 15 minutes

## File Upload Limits
- Maximum file size: 100MB
- Allowed file types: video/mp4, video/quicktime

## Security
- All requests must include valid CSRF token
- Use HTTPS only
- Include appropriate headers:
  - `X-CSRF-Token`
  - `Authorization`
  - `Content-Type`
