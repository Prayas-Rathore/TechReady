import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function MockitHubHomePage() {
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
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome to MockITHub</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              If you're reading this, you're already doing something most candidates don't: <strong>preparing properly.</strong>
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">This guide exists to help you:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl mt-1">•</span>
                  <span className="text-lg text-slate-700">understand how interviews really work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl mt-1">•</span>
                  <span className="text-lg text-slate-700">remove fear and confusion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl mt-1">•</span>
                  <span className="text-lg text-slate-700">build confidence step by step</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl mt-1">•</span>
                  <span className="text-lg text-slate-700">walk into interviews feeling calm and ready</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-8 text-center">
              <p className="text-2xl font-bold text-slate-900 mb-2">
                You don't need to be perfect.
              </p>
              <p className="text-2xl font-bold text-sky-600">
                You need to be prepared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
