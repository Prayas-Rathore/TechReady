import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/SupabaseClient';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Download,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface Week {
  week: number;
  theme: string;
  focus: string;
  actions: string[];
  milestones: string[];
  outcomes: string[];
  tips?: string;
}

interface Roadmap {
  summary: string;
  keyFocusAreas: string[];
  weeks: Week[];
  successMetrics: string[];
  resources: string[];
  totalWeeks: number;
  totalDays: number;
  userProfile?: {
    role: string;
    company: string;
    timeline: string;
    confidenceLevel: string;
  };
}

export default function RoadmapResultsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [answers, setAnswers] = useState<any>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in to view your roadmap');
        navigate('/login');
        return;
      }
      
      setUser(user);

      // Load saved roadmap and answers
      const { data: roadmapData, error } = await supabase
        .from('post_job_roadmap')
        .select('answers, generated_roadmap, completed_at')
        .eq('user_id', user.id)
        .single();

      if (error || !roadmapData) {
        toast.error('No roadmap found. Please complete the questionnaire first.');
        navigate('/post-job-roadmap');
        return;
      }

      setAnswers(roadmapData.answers);

      // Check if roadmap already generated
      if (roadmapData.generated_roadmap) {
        setRoadmap(roadmapData.generated_roadmap);
        loadProgress(user.id);
      } else {
        // Generate roadmap
        await generateRoadmap(user.id, roadmapData.answers);
      }

    } catch (err) {
      console.error('Error loading data:', err);
      toast.error('Failed to load roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRoadmap = async (userId: string, userAnswers: any) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('postroadmap', {
        body: { answers: userAnswers, userId }
      });

      if (error) throw error;
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate roadmap');
      }

      const generatedRoadmap = data.roadmap;
      setRoadmap(generatedRoadmap);

      // Save to database
      await supabase
        .from('post_job_roadmap')
        .update({ 
          generated_roadmap: generatedRoadmap,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      toast.success('Roadmap generated successfully!');
      
    } catch (err: any) {
      console.error('Error generating roadmap:', err);
      toast.error(err.message || 'Failed to generate roadmap');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('roadmap_progress')
        .select('completed_actions, current_week')
        .eq('user_id', userId)
        .single();

      if (data) {
        setCompletedActions(new Set(data.completed_actions || []));
        setCurrentWeek(data.current_week || 1);
      }
    } catch (err) {
      console.error('Error loading progress:', err);
    }
  };

  const saveProgress = async () => {
    if (!user?.id) return;

    try {
      await supabase
        .from('roadmap_progress')
        .upsert({
          user_id: user.id,
          completed_actions: Array.from(completedActions),
          current_week: currentWeek,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  useEffect(() => {
    if (completedActions.size > 0) {
      saveProgress();
    }
  }, [completedActions]);

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(week)) {
        newSet.delete(week);
      } else {
        newSet.add(week);
      }
      return newSet;
    });
  };

  const toggleAction = (actionId: string) => {
    setCompletedActions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(actionId)) {
        newSet.delete(actionId);
      } else {
        newSet.add(actionId);
      }
      return newSet;
    });
  };

  const getWeekProgress = (week: Week) => {
    const totalActions = week.actions.length;
    const completed = week.actions.filter(action => 
      completedActions.has(`${week.week}-${action}`)
    ).length;
    return Math.round((completed / totalActions) * 100);
  };

  const getOverallProgress = () => {
    if (!roadmap) return 0;
    const totalActions = roadmap.weeks.reduce((sum, w) => sum + w.actions.length, 0);
    return Math.round((completedActions.size / totalActions) * 100);
  };

//   const downloadRoadmap = () => {
//     if (!roadmap) return;
    
