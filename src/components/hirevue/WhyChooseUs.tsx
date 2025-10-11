import { Shield, Clock, Globe, Sparkles, Lock, Award } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with GDPR, SOC 2, and ISO standards.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to ensure your hiring never stops.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Support for 100+ languages and candidates in 190+ countries.',
  },
  {
    icon: Sparkles,
    title: 'Easy Integration',
    description: 'Seamlessly integrate with your existing ATS and HR tools.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Complete data privacy with candidate consent and GDPR compliance.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: '85% reduction in time-to-hire and 90% improvement in quality.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              TalentVue
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            The most trusted and comprehensive hiring platform in the industry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-pink-200 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-6 group-hover:from-pink-500 group-hover:to-purple-600 transition-all shadow-sm group-hover:scale-110">
                <reason.icon className="w-7 h-7 text-pink-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Start Hiring Better Today
            </h3>
            <p className="text-pink-100 text-lg mb-8">
              Join thousands of companies that have transformed their hiring process with TalentVue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-pink-600 rounded-xl hover:bg-slate-50 transition-all hover:shadow-xl hover:scale-105 font-semibold text-lg">
                Schedule Demo
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all font-semibold text-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
