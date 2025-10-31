import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/SupabaseClient'

// 🧩 Define the shape of our context
interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
}

// 🧩 Default value (used before context loads)
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
})

// 🧩 Props for the provider
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
      } else {
        setSession(data.session)
        setUser(data.session?.user ?? null)
      }
      setLoading(false)
    }

    getSession()

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value: AuthContextType = {
    user,
    session,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 🧩 Custom hook to use auth anywhere
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}
