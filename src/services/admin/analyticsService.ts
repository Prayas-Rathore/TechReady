import { supabase } from "../SupabaseClient";

async function requireAdmin() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) throw new Error("Not logged in");

  if (user.user_metadata?.user_role !== 1) {
    throw new Error("Forbidden: Admins only");
  }

  return user;
}

export async function getTotalUsers() {
  await requireAdmin();

  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count ?? 0;
}

export async function getNewUsersThisMonth() {
  await requireAdmin();

  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", firstDay);

  if (error) return 0;
  return count ?? 0;
}


export async function getTotalSession() {
  await requireAdmin();

  const { count, error } = await supabase
    .from("interview_sessions")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
}