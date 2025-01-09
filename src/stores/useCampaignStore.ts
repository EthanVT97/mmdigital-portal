import { create } from 'zustand';
import { campaignApi } from '@/services/api';

export interface Campaign {
  id: number;
  name: string;
  platform: 'facebook' | 'telegram' | 'google' | 'tiktok' | 'youtube';
  description?: string;
  budget: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}

interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchCampaigns: () => Promise<void>;
  createCampaign: (data: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>) => Promise<Campaign>;
  updateCampaign: (id: number, data: Partial<Campaign>) => Promise<Campaign>;
  deleteCampaign: (id: number) => Promise<void>;
}

const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  loading: false,
  error: null,

  fetchCampaigns: async () => {
    set({ loading: true, error: null });
    try {
      const response = await campaignApi.list();
      set({ campaigns: response.data.data || response.data });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createCampaign: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await campaignApi.create(data);
      const newCampaign = response.data;
      set(state => ({
        campaigns: [...state.campaigns, newCampaign]
      }));
      return newCampaign;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateCampaign: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await campaignApi.update(id, data);
      const updatedCampaign = response.data;
      set(state => ({
        campaigns: state.campaigns.map(campaign =>
          campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
        )
      }));
      return updatedCampaign;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteCampaign: async (id) => {
    set({ loading: true, error: null });
    try {
      await campaignApi.delete(id);
      set(state => ({
        campaigns: state.campaigns.filter(campaign => campaign.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCampaignStore;
