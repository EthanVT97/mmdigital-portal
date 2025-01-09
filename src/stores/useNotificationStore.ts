import { create } from 'zustand';
import { notificationApi, type Notification } from '@/services/api';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await notificationApi.list();
      set({ notifications: response.data.data || response.data });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const response = await notificationApi.getUnreadCount();
      set({ unreadCount: response.data.count });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  markAsRead: async (id: number) => {
    try {
      const response = await notificationApi.markAsRead(id);
      set(state => ({
        notifications: state.notifications.map(notification =>
          notification.id === id
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationApi.markAllAsRead();
      set(state => ({
        notifications: state.notifications.map(notification => ({
          ...notification,
          read_at: new Date().toISOString()
        })),
        unreadCount: 0
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useNotificationStore;
