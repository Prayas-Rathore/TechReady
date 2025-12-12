import { Navigate } from "react-router-dom";
import { useSubscription } from "../../context/SubscriptionContext";

export default function FreeOnlyPage({ children }: { children: any }) {
  const { loading, isFree, tier, isPremium  } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // ✅ If user has paid plan (basic/starter/pro), block access
  if (!isFree) {
    return <Navigate to="/pricing" replace />;
  }

  // ✅ Only free users can access
  return children;
}