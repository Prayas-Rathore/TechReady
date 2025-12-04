// src/services/buddy/buddyService.ts - FIXED VERSION

import { supabase } from '../../services/SupabaseClient';
import { Domain, BuddySuggestion, ConnectionRequest, BuddyConnection } from '../../types/buddy.types';
import { createConnectionNotification } from '../buddy/notificationService';

// ==================== DOMAINS ====================

export const fetchDomains = async (): Promise<Domain[]> => {
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const fetchUserDomains = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from('user_domains')
    .select('domain_id')
    .eq('user_id', userId);

  if (error) throw error;
  return data?.map(d => d.domain_id) || [];
};

export const saveUserDomains = async (userId: string, domainIds: string[]): Promise<void> => {
  // First, delete existing domains
  const { error: deleteError } = await supabase
    .from('user_domains')
    .delete()
    .eq('user_id', userId);

  if (deleteError) throw deleteError;

  // Then insert new domains
  if (domainIds.length > 0) {
    const { error: insertError } = await supabase
      .from('user_domains')
      .insert(
        domainIds.map(domainId => ({
          user_id: userId,
          domain_id: domainId
        }))
      );

    if (insertError) throw insertError;
  }
};

// ==================== SUGGESTIONS ====================

export const fetchSuggestions = async (userId: string): Promise<BuddySuggestion[]> => {
  try {
    // Step 1: Get current user's domain IDs
    const { data: userDomains, error: userDomainsError } = await supabase
      .from('user_domains')
      .select('domain_id')
      .eq('user_id', userId);

    if (userDomainsError) throw userDomainsError;
    
    const userDomainIds = userDomains?.map(d => d.domain_id) || [];
    
    if (userDomainIds.length === 0) {
      console.log('No domains selected by user');
      return [];
    }

    console.log('User domain IDs:', userDomainIds);

    // Step 2: Find users who share at least one domain
    const { data: matchingUsers, error: matchingError } = await supabase
      .from('user_domains')
      .select(`
        user_id,
        domain_id,
        domains (
          id,
          name,
          icon,
          category
        )
      `)
      .in('domain_id', userDomainIds)
      .neq('user_id', userId);

    if (matchingError) throw matchingError;

    console.log('Matching users raw:', matchingUsers);

    if (!matchingUsers || matchingUsers.length === 0) {
      console.log('No matching users found');
      return [];
    }

    // Step 3: Group by user and count matches
    const userMatchMap = new Map<string, {
      userId: string;
      matchingDomainIds: string[];
      matchingDomains: Domain[];
    }>();

    matchingUsers.forEach((match: any) => {
      if (!userMatchMap.has(match.user_id)) {
        userMatchMap.set(match.user_id, {
          userId: match.user_id,
          matchingDomainIds: [],
          matchingDomains: []
        });
      }
      
      const userMatch = userMatchMap.get(match.user_id)!;
      userMatch.matchingDomainIds.push(match.domain_id);
      
      // domains is an object, not an array
      if (match.domains) {
        userMatch.matchingDomains.push(match.domains as Domain);
      }
    });

    console.log('User match map:', Array.from(userMatchMap.entries()));

    // Step 4: Get user profiles for matched users
    const matchedUserIds = Array.from(userMatchMap.keys());
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .in('id', matchedUserIds);

    if (profilesError) throw profilesError;

    console.log('Profiles:', profiles);

    // Step 5: Filter out users with existing connection requests
    const { data: existingRequests, error: requestsError } = await supabase
      .from('connection_requests')
      .select('sender_id, receiver_id, status')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

    if (requestsError) throw requestsError;

    const excludedUserIds = new Set<string>();
    existingRequests?.forEach(req => {
      if (req.sender_id === userId) {
        excludedUserIds.add(req.receiver_id);
      } else {
        excludedUserIds.add(req.sender_id);
      }
    });

    console.log('Excluded user IDs:', Array.from(excludedUserIds));

    // Step 6: Build suggestions
    const suggestions: BuddySuggestion[] = (profiles || [])
      .filter(profile => !excludedUserIds.has(profile.id))
      .map(profile => {
        const match = userMatchMap.get(profile.id)!;
        return {
          id: profile.id,
          full_name: profile.full_name,
          email: profile.email,
          matching_domains: match.matchingDomains,
          match_count: match.matchingDomainIds.length
        };
      })
      .sort((a, b) => b.match_count - a.match_count);

    console.log('Final suggestions:', suggestions);
    return suggestions;

  } catch (error) {
    console.error('Error in fetchSuggestions:', error);
    throw error;
  }
};

// ==================== CONNECTION REQUESTS ====================

export const sendConnectionRequest = async (
  senderId: string,
  receiverId: string,
  message?: string
): Promise<void> => {
  const { error } = await supabase
    .from('connection_requests')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      message: message || '',
      status: 'pending'
    });

  if (error) throw error;
};

