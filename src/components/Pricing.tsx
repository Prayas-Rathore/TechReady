import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '29',
    description: 'Perfect for getting started with mock interviews',
    features: [
      '2 mock interviews per month',
      'Basic feedback report',
      'Email support',
      'Access to community',
      '30-day progress tracking',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '79',
    description: 'Most popular choice for serious job seekers',
    features: [
      '8 mock interviews per month',
      'Detailed feedback & analytics',
      'Resume review included',
      'Priority email & chat support',
      'Unlimited progress tracking',
      'Soft skills coaching session',
      'Interview recording access',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '149',
    description: 'Everything you need for career transformation',
    features: [
      'Unlimited mock interviews',
      'Advanced AI-powered analytics',
      'Monthly resume updates',
      '24/7 priority support',
      'Personal interview coach',
      '4 soft skills coaching sessions',
      'Career counseling included',
      'LinkedIn profile optimization',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the perfect plan for your interview preparation journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
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
                className={`w-full py-4 rounded-lg font-semibold transition-all hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-white text-sky-600 hover:bg-slate-50 shadow-xl'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            All plans include a 14-day money-back guarantee
          </p>
          <a href="#" className="text-sky-600 hover:text-sky-700 font-medium">
            Need a custom plan? Contact sales →
          </a>
        </div>
      </div>
    </section>
  );
}
