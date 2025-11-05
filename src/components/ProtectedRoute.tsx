import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../services/SupabaseClient';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      // 1️⃣ Check if there’s an active session (JWT)
      try {
        const { data } = await supabase.auth.getSession();
  const hasSession = !!data?.session;
  if (mounted) setAuthenticated(hasSession);
  // read role from session user metadata when available
  const sessRole = data?.session?.user?.user_metadata?.user_role;
  if (mounted) setRole(sessRole ? Number(sessRole) : null);
      } catch (e) {
        console.error('ProtectedRoute: error getting session', e);
        if (mounted) setAuthenticated(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkSession();

    // 2️⃣ Listen for login / logout / token refresh events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // session is null when signed out, or an object when signed in
      setAuthenticated(!!session);
      const sessRole = session?.user?.user_metadata?.user_role;
      setRole(sessRole ? Number(sessRole) : null);
    });

    return () => {
      mounted = false;
      // unsubscribe the listener properly
      try {
        subscription.unsubscribe();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but role indicates admin, and user is trying to access user-dashboard, redirect to admin dashboard
  if (role === 1 && location.pathname.startsWith('/user-dashboard')) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  // Render nested routes
  return <Outlet />;
}
