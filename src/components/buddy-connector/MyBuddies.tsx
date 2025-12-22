import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BuddyConnection } from '../../types/buddy.types';
import { fetchMyBuddies, removeConnection } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const MyBuddies: React.FC = () => {
  const [buddies, setBuddies] = useState<BuddyConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleRemoveConnection = async (requestId: string) => {
    try {
      await removeConnection(requestId);
      setBuddies(prev => prev.filter(b => b.request_id !== requestId));
      toast.success('Connection removed');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error removing connection:', error);
      toast.error('Failed to remove connection');
    }
  };

  const filteredBuddies = buddies.filter(connection => {
    const matchesSearch = searchQuery === '' ||
      connection.buddy.sudo_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Remove Connection</h3>
              <p className="text-slate-600 mb-6">Are you sure you want to remove this connection? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemoveConnection(deleteConfirm)}
                  className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">My Network</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {buddies.length} connection{buddies.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search connections..."
          className="w-full px-5 py-3 pl-12 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {buddies.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-8 sm:p-16 text-center">
          <div className="text-5xl sm:text-6xl mb-4">👥</div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Build Your Network</h3>
          <p className="text-sm sm:text-base text-slate-600">
            Start connecting with people to build your study network!
          </p>
        </div>
      ) : filteredBuddies.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-5xl mb-4">🔍</div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">No matches found</h3>
          <p className="text-sm sm:text-base text-slate-600">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
          {filteredBuddies.map((connection) => (
            <div key={connection.request_id}>
              {/* Mobile View */}
              <div className="md:hidden bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                    {(connection.buddy.sudo_name?.[0] || 'U').toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-slate-900 truncate">
                      @{connection.buddy.sudo_name}
                    </h3>
                    <p className="text-xs text-slate-500">Connected</p>
                  </div>

                  <button
                    onClick={() => {
                      setDeleteConfirm(connection.request_id);
                      setOpenMenuId(null);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                <div className="h-20 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />

                <div className="relative px-3 pb-3">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white">
                      {(connection.buddy.sudo_name?.[0] || 'U').toUpperCase()}
                    </div>
                  </div>

                  <div className="pt-12 text-center">
                    <h3 className="font-semibold text-base text-slate-900 truncate mb-1 px-2">
                      {connection.buddy.sudo_name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">Connected</p>

                    <button
                      onClick={() => setDeleteConfirm(connection.request_id)}
                      className="w-full py-2 px-3 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};