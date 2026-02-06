// src/types/buddy.types.ts

export interface Domain {
  id: string;
  name: string;
  category: string | null;
  icon: string | null;
  created_at?: string;
}

export interface UserDomain {
  id: string;
  user_id: string;
  domain_id: string;
  created_at: string;
}

// Update interface
export interface BuddySuggestion {
  id: string;
  sudo_name: string;
  match_count: number;
  matching_domains: Domain[];
}

export interface ConnectionRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  sender?: {
    id: string;
    full_name: string | null;
    email: string | null;
  };
  receiver?: {
    id: string;
    full_name: string | null;
    email: string | null;
  };
}

export interface BuddyConnection {
  request_id: string;
  buddy: {
    id: string;
    full_name: string | null;
    email: string | null;
  };
  matching_domains: Domain[];
  connected_at: string;
}

// src/types/post.types.ts
export interface Post {
  id: string;
  author_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    full_name: string | null;
    email: string | null;
  };
}
// Add these to your existing buddy.types.ts file

export interface UserPresence {
  user_id: string;
  is_online: boolean;
  last_seen: string;
  updated_at: string;
}

export interface CallMinutes {
  id: string;
  user_id: string;
  minutes_used: number;
  minutes_granted: number;
  reset_date: string;
  subscription_tier: string;
}

export interface CallLog {
  id: string;
  caller_id: string;
  receiver_id: string;
  room_name: string;
  duration_seconds: number;
  status: 'initiated' | 'ringing' | 'connected' | 'completed' | 'missed' | 'declined' | 'failed';
  started_at: string;
  ended_at: string | null;
  created_at: string;
}

export interface CallSignal {
  id: string;
  from_user_id: string;
  to_user_id: string;
  from_user_name: string;
  room_name: string;
  call_token: string;
  status: 'ringing' | 'accepted' | 'rejected' | 'missed' | 'cancelled';
  created_at: string;
  expires_at: string;
}