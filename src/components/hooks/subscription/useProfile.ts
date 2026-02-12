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
import { useAuth } from "../../../context/AuthContext";

interface ProfileData {
  subscription_tier: string;
  status: string;
  user_id: string;
  current_period_end?: string;
  stripe_subscription_id?: string;
}

export const useProfile = () => {
  const { user, loading: authLoading } = useAuth(); // ✅ SINGLE SOURCE OF AUTH
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("subscription_tier, status, user_id, current_period_end, stripe_subscription_id")
      .eq("user_id", userId)
      .in("status", ["active", "trialing"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Subscription query failed:", error);
    }

    return data || {
      subscription_tier: "free",
      status: "none",
      user_id: userId
    };
  }, []);

  useEffect(() => {
    // ⛔ WAIT for AuthContext to finish
    if (authLoading) return;

    // User logged out
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let mounted = true;

    const init = async () => {
      setLoading(true);
      const result = await loadProfile(user.id);
      if (!mounted) return;

      setProfile(result);
      setLoading(false);

      // realtime updates
      channelRef.current = supabase
        .channel(`subscription:${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "subscriptions",
            filter: `user_id=eq.${user.id}`
          },
          async () => {
            const updated = await loadProfile(user.id);
            if (mounted) setProfile(updated);
          }
        )
        .subscribe();
    };

    init();

    return () => {
      mounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [user, authLoading, loadProfile]);

  return { profile, loading };
};
