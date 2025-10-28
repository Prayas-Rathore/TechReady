interface BillingToggleProps {
  billingPeriod: 'monthly' | 'annual';
  onToggle: (period: 'monthly' | 'annual') => void;
}

export default function BillingToggle({ billingPeriod, onToggle }: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="bg-white rounded-full p-1 shadow-lg inline-flex items-center">
        <button
          onClick={() => onToggle('monthly')}
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
            billingPeriod === 'monthly'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onToggle('annual')}
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
            billingPeriod === 'annual'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Annual
        </button>
      </div>

      {billingPeriod === 'annual' && (
        <div className="flex items-center gap-2 text-green-600 font-semibold animate-bounce">
          <span className="text-2xl">🎉</span>
          <span>Save up to 33% with annual billing</span>
        </div>
      )}
    </div>
  );
}
