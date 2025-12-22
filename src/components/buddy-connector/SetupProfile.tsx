import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/SupabaseClient';
import toast, { Toaster } from 'react-hot-toast';

export const SetupProfile: React.FC = () => {
  const [sudoName, setSudoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    if (!user || !sudoName.trim()) {
      console.log('No user or sudoName'); // Debug log
      return;
    }

    setLoading(true);
    try {
      console.log('Updating profile...'); // Debug log
      const { error } = await supabase
        .from('profiles')
        .update({ sudo_name: sudoName.trim() })
        .eq('id', user.id);

      console.log('Update result:', { error }); // Debug log

      if (error) {
        if (error.code === '23505') {
          toast.error('This username is already taken');
        } else {
          throw error;
        }
      } else {
        console.log('Success! Showing message...'); // Debug log
        setSuccessMessage(true);
        setTimeout(() => {
          navigate('/buddy-connector');
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save username');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      {/* Add Toaster component */}
      <Toaster position="top-center" />

      {/* Success Modal */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl text-center animate-pulse">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Profile Setup Complete!</h3>
            <p className="text-slate-600">Redirecting to Buddy Connector...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Your Username</h2>
          <p className="text-slate-600">Choose a unique username to connect with others</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={sudoName}
              onChange={(e) => setSudoName(e.target.value)}
              placeholder="e.g., tech_ninja, code_master"
              minLength={3}
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-500 mt-2">
              3-20 characters. Letters, numbers, and underscores only.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !sudoName.trim()}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};