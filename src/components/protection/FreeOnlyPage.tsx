// src/components/protection/FreeOnlyPage.tsx
import { Navigate } from "react-router-dom";
import { useSubscription } from "../../context/SubscriptionContext";

export default function FreeOnlyPage({ 
  children,
  redirectTo = "/user-dashboard" // ✅ Where to send paid users
}: { 
  children: any;
  redirectTo?: string;
}) {
  const { loading, isFree } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // ✅ If user has ANY paid plan, redirect them away
  if (!isFree) {
    return <Navigate to={redirectTo} replace />;
  }

  // ✅ Only free users can see this
  return children;
}