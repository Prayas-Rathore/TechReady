// import { Navigate } from "react-router-dom";
// import { useSubscription } from "../../context/SubscriptionContext";

// export default function PremiumPage({ children }: any) {
//   const { isPremium, loading, profile } = useSubscription();

//   console.log("=== PREMIUM PAGE DEBUG ===");
//   console.log("loading:", loading);
//   console.log("isPremium:", isPremium);
//   console.log("profile:", profile);

//   if (loading) return <div>Loading subscription...</div>;

//   if (!isPremium) {
//     return <Navigate to="/pricing" replace />;
//   }

//   return children;
// }

// src/components/protection/PremiumPage.tsx
import { Navigate } from "react-router-dom";
import { useSubscription } from "../../context/SubscriptionContext";
import { ReactNode } from "react";

interface PremiumPageProps {
  children: ReactNode;
  requiredTier?: string; // Hierarchical: "basic" gives access to basic+starter+pro
  allowedPlans?: string[]; // Specific: ["basic", "pro"] gives access to ONLY basic and pro
}

export default function PremiumPage({ 
  children, 
  requiredTier,
  allowedPlans
}: PremiumPageProps) {
  const { isReady, hasTierAccess, hasExactPlan, error, refresh } = useSubscription();

  // ✅ Show loading state (with pulse animation)
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading your subscription...</p>
        </div>
      </div>
    );
  }

  // ✅ Handle errors gracefully
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to Load Subscription
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading your subscription details. Please try again.
          </p>
          <button
            onClick={refresh}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ Determine access (only after ready)
  let hasAccess = false;

  if (allowedPlans?.length) {
    hasAccess = hasExactPlan(allowedPlans);
  } else if (requiredTier) {
    hasAccess = hasTierAccess(requiredTier);
  }

  // ✅ Redirect if no access
  if (!hasAccess) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
}