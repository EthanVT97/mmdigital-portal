export class TikTokError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'TikTokError';
  }
}

export class TikTokAuthError extends TikTokError {
  constructor(message: string, details?: any) {
    super(message, 'TIKTOK_AUTH_ERROR', 401, details);
    this.name = 'TikTokAuthError';
  }
}

export class TikTokAPIError extends TikTokError {
  constructor(message: string, status: number, details?: any) {
    super(message, 'TIKTOK_API_ERROR', status, details);
    this.name = 'TikTokAPIError';
  }
}

export class TikTokRateLimitError extends TikTokError {
  constructor(message: string, details?: any) {
    super(message, 'TIKTOK_RATE_LIMIT', 429, details);
    this.name = 'TikTokRateLimitError';
  }
}

export class TikTokValidationError extends TikTokError {
  constructor(message: string, details?: any) {
    super(message, 'TIKTOK_VALIDATION_ERROR', 400, details);
    this.name = 'TikTokValidationError';
  }
}

export const handleTikTokError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        throw new TikTokAuthError('Authentication failed', data);
      case 429:
        throw new TikTokRateLimitError('Rate limit exceeded', data);
      default:
        throw new TikTokAPIError(data.message || 'API request failed', status, data);
    }
  }
  
  throw new TikTokError('Unknown error occurred', 'UNKNOWN_ERROR');
};
