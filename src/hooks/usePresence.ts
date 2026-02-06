import { useEffect } from 'react';
import { supabase } from '../services/SupabaseClient';
import { useAuth } from '../context/AuthContext';

export const usePresence = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Set online when component mounts
    const setOnline = async () => {
      await supabase.rpc('update_user_presence', {
        p_user_id: user.id,
        p_is_online: true
      });
    };

    // Set offline when component unmounts or page closes
    const setOffline = async () => {
      await supabase.rpc('update_user_presence', {
        p_user_id: user.id,
        p_is_online: false
      });
    };

    setOnline();

    // Heartbeat every 30 seconds
    const interval = setInterval(setOnline, 30000);

    // Set offline on unmount or page close
    window.addEventListener('beforeunload', setOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', setOffline);
      setOffline();
    };
  }, [user]);
};