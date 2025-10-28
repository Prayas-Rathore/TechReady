import { Check, X } from 'lucide-react';
import { PricingTier } from '../../data/pricingData';

interface FeatureComparisonTableProps {
  tiers: PricingTier[];
  onSelectPlan: (tier: PricingTier) => void;
}

export default function FeatureComparisonTable({ tiers, onSelectPlan }: FeatureComparisonTableProps) {
  const allFeatures = [
    'Detailed 16-week roadmap',
    '150+ personalized LeetCode problems',
    '500+ interview questions',
    'Progress tracking dashboard',
    'Weekly progress reports',
    'Mobile app access',
    'AI mock interviews',
    'Expert mentor sessions',
    'Resume review',
    'Company-specific prep',
    'LinkedIn profile optimization',
    'Salary negotiation guides',
    'Advanced analytics',
    'Premium community access',
    'Priority support',
    'Dedicated career coach',
    'Personal accountability partner',
    'Resume distribution',
    'Interview scheduling assistance',
    'White-glove service',
    'Exclusive FAANG Q&As',
    'Job guarantee program'
  ];

  const getFeatureValue = (tier: PricingTier, featureName: string) => {
    const feature = tier.features.find(f => f.text.includes(featureName.split(' ')[0]));
    if (!feature) return null;

    if (!feature.included) return false;

    if (featureName.includes('AI mock interviews')) {
      if (tier.id === 'premium') return '5/month';
      if (tier.id === 'elite') return 'Unlimited';
      return false;
    }

    if (featureName.includes('mentor sessions')) {
      if (tier.id === 'premium') return '2/month';
      if (tier.id === 'elite') return '8/month';
      return false;
    }

    return true;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 overflow-x-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Compare All Features</h2>
      <p className="text-slate-600 text-center mb-8">See what's included in each plan</p>

      <div className="hidden md:block">
        <table className="w-full">
          <thead className="sticky top-0 bg-white border-b-2 border-slate-200">
            <tr>
              <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
              {tiers.map(tier => (
                <th key={tier.id} className="text-center py-4 px-4 font-semibold text-slate-900">
                  <div className="flex flex-col items-center gap-2">
                    <span>{tier.name}</span>
                    {tier.badge && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, index) => (
              <tr
                key={index}
                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  index % 2 === 0 ? 'bg-slate-50/50' : ''
                }`}
              >
                <td className="py-4 px-4 text-sm text-slate-700 font-medium">{feature}</td>
                {tiers.map(tier => {
                  const value = getFeatureValue(tier, feature);
                  return (
                    <td key={tier.id} className="py-4 px-4 text-center">
                      {value === true && <Check className="w-5 h-5 text-green-600 mx-auto" />}
                      {value === false && <X className="w-5 h-5 text-slate-300 mx-auto" />}
                      {typeof value === 'string' && (
                        <span className="text-sm font-semibold text-blue-600">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-slate-200 bg-slate-50">
            <tr>
              <td className="py-6 px-4"></td>
              {tiers.map(tier => (
                <td key={tier.id} className="py-6 px-4 text-center">
                  <button
                    onClick={() => onSelectPlan(tier)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="md:hidden space-y-6">
        {tiers.map(tier => (
          <div key={tier.id} className="border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
              {tier.badge && (
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  {tier.badge}
                </span>
              )}
            </div>
            <ul className="space-y-2 mb-4">
              {allFeatures.map((feature, index) => {
                const value = getFeatureValue(tier, feature);
                if (!value) return null;
                return (
                  <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>
                      {feature}
                      {typeof value === 'string' && <span className="font-semibold text-blue-600"> ({value})</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => onSelectPlan(tier)}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                tier.popular
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-slate-200 text-slate-900'
              }`}
            >
              Select {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
