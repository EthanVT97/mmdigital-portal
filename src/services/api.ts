import axios, { AxiosResponse } from 'axios';
import type { Campaign } from '@/stores/useCampaignStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8083/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const campaignApi = {
  list: (params?: any): Promise<AxiosResponse<PaginatedResponse<Campaign>>> => 
    api.get('/campaigns', { params }),
  
  create: (data: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<AxiosResponse<Campaign>> => 
    api.post('/campaigns', data),
  
  get: (id: number): Promise<AxiosResponse<Campaign>> => 
    api.get(`/campaigns/${id}`),
  
  update: (id: number, data: Partial<Campaign>): Promise<AxiosResponse<Campaign>> => 
    api.put(`/campaigns/${id}`, data),
  
  delete: (id: number): Promise<AxiosResponse<void>> => 
    api.delete(`/campaigns/${id}`),
  
  getAnalytics: (id: number): Promise<AxiosResponse<any>> => 
    api.get(`/campaigns/${id}/analytics`),
};

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

export const notificationApi = {
  list: (params?: any): Promise<AxiosResponse<PaginatedResponse<Notification>>> => 
    api.get('/notifications', { params }),
  
  getUnreadCount: (): Promise<AxiosResponse<{ count: number }>> => 
    api.get('/notifications/unread'),
  
  markAsRead: (id: number): Promise<AxiosResponse<Notification>> => 
    api.post(`/notifications/${id}/read`),
  
  markAllAsRead: (): Promise<AxiosResponse<void>> => 
    api.post('/notifications/read-all'),
};

export default api;
