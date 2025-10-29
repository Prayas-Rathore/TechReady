import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const guestId = typeof window !== 'undefined' ? localStorage.getItem('guest_user_id') : null;

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) }
  ];

  const confirmRequirement = confirmPassword
    ? { label: password === confirmPassword ? 'Passwords match' : 'Passwords do not match', met: password === confirmPassword }
    : null;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

  const passwordsOk = passwordRequirements.every(req => req.met);
  const confirmOk = confirmRequirement ? confirmRequirement.met : false;
  const allRequirementsMet = passwordsOk && confirmOk;
    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            guest_id: guestId
          },
        },
      });
      if (error) throw error;

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-950 to-emerald-900/20" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-rose-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 animate-slideUp">
              <div className="text-center mb-8">
                <div className="lg:hidden mb-6">
                  <Link to="/" className="inline-flex items-center gap-2">
                    <Video className="w-8 h-8 text-emerald-400" />
                    <span className="text-2xl font-bold text-white">InterviewPro</span>
                  </Link>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-slate-300">Start your journey to success</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-3 space-y-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {req.met ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <X className="w-4 h-4 text-slate-500" />
                          )}
                          <span className={req.met ? 'text-emerald-400' : 'text-slate-400'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {confirmRequirement && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        {confirmRequirement.met ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span className={confirmRequirement.met ? 'text-emerald-400' : 'text-red-400'}>
                          {confirmRequirement.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 via-rose-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-300">
                  Already have an account?{' '}
                  <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <p className="text-center text-slate-400 text-sm mt-6">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 order-1 lg:order-2">
          <div className="max-w-lg">
            <div className="mb-8 animate-fadeIn">
              <Link to="/" className="flex items-center gap-3 mb-12">
                <Video className="w-10 h-10 text-emerald-400" />
                <span className="text-3xl font-bold text-white">MockIthub</span>
              </Link>

              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Join thousands of
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-emerald-400">
                  successful engineers
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Get personalized interview prep and land your dream job at top tech companies.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 mb-2">
                  10K+
                </div>
                <div className="text-slate-300 text-sm">Success Stories</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-emerald-400 mb-2">
                  95%
                </div>
                <div className="text-slate-300 text-sm">Success Rate</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
                  500+
                </div>
                <div className="text-slate-300 text-sm">Expert Mentors</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                  4.9★
                </div>
                <div className="text-slate-300 text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
