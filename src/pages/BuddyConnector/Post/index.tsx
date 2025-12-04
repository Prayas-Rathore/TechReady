// src/pages/Posts/index.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchPosts, createPost, deletePost } from '../../../services/buddy/postService';
import { Post } from '../../../types/buddy.types';
import toast from 'react-hot-toast';

export const PostsPage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const observer = useRef<IntersectionObserver>();
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (!user) return;
    loadPosts();
  }, [page, user]);

  const loadPosts = async () => {
    if (!user || loading) return;
    
    setLoading(true);
    try {
      const { posts: newPosts, hasMore: more } = await fetchPosts(user.id, page);
      setPosts(prev => page === 0 ? newPosts : [...prev, ...newPosts]);
      setHasMore(more);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    try {
      const newPost = await createPost(user.id, title, content);
      setPosts(prev => [newPost, ...prev]);
      setTitle('');
      setContent('');
      setShowCreateModal(false);
      toast.success('Post created!');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Delete this post?')) return;
    
    try {
      await deletePost(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
      toast.success('Post deleted');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Buddy Posts</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Post
        </button>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg h-40"
                required
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          const isLast = index === posts.length - 1;
          return (
            <div
              key={post.id}
              ref={isLast ? lastPostRef : null}
              className="bg-white rounded-xl border p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-600">
                    by {post.author?.full_name || post.author?.email}
                  </p>
                </div>
                {post.author_id === user?.id && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
              <p className="text-xs text-gray-400 mt-3">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 py-8">No more posts</p>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts yet. Create the first one!</p>
        </div>
      )}
    </div>
  );
};