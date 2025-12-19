
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Users,
  Brain,
  Target,
  TrendingUp,
  Zap,
  Shield,
  Award,
  Check,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage2() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500 rounded-full blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Video className="w-9 h-9 text-cyan-400 group-hover:text-cyan-300 transition-colors relative z-10" />
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                MockITHub
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors font-medium">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-6 space-y-4 animate-fadeIn">
              <a href="#features" className="block text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="block text-slate-300 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="block text-slate-300 hover:text-white transition-colors">Pricing</a>
              <Link to="/login" className="block text-slate-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="block text-center px-6 py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-semibold">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

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

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                Master Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">
                  Dream Interview
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Experience the future of interview preparation with AI-driven insights, real-time feedback, and personalized coaching. Land your dream role at top companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <Link
                  to="/assessment"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">10K+</div>
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
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />

              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 animate-pulse" />
                  <Brain className="w-32 h-32 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-xl rounded-full text-xs text-cyan-400 border border-cyan-500/30">
                    AI Active
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Personalized Learning Path</div>
                      <div className="text-sm text-slate-400">AI analyzes your skills and creates custom roadmaps</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Real-Time Feedback</div>
                      <div className="text-sm text-slate-400">Instant insights during mock interviews</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rotate-12 opacity-20 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl -rotate-12 opacity-20 blur-xl" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

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
              Comprehensive tools and insights designed to help you ace every interview
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Analysis',
                description: 'Advanced algorithms analyze your responses and provide detailed feedback on areas of improvement',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Target,
                title: 'Custom Roadmaps',
                description: 'Personalized learning paths tailored to your target role and current skill level',
                gradient: 'from-pink-500 to-cyan-500'
              },
              {
                icon: Zap,
                title: 'Real-Time Coaching',
                description: 'Get instant feedback during practice sessions to improve on the spot',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: Users,
                title: 'Expert Mentors',
                description: '1-on-1 sessions with industry professionals from top tech companies',
                gradient: 'from-blue-500 to-purple-500'
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                description: 'Detailed analytics and insights to monitor your improvement over time',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Shield,
                title: 'Interview Simulations',
                description: 'Realistic mock interviews that mirror actual company interview processes',
                gradient: 'from-cyan-500 to-purple-500'
              }
            ].map((feature, index) => (
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

      <section id="how-it-works" className="relative py-20 lg:py-32 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Interview Success</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple steps to transform your interview skills
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Take Assessment',
                description: 'Complete our comprehensive skill assessment to identify your strengths and areas for improvement',
                icon: Target
              },
              {
                step: '02',
                title: 'Get Personalized Roadmap',
                description: 'Receive a custom learning path designed specifically for your target role and timeline',
                icon: Brain
              },
              {
                step: '03',
                title: 'Practice with AI',
                description: 'Engage in realistic mock interviews with instant AI feedback and coaching',
                icon: Zap
              },
              {
                step: '04',
                title: 'Land Your Dream Job',
                description: 'Apply with confidence and ace your interviews at top companies',
                icon: Award
              }
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-6 mb-8 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-2xl text-white group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <div className="flex items-start gap-4">
                    <item.icon className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Success Plan</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Flexible pricing for every career stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: 'forever',
                description: 'Perfect for getting started',
                features: [
                  'Initial skill assessment',
                  'Basic roadmap generation',
                  '3 practice sessions',
                  'Community support'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '$49',
                period: '/month',
                description: 'Most popular choice',
                features: [
                  'Unlimited practice sessions',
                  'Advanced AI feedback',
                  'Custom learning paths',
                  'Expert mentorship',
                  '1-on-1 mock interviews',
                  'Priority support'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$99',
                period: '/month',
                description: 'For serious candidates',
                features: [
                  'Everything in Professional',
                  'Unlimited expert sessions',
                  'Interview guarantees',
                  'Resume reviews',
                  'Salary negotiation help',
                  'Dedicated success manager'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border transition-all hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 shadow-2xl shadow-purple-500/30'
                    : 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 mb-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-purple-500/50'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-32 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Interview Success?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of successful candidates who landed their dream jobs
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
            >
              <span>Start Your Free Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative py-12 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-white">MockITHub</span>
              </div>
              <p className="text-slate-400">
                AI-powered interview preparation platform helping you land your dream job.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/cookies-policy" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} MockITHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
