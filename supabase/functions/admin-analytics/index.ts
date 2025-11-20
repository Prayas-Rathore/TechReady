// @ts-ignore
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

declare const Deno: any;

serve(async (req: Request) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    // ---------- 1. Total Users ----------
    const totalUsersRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // ---------- 2. New Users This Month ----------
    const newUsersMonthRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

    // ---------- 3. Active (last 30 days) ----------
    const activeRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("last_login_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    // ---------- 4. Inactive ----------
    const inactiveRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .lt("last_login_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    // ---------- 5. Paid Users ----------
    const paidRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("has_paid", true);

    // ---------- 6. Free Users ----------
    const freeRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("has_paid", false);

    // ---------- GROUPED ANALYTICS (via RPC SQL) ----------
    const { data: roleStats } = await supabase.rpc("role_breakdown");
    const { data: planDistribution } = await supabase.rpc("plan_type_distribution");
    const { data: statusBreakdown } = await supabase.rpc("status_breakdown");
    const { data: userGrowthChart } = await supabase.rpc("monthly_user_growth");
    const { data: activeUserChart } = await supabase.rpc("monthly_active_users");
    const { data: subscriptionEndChart } = await supabase.rpc("monthly_subscription_end");

    // ---------- 11. Subscription Expiring Soon ----------
    const expiringRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .lte("subscription_end", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .gte("subscription_end", new Date().toISOString());

    // ---------- 12. Churned Users ----------
    const churnRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .lt("subscription_end", new Date().toISOString())
      .eq("has_paid", true);

    // ---------- 13. New Paid Users This Month ----------
    const newPaidMonthRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("has_paid", true)
      .gte("subscription_start", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

    // ---------- 14. Soft Deleted ----------
    const softDeletedRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("soft_deleted", true);

    // ---------- 15. Guest Conversion ----------
    const guestConversionRes = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .not("guest_id", "is", null);

    // ---------- FINAL RESPONSE ----------
    const analytics = {
      total_users: totalUsersRes.count,
      new_users_this_month: newUsersMonthRes.count,
      active_users: activeRes.count,
      inactive_users: inactiveRes.count,
      paid_users: paidRes.count,
      free_users: freeRes.count,

      role_stats: roleStats,
      plan_distribution: planDistribution,
      status_breakdown: statusBreakdown,
      user_growth_chart: userGrowthChart,
      active_user_chart: activeUserChart,
      subscription_end_chart: subscriptionEndChart,

      expiring_subscriptions: expiringRes.count,
      churned_users: churnRes.count,
      new_paid_this_month: newPaidMonthRes.count,
      soft_deleted: softDeletedRes.count,
      guest_conversions: guestConversionRes.count,
    };

    return new Response(JSON.stringify(analytics), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
});
