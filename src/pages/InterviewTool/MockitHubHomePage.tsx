import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Target, Award } from 'lucide-react';

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
            <h1 className="text-4xl font-bold text-slate-900 mb-3">MockitHub Home</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Welcome to your interview preparation hub
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Getting Started</h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              MockitHub provides comprehensive interview preparation resources to help you succeed in your job search.
              Navigate through the different sections to access tips, frameworks, scenarios, and level-specific preparation materials.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                <Target className="w-8 h-8 text-sky-600 mb-2" />
                <h3 className="font-semibold text-slate-900 mb-1">Tips & Tricks</h3>
                <p className="text-sm text-slate-600">Expert advice for interview success</p>
              </div>

              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                <Award className="w-8 h-8 text-sky-600 mb-2" />
                <h3 className="font-semibold text-slate-900 mb-1">STAR Framework</h3>
                <p className="text-sm text-slate-600">Master behavioral interviews</p>
              </div>

              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                <BookOpen className="w-8 h-8 text-sky-600 mb-2" />
                <h3 className="font-semibold text-slate-900 mb-1">Practice Scenarios</h3>
                <p className="text-sm text-slate-600">Real-world interview situations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
