import { Zap, Users, FileText, Sparkles, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Feedback',
    description: 'Get instant, brutal-honest AI feedback on your answers to fix mistakes on the spot.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Users,
    title: 'Industry-Level Interview Experience',
    description: 'Experience high-pressure, real-world interview environments built to train you like top candidates.',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    icon: FileText,
    title: 'Smart Resume Optimization',
    description: 'Turn your resume into a recruiter-magnet with AI-powered optimization that beats filtering systems.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Confidence & Communication Mastery ',
    description: '- Train your speaking, clarity, and body language until you perform like a pro in every interview.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Practice Anytime, Anywhere ',
    description: 'Train at your own pace with 24/7 AI mock interviews that adapt to your skill level and fit your schedule.',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    icon: Award,
    title: 'Advanced Performance Tracking ',
    description: 'See exactly where you’re winning and losing — with smart breakdowns that force real improvement.',
    gradient: 'from-cyan-400 to-teal-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-slate-600">
            Powerful AI-built tools designed to make you unstoppable in interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Your Competition Is Already Training. Are You?</h3>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of ambitious candidates who are using MockitHub to turn interview stress into job offers
          </p>
          <Link to="/signup" className="px-8 py-4 bg-white text-sky-600 rounded-lg hover:bg-slate-50 transition-all hover:shadow-xl hover:scale-105 font-semibold text-lg">
                Start Free AI Mock Now
          </Link>
        </div>
      </div>
    </section>
  );
}
