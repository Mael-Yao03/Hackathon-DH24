import { create } from 'zustand';
import { InventoryAlert } from '../types';

interface NotificationState {
  notifications: InventoryAlert[];
  unreadCount: number;
  addNotification: (notification: InventoryAlert) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'stock',
      message: 'Stock critique: Doliprane 1000mg',
      severity: 'high',
      date: new Date().toISOString(),
      read: false,
      product: {
        id: '1',
        name: 'Doliprane 1000mg',
        currentStock: 50,
        threshold: 100
      }
    },
    {
      id: '2',
      type: 'stock',
      message: 'Stock faible: Efferalgan 500mg',
      severity: 'medium',
      date: new Date().toISOString(),
      read: false,
      product: {
        id: '2',
        name: 'Efferalgan 500mg',
        currentStock: 75,
        threshold: 100
      }
    }
  ],
  unreadCount: 2,
  addNotification: (notification) => 
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    })),
  markAllAsRead: () => 
    set((state) => ({
      notifications: state.notifications.map(notif => ({ ...notif, read: true })),
      unreadCount: 0
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(notif => notif.id !== id),
      unreadCount: state.notifications.find(n => n.id === id && !n.read)
        ? state.unreadCount - 1
        : state.unreadCount
    }))
}));