//     const content = JSON.stringify(roadmap, null, 2);
//     const blob = new Blob([content], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `roadmap-${new Date().toISOString().split('T')[0]}.json`;
//     link.click();
//     URL.revokeObjectURL(url);
//     toast.success('Roadmap downloaded!');
//   };

  // Loading state
  if (isLoading || isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">
            {isGenerating ? 'Generating your personalized roadmap...' : 'Loading...'}
          </p>
          {isGenerating && (
            <p className="text-sm text-slate-500 mt-2">This may take 10-15 seconds</p>
          )}
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Failed to load roadmap</p>
          <button
            onClick={() => navigate('/postroadmap')}
            className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
            <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  Your {roadmap.totalDays}-Day Success Roadmap
                </h1>
                <p className="text-lg text-slate-600">
                  {roadmap.summary}
                </p>
              </div>
              {/* <button
                onClick={downloadRoadmap}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="hidden md:inline">Download</span>
              </button> */}
            </div>

            {/* Overall Progress */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Overall Progress</h3>
                  <p className="text-sm text-slate-600">
                    Week {currentWeek} of {roadmap.totalWeeks}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-sky-600">{getOverallProgress()}%</div>
                  <div className="text-sm text-slate-600">Complete</div>
                </div>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${getOverallProgress()}%` }}
                />
              </div>
            </div>
          </div>

          {/* Key Focus Areas */}
          {roadmap.keyFocusAreas && roadmap.keyFocusAreas.length > 0 && (
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl border border-sky-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-600" />
                Key Focus Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roadmap.keyFocusAreas.map((area, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Plans */}
          <div className="space-y-4 mb-8">
            {roadmap.weeks.map((week) => {
              const isExpanded = expandedWeeks.has(week.week);
              const progress = getWeekProgress(week);
              const isCurrent = week.week === currentWeek;

              return (
                <div
                  key={week.week}
                  className={`bg-white rounded-2xl shadow-lg border-2 transition-all ${
                    isCurrent ? 'border-sky-500' : 'border-slate-200'
                  }`}
                >
                  {/* Week Header */}
                  <button
                    onClick={() => toggleWeek(week.week)}
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-t-2xl"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        isCurrent 
                          ? 'bg-sky-600 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {week.week}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{week.theme}</h3>
                        <p className="text-sm text-slate-600">{week.focus}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <div className="text-2xl font-bold text-sky-600">{progress}%</div>
                        <div className="text-xs text-slate-600">Complete</div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Week Content */}
                  {isExpanded && (
                    <div className="p-6 pt-0 space-y-6">
                      {/* Progress Bar */}
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Actions */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-sky-600" />
                          Action Items
                        </h4>
                        <div className="space-y-2">
                          {week.actions.map((action, idx) => {
                            const actionId = `${week.week}-${action}`;
                            const isCompleted = completedActions.has(actionId);

                            return (
                              <button
                                key={idx}
                                onClick={() => toggleAction(actionId)}
                                className={`w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                                  isCompleted
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-slate-200 hover:border-sky-300'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isCompleted
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-slate-300'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-400" />
                                  )}
                                </div>
                                <span className={isCompleted ? 'text-green-700 font-medium' : 'text-slate-700'}>
                                  {action}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Milestones */}
                      {week.milestones && week.milestones.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-sky-600" />
                            Milestones
                          </h4>
                          <div className="space-y-2">
                            {week.milestones.map((milestone, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expected Outcomes */}
                      {week.outcomes && week.outcomes.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-sky-600" />
                            Expected Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {week.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-700">
                                <span className="text-sky-600 mt-1">•</span>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tips */}
                      {week.tips && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold text-amber-900 mb-1">Pro Tip</h5>
                              <p className="text-sm text-amber-800">{week.tips}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Success Metrics */}
          {roadmap.successMetrics && roadmap.successMetrics.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                How to Measure Success
              </h3>
              <div className="space-y-3">
                {roadmap.successMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {roadmap.resources && roadmap.resources.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Recommended Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roadmap.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-sky-600 mt-1">📚</span>
                    <span className="text-slate-700">{resource}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setCurrentWeek(Math.min(currentWeek + 1, roadmap.totalWeeks))}
              disabled={currentWeek >= roadmap.totalWeeks}
              className="flex-1 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Move to Week {currentWeek + 1}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}