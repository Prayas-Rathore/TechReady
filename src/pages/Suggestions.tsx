// src/pages/BuddyConnector/Suggestions.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../src/services/SupabaseClient';
import { useAuth } from '../context/AuthContext';
import { BuddySuggestion, Domain } from '../types/buddy.types';
import toast from 'react-hot-toast';


export const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<BuddySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSuggestions();
    }
  }, [user]);

  const fetchSuggestions = async () => {
    if (!user) return;
    
    setLoading(true);

    try {
      // 1. Get current user's domain IDs
      const { data: userDomains, error: domainError } = await supabase
        .from('user_domains')
        .select('domain_id')
        .eq('user_id', user.id);

      if (domainError) throw domainError;

      if (!userDomains || userDomains.length === 0) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      const domainIds = userDomains.map(ud => ud.domain_id);

      // 2. Get users to exclude (self + existing connections/requests)
      const { data: existingRequests } = await supabase
        .from('connection_requests')
        .select('receiver_id, sender_id')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

      const excludeUserIds = new Set<string>([user.id]);
      existingRequests?.forEach(r => {
        excludeUserIds.add(r.sender_id);
        excludeUserIds.add(r.receiver_id);
      });

      // 3. Find users with matching domains
      const { data: matches, error: matchError } = await supabase
        .from('user_domains')
        .select(`
          user_id,
          domain:domains(id, name, category, icon)
        `)
        .in('domain_id', domainIds)
        .neq('user_id', user.id);

      if (matchError) throw matchError;

      // 4. Group by user, filtering excluded
      const userMap = new Map<string, { domains: Domain[] }>();
      
      matches?.forEach((match: any) => {
        if (excludeUserIds.has(match.user_id)) return;
        
        if (!userMap.has(match.user_id)) {
          userMap.set(match.user_id, { domains: [] });
        }
        
        if (match.domain) {
          userMap.get(match.user_id)!.domains.push(match.domain);
        }
      });

      const matchedUserIds = Array.from(userMap.keys());
      
      if (matchedUserIds.length === 0) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      // 5. Fetch profiles for matched users (using YOUR profiles table)
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', matchedUserIds)
        .eq('soft_deleted', false);

      if (profileError) throw profileError;

      // 6. Combine profiles with domain matches
      const suggestionList: BuddySuggestion[] = (profiles || [])
        .map(profile => {
          const userData = userMap.get(profile.id);
          return {
            id: profile.id,
            email: profile.email,
            full_name: profile.full_name,
            matching_domains: userData?.domains || [],
            match_count: userData?.domains.length || 0
          };
        })
        .filter(s => s.match_count > 0)
        .sort((a, b) => b.match_count - a.match_count);

      setSuggestions(suggestionList);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const sendConnectionRequest = async (receiverId: string, receiverName?: string | null) => {
    if (!user) return;

    setSendingRequest(receiverId);

    try {
      const { error } = await supabase
        .from('connection_requests')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          message: `Hi ${receiverName || 'there'}! I'd love to connect and prepare for interviews together.`,
          status: 'pending'
        });

      if (error) throw error;

      setSuggestions(prev => prev.filter(s => s.id !== receiverId));
      toast.success('Connection request sent!');
    } catch (error: any) {
      console.error('Error sending request:', error);
      if (error.code === '23505') {
        toast.error('Request already sent to this user');
      } else {
        toast.error(error.message || 'Failed to send request');
      }
    } finally {
      setSendingRequest(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
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
          Connect with people preparing for similar roles
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                onClick={() => sendConnectionRequest(suggestion.id, suggestion.full_name)}
                disabled={sendingRequest === suggestion.id}
                className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {sendingRequest === suggestion.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Request'
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};