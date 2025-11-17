import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, Map, AlertCircle } from 'lucide-react';
import RoadmapDisplay from '../components/roadmap/RoadmapDisplay';
import { useRoadmapGenerator } from '../components/hooks/useRoadmapGenerator';

type PageState = 'initial' | 'loading' | 'success' | 'error';

export default function RoadmapGeneratorPage() {
  const [pageState, setPageState] = useState<PageState>('initial');
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { generateRoadmap, isGenerating, error } = useRoadmapGenerator();
  
  // Get assessment data from navigation state
  const assessmentData = location.state?.answers || location.state?.assessmentData;

  // Check if assessment data exists on mount
  useEffect(() => {
    if (!assessmentData) {
      console.error('❌ No assessment data found');
      setPageState('error');
      setErrorMessage('No assessment data found. Please complete the assessment first.');
    }
  }, [assessmentData]);

  const handleGenerate = async () => {
    if (!assessmentData) {
      setPageState('error');
      setErrorMessage('No assessment data available. Please complete the assessment first.');
      return;
    }

    setPageState('loading');

    try {
      console.log('🤖 Sending to GPT...');
      console.log('Assessment Data:', assessmentData);
      
      // Send to Edge Function (index.ts) → GPT
      const roadmap = await generateRoadmap(assessmentData);
      
      console.log('✅ Received from GPT:', roadmap);
      
      // Update with real GPT data
      setRoadmapData(roadmap);
      setPageState('success');
      
    } catch (err: any) {
      console.error('❌ Failed to generate roadmap:', err);
      setPageState('error');
      setErrorMessage(err.message || 'Failed to generate roadmap. Please try again.');
    }
  };

  const handleRegenerate = async () => {
    if (!assessmentData) {
      setPageState('error');
      setErrorMessage('No assessment data available. Please complete the assessment first.');
      return;
    }

    setPageState('loading');

    try {
      console.log('🤖 Regenerating...');
      console.log('Assessment Data:', assessmentData);

      const roadmap = await generateRoadmap(assessmentData);
      
      console.log('✅ Received from GPT:', roadmap);
      
      setRoadmapData(roadmap);
      setPageState('success');
      
    } catch (err: any) {
      console.error('❌ Failed to generate roadmap:', err);
      setPageState('error');
      setErrorMessage(err.message || 'Failed to generate roadmap. Please try again.');
    }
  };

  // ✅ SUCCESS STATE
if (pageState === 'success' && roadmapData) {
  // ADD THIS DEBUG CODE:
  console.log('🔍 roadmapData being passed to RoadmapDisplay:', roadmapData);
  console.log('🔍 roadmapData keys:', Object.keys(roadmapData));
  console.log('🔍 roadmapData.summary:', roadmapData.summary);
  
  return <RoadmapDisplay roadmap={roadmapData} onRegenerate={handleRegenerate} />;
}

  // ✅ ERROR STATE - No Mock Data!
  if (pageState === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Oops! Something went wrong
          </h2>
          
          <p className="text-slate-600 mb-8">
            {errorMessage}
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/assessment')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Go to Assessment
            </button>
            
            {assessmentData && (
              <button
                onClick={handleGenerate}
                className="w-full px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold border-2 border-slate-200 hover:border-blue-300 transition-all duration-200"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ✅ LOADING STATE
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

  // ✅ INITIAL STATE
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
          disabled={!assessmentData}
          className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
          <span className="relative z-10">
            {assessmentData ? 'Generate My Roadmap' : 'Complete Assessment First'}
          </span>
        </button>

        {!assessmentData && (
          <p className="mt-4 text-red-600 font-semibold">
            Please complete the assessment before generating a roadmap.
          </p>
        )}

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