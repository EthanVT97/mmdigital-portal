import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { TikTokValidationError } from '@/lib/errors/tiktok';

// CORS configuration
export const corsMiddleware = cors({
  origin: process.env.VITE_SITE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
});

// Security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://open.tiktokapis.com'],
      frameSrc: ["'self'", 'https://www.tiktok.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Input validation middleware
export const validateTikTokVideo = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, privacy } = req.body;
  const videoFile = req.file;

  const errors: string[] = [];

  if (!title || title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!description) {
    errors.push('Description is required');
  }

  if (!privacy || !['public', 'private', 'friends'].includes(privacy)) {
    errors.push('Invalid privacy setting');
  }

  if (!videoFile) {
    errors.push('Video file is required');
  } else {
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '100000000'); // 100MB default
    if (videoFile.size > maxSize) {
      errors.push('Video file size exceeds limit');
    }

    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || '').split(',');
    if (!allowedTypes.includes(videoFile.mimetype)) {
      errors.push('Invalid video file type');
    }
  }

  if (errors.length > 0) {
    throw new TikTokValidationError('Validation failed', { errors });
  }

  next();
};

// CSRF protection
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-csrf-token'];
  if (!token || token !== req.session?.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
};

// Rate limiting
export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  max: number = 100 // limit each IP to 100 requests per windowMs
) => {
  return rateLimit({
    windowMs,
    max,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });
};
