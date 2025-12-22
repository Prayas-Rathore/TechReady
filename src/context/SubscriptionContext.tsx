import { createContext, useContext, useMemo, ReactNode } from "react";
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
  error: Error | null;
  tier: string;
  tierDisplayName: string;
  hasTierAccess: (requiredTier: string) => boolean;
  hasExactPlan: (allowedPlans: string[]) => boolean;
  isFree: boolean;
  isReady: boolean; // ✅ NEW: Combined ready state
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const { profile, loading, error, refresh } = useProfile();

  // ✅ Derive all values atomically using useMemo
  const value = useMemo(() => {
    const currentTier = profile?.subscription_tier?.toLowerCase() || "free";
    const isPremium = isUserPremium(profile);
    const isFree = currentTier === "free";
    
    // ✅ isReady = has loaded AND no error (or has fallback profile)
    const isReady = !loading && (!!profile || !!error);

    console.log("📊 Subscription State:", {
      tier: currentTier,
      status: profile?.status,
      isPremium,
      isFree,
      isReady,
      loading,
      hasError: !!error
    });

    return {
      profile,
      isPremium,
      loading,
      error,
      tier: currentTier,
      tierDisplayName: getTierDisplayName(currentTier),
      hasTierAccess: (requiredTier: string) => hasTierAccess(currentTier, requiredTier),
      hasExactPlan: (allowedPlans: string[]) => hasExactPlan(currentTier, allowedPlans),
      isFree,
      isReady,
      refresh
    };
  }, [profile, loading, error, refresh]);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
};