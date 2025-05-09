import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { io } from 'socket.io-client';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const socket = io('wss://api.icetur.com'); // Replace with your actual WebSocket server

    socket.on('notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-accent-orange text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-carbon-gray rounded-xl shadow-xl z-50">
          <div className="p-4 border-b border-carbon-black">
            <h3 className="font-semibold">Notificaciones</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">
                No hay notificaciones nuevas
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-carbon-black hover:bg-carbon-black transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-white"
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
  );
}