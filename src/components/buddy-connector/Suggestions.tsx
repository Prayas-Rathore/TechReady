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

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSuggestion = suggestions[currentIndex];

  const handleSkip = () => {
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleConnectCard = async () => {
    if (!currentSuggestion) return;
    await handleConnect(currentSuggestion);
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
          <p className="mt-4 text-slate-600">Finding your matches...</p>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">No Matches Found</h3>
        <p className="text-slate-600 max-w-md">
          We couldn't find buddies matching your interests.
          Try adding more interests or check back later!
        </p>
      </div>
    );
  }

  if (!currentSuggestion || currentIndex >= suggestions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
        <div className="text-7xl mb-6">🎉</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">That's Everyone!</h3>
        <p className="text-slate-600 max-w-md mb-6">
          You've reviewed all available matches. Check back later for new buddies!
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
        >
          Review Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Discover Buddies</h2>
        <p className="text-slate-600 mt-1">
          {currentIndex + 1} of {suggestions.length}
        </p>
      </div>

      <div className="relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="h-32 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />

          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
                {(currentSuggestion.full_name?.[0] || currentSuggestion.email?.[0] || 'U').toUpperCase()}
              </div>
            </div>

            <div className="pt-20 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {currentSuggestion.full_name || currentSuggestion.email?.split('@')[0] || 'Anonymous'}
              </h3>
              {currentSuggestion.email && (
                <p className="text-slate-500 text-sm mb-4">{currentSuggestion.email}</p>
              )}

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-sm font-semibold text-blue-700">
                  {currentSuggestion.match_count} shared interest{currentSuggestion.match_count !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Common Interests</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {currentSuggestion.matching_domains.map((domain) => (
                    <span
                      key={domain.id}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 border border-blue-100"
                    >
                      {domain.icon && <span className="mr-1.5 text-base">{domain.icon}</span>}
                      {domain.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handleSkip}
            disabled={sendingRequest === currentSuggestion.id}
            className="w-16 h-16 rounded-full bg-white border-2 border-slate-300 text-slate-500 hover:border-red-400 hover:text-red-500 hover:scale-110 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Skip"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={handleConnectCard}
            disabled={sendingRequest === currentSuggestion.id}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:scale-110 hover:shadow-2xl transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Connect"
          >
            {sendingRequest === currentSuggestion.id ? (
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};