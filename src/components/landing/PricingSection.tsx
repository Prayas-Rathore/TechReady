import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Initial skill assessment',
      'Basic roadmap generation',
      '3 practice sessions',
      'Community support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$49',
    period: '/month',
    description: 'Most popular choice',
    features: [
      'Unlimited practice sessions',
      'Advanced AI feedback',
      'Custom learning paths',
      'Expert mentorship',
      '1-on-1 mock interviews',
      'Priority support'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For serious candidates',
    features: [
      'Everything in Professional',
      'Unlimited expert sessions',
      'Interview guarantees',
      'Resume reviews',
      'Salary negotiation help',
      'Dedicated success manager'
    ],
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Success Plan</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Flexible pricing for every career stage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border transition-all hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 shadow-2xl shadow-purple-500/30'
                  : 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 mb-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-purple-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
