import { create } from 'zustand';
import { InventoryAlert } from '../types';

interface NotificationState {
  notifications: InventoryAlert[];
  unreadCount: number;
  addNotification: (notification: InventoryAlert) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => 
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    })),
  markAllAsRead: () => set({ unreadCount: 0 })
}));