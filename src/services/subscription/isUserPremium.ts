// export function isUserPremium(profile: any) {
//   if (!profile) return false;

//   const validStatus = ["trialing", "active"];
//   const validPlans = ["starter", "basic", "pro"];

//   const isStatusValid = validStatus.includes(profile.subscription_status);
//   const isPlanValid = validPlans.includes(profile.plan_type);

//   const isNotExpired =
//     profile.subscription_end &&
//     new Date(profile.subscription_end) > new Date();

//   return isStatusValid && isPlanValid && isNotExpired;
// }

export const isUserPremium = (profile: any): boolean => {
  if (!profile) return false;

  const tier = profile.subscription_tier?.toLowerCase();
  const status = profile.status;

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

// ✅ Get tier display name
export const getTierDisplayName = (tier: string): string => {
  const names: Record<string, string> = {
    free: "Free",
    basic: "Basic",
    starter: "Starter",
    pro: "Pro"
  };
  return names[tier?.toLowerCase()] || "Free";
};