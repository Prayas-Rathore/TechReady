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

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) setProfile(data);

      setLoading(false);
    };

    load();
  }, []);

  return { profile, loading };
};
