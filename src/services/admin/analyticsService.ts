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

// User Growth - Returns cumulative count
export async function getUserGrowthData(days: number = 30) {
  await requireAdmin();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("profiles")
    .select("created_at")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  // Group by date and calculate cumulative
  const grouped = (data || []).reduce((acc: Record<string, number>, profile) => {
    const date = new Date(profile.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Convert to cumulative with activeUsers (simplified as 70% of total)
  let cumulative = 0;
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => {
      cumulative += count;
      return {
        date,
        users: cumulative,
        activeUsers: Math.floor(cumulative * 0.7), // Approximate active users
      };
    });
}

// Revenue Data - Returns timeline array directly
export async function getRevenueData(days: number = 30) {
  await requireAdmin();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("subscriptions")
    .select("tier, updated_at")
    .eq("status", "active")
    .gte("updated_at", startDate.toISOString());

  if (error) {
    console.error(error);
    return [];
  }

  const tierPricing: Record<string, number> = {
    basic: 9.99,
    starter: 19.99,
    pro: 49.99,
  };

  // Group by date and sum revenue
  const timeline = (data || []).reduce((acc: Record<string, number>, sub) => {
    const date = new Date(sub.updated_at).toISOString().split('T')[0];
    const price = tierPricing[sub.tier] || 0;
    acc[date] = (acc[date] || 0) + price;
    return acc;
  }, {});

  // Return array sorted by date
  return Object.entries(timeline)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({ date, revenue }));
}

// Sessions Data - Returns timeline with day/sessions format
export async function getSessionsData(days: number = 7) {
  await requireAdmin();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("interview_sessions")
    .select("created_at")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  // Group by date
  const timeline = (data || []).reduce((acc: Record<string, number>, session) => {
    const date = new Date(session.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Return with 'day' and 'sessions' keys
  return Object.entries(timeline)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, sessions]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      sessions,
    }));
}

// Activity Data - Returns distribution format for pie chart
export async function getActivityData(days: number = 7) {
  await requireAdmin();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("interview_sessions")
    .select("status")
    .gte("created_at", startDate.toISOString());

  if (error) {
    console.error(error);
    return [];
  }

  // Group by status
  const distribution = (data || []).reduce((acc: Record<string, number>, session) => {
    const status = session.status || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Return as name/value pairs for pie chart
  return Object.entries(distribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));
}