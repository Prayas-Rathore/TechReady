import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Calendar, Video, Mail, Heart } from 'lucide-react';

export default function MockitHubTipsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/interview-toolkit')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Interview Toolkit</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Interview Tips</h1>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Tips for the Day Before the Interview</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">1. Clear your cognitive load</h3>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    Don't cram. Do light review only:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>Your intro</li>
                    <li>Your STAR stories</li>
                    <li>Your system design template</li>
                    <li>A few warmup coding problems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">2. Set up your environment (for virtual interviews)</h3>
                  <div className="grid sm:grid-cols-2 gap-2 mb-3">
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">Stable internet</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">Quiet space</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">Neutral background</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">Water nearby</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">Notebook + pen</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">IDE or whiteboard tool ready</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg px-4 py-2">
                      <p className="text-slate-700 text-sm">Notifications off</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm italic">This removes friction and surprises.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">3. Study the company's problem space</h3>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    Go beyond the website. Understand:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>Their product's core value</li>
                    <li>Their technical stack</li>
                    <li>Their biggest scaling challenges</li>
                    <li>Their competitors</li>
                    <li>Their recent releases or failures</li>
                  </ul>
                  <p className="text-slate-600 text-sm italic mt-3">This lets you tailor your examples and questions.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">4. Build a preinterview confidence ritual</h3>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    This is underrated. Examples:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>Review your top 3 achievements</li>
                    <li>Read a positive testimonial or performance review</li>
                    <li>Do 2 minutes of slow breathing</li>
                    <li>Visualize the first 5 minutes going smoothly</li>
                  </ul>
                  <p className="text-slate-600 text-sm italic mt-3">You're priming your nervous system for clarity.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">5. Prepare your "first 5 minutes"</h3>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    This is where most impressions form. Have ready:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>A crisp 20–30 second intro</li>
                    <li>One clarifying question</li>
                    <li>A calm, confident tone</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">6. Eat for stable energy</h3>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    Avoid heavy meals or sugar spikes. Go for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                    <li>Protein</li>
                    <li>Complex carbs</li>
                    <li>Water</li>
                    <li>Light caffeine if you use it</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">7. Sleep</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The biggest performance boost is simply being rested. Your brain needs consolidation time.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl">
                  <Video className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">At the Interview</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-900 font-medium">Dress professionally</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-900 font-medium">Sit upright</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-900 font-medium">Speak slowly and answer out loud and clear</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-900 font-medium">Keep hands relaxed</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 sm:col-span-2">
                  <p className="text-emerald-900 font-medium text-center">Smile naturally</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">After the Interview</h2>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  Send a short thank-you email:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-blue-900 italic leading-relaxed">
                    "Thank you for the opportunity to interview today. I enjoyed learning more about the role and look forward to hearing from you."
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-xl">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Handling Rejection</h2>
              </div>

              <div className="space-y-3">
                <p className="text-slate-700 leading-relaxed mb-4">
                  Rejection is:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">Feedback, not failure</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">Part of growth</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">Not personal</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
