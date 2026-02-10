import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award } from 'lucide-react';

export default function MockitHubStarPage() {
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
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">STAR Framework</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Master behavioral interview questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What is STAR?</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                The STAR method is a structured approach to answering behavioral interview questions by discussing the Situation, Task, Action, and Result.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">S - Situation</h3>
                  <p className="text-slate-700">
                    Describe the context or background of the situation. Set the scene for your story.
                  </p>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">T - Task</h3>
                  <p className="text-slate-700">
                    Explain the challenge or responsibility you faced. What needed to be accomplished?
                  </p>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">A - Action</h3>
                  <p className="text-slate-700">
                    Detail the specific steps you took to address the task. Focus on your contributions.
                  </p>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">R - Result</h3>
                  <p className="text-slate-700">
                    Share the outcomes of your actions. Quantify results when possible and highlight learnings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
