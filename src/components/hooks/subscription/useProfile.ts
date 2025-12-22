// import { useEffect, useState } from "react";
// import { supabase } from "../../../services/SupabaseClient";

// export const useProfile = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (!error) setProfile(data);

//       setLoading(false);
//     };

//     load();
//   }, []);

//   return { profile, loading };
// };
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../../../services/SupabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

interface ProfileData {
  subscription_tier: string;
  status: string;
  user_id: string;
  current_period_end?: string;
  stripe_subscription_id?: string;
}

// ✅ GLOBAL CACHE - Shared across all hook instances
const profileCache = new Map<string, {
  data: ProfileData;
  timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const retryCountRef = useRef(0);

  // ✅ Helper: Check if cache is valid
  const getCachedProfile = useCallback((userId: string): ProfileData | null => {
    const cached = profileCache.get(userId);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    if (isExpired) {
      profileCache.delete(userId);
      return null;
    }

    return cached.data;
  }, []);

  // ✅ Helper: Load profile with retry logic
  const loadProfile = useCallback(async (userId: string, isRetry = false): Promise<ProfileData | null> => {
    try {
      // Check cache first (skip on retry)
      if (!isRetry) {
        const cached = getCachedProfile(userId);
        if (cached) {
          console.log("✅ Using cached profile");
          return cached;
        }
      }

      // Query database
      const { data, error } = await supabase
        .from("subscriptions")
        .select("subscription_tier, status, user_id, current_period_end, stripe_subscription_id")
        .eq("user_id", userId)
        .in("status", ["active", "trialing"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      const profileData: ProfileData = data || {
        subscription_tier: "free",
        status: "none",
        user_id: userId
      };

      // Update cache
      profileCache.set(userId, {
        data: profileData,
        timestamp: Date.now()
      });

      retryCountRef.current = 0; // Reset retry count on success
      return profileData;

    } catch (err) {
      console.error("Profile load error:", err);
      
      // Retry logic
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current++;
        console.log(`Retrying... (${retryCountRef.current}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retryCountRef.current));
        return loadProfile(userId, true);
      }

      throw err;
    }
  }, [getCachedProfile]);

  // ✅ Main effect: Load profile and setup real-time subscription
  useEffect(() => {
    let isMounted = true;
    let userId: string | null = null;

    const initialize = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          if (isMounted) {
            setProfile(null);
            setLoading(false);
          }
          return;
        }

        userId = user.id;

        // Load profile (with cache + retry)
        const profileData = await loadProfile(userId);
        
        if (isMounted) {
          setProfile(profileData);
          setLoading(false);
        }

        // ✅ Setup real-time subscription for live updates
        if (isMounted && userId) {
          channelRef.current = supabase
            .channel(`subscription:${userId}`)
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "subscriptions",
                filter: `user_id=eq.${userId}`
              },
              async (payload) => {
                console.log("🔄 Subscription updated:", payload);
                
                // Invalidate cache
                profileCache.delete(userId!);
                
                // Reload profile
                const updatedProfile = await loadProfile(userId!, true);
                if (isMounted) {
                  setProfile(updatedProfile);
                }
              }
            )
            .subscribe();
        }

      } catch (err) {
        console.error("Initialization error:", err);
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
          
          // Fallback to free tier on error
          setProfile({
            subscription_tier: "free",
            status: "none",
            user_id: userId || "unknown"
          });
        }
      }
    };

    initialize();

    // ✅ Cleanup
    return () => {
      isMounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [loadProfile]);

  // ✅ Manual refresh function (useful for force reload)
  const refresh = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    profileCache.delete(user.id); // Clear cache
    const updated = await loadProfile(user.id, true);
    setProfile(updated);
  }, [loadProfile]);

  return { 
    profile, 
    loading, 
    error,
    refresh 
  };
};

// ✅ Utility: Clear all cache (useful for logout)
export const clearProfileCache = () => {
  profileCache.clear();
};