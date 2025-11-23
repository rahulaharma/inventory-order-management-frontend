import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api';
import { useAuth } from '../../pages/useAuth';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    if (!user || !user.id) return;
    try {
      const response = await api.get(`/notifications/user/${user.id}/unread`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    // Only fetch notifications if the dropdown is closed to avoid re-fetching while it's open
    if (!isOpen) {
      fetchNotifications();
    }
    const interval = setInterval(() => {
        if (!isOpen) {
            fetchNotifications();
        }
    }, 60000); // Poll for new notifications every minute

    return () => clearInterval(interval);
  }, [user, isOpen]); // Added isOpen to the dependency array

  // --- REVISED CLICK HANDLER ---
  const handleBellClick = async () => {
    // If the dropdown is currently open and we're about to close it...
    if (isOpen) {
      // ...and there are notifications to be cleared...
      if (notifications.length > 0) {
        try {
          // Mark all as read on the backend
          const markAsReadPromises = notifications.map(notif =>
            api.put(`/notifications/mark-as-read/${notif.id}`)
          );
          await Promise.all(markAsReadPromises);
          
          // Clear notifications from the local state
          setNotifications([]);
        } catch (error) {
          console.error('Failed to mark notifications as read:', error);
        }
      }
    }
    
    // In either case (opening or closing), toggle the dropdown's visibility
    setIsOpen(!isOpen);
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={handleBellClick} // Use the revised handler
        className="relative rounded-full border border-slate-200 bg-white/80 p-2 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 rounded-2xl border border-slate-100 bg-white/95 shadow-2xl backdrop-blur">
          <div className="border-b px-4 py-3 text-sm font-semibold text-slate-700">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif.id} className="border-b px-4 py-3 hover:bg-slate-50/70">
                  <p className="text-sm text-slate-700">{notif.message}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-slate-500">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
