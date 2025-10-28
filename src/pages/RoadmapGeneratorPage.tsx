import { useState } from 'react';
import { Sparkles, Loader2, Map } from 'lucide-react';
import RoadmapDisplay from '../components/roadmap/RoadmapDisplay';
import { mockRoadmapData } from '../data/roadmapData';

type PageState = 'initial' | 'loading' | 'success';

export default function RoadmapGeneratorPage() {
  const [pageState, setPageState] = useState<PageState>('initial');

  const handleGenerate = () => {
    setPageState('loading');

    setTimeout(() => {
      setPageState('success');
    }, 3000);
  };

  const handleRegenerate = () => {
    setPageState('loading');

    setTimeout(() => {
      setPageState('success');
    }, 3000);
  };

  if (pageState === 'success') {
    return <RoadmapDisplay roadmap={mockRoadmapData} onRegenerate={handleRegenerate} />;
  }

  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-2xl">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Creating Your Personalized Roadmap
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            Our AI is analyzing your skills and crafting a custom learning path...
          </p>

          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-600">Analyzing your strengths...</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  </div>
                  <span className="text-sm text-slate-600">Identifying improvement areas...</span>
                </div>
                <div className="flex items-center gap-3 text-left opacity-50">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-600">Building learning timeline...</span>
                </div>
                <div className="flex items-center gap-3 text-left opacity-50">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-600">Curating resources...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-full p-12 shadow-2xl">
              <Map className="w-24 h-24 text-blue-600" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Your AI Interview Roadmap
        </h1>

        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Get a personalized, step-by-step plan to ace your technical interviews.
          Our AI analyzes your skills and creates a custom roadmap tailored to your goals.
        </p>

        <button
          onClick={handleGenerate}
          className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
          <span className="relative z-10">Generate My Roadmap</span>
        </button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Personalized</h3>
            <p className="text-sm text-slate-600">Tailored to your unique skills and goals</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Comprehensive</h3>
            <p className="text-sm text-slate-600">Complete learning path with resources</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Actionable</h3>
            <p className="text-sm text-slate-600">Clear daily and weekly milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
}
