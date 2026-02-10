import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Calendar, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function InterviewMindsetRoadmapPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Interview Mindset Roadmap
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <p className="text-sm font-medium text-amber-800">
                You can take this quiz only once so we can create a tailored roadmap
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  Follow Your Personalized Daily Roadmap
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Follow your personalised daily roadmap, stay consistent, and track your progress.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Small daily actions = big career results</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Consistency beats motivation every time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  That's why MockITHub includes daily roadmap tasks to help you:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">Build confidence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">Maintain momentum</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">Avoid overwhelm</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">How to use:</h3>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <p className="text-slate-700">
                    Complete your roadmap quiz to receive a personalized interview preparation plan.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/assessment')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-sky-500/30 flex items-center justify-center gap-3"
                >
                  <Target className="w-5 h-5" />
                  Start Assessment
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Important Note</h4>
                <p className="text-sm text-blue-800">
                  This assessment can only be taken once to ensure your roadmap remains focused and personalized.
                  Take your time to answer thoughtfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
