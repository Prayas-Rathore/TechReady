import { supabase } from "./SupabaseClient";

export async function getInterviewCount() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth error:", authError);
    return 0;
  }

  const { count, error } = await supabase
    .from("interview_sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching interview count:", error);
    return 0;
  }

  return count ?? 0;
}

export async function getTotalInterviewTime() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { data, error } = await supabase
    .from("interview_sessions")
    .select("started_at, completed_at")
    .eq("user_id", user.id)
    .not("started_at", "is", null)
    .not("completed_at", "is", null);

  if (error) {
    console.error("Error fetching interview time:", error);
    return 0;
  }

  let totalMs = 0;

  data.forEach((session) => {
    const start = new Date(session.started_at).getTime();
    const end = new Date(session.completed_at).getTime();
    totalMs += end - start;
  });

  return totalMs;
}

export async function getLastFiveScores() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("cv_reports")
    .select("report, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching scores:", error);
    return [];
  }

  // Extract score from JSON
  const result = data.map((item) => ({
    score: item.report?.score ?? null,
    date: item.created_at,
  }));

  return result;
}

export async function getLastFiveInterviewSessions() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("interview_sessions")
    .select("id, job_description_text, status, started_at, completed_at, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching interview sessions:", error);
    return [];
  }

  return data;
}


export async function getplandayleft() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("subscriptions")
    .select(`
      id,
      subscription_tier,
      status,
      current_period_end
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data?.length) return null;

  const subscription = data[0];
  const endDate = new Date(subscription.current_period_end);
  const now = new Date();

  // FULL PRECISION CALCULATION
  const msRemaining = endDate.getTime() - now.getTime();

  const daysLeft = Math.max(
    Math.ceil(msRemaining / (1000 * 60 * 60 * 24)),
    0
  );

  return {
    ...subscription,
    days_left: daysLeft,
  };
}



