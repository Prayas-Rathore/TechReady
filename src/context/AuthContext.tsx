import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/SupabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  loading: true,
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        const sessionUser = data.session?.user ?? null;
        setSession(data.session);
        setUser(sessionUser);
        setRole(sessionUser?.user_metadata?.user_role ?? null);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const newUser = newSession?.user ?? null;
      setSession(newSession);
      setUser(newUser);
      setRole(newUser?.user_metadata?.user_role ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    role,
    loading,
    isAuthenticated: !!session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
