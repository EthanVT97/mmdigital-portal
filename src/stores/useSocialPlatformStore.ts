import { create } from 'zustand';
import { socialAuthService, type SocialPlatform } from '@/services/socialAuth';

interface SocialPlatformState {
  platforms: SocialPlatform[];
  loading: boolean;
  error: string | null;
  fetchPlatforms: () => Promise<void>;
  connectPlatform: (platformId: string) => Promise<void>;
  disconnectPlatform: (platformId: string) => Promise<void>;
}

const useSocialPlatformStore = create<SocialPlatformState>((set) => ({
  platforms: [],
  loading: false,
  error: null,

  fetchPlatforms: async () => {
    set({ loading: true, error: null });
    try {
      const platforms = await socialAuthService.getConnectedPlatforms();
      set({ platforms });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch platforms' });
    } finally {
      set({ loading: false });
    }
  },

  connectPlatform: async (platformId: string) => {
    set({ loading: true, error: null });
    try {
      let response;
      switch (platformId) {
        case 'facebook':
          response = await socialAuthService.connectFacebook();
          break;
        case 'google':
          response = await socialAuthService.connectGoogle();
          break;
        case 'tiktok':
          response = await socialAuthService.connectTikTok();
          break;
        case 'telegram':
          // For Telegram, you'll need to handle bot token input separately
          return;
        default:
          throw new Error('Unsupported platform');
      }

      if (!response.success) {
        throw new Error(response.error);
      }

      set(state => ({
        platforms: [...state.platforms, response.platform]
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to connect platform' });
    } finally {
      set({ loading: false });
    }
  },

  disconnectPlatform: async (platformId: string) => {
    set({ loading: true, error: null });
    try {
      // Remove platform tokens from Supabase
      const { error } = await supabase
        .from('platform_tokens')
        .delete()
        .match({ platform: platformId });

      if (error) throw error;

      set(state => ({
        platforms: state.platforms.filter(p => p.id !== platformId)
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to disconnect platform' });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useSocialPlatformStore;
