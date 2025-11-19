import { useEffect } from "react";
import { supabase } from "../services/SupabaseClient";
import { useQueryClient } from "@tanstack/react-query";

export function AuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          // Refresh all queries after login
          queryClient.invalidateQueries();
        }

        if (event === "SIGNED_OUT") {
          // Clear data after logout
          queryClient.clear();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return null;
}
