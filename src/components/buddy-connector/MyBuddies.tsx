import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BuddyConnection } from '../../types/buddy.types';
import { fetchMyBuddies,removeConnection  } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const MyBuddies: React.FC = () => {
  const [buddies, setBuddies] = useState<BuddyConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRemoveConnection = async (requestId: string) => {
  try {
    await removeConnection(requestId);
    setBuddies(prev => prev.filter(b => b.request_id !== requestId));
    toast.success('Connection removed');
  } catch (error) {
    console.error('Error removing connection:', error);
    toast.error('Failed to remove connection');
  }
};

  const allDomains = Array.from(
    new Set(buddies.flatMap(b => b.matching_domains.map(d => d.name)))
  );
  const filters = ['All', ...allDomains.slice(0, 5)];

  const filteredBuddies = buddies.filter(connection => {
    const matchesSearch = searchQuery === '' ||
      connection.buddy.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.buddy.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'All' ||
      connection.matching_domains.some(d => d.name === selectedFilter);

    return matchesSearch && matchesFilter;
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

      <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-2 pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
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
              <div className="md:hidden bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                    {(connection.buddy.full_name?.[0] || connection.buddy.email?.[0] || 'U').toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-slate-900 truncate">
                      {connection.buddy.full_name || connection.buddy.email?.split('@')[0] || 'Anonymous'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {connection.matching_domains.length} common interest{connection.matching_domains.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <button
                    onClick={() => window.location.href = `mailto:${connection.buddy.email}`}
                    disabled={!connection.buddy.email}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    Message
                  </button>

                  <div className="relative" ref={openMenuId === connection.request_id ? menuRef : null}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === connection.request_id ? null : connection.request_id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {openMenuId === connection.request_id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                        <button
                          onClick={() => {
                            if (confirm('Remove this connection?')) {
                              handleRemoveConnection(connection.request_id);
                            }
                            setOpenMenuId(null);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                <div className="h-20 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />

                <div className="relative px-3 pb-3">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white">
                      {(connection.buddy.full_name?.[0] || connection.buddy.email?.[0] || 'U').toUpperCase()}
                    </div>
                  </div>

                  <div className="pt-12 text-center">
                    <h3 className="font-semibold text-base text-slate-900 truncate mb-1 px-2">
                      {connection.buddy.full_name || connection.buddy.email?.split('@')[0] || 'Anonymous'}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      {connection.matching_domains.length} common interest{connection.matching_domains.length !== 1 ? 's' : ''}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.location.href = `mailto:${connection.buddy.email}`}
                        disabled={!connection.buddy.email}
                        className="flex-1 py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                      >
                        Message
                      </button>

                      <div className="relative" ref={openMenuId === connection.request_id ? menuRef : null}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === connection.request_id ? null : connection.request_id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {openMenuId === connection.request_id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                            <button
                              onClick={() => {
                                if (confirm('Remove this connection?')) {
                                  handleRemoveConnection(connection.request_id);
                                }
                                setOpenMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                            >
                              Remove Connection
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
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