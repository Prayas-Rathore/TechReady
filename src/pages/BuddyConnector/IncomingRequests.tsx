// src/pages/BuddyConnector/IncomingRequests.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ConnectionRequest } from '../../types/buddy.types';
import { fetchIncomingRequests, updateRequestStatus } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const IncomingRequests: React.FC = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Incoming Requests</h2>
        <p className="text-gray-600 mt-1">
          People who want to connect with you
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
          <p className="text-gray-600">
            When someone wants to connect, their request will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const sender = request.sender as any;
            return (
              <div
                key={request.id}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {(sender?.full_name?.[0] || sender?.email?.[0] || 'U').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {sender?.full_name || sender?.email?.split('@')[0] || 'Anonymous'}
                        </h3>
                        {sender?.email && (
                          <p className="text-sm text-gray-500">{sender.email}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(request.created_at)}
                      </span>
                    </div>
                    
                    {request.message && (
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        "{request.message}"
                      </p>
                    )}

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleAction(request.id, 'accepted')}
                        disabled={processingId === request.id}
                        className="flex-1 py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {processingId === request.id ? 'Processing...' : 'Accept'}
                      </button>
                      <button
                        onClick={() => handleAction(request.id, 'rejected')}
                        disabled={processingId === request.id}
                        className="flex-1 py-2 px-4 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
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
      )}
    </div>
  );
};