import { supabase } from '@/lib/supabase';

export interface SocialPlatform {
  id: string;
  name: string;
  isConnected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface SocialAuthResponse {
  success: boolean;
  platform: SocialPlatform;
  error?: string;
}

class SocialAuthService {
  // Facebook OAuth
  async connectFacebook(): Promise<SocialAuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          scopes: 'ads_management,pages_manage_ads,pages_read_engagement'
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        platform: {
          id: 'facebook',
          name: 'Facebook',
          isConnected: true,
          accessToken: data?.provider_token,
          expiresAt: data?.expires_in ? new Date(Date.now() + data.expires_in * 1000).toISOString() : undefined
        }
      };
    } catch (error) {
      return {
        success: false,
        platform: { id: 'facebook', name: 'Facebook', isConnected: false },
        error: error instanceof Error ? error.message : 'Failed to connect to Facebook'
      };
    }
  }

  // Google (YouTube & Google Ads) OAuth
  async connectGoogle(): Promise<SocialAuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/adwords'
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        platform: {
          id: 'google',
          name: 'Google',
          isConnected: true,
          accessToken: data?.provider_token,
          expiresAt: data?.expires_in ? new Date(Date.now() + data.expires_in * 1000).toISOString() : undefined
        }
      };
    } catch (error) {
      return {
        success: false,
        platform: { id: 'google', name: 'Google', isConnected: false },
        error: error instanceof Error ? error.message : 'Failed to connect to Google'
      };
    }
  }

  // TikTok OAuth
  async connectTikTok(): Promise<SocialAuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'tiktok',
        options: {
          scopes: 'user.info.basic,video.list,user.account.stats'
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        platform: {
          id: 'tiktok',
          name: 'TikTok',
          isConnected: true,
          accessToken: data?.provider_token,
          expiresAt: data?.expires_in ? new Date(Date.now() + data.expires_in * 1000).toISOString() : undefined
        }
      };
    } catch (error) {
      return {
        success: false,
        platform: { id: 'tiktok', name: 'TikTok', isConnected: false },
        error: error instanceof Error ? error.message : 'Failed to connect to TikTok'
      };
    }
  }

  // Telegram Bot Integration
  async connectTelegram(botToken: string): Promise<SocialAuthResponse> {
    try {
      // Store the bot token securely in Supabase
      const { error } = await supabase
        .from('platform_tokens')
        .upsert({
          platform: 'telegram',
          token: botToken,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      return {
        success: true,
        platform: {
          id: 'telegram',
          name: 'Telegram',
          isConnected: true
        }
      };
    } catch (error) {
      return {
        success: false,
        platform: { id: 'telegram', name: 'Telegram', isConnected: false },
        error: error instanceof Error ? error.message : 'Failed to connect to Telegram'
      };
    }
  }

  // Get connected platforms for the current user
  async getConnectedPlatforms(): Promise<SocialPlatform[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('platform_tokens')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      return data.map(token => ({
        id: token.platform,
        name: token.platform.charAt(0).toUpperCase() + token.platform.slice(1),
        isConnected: true,
        accessToken: token.token,
        expiresAt: token.expires_at
      }));
    } catch (error) {
      console.error('Error fetching connected platforms:', error);
      return [];
    }
  }
}

export const socialAuthService = new SocialAuthService();
