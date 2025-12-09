import { Play, ArrowRight, Shield, Zap, Award, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HireVueHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-purple-50/40 min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.08),transparent_50%)]" />

      <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#solutions" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
              Solutions
            </a>
            <a href="#why-us" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
              Why Us
            </a>
            <a href="#resources" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
              Resources
            </a>
            <Link to="/" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
              InterviewPro
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block px-6 py-2.5 text-pink-600 hover:text-pink-700 transition-colors font-semibold">
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all font-semibold">
              Book a Demo
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-slate-200 pt-6 animate-fadeIn">
            <div className="flex flex-col gap-4">
              <a href="#solutions" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
                Solutions
              </a>
              <a href="#why-us" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
                Why Us
              </a>
              <a href="#resources" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
                Resources
              </a>
              <Link to="/" className="text-slate-700 hover:text-pink-600 transition-colors font-medium">
                InterviewPro
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-semibold shadow-sm">
              <Award className="w-4 h-4" />
              #1 AI-Powered Hiring Platform
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
              The right data to make the{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600">
                  right hire
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 5 100 2 150 3C200 4 250 7 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899"/>
                      <stop offset="100%" stopColor="#a855f7"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Transform your hiring process with AI-powered video interviews, comprehensive assessments, and data-driven insights that help you identify top talent faster and more accurately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center gap-2">
                Take a Tour
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 rounded-xl border-2 border-slate-200 hover:border-pink-300 hover:shadow-xl transition-all font-semibold text-lg flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-pink-600" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="group cursor-pointer">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 group-hover:from-pink-500 group-hover:to-purple-600 transition-all shadow-sm group-hover:shadow-lg mb-3">
                  <Zap className="w-7 h-7 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <div className="font-bold text-2xl text-slate-900">10x</div>
                <div className="text-sm text-slate-600">Faster Hiring</div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-pink-500 group-hover:to-purple-600 transition-all shadow-sm group-hover:shadow-lg mb-3">
                  <Users className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div className="font-bold text-2xl text-slate-900">90%</div>
                <div className="text-sm text-slate-600">Better Matches</div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 group-hover:from-pink-500 group-hover:to-purple-600 transition-all shadow-sm group-hover:shadow-lg mb-3">
                  <Shield className="w-7 h-7 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <div className="font-bold text-2xl text-slate-900">100%</div>
                <div className="text-sm text-slate-600">Bias-Free</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-3xl opacity-20 blur-2xl animate-pulse" />

            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
              <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl mb-6 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 right-4 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 text-sm">Jane Doe</div>
                    <div className="text-xs text-slate-600">Senior Developer Position</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">AI Analysis</span>
                    <span className="text-xs text-pink-600 font-bold">95% Match</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    A+
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Communication</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    98
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Technical</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    A
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Culture Fit</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 max-w-[200px] animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-slate-900 text-sm">Bias Detection</span>
              </div>
              <p className="text-xs text-slate-600">
                AI ensures fair evaluation across all candidates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
