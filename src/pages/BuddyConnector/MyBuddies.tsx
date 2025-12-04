// src/pages/BuddyConnector/MyBuddies.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BuddyConnection } from '../../types/buddy.types';
import { fetchMyBuddies } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const MyBuddies: React.FC = () => {
  const [buddies, setBuddies] = useState<BuddyConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadBuddies();
    }
  }, [user]);

  const loadBuddies = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await fetchMyBuddies(user.id);
      setBuddies(data);
    } catch (error) {
      console.error('Error fetching buddies:', error);
      toast.error('Failed to load buddies');
    } finally {
      setLoading(false);
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
        <h2 className="text-xl font-semibold text-gray-900">My Buddies</h2>
        <p className="text-gray-600 mt-1">
          Your connected study partners
        </p>
      </div>

      {buddies.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No buddies yet</h3>
          <p className="text-gray-600">
            Start connecting with people to build your study network!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buddies.map((connection) => (
            <div
              key={connection.request_id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                  {(connection.buddy.full_name?.[0] || connection.buddy.email?.[0] || 'U').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {connection.buddy.full_name || connection.buddy.email?.split('@')[0] || 'Anonymous'}
                  </h3>
                  {connection.buddy.email && (
                    <p className="text-sm text-gray-500 truncate">{connection.buddy.email}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Connected {formatDate(connection.connected_at)}
                  </p>
                </div>
              </div>

              {connection.matching_domains.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {connection.matching_domains.slice(0, 4).map((domain) => (
                      <span
                        key={domain.id}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-50 text-purple-700"
                      >
                        {domain.icon && <span className="mr-1">{domain.icon}</span>}
                        {domain.name}
                      </span>
                    ))}
                    {connection.matching_domains.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-0.5">
                        +{connection.matching_domains.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => window.location.href = `mailto:${connection.buddy.email}`}
                disabled={!connection.buddy.email}
                className="w-full py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Send Email
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};