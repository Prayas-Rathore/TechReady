import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, CheckCircle } from 'lucide-react';

export default function MockitHubTipsPage() {
  const navigate = useNavigate();

  const tips = [
    'Research the company thoroughly before the interview',
    'Practice common interview questions out loud',
    'Prepare specific examples that demonstrate your skills',
    'Dress appropriately for the company culture',
    'Arrive early or log in 5-10 minutes before virtual interviews',
    'Prepare thoughtful questions to ask the interviewer',
    'Follow up with a thank-you email within 24 hours',
    'Be authentic and let your personality shine through',
  ];

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
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Essential advice to ace your interviews
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Interview Tips</h2>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
