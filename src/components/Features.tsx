import { Zap, Users, FileText, Sparkles, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Zap,
    title: 'JD Scanner & CV Optimiser',
    description: (
      <div className="space-y-3">
        <p className="font-semibold text-slate-800">
          Transform your CV from “meh” to “hire me now.”
        </p>

        <p className="text-slate-600">
          Upload a job description or your CV. Our AI cleans up structure, adds keywords,
          and highlights what recruiters actually care about.
        </p>

        <p className="font-semibold text-sky-600 italic">
          Benefit: First impressions that get you interviews—not rejections.
        </p>
      </div>
    ),
    gradient: 'from-amber-400 to-orange-500',
  },

  {
    icon: Users,
    title: 'AI-Powered Interview Prep',
    description: (
      <div className="space-y-3">
        <p className="font-semibold text-slate-800">
          Practice interviews—on your schedule, zero pressure.
        </p>

        <p className="text-slate-600">
          MockITHub generates real questions from real job descriptions. Record yourself
          (text, audio, or video), get instant AI feedback, and sharpen until you’re confident.
        </p>

        <p className="font-semibold text-sky-600 italic ">
          Benefit: No more freezing up. Nervousness → confidence.
        </p>
      </div>
    ),
    gradient: 'from-sky-400 to-blue-500',
  },

  {
    icon: FileText,
    title: 'Portfolio Branding & Identity',
    description: (
      <div className="space-y-3">
        <p className="font-semibold text-slate-800">
          Your career, your brand: stand out everywhere.
        </p>

        <p className="text-slate-600">
          Your portfolio isn’t just projects—it’s your personal brand. Align your CV, portfolio,
          and online presence under one identity recruiters remember.
        </p>

        <p className="font-semibold text-sky-600 italic ">
          Benefit: Professional, confident, hire-ready.
        </p>
      </div>
    ),
    gradient: 'from-green-400 to-emerald-500',
  },

  {
    icon: Sparkles,
    title: 'Mindset & Confidence Training',
    description: (
      <div className="space-y-3">
        <p className="font-semibold text-slate-800">
          Success starts in your head.
        </p>

        <p className="text-slate-600">
          Build mental strength, clarity, and confidence so you walk into interviews calm,
          focused, and ready to sell yourself.
        </p>

        <p className="font-semibold text-sky-600 italic ">
          Benefit: The most underrated advantage in job search: self-belief.
        </p>
      </div>
    ),
    gradient: 'from-violet-400 to-purple-500',
  },

  {
    icon: Clock,
    title: 'Buddy Model',
    description: (
      <div className="space-y-3">
        <p className="font-semibold text-slate-800">
          You’re not alone.
        </p>

        <p className="text-slate-600">
          Connect with peers, post blogs, job posts, and insights. Share regular progress, motivate each other,
          and grow together.
        </p>

        <p className="font-semibold text-sky-600 italic">
          Benefit: Motivation, support, and teamwork.
        </p>
      </div>
    ),
    gradient: 'from-pink-400 to-rose-500',
  },

  {
    icon: Award,
    title: 'Post-Job Growth Roadmap',
    description: (
      <div className="space-y-3">
        <p className="font-semibold text-slate-800">
          We don’t stop at “you’re hired.”
        </p>

        <p className="text-slate-600">
          From first-day jitters to passing your probation, we help you navigate your early career
          with clarity and confidence.
        </p>

        <p className="font-semibold text-sky-600 italic">
          Benefit: Long-term growth, not just a job.
        </p>
      </div>
    ),
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
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 space-y-4"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <div className="leading-relaxed space-y-3">
                {feature.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Take our 3-day free trial</h3>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            Includes JD Scanner + CV Optimiser + AI Interview Prep
          </p>
          <Link
            to="/signup"
            className="px-8 py-4 bg-white text-sky-600 rounded-lg hover:bg-slate-50 transition-all hover:shadow-xl hover:scale-105 font-semibold text-lg"
          >
            Start Free Trial
          </Link>
        </div>

      </div>
    </section>
  );
}
