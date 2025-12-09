import { Zap, Users, FileText, Sparkles, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Feedback',
    description: 'Get instant, actionable insights during and after your mock interview to improve immediately.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Users,
    title: 'Industry Expert Interviewers',
    description: 'Practice with professionals from top companies like Google, Amazon, Microsoft, and more.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: FileText,
    title: 'Resume Review',
    description: 'Get your resume professionally reviewed and optimized to pass ATS systems and impress recruiters.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Soft Skills Training',
    description: 'Master communication, body language, and behavioral questions with personalized coaching.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience with 24/7 availability across all time zones.',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    icon: Award,
    title: 'Performance Analytics',
    description: 'Track your progress over time with detailed analytics and personalized improvement plans.',
    gradient: 'from-cyan-400 to-teal-500',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-slate-300">Powered by Advanced AI</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Succeed</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive tools and expert guidance to help you ace any interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
