// Replace IncomingRequests.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ConnectionRequest } from '../../types/buddy.types';
import { fetchIncomingRequests, updateRequestStatus } from '../../services/buddy/buddyService';
import { 
  fetchNotifications, 
  markAsRead, 
  markAllAsRead, 
  Notification 
} from '../../services/buddy/notificationService';
import toast from 'react-hot-toast';

interface IncomingRequestsProps {
  onRequestUpdate?: () => void;
}

export const IncomingRequests: React.FC<IncomingRequestsProps> = ({ onRequestUpdate }) => {
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifPage, setNotifPage] = useState(0);
  const [hasMoreNotif, setHasMoreNotif] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'requests' | 'all'>('requests');
  const { user } = useAuth();

  const observer = useRef<IntersectionObserver>();
  const lastNotifRef = useCallback((node: HTMLDivElement) => {
    if (notifLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreNotif) {
        setNotifPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [notifLoading, hasMoreNotif]);

  useEffect(() => {
    if (user) {
      loadRequests();
      loadNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (user && activeTab === 'all') {
      loadNotifications();
    }
  }, [notifPage]);

  const loadRequests = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await fetchIncomingRequests(user.id);
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const loadNotifications = async () => {
    if (!user) return;
    
    setNotifLoading(true);
    try {
      const { notifications: newNotifs, hasMore } = await fetchNotifications(user.id, notifPage);
      setNotifications(prev => notifPage === 0 ? newNotifs : [...prev, ...newNotifs]);
      setHasMoreNotif(hasMore);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setNotifLoading(false);
    }
  };

  const handleAction = async (requestId: string, status: 'accepted' | 'rejected') => {
    setProcessingId(requestId);
    try {
      await updateRequestStatus(requestId, status);
      setRequests(prev => prev.filter(r => r.id !== requestId));
      toast.success(status === 'accepted' ? 'Connection accepted!' : 'Request declined');
      if (onRequestUpdate) {
        onRequestUpdate();
      }
      // Reload notifications to show new connection notification
      setNotifPage(0);
      loadNotifications();
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request');
    } finally {
      setProcessingId(null);
    }
  };

  const handleMarkAllRead = async () => {
    if (!user) return;
    try {
      await markAllAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      toast.success('Marked all as read');
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleNotificationClick = async (notif: Notification) => {
    if (!notif.is_read) {
      await markAsRead(notif.id);
      setNotifications(prev =>
        prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n)
      );
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(dateString).toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading && notifLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
        {unreadCount > 0 && activeTab === 'all' && (
          <button 
            onClick={handleMarkAllRead}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'requests'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Requests ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({notifications.length})
        </button>
      </div>

      {activeTab === 'requests' ? (
        requests.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-16 text-center">
            <div className="text-6xl mb-4">📬</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No pending requests</h3>
            <p className="text-slate-600">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {requests.map((request) => {
              const sender = request.sender as any;
              const isProcessing = processingId === request.id;

              return (
                <div
                  key={request.id}
                  className="bg-blue-50 hover:bg-blue-100 rounded-xl p-4 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {(sender?.full_name?.[0] || sender?.email?.[0] || 'U').toUpperCase()}
                      </div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-sm text-slate-900">
                            <span className="font-semibold">
                              {sender?.full_name || sender?.email?.split('@')[0] || 'Someone'}
                            </span>
                            {' sent you a connection request'}
                          </p>
                          <p className="text-xs text-blue-600 font-medium mt-0.5">
                            {formatTimeAgo(request.created_at)}
                          </p>
                        </div>
                      </div>

                      {request.message && (
                        <p className="text-sm text-slate-700 bg-white/50 rounded-lg p-2 mb-3 line-clamp-2">
                          "{request.message}"
                        </p>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(request.id, 'accepted')}
                          disabled={isProcessing}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          {isProcessing ? 'Processing...' : 'Accept'}
                        </button>
                        <button
                          onClick={() => handleAction(request.id, 'rejected')}
                          disabled={isProcessing}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="space-y-2">
          {notifications.map((notif, index) => {
            const isLast = index === notifications.length - 1;
            const relatedUser = Array.isArray(notif.related_user) 
              ? notif.related_user[0] 
              : notif.related_user;

            return (
              <div
                key={notif.id}
                ref={isLast ? lastNotifRef : null}
                onClick={() => handleNotificationClick(notif)}
                className={`rounded-xl p-4 transition-colors cursor-pointer ${
                  notif.is_read 
                    ? 'bg-white hover:bg-slate-50' 
                    : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xl">
                      {notif.type === 'connection_accepted' ? '🤝' : '📝'}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{notif.title}</p>
                        <p className="text-sm text-slate-700 mt-0.5">{notif.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{formatTimeAgo(notif.created_at)}</p>
                      </div>
                      {!notif.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {notifLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
            </div>
          )}

          {!hasMoreNotif && notifications.length > 0 && (
            <p className="text-center text-slate-500 py-4 text-sm">No more notifications</p>
          )}

          {notifications.length === 0 && !notifLoading && (
            <div className="bg-slate-50 rounded-2xl p-16 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No notifications yet</h3>
              <p className="text-slate-600">We'll notify you when something happens!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};