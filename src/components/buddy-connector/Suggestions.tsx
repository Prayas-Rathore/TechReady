// Replace Suggestions.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BuddySuggestion } from '../../types/buddy.types';
import { fetchSuggestions, sendConnectionRequest } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const Suggestions: React.FC = () => {
  const [allSuggestions, setAllSuggestions] = useState<BuddySuggestion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { user } = useAuth();

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(allSuggestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSuggestions = allSuggestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (user) loadSuggestions();
  }, [user]);

  const loadSuggestions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchSuggestions(user.id);
      setAllSuggestions(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (suggestion: BuddySuggestion, action: 'accept' | 'reject') => {
    if (!user) return;
    
    if (action === 'reject') {
      setAllSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      toast.success('Skipped');
      return;
    }

    setProcessingId(suggestion.id);
    try {
      await sendConnectionRequest(
        user.id,
        suggestion.id,
        `Hi ${suggestion.sudo_name || 'there'}! I'd love to connect and prepare for interviews together.`
      );
      setAllSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      toast.success('Connection request sent!');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.code === '23505' ? 'Request already sent' : 'Failed to send request');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (allSuggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="text-5xl sm:text-6xl mb-4">🔍</div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No Matches Found</h3>
        <p className="text-sm sm:text-base text-slate-600">Try adding more interests!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Discover Buddies</h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1">{allSuggestions.length} potential connections</p>
      </div>

      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 mb-4 sm:mb-6">
        {currentSuggestions.map((suggestion) => {
          const isProcessing = processingId === suggestion.id;
          return (
            <div key={suggestion.id} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
  <div className="flex gap-4">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
      {(suggestion.sudo_name?.[0] || 'U').toUpperCase()}
    </div>

    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-slate-900">
        @{suggestion.sudo_name}
      </h3>
      <p className="text-sm text-slate-500 mb-3">Member</p>

      <div className="flex gap-2">
        <button
          onClick={() => handleAction(suggestion, 'reject')}
          disabled={isProcessing}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          Skip
        </button>
        <button
          onClick={() => handleAction(suggestion, 'accept')}
          disabled={isProcessing}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isProcessing ? 'Sending...' : 'Connect'}
        </button>
      </div>
    </div>
  </div>
</div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-xs sm:text-sm font-medium"
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-xs sm:text-sm font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};