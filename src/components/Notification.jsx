// src/components/Notification.js
import React from 'react';

const Notification = () => {
  const notifications = [
    { id: 1, message: 'Your land record TL001234 has been verified successfully', read: false, date: '2024-01-15', type: 'success' },
    { id: 2, message: 'New transfer request received for land record TL001235', read: true, date: '2024-01-14', type: 'info' },
    { id: 3, message: 'Land record TL001236 requires additional documentation', read: false, date: '2024-01-13', type: 'warning' },
    { id: 4, message: 'Transfer request for TL001234 has been approved', read: true, date: '2024-01-12', type: 'success' },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-orange-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-gray-500">No notifications</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-4 border-b border-gray-100 ${
                !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-white'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-lg ${getNotificationColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    !notification.read ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex justify-between items-center">
          <button className="text-blue-600 text-sm font-medium px-3 py-1 rounded">
            Mark all as read
          </button>
          <button className="text-gray-600 text-sm font-medium px-3 py-1 rounded">
            View all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;