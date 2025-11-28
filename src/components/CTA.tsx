import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))] opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 text-sky-300 rounded-full text-sm font-medium mb-8 border border-sky-500/30">
            <CheckCircle className="w-4 h-4" />
             Join 10,000+ Interview winners 
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Don't Walk Into Another Interview Unprepared
          </h2>

          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
             TRAIN WITH AI  -   PERFORM LIKE A PRO -  GET HIRED FASTER  
             <p> YOUR FIRST MOCK IS COMPLETELY FREE! </p>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="group px-10 py-5 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-all hover:shadow-2xl hover:shadow-sky-500/50 hover:scale-105 font-semibold text-lg flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* <Link to="/admin-dashboard" className="px-10 py-5 bg-white/10 text-white rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all font-semibold text-lg backdrop-blur-sm">
              Schedule Free Session
            </Link> */}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Zero-risk sign up</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Cancel instantly anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Guaranteed results or your money back</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </section>
  );
}
