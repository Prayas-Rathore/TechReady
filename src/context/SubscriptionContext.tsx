import { createContext, useContext, useEffect, useState } from "react";
import { 
  isUserPremium, 
  hasTierAccess, 
  hasExactPlan, 
  getTierDisplayName 
} from "../services/subscription/isUserPremium";
import { useProfile } from "../components/hooks/subscription/useProfile";

interface SubscriptionContextType {
  profile: any;
  isPremium: boolean;
  loading: boolean;
  tier: string;
  tierDisplayName: string;
  hasTierAccess: (requiredTier: string) => boolean;
  hasExactPlan: (allowedPlans: string[]) => boolean; // ✅ NEW
  isFree: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({ children }: any) => {
  const { profile, loading } = useProfile();
  const [isPremium, setIsPremium] = useState(false);
  const [tier, setTier] = useState("free");
  const [isFree, setIsFree] = useState(true);

  useEffect(() => {
    if (!profile) return;
    
    const currentTier = profile.subscription_tier || "free";
    setTier(currentTier);
    setIsPremium(isUserPremium(profile));
    setIsFree(currentTier === "free");
    
    console.log("=== SUBSCRIPTION CONTEXT ===");
    console.log("Tier:", currentTier);
    console.log("Status:", profile.status);
    console.log("Is Premium:", isUserPremium(profile));
    console.log("Expires:", profile.current_period_end);
  }, [profile]);

  const checkTierAccess = (requiredTier: string) => {
    return hasTierAccess(tier, requiredTier);
  };

  const checkExactPlan = (allowedPlans: string[]) => {
    return hasExactPlan(tier, allowedPlans);
  };

  return (
    <SubscriptionContext.Provider 
      value={{ 
        profile, 
        isPremium, 
        loading, 
        tier,
        tierDisplayName: getTierDisplayName(tier),
        hasTierAccess: checkTierAccess,
        hasExactPlan: checkExactPlan, // ✅ NEW
        isFree
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription must be used within SubscriptionProvider");
  return context;
};