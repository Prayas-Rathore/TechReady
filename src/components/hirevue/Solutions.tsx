import { Video, FileText, BarChart, MessageSquare } from 'lucide-react';

const solutions = [
  {
    icon: Video,
    title: 'Video Interviewing',
    description: 'Conduct live or pre-recorded video interviews with AI-powered analysis of candidate responses and behavior.',
    features: ['Live & On-Demand', 'Screen Recording', 'Multi-Language Support'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FileText,
    title: 'Skills Assessment',
    description: 'Comprehensive testing platform with technical, cognitive, and behavioral assessments tailored to your needs.',
    features: ['Custom Tests', 'Auto-Grading', 'Skills Mapping'],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: BarChart,
    title: 'Analytics Dashboard',
    description: 'Real-time insights and reporting on candidate performance, hiring trends, and team collaboration metrics.',
    features: ['Performance Metrics', 'Trend Analysis', 'Custom Reports'],
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: MessageSquare,
    title: 'Candidate Experience',
    description: 'Provide a seamless, professional experience for candidates with branded portals and automated communication.',
    features: ['Branded Portal', 'Auto Notifications', 'Feedback System'],
    color: 'from-purple-500 to-pink-500',
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Complete Hiring Solutions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to streamline your recruitment process in one platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity`} />

              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <solution.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {solution.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {solution.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-700 group-hover:border-pink-200 group-hover:bg-pink-50 group-hover:text-pink-700 transition-all"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-105 transition-all font-semibold text-lg">
            Explore All Solutions
          </button>
        </div>
      </div>
    </section>
  );
}
