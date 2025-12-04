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

export interface BuddySuggestion {
  id: string;
  full_name: string | null;
  email: string | null;
  matching_domains: Domain[];
  match_count: number;
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