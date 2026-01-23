import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookOpen, Sparkles, Target, MessageSquare, Users, Briefcase, Award } from 'lucide-react';

const MOCKITHUB_OPTIONS = [
  { path: '/interview-toolkit/home', label: 'Home', icon: BookOpen },
  { path: '/interview-toolkit/tips', label: 'Tips', icon: Target },
  { path: '/interview-toolkit/star-framework', label: 'STAR Framework', icon: Award },
  { path: '/interview-toolkit/scenarios', label: 'Scenarios', icon: MessageSquare },
  { path: '/interview-toolkit/entry-level', label: 'Entry Level Interview Prep', icon: Users },
  { path: '/interview-toolkit/mid-level', label: 'Mid Level Interview Prep', icon: Briefcase },
  { path: '/interview-toolkit/senior-level', label: 'Senior / Management Prep', icon: Award },
];

export default function InterviewToolkitPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMockitHubOpen, setIsMockitHubOpen] = useState(false);

  const isActivePath = (path: string) => location.pathname === path;
  const isAnyMockitHubActive = MOCKITHUB_OPTIONS.some(opt => isActivePath(opt.path));

  React.useEffect(() => {
    if (isAnyMockitHubActive) {
      setIsMockitHubOpen(true);
    }
  }, [isAnyMockitHubActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Interview Toolkit</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive resources to ace your next interview
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setIsMockitHubOpen(!isMockitHubOpen)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-slate-900">MockitHub Preparation</h2>
                    <p className="text-sm text-slate-600">Structured interview preparation resources</p>
                  </div>
                </div>
                {isMockitHubOpen ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isMockitHubOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 space-y-1">
                  {MOCKITHUB_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isActive = isActivePath(option.path);

                    return (
                      <button
                        key={option.path}
                        onClick={() => navigate(option.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-sky-50 text-sky-700 font-medium'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/jobdescription')}
              className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-5 hover:shadow-md hover:border-sky-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      AI Preparation
                    </h2>
                    <p className="text-sm text-slate-600">
                      Get personalized AI-powered interview coaching
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
