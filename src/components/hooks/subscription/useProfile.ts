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
import { useEffect, useState } from "react";
import { supabase } from "../../../services/SupabaseClient";

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // ✅ Query subscriptions table with active status filter
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .in("status", ["active", "trialing"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
      } else {
        // ✅ No active subscription = FREE plan
        setProfile({ 
          subscription_tier: "free", 
          status: "none",
          user_id: user.id
        });
      }

      setLoading(false);
    };

    load();
  }, []);

  return { profile, loading };
};