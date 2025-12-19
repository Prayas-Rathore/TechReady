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

interface PremiumPageProps {
  children: any;
  requiredTier?: string; // ✅ Hierarchical: "basic" gives access to basic+starter+pro
  allowedPlans?: string[]; // ✅ Specific: ["basic", "pro"] gives access to ONLY basic and pro
}

export default function PremiumPage({ 
  children, 
  requiredTier,
  allowedPlans
}: PremiumPageProps) {
  const { loading, hasTierAccess, hasExactPlan, tier } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading subscription...</div>
      </div>
    );
  }

  // ✅ Check access based on which prop is provided
  let hasAccess = false;

  if (allowedPlans && allowedPlans.length > 0) {
    // Use exact plan matching
    hasAccess = hasExactPlan(allowedPlans);
  } else if (requiredTier) {
    // Use hierarchical tier access
    hasAccess = hasTierAccess(requiredTier);
  }

  // ✅ If no access, redirect to pricing
  if (!hasAccess) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
}