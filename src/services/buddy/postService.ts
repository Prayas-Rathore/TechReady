// src/services/postService.ts
import { supabase } from '../SupabaseClient';
import { Post } from '../../types/buddy.types';

const PAGE_SIZE = 10;

// Fetch posts with infinite scroll
export const fetchPosts = async (
  userId: string,
  page: number = 0
): Promise<{ posts: Post[]; hasMore: boolean }> => {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!author_id(id, full_name, email)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    posts: data || [],
    hasMore: (count || 0) > to + 1
  };
};

// Create post
export const createPost = async (
  authorId: string,
  title: string,
  content: string
): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert({ author_id: authorId, title, content })
    .select(`
      *,
      author:profiles!author_id(id, full_name, email)
    `)
    .single();

  if (error) throw error;
  return data;
};

// Update post
export const updatePost = async (
  postId: string,
  title: string,
  content: string
): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', postId);

  if (error) throw error;
};

// Delete post
export const deletePost = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
};