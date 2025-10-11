import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HireVueCTA() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.15),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Experience the power of AI-driven recruitment and make better hiring decisions faster
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-all font-semibold text-lg">
              Book a Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-pink-400" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-pink-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-pink-400" />
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
