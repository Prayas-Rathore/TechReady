import { Navigate } from "react-router-dom";
import { useSubscription } from "../../context/SubscriptionContext";
import { ReactNode } from "react";

interface FreeOnlyPageProps {
  children: ReactNode;
}

export default function FreeOnlyPage({ children }: FreeOnlyPageProps) {
  const { isReady, isFree, error, refresh } = useSubscription();

  // ✅ Show loading state
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading...</p>
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
            Unable to Verify Access
          </h2>
          <p className="text-gray-600 mb-6">
            Please try again or contact support if the issue persists.
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

  // ✅ Block premium users
  if (!isFree) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
}