import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TikTokService } from '@/services/tiktok';
import { TikTokAuthError, TikTokAPIError } from '@/lib/errors/tiktok';

describe('TikTokService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const credentials = {
        username: '@testuser',
        password: 'validpassword'
      };

      const mockResponse = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token'
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await TikTokService.login(credentials);
      expect(result).toEqual(mockResponse);
    });

    it('should throw TikTokAuthError with invalid credentials', async () => {
      const credentials = {
        username: '@testuser',
        password: 'invalidpassword'
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      });

      await expect(TikTokService.login(credentials))
        .rejects
        .toThrow(TikTokAuthError);
    });
  });

  describe('uploadVideo', () => {
    it('should successfully upload video', async () => {
      const videoData = {
        title: 'Test Video',
        description: 'Test Description',
        videoFile: new File([''], 'test.mp4', { type: 'video/mp4' }),
        privacy: 'public' as const
      };

      const mockResponse = {
        video_id: 'mock_video_id',
        video_url: 'https://tiktok.com/video/mock_video_id'
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await TikTokService.uploadVideo(videoData);
      expect(result).toEqual(mockResponse);
    });

    it('should throw TikTokAPIError when upload fails', async () => {
      const videoData = {
        title: 'Test Video',
        description: 'Test Description',
        videoFile: new File([''], 'test.mp4', { type: 'video/mp4' }),
        privacy: 'public' as const
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Upload failed' })
      });

      await expect(TikTokService.uploadVideo(videoData))
        .rejects
        .toThrow(TikTokAPIError);
    });
  });

  describe('getAnalytics', () => {
    it('should return analytics data', async () => {
      const mockAnalytics = {
        follower_count: 1000,
        profile_views: 5000,
        video_views: 10000,
        likes: 2000
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAnalytics)
      });

      const result = await TikTokService.getAnalytics(7);
      expect(result).toEqual(mockAnalytics);
    });
  });
});
