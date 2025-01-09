import { supabase } from '@/lib/supabase';

interface TikTokCredentials {
  username: string;
  password: string;
}

interface TikTokVideo {
  title: string;
  description: string;
  videoFile: File;
  privacy: 'public' | 'private' | 'friends';
}

export class TikTokService {
  private static API_BASE = 'https://open.tiktokapis.com/v2';
  private static access_token: string | null = null;

  static async login(credentials: TikTokCredentials) {
    try {
      // TikTok login API call
      const response = await fetch(`${this.API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.access_token = data.access_token;

      // Store token in Supabase
      await supabase.from('tiktok_accounts').upsert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        access_token: this.access_token,
        username: credentials.username,
      });

      return data;
    } catch (error) {
      console.error('TikTok login error:', error);
      throw error;
    }
  }

  static async getUserProfile() {
    try {
      const response = await fetch(`${this.API_BASE}/user/info/`, {
        headers: {
          'Authorization': `Bearer ${this.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching TikTok profile:', error);
      throw error;
    }
  }

  static async uploadVideo(videoData: TikTokVideo) {
    try {
      // 1. Initialize upload
      const initResponse = await fetch(`${this.API_BASE}/video/init/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: videoData.title,
          description: videoData.description,
          privacy_level: videoData.privacy,
        }),
      });

      const { upload_url } = await initResponse.json();

      // 2. Upload video file
      const formData = new FormData();
      formData.append('video', videoData.videoFile);

      const uploadResponse = await fetch(upload_url, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Video upload failed');
      }

      return await uploadResponse.json();
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }

  static async getAnalytics(days: number = 7) {
    try {
      const response = await fetch(`${this.API_BASE}/analytics/user/`, {
        headers: {
          'Authorization': `Bearer ${this.access_token}`,
        },
        body: JSON.stringify({
          date_range: {
            start_date: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
            end_date: new Date().toISOString(),
          },
          metrics: [
            'follower_count',
            'profile_view',
            'video_view',
            'like_count',
            'comment_count',
            'share_count',
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
}
