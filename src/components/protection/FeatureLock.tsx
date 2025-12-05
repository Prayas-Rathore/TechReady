import { Lock } from 'lucide-react';
import { useSubscription } from "../../context/SubscriptionContext";

interface FeatureLockProps {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const FeatureLock = ({ children, icon: Icon, label }: FeatureLockProps) => {
  const { isPremium } = useSubscription();

  if (!isPremium) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg opacity-50 cursor-not-allowed text-slate-400">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
        <Lock className="w-4 h-4 ml-auto" />
      </div>
    );
  }

  return <>{children}</>;
};