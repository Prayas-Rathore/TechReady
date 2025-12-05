// src/pages/BuddyConnector/Suggestions.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BuddySuggestion } from '../../types/buddy.types';
import { fetchSuggestions, sendConnectionRequest } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<BuddySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSuggestions();
    }
  }, [user]);

  const loadSuggestions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await fetchSuggestions(user.id);
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (suggestion: BuddySuggestion) => {
    if (!user) return;

    setSendingRequest(suggestion.id);
    try {
      await sendConnectionRequest(
        user.id,
        suggestion.id,
        `Hi ${suggestion.full_name || 'there'}! I'd love to connect and prepare for interviews together.`
      );
      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      toast.success('Connection request sent!');
    } catch (error: any) {
      console.error('Error sending request:', error);
      if (error.code === '23505') {
        toast.error('Request already sent to this user');
      } else {
        toast.error('Failed to send request');
      }
    } finally {
      setSendingRequest(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Finding study buddies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Suggested Buddies</h2>
        <p className="text-gray-600 mt-1">
          People preparing for similar roles as you
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find buddies matching your domains. 
            Try adding more domains or check back as more users join!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {(suggestion.full_name?.[0] || suggestion.email?.[0] || 'U').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {suggestion.full_name || suggestion.email?.split('@')[0] || 'Anonymous'}
                  </h3>
                  {suggestion.email && (
                    <p className="text-sm text-gray-500 truncate">{suggestion.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">
                  {suggestion.match_count} shared interest{suggestion.match_count !== 1 ? 's' : ''}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestion.matching_domains.slice(0, 3).map((domain) => (
                    <span
                      key={domain.id}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700"
                    >
                      {domain.icon && <span className="mr-1">{domain.icon}</span>}
                      {domain.name}
                    </span>
                  ))}
                  {suggestion.matching_domains.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-0.5">
                      +{suggestion.matching_domains.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleConnect(suggestion)}
                disabled={sendingRequest === suggestion.id}
                className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {sendingRequest === suggestion.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};