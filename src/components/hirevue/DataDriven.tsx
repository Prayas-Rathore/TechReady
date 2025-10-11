import { Brain, Target, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze candidate responses, body language, and communication patterns to provide deep insights.',
    stats: '99.7% accuracy',
  },
  {
    icon: Target,
    title: 'Predictive Hiring',
    description: 'Predict job performance and cultural fit with data-driven insights that go beyond resumes and traditional interviews.',
    stats: '85% better retention',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Learning',
    description: 'Our AI improves with every interview, learning from successful hires to refine recommendations for your organization.',
    stats: '10x faster process',
  },
  {
    icon: Users,
    title: 'Bias Elimination',
    description: 'Remove unconscious bias from hiring decisions with objective, data-driven evaluations that focus on skills and potential.',
    stats: '100% fair evaluation',
  },
];

export default function DataDriven() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-semibold mb-6">
            Data-Driven Intelligence
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Hire Smarter with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              AI Insights
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Transform raw data into actionable hiring decisions with advanced AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border-2 border-slate-100 hover:border-transparent hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-bold">
                    {feature.stats}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
