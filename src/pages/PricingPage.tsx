import { Check, Sparkles } from 'lucide-react';
import { useCreateCheckout, useSubscription } from '../components/hooks/stripe/useSubscription';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Map your plan names to tiers
const plans = [
  {
    name: 'Basic',
    tier: 'pro',
    priceId: 'price_1SZV1iRoRT3gf2HBjXbwcGXf',// Stripe Price ID
    price: '14.99',
    description: 'Perfect for getting started with mock interviews',
    features: [
      'JD Scanner & CV Optimiser',
      'AI Interview Prep',
      'Portfolio Branding & Identity',
      'Buddy Model',
    ],
    cta: 'Subscribe Now',
    highlighted: false,
  },
  {
    name: 'Starter',
    tier: 'pro',
    priceId: 'price_1SZUz0RoRT3gf2HBR9xgbG4A', // Stripe Price ID
    price: '19.99',
    description: 'Most popular choice for serious job seekers',
    features: [
      'Mindset & Confidence Training',
      'JD Scanner & CV Optimiser',
      'AI Interview Prep',
      'Portfolio Branding & Identity',
      'Buddy Model'
    ],
    cta: 'Subscribe Now',
    highlighted: true,
  },
  {
    name: 'Pro',
    tier: 'pro',
    priceId: 'price_1SZUzjRoRT3gf2HBFWeafWaP', // Stripe Price ID
    price: '29.99',
    description: 'Built for candidates who refuse average and aim for offers.',
    features: [
      'Mindset & Confidence Training',
      'JD Scanner & CV Optimiser',
      'AI Interview Prep',
      'Portfolio Branding & Identity',
      'Buddy Model',
      'Post-Job Growth Roadmap'
    ],
    cta: 'Subscribe Now',
    highlighted: false,
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createCheckout = useCreateCheckout();
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const handlePlanSelect = async (plan: typeof plans[0]) => {
  // Check if user is authenticated
  if (!user) {
    localStorage.setItem('pendingSubscription', JSON.stringify({
      priceId: plan.priceId,
      tier: plan.tier
    }));
    navigate('/signup');
    return;
  }

  // Check if user already has an active subscription
  if (subscription) {
    alert('You already have an active subscription. Please cancel it first to switch plans.');
    return;
  }

  setProcessingPlan(plan.tier);

  try {
    await createCheckout.mutateAsync({
      priceId: plan.priceId,
      tier: plan.tier
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    
    // Show user-friendly error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to start checkout. Please try again.';
    
    alert(errorMessage);
    
    // If it's an auth error, redirect to login
    if (errorMessage.includes('log in')) {
      navigate('/login');
    }
  } finally {
    setProcessingPlan(null);
  }
};

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Unlock Your Career Growth
          </h2>
          <p className="text-xl text-slate-600">
            Pick your plan. Practice harder. Get hired faster.
          </p>
          <p className="text-sm text-green-600 font-semibold mt-2">
            ✨ 3-Day Free Trial on All Plans - No Credit Card Required
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const isProcessing = processingPlan === plan.tier;
            const hasActiveSubscription = subscription?.subscription_tier === plan.tier;

            return (
              <div
                key={index}
                className={`relative rounded-3xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-sky-600 to-blue-600 text-white shadow-2xl scale-105 border-4 border-sky-400'
                    : 'bg-white border-2 border-slate-200 hover:border-sky-300 hover:shadow-xl'
                } transition-all`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                {hasActiveSubscription && (
                  <div className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full font-semibold text-xs shadow-lg">
                    Active Plan
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-sky-100' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={plan.highlighted ? 'text-sky-100' : 'text-slate-600'}>
                      /month
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.highlighted ? 'bg-sky-400' : 'bg-sky-100'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-sky-600'}`} />
                      </div>
                      <span className={plan.highlighted ? 'text-sky-50' : 'text-slate-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={isProcessing || subscriptionLoading || hasActiveSubscription}
                  className={`w-full py-4 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlighted
                      ? 'bg-white text-sky-600 hover:bg-slate-50 shadow-xl'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isProcessing ? 'Processing...' : hasActiveSubscription ? 'Current Plan' : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            All plans include a 3-day free trial and 14-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}