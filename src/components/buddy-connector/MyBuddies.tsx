import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchMyBuddies, removeConnection } from '../../services/buddy/buddyService';
import { BuddyConnection } from '../../types/buddy.types';
import { Trash2, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { OnlineStatusDot } from '../buddy-connector/OnlineStatusDot';
import { CallButton } from '../buddy-connector/CallButton';
import { supabase } from '../../services/SupabaseClient';

interface BuddyWithPresence extends BuddyConnection {
  isOnline: boolean;
}

interface MyBuddiesProps {
  onCallInitiated: (buddyId: string, buddyName: string) => void;
}

export const MyBuddies: React.FC<MyBuddiesProps> = ({ onCallInitiated }) => {
  const [buddies, setBuddies] = useState<BuddyWithPresence[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadBuddies();
      subscribeToPresenceChanges();
    }
  }, [user]);

  const loadBuddies = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const buddyConnections = await fetchMyBuddies(user.id);
      
      // Get online status for all buddies
      const buddyIds = buddyConnections.map(b => b.buddy.id);
      const { data: presenceData } = await supabase
        .from('user_presence')
        .select('user_id, is_online, last_seen')
        .in('user_id', buddyIds);

      const presenceMap = new Map(
        presenceData?.map(p => [p.user_id, p.is_online]) || []
      );

      const buddiesWithPresence = buddyConnections.map(buddy => ({
        ...buddy,
        isOnline: presenceMap.get(buddy.buddy.id) || false
      }));

      setBuddies(buddiesWithPresence);
    } catch (error) {
      console.error('Error loading buddies:', error);
      toast.error('Failed to load buddies');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToPresenceChanges = () => {
    const channel = supabase
      .channel('presence-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_presence'
        },
        (payload) => {
          setBuddies(prev => prev.map(buddy => 
            buddy.buddy.id === payload.new.user_id
              ? { ...buddy, isOnline: payload.new.is_online }
              : buddy
          ));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleRemove = async (requestId: string) => {
    if (!confirm('Are you sure you want to remove this buddy?')) return;
    
    try {
      await removeConnection(requestId);
      toast.success('Buddy removed');
      loadBuddies();
    } catch (error) {
      console.error('Error removing buddy:', error);
      toast.error('Failed to remove buddy');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (buddies.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg">No buddies yet</p>
        <p className="text-gray-500 text-sm mt-2">
          Connect with people from suggestions to start chatting
        </p>
      </div>
    );
  }

  // Sort: online first, then by name
  const sortedBuddies = [...buddies].sort((a, b) => {
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;
    return (a.buddy.sudo_name || '').localeCompare(b.buddy.sudo_name || '');
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Buddies ({buddies.length})
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <OnlineStatusDot isOnline={true} size="sm" />
          <span>{buddies.filter(b => b.isOnline).length} online</span>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedBuddies.map((buddy) => (
          <div
            key={buddy.request_id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {buddy.buddy.sudo_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <OnlineStatusDot isOnline={buddy.isOnline} size="md" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {buddy.buddy.sudo_name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {buddy.isOnline ? (
                      <span className="text-green-600 font-medium">● Online</span>
                    ) : (
                      <span className="text-gray-400">○ Offline</span>
                    )}
                  </p>
                  {buddy.matching_domains && buddy.matching_domains.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {buddy.matching_domains.slice(0, 3).map((domain) => (
                        <span
                          key={domain.id}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {domain.icon} {domain.name}
                        </span>
                      ))}
                      {buddy.matching_domains.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{buddy.matching_domains.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CallButton
                  buddyId={buddy.buddy.id}
                  buddyName={buddy.buddy.sudo_name || 'Unknown'}
                  isOnline={buddy.isOnline}
                  onCallInitiated={onCallInitiated}
                />
                
                <button
                  onClick={() => handleRemove(buddy.request_id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Remove buddy"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};