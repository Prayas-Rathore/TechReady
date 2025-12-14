export const isUserPremium = (profile: any): boolean => {
  if (!profile) return false;

  const tier = profile.subscription_tier?.toLowerCase();
  const status = profile.status;
  console.log("User tier:", tier, "Status:", status);

  // ✅ Free users are not premium
  if (tier === "free" || status === "none") return false;

  // ✅ Must have active or trialing status
  if (!["active", "trialing"].includes(status)) return false;

  // ✅ Premium tiers (all paid plans)
  const premiumTiers = ["basic", "starter", "pro"];
  return premiumTiers.includes(tier);
};

// ✅ Tier hierarchy: free < basic < starter < pro
export const hasTierAccess = (
  userTier: string, 
  requiredTier: string
): boolean => {
  const tierHierarchy = ["free", "basic", "starter", "pro"];
  
  const userLevel = tierHierarchy.indexOf(userTier?.toLowerCase());
  const requiredLevel = tierHierarchy.indexOf(requiredTier?.toLowerCase());
  
  return userLevel >= requiredLevel;
};

// ✅ NEW: Check if user has EXACT plan(s) - non-hierarchical
export const hasExactPlan = (
  userTier: string,
  allowedPlans: string[]
): boolean => {
  const tier = userTier?.toLowerCase();
  return allowedPlans.map(p => p.toLowerCase()).includes(tier);
};

// ✅ Get tier display name
export const getTierDisplayName = (tier: string): string => {
  const names: Record<string, string> = {
    free: "free",
    basic: "basic",
    starter: "starter",
    pro: "pro"
  };
  return names[tier?.toLowerCase()] || "Free";
};