import React, { useState } from 'react';
import { Bell, LogOut, X, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

export function Header() {
  const { user, logout } = useAuthStore();
  const { notifications, unreadCount, markAllAsRead, markAsRead, removeNotification } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-900">
              Bienvenue, {user?.pharmacyName}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllAsRead();
                }}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        Aucune notification
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(notification.severity)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Stock actuel: {notification.product.currentStock} / Seuil: {notification.product.threshold}
                              </p>
                            </div>
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}