export const fetchIncomingRequests = async (userId: string): Promise<ConnectionRequest[]> => {
  const { data, error } = await supabase
    .from('connection_requests')
    .select(`
      id,
      sender_id,
      receiver_id,
      message,
      status,
      created_at,
      sender:profiles!sender_id(id, full_name, email)
    `)
    .eq('receiver_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Transform the data to match ConnectionRequest type
  return (data || []).map(req => ({
    id: req.id,
    sender_id: req.sender_id,
    receiver_id: req.receiver_id,
    message: req.message,
    status: req.status as 'pending' | 'accepted' | 'rejected',
    created_at: req.created_at,
    sender: Array.isArray(req.sender) ? req.sender[0] : req.sender
  }));
};

// export const updateRequestStatus = async (
//   requestId: string,
//   status: 'accepted' | 'rejected'
// ): Promise<void> => {
//   const { error } = await supabase
//     .from('connection_requests')
//     .update({ status })
//     .eq('id', requestId);

//   if (error) throw error;
// };

// ==================== MY BUDDIES ====================

export const fetchMyBuddies = async (userId: string): Promise<BuddyConnection[]> => {
  try {
    // Get all accepted connections where user is either sender or receiver
    const { data: connections, error: connectionsError } = await supabase
      .from('connection_requests')
      .select(`
        id,
        sender_id,
        receiver_id,
        created_at,
        sender:profiles!sender_id(id, full_name, email),
        receiver:profiles!receiver_id(id, full_name, email)
      `)
      .eq('status', 'accepted')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (connectionsError) throw connectionsError;

    if (!connections || connections.length === 0) {
      return [];
    }

    // Build list of buddy connections with matching domains
    const buddyConnections: BuddyConnection[] = [];

    for (const conn of connections) {
      // Determine who the buddy is (the other person in the connection)
      const buddyId = conn.sender_id === userId ? conn.receiver_id : conn.sender_id;
      const buddyProfile = conn.sender_id === userId ? conn.receiver : conn.sender;
      
      // Handle array or single object from Supabase
      const buddy = Array.isArray(buddyProfile) ? buddyProfile[0] : buddyProfile;

      // Get user's domain IDs first
      const { data: userDomainsData } = await supabase
        .from('user_domains')
        .select('domain_id')
        .eq('user_id', userId);

      const userDomainIds = userDomainsData?.map(d => d.domain_id) || [];

      if (userDomainIds.length === 0) {
        buddyConnections.push({
          request_id: conn.id,
          buddy: buddy,
          matching_domains: [],
          connected_at: conn.created_at
        });
        continue;
      }

      // Get buddy's domains that match user's domains
      const { data: buddyDomainsData } = await supabase
        .from('user_domains')
        .select(`
          domain_id,
          domains (
            id,
            name,
            icon,
            category
          )
        `)
        .eq('user_id', buddyId)
        .in('domain_id', userDomainIds);

      const matchingDomainsList = buddyDomainsData?.map((d: any) => d.domains as Domain) || [];

      buddyConnections.push({
        request_id: conn.id,
        buddy: buddy,
        matching_domains: matchingDomainsList,
        connected_at: conn.created_at
      });
    }

    return buddyConnections;

  } catch (error) {
    console.error('Error in fetchMyBuddies:', error);
    throw error;
  }
};



// Update the updateRequestStatus function
export const updateRequestStatus = async (
  requestId: string,
  status: 'accepted' | 'rejected'
): Promise<void> => {
  // Get request details first
  const { data: request, error: fetchError } = await supabase
    .from('connection_requests')
    .select(`
      sender_id,
      receiver_id,
      sender:profiles!sender_id(id, full_name, email),
      receiver:profiles!receiver_id(id, full_name, email)
    `)
    .eq('id', requestId)
    .single();

  if (fetchError) throw fetchError;

  // Update status
  const { error } = await supabase
    .from('connection_requests')
    .update({ status })
    .eq('id', requestId);

  if (error) throw error;

  // If accepted, create notifications for both users
  if (status === 'accepted' && request) {
    const sender = Array.isArray(request.sender) ? request.sender[0] : request.sender;
    const receiver = Array.isArray(request.receiver) ? request.receiver[0] : request.receiver;

    await Promise.all([
      createConnectionNotification(
        request.sender_id,
        request.receiver_id,
        receiver.full_name || receiver.email || 'Someone'
      ),
      createConnectionNotification(
        request.receiver_id,
        request.sender_id,
        sender.full_name || sender.email || 'Someone'
      )
    ]);
  }
};

// Remove connection
export const removeConnection = async (requestId: string): Promise<void> => {
  const { error } = await supabase
    .from('connection_requests')
    .delete()
    .eq('id', requestId);

  if (error) throw error;
};