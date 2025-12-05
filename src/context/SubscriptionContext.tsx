import { createContext, useContext, useEffect, useState } from "react";
import { isUserPremium } from "../services/subscription/isUserPremium";
import { useProfile } from "../components/hooks/subscription/useProfile";

const SubscriptionContext = createContext<any>(null);

export const SubscriptionProvider = ({ children }: any) => {
  const { profile, loading } = useProfile();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!profile) return;
    console.log("=== SUBSCRIPTION CONTEXT PROFILE ===");
  console.log(profile);
    setIsPremium(isUserPremium(profile));
  }, [profile]);

  return (
    <SubscriptionContext.Provider value={{ profile, isPremium, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
