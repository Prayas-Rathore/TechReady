import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ConnectionRequest } from '../../types/buddy.types';
import { fetchIncomingRequests, updateRequestStatus } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

interface IncomingRequestsProps {
  onRequestUpdate?: () => void;
}

export const IncomingRequests: React.FC<IncomingRequestsProps> = ({ onRequestUpdate }) => {
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadRequests();
    }
  }, [user]);

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

  const handleAction = async (requestId: string, status: 'accepted' | 'rejected') => {
    setProcessingId(requestId);
    try {
      await updateRequestStatus(requestId, status);
      setRequests(prev => prev.filter(r => r.id !== requestId));
      toast.success(status === 'accepted' ? 'Connection accepted!' : 'Request declined');
      if (onRequestUpdate) {
        onRequestUpdate();
      }
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('unread');

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  if (loading) {
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
        {requests.length > 0 && (
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'unread'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Unread ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          All
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-16 text-center">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">You're all caught up!</h3>
          <p className="text-slate-600">
            No new connection requests at the moment.
          </p>
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
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Accept</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleAction(request.id, 'rejected')}
                        disabled={isProcessing}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};