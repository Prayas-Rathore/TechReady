import { useSubscription } from "../../context/SubscriptionContext";

export const FeatureLock = ({ children }: any) => {
  const { isPremium } = useSubscription();

  if (!isPremium) {
    return (
      <button disabled className="opacity-50 cursor-not-allowed">
        Premium Feature (Upgrade Required)
      </button>
    );
  }

  return children;
};
