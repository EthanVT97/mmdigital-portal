# Setup Guide

## Prerequisites

- Node.js v18 or later
- PostgreSQL v14 or later
- Supabase CLI
- Git

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/adverto-portal.git
cd adverto-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:

```env
# App
VITE_APP_URL=http://localhost:5173

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Facebook
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_FACEBOOK_APP_SECRET=your_facebook_app_secret

# Google
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret

# TikTok
VITE_TIKTOK_CLIENT_KEY=your_tiktok_client_key
VITE_TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

# Telegram
VITE_TELEGRAM_API_ID=your_telegram_api_id
VITE_TELEGRAM_API_HASH=your_telegram_api_hash
```

4. **Database Setup**

```bash
# Start Supabase locally
supabase start

# Run migrations
supabase db reset
```

5. **Start Development Server**

```bash
npm run dev
```

## Platform Setup

### Facebook Setup

1. Create a Facebook App at https://developers.facebook.com
2. Add Facebook Login product
3. Configure OAuth Redirect URI: `http://localhost:5173/auth/facebook/callback`
4. Add required permissions:
   - pages_manage_posts
   - pages_read_engagement

### Google Setup

1. Create a project in Google Cloud Console
2. Enable Google Ads API
3. Configure OAuth consent screen
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5173/auth/google/callback`

### TikTok Setup

1. Create TikTok for Business account
2. Register app at https://developers.tiktok.com
3. Add required permissions:
   - video.create
   - video.list
4. Configure redirect URI: `http://localhost:5173/auth/tiktok/callback`

### Telegram Setup

1. Create Telegram account
2. Get API credentials from https://my.telegram.org/apps
3. Create a bot using @BotFather
4. Save the bot token

## Development

### Code Structure

```
adverto-portal/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── stores/       # State management
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── supabase/
│   └── migrations/   # Database migrations
└── docs/            # Documentation
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Adding New Features

1. Create new component in `src/components`
2. Add types in `src/types`
3. Create API service in `src/services`
4. Add database migration if needed
5. Update documentation

## Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Make sure to set all required environment variables in your production environment.

### Database Migration

```bash
supabase db reset --db-url=your_production_db_url
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check Supabase credentials
   - Verify database is running

2. **Social Login Issues**
   - Verify OAuth credentials
   - Check redirect URIs
   - Ensure required permissions

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify import paths

### Support

For additional support:
1. Check documentation
2. Create GitHub issue
3. Contact development team
