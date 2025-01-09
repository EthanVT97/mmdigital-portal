export const TIKTOK_CONFIG = {
  CLIENT_KEY: import.meta.env.VITE_TIKTOK_CLIENT_KEY,
  CLIENT_SECRET: import.meta.env.VITE_TIKTOK_CLIENT_SECRET,
  REDIRECT_URI: import.meta.env.VITE_TIKTOK_AUTH_REDIRECT_URI,
  API_VERSION: import.meta.env.VITE_TIKTOK_API_VERSION,
  API_BASE_URL: `https://open.tiktokapis.com/${import.meta.env.VITE_TIKTOK_API_VERSION}`,
  SCOPES: [
    'user.info.basic',
    'user.info.stats',
    'video.list',
    'video.upload',
    'video.publish'
  ],
  AUTH_URL: 'https://www.tiktok.com/auth/authorize/',
  TOKEN_URL: 'https://open-api.tiktok.com/oauth/access_token/',
  REQUIRED_PERMISSIONS: [
    {
      name: 'Basic Information',
      scope: 'user.info.basic',
      description: 'Access to basic profile information'
    },
    {
      name: 'User Stats',
      scope: 'user.info.stats',
      description: 'Access to account statistics'
    },
    {
      name: 'Video List',
      scope: 'video.list',
      description: 'View your videos'
    },
    {
      name: 'Video Upload',
      scope: 'video.upload',
      description: 'Upload videos to your account'
    },
    {
      name: 'Video Publishing',
      scope: 'video.publish',
      description: 'Publish videos to your account'
    }
  ]
} as const;

export const getTikTokAuthUrl = () => {
  const params = new URLSearchParams({
    client_key: TIKTOK_CONFIG.CLIENT_KEY,
    redirect_uri: TIKTOK_CONFIG.REDIRECT_URI,
    scope: TIKTOK_CONFIG.SCOPES.join(','),
    response_type: 'code',
    state: crypto.randomUUID()
  });

  return `${TIKTOK_CONFIG.AUTH_URL}?${params.toString()}`;
};
