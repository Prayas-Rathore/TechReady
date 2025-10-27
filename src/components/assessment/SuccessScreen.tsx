import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

export default function SuccessScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-400 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Assessment Complete! 🎉
            </h1>

            <p className="text-xl text-slate-600 mb-8">
              Analyzing your responses and creating your personalized plan...
            </p>

            <div className="flex items-center justify-center gap-3 mb-8">
              <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
              <span className="text-slate-500 font-medium">Processing your answers</span>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4">
                <Sparkles className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600 font-medium">Custom Path</p>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4">
                <Sparkles className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600 font-medium">AI Insights</p>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4">
                <Sparkles className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600 font-medium">Resources</p>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-8">
              Thinking......
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
