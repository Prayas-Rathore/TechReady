export function isUserPremium(profile: any) {
  if (!profile) return false;

  const validStatus = ["trialing", "active"];
  const validPlans = ["starter", "basic", "pro"];

  const isStatusValid = validStatus.includes(profile.subscription_status);
  const isPlanValid = validPlans.includes(profile.plan_type);

  const isNotExpired =
    profile.subscription_end &&
    new Date(profile.subscription_end) > new Date();

  return isStatusValid && isPlanValid && isNotExpired;
}
