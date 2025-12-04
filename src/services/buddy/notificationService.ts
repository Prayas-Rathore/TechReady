// src/services/notificationService.ts
import { supabase } from '../SupabaseClient';

export interface Notification {
  id: string;
  user_id: string;
  type: 'connection_accepted' | 'new_post';
  title: string;
  message: string;
  related_user_id?: string;
  related_post_id?: string;
  is_read: boolean;
  created_at: string;
  related_user?: {
    id: string;
    full_name: string | null;
    email: string | null;
  };
}

const PAGE_SIZE = 20;

// Fetch notifications with pagination
export const fetchNotifications = async (
  userId: string,
  page: number = 0
): Promise<{ notifications: Notification[]; hasMore: boolean }> => {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('notifications')
    .select(`
      *,
      related_user:profiles!related_user_id(id, full_name, email)
    `, { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    notifications: data || [],
    hasMore: (count || 0) > to + 1
  };
};

// Create connection accepted notification
export const createConnectionNotification = async (
  userId: string,
  connectedUserId: string,
  connectedUserName: string
): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type: 'connection_accepted',
      title: 'New Connection!',
      message: `You are now connected with ${connectedUserName}`,
      related_user_id: connectedUserId
    });

  if (error) throw error;
};

// Create new post notification for all buddies
export const createPostNotifications = async (
  authorId: string,
  authorName: string,
  postId: string,
  postTitle: string
): Promise<void> => {
  // Get all buddies of the author
  const { data: connections, error: connError } = await supabase
    .from('connection_requests')
    .select('sender_id, receiver_id')
    .eq('status', 'accepted')
    .or(`sender_id.eq.${authorId},receiver_id.eq.${authorId}`);

  if (connError) throw connError;

  const buddyIds = connections?.map(conn => 
    conn.sender_id === authorId ? conn.receiver_id : conn.sender_id
  ) || [];

  if (buddyIds.length === 0) return;

  // Create notifications for all buddies
  const notifications = buddyIds.map(buddyId => ({
    user_id: buddyId,
    type: 'new_post' as const,
    title: 'New Post',
    message: `${authorName} shared: "${postTitle}"`,
    related_user_id: authorId,
    related_post_id: postId
  }));

  const { error } = await supabase
    .from('notifications')
    .insert(notifications);

  if (error) throw error;
};

// Mark notification as read
export const markAsRead = async (notificationId: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw error;
};

// Mark all as read
export const markAllAsRead = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw error;
};

// Get unread count
export const getUnreadCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw error;
  return count || 0;
};