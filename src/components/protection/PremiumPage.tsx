import { Navigate } from "react-router-dom";
import { useSubscription } from "../../context/SubscriptionContext";

export default function PremiumPage({ children }: any) {
  const { isPremium, loading, profile } = useSubscription();

  console.log("=== PREMIUM PAGE DEBUG ===");
  console.log("loading:", loading);
  console.log("isPremium:", isPremium);
  console.log("profile:", profile);

  if (loading) return <div>Loading subscription...</div>;

  if (!isPremium) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}
