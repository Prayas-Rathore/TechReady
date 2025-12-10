import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Video, ChevronDown } from 'lucide-react';
import AIInterviewAnimation from '../AIInterviewAnimation';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full animate-fadeIn">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                AI-Powered Interview Intelligence
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold leading-tight animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Crack the Code: Land Your Dream Tech Role - With &nbsp;
              
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient">
                Confidence
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              MockITHub equips you with CV optimisation, AI interview prep, portfolio branding, confidence training, Buddy blogs, and a growth roadmap — everything you need to stand out and succeed in tech. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/assessment"
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Start AI Mock</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Video className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100+</div>
                <div className="text-sm text-slate-400 mt-1">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">4.9/5</div>
                <div className="text-sm text-slate-400 mt-1">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-slate-400 mt-1">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <AIInterviewAnimation />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-slate-400" />
      </div>
    </section>
  );
}
