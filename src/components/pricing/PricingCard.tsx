import { Check, X, ArrowRight } from 'lucide-react';
import { PricingTier } from '../../data/pricingData';

interface PricingCardProps {
  tier: PricingTier;
  billingPeriod: 'monthly' | 'annual';
  onSelect: (tier: PricingTier) => void;
}

export default function PricingCard({ tier, billingPeriod, onSelect }: PricingCardProps) {
  const price = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  const monthlyEquivalent = billingPeriod === 'annual' ? (tier.annualPrice / 12).toFixed(0) : null;

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
        tier.popular ? 'md:scale-105 border-2 border-blue-500 z-10' : 'border border-slate-200'
      }`}
    >
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            {tier.badge}
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
          <p className="text-slate-600 text-sm">{tier.tagline}</p>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold text-slate-900">${price}</span>
            <span className="text-xl text-slate-600">
              /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
            </span>
          </div>

          {billingPeriod === 'annual' && monthlyEquivalent && (
            <p className="text-sm text-slate-600 mt-2">
              ${monthlyEquivalent}/month billed annually
            </p>
          )}

          {billingPeriod === 'annual' && tier.savings > 0 && (
            <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              <span>💰</span>
              <span>Save ${tier.savings}/year</span>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-6 mb-6">
          <ul className="space-y-3">
            {tier.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                )}
                <span
                  className={`text-sm ${
                    feature.included ? 'text-slate-700' : 'text-slate-400 line-through'
                  } ${feature.bold ? 'font-bold text-slate-900' : ''}`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onSelect(tier)}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            tier.ctaStyle === 'primary'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          <span>{tier.ctaText}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs text-slate-500 mt-4">
          {tier.ctaText.includes('Trial') ? '7-day free trial · No credit card required' : 'Custom pricing available'}
        </p>
      </div>
    </div>
  );
}
