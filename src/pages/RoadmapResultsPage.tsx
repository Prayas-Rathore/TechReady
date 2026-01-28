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
  Loader2,
  Trophy,
  Award,
  Zap,
  Flame,
  Star,
  Medal,
  Crown,
  Sparkles,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Week {
  week: number;
  theme: string;
  focus: string;
  actions: string[];
  milestones: string[];
  outcomes: string[];
  tips?: string;
  skillTags?: string[]; // NEW: Skill tags for each week
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface UserStats {
  totalPoints: number;
  level: number;
  streak: number;
  weeksCompleted: number;
  actionsCompleted: number;
  badges: string[];
}

export default function RoadmapResultsPageEnhanced() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [answers, setAnswers] = useState<any>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [currentWeek, setCurrentWeek] = useState(1);
  
  // NEW: Gamification states
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    level: 1,
    streak: 0,
    weeksCompleted: 0,
    actionsCompleted: 0,
    badges: []
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

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

      const { data: roadmapData, error } = await supabase
        .from('post_job_roadmap')
        .select('answers, generated_roadmap, completed_at')
        .eq('user_id', user.id)
        .single();

      if (error || !roadmapData) {
        toast.error('No roadmap found. Please complete the questionnaire first.');
        navigate('/postroadmap');
        return;
      }

      setAnswers(roadmapData.answers);

      if (roadmapData.generated_roadmap) {
        const loadedRoadmap = roadmapData.generated_roadmap;
        
        // Add skill tags to weeks if not present
        if (loadedRoadmap.weeks) {
          loadedRoadmap.weeks = loadedRoadmap.weeks.map((week: Week) => ({
            ...week,
            skillTags: week.skillTags || generateSkillTags(week)
          }));
        }
        
        setRoadmap(loadedRoadmap);
        await loadProgress(user.id);
        await loadUserStats(user.id);
        initializeAchievements();
      } else {
        await generateRoadmap(user.id, roadmapData.answers);
      }

    } catch (err) {
      console.error('Error loading data:', err);
      toast.error('Failed to load roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate skill tags based on week content
  const generateSkillTags = (week: Week): string[] => {
    const tags: string[] = [];
    const content = `${week.theme} ${week.focus} ${week.actions.join(' ')}`.toLowerCase();
    
    if (content.includes('communication') || content.includes('feedback')) tags.push('Communication');
    if (content.includes('technical') || content.includes('coding') || content.includes('development')) tags.push('Technical');
    if (content.includes('leadership') || content.includes('mentor')) tags.push('Leadership');
    if (content.includes('autonomy') || content.includes('independent')) tags.push('Autonomy');
    if (content.includes('collaboration') || content.includes('team')) tags.push('Teamwork');
    if (content.includes('learning') || content.includes('knowledge')) tags.push('Learning');
    if (content.includes('problem') || content.includes('solve')) tags.push('Problem Solving');
    
    return tags.slice(0, 3); // Max 3 tags per week
  };

  const generateRoadmap = async (userId: string, userAnswers: any) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-post-job-roadmap', {
        body: { answers: userAnswers, userId }
      });

      if (error) throw error;
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate roadmap');
      }

      const generatedRoadmap = data.roadmap;
      
      // Add skill tags
      if (generatedRoadmap.weeks) {
        generatedRoadmap.weeks = generatedRoadmap.weeks.map((week: Week) => ({
          ...week,
          skillTags: generateSkillTags(week)
        }));
      }
      
      setRoadmap(generatedRoadmap);

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
        .select('completed_actions, current_week, last_active_date')
        .eq('user_id', userId)
        .single();

      if (data) {
        setCompletedActions(new Set(data.completed_actions || []));
        setCurrentWeek(data.current_week || 1);
        setLastActiveDate(data.last_active_date);
      }
    } catch (err) {
      console.error('Error loading progress:', err);
    }
  };

  const loadUserStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roadmap_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setUserStats({
          totalPoints: data.total_points || 0,
          level: data.level || 1,
          streak: data.streak || 0,
          weeksCompleted: data.weeks_completed || 0,
          actionsCompleted: data.actions_completed || 0,
          badges: data.badges || []
        });
      } else {
        // Initialize stats
        await supabase
          .from('user_roadmap_stats')
          .insert({
            user_id: userId,
            total_points: 0,
            level: 1,
            streak: 0,
            weeks_completed: 0,
            actions_completed: 0,
            badges: []
          });
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const initializeAchievements = () => {
    const allAchievements: Achievement[] = [
      {
        id: 'first_action',
        title: 'First Step',
        description: 'Complete your first action',
        icon: Zap,
        color: 'text-yellow-500',
        unlocked: false
      },
      {
        id: 'week_warrior',
        title: 'Week Warrior',
        description: 'Complete an entire week',
        icon: Trophy,
        color: 'text-blue-500',
        unlocked: false
      },
      {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 7-day streak',
        icon: Flame,
        color: 'text-orange-500',
        unlocked: false
      },
      {
        id: 'milestone_crusher',
        title: 'Milestone Crusher',
        description: 'Complete 10 milestones',
        icon: Target,
        color: 'text-green-500',
        unlocked: false
      },
      {
        id: 'halfway_hero',
        title: 'Halfway Hero',
        description: 'Complete 50% of roadmap',
        icon: Medal,
        color: 'text-purple-500',
        unlocked: false
      },
      {
        id: 'completion_king',
        title: 'Completion Champion',
        description: 'Complete 100% of roadmap',
        icon: Crown,
        color: 'text-amber-500',
        unlocked: false
      }
    ];
    
    setAchievements(allAchievements);
  };

  const saveProgress = async () => {
    if (!user?.id) return;

    try {
      // Update streak
      const today = new Date().toISOString().split('T')[0];
      let newStreak = userStats.streak;
      
      if (lastActiveDate) {
        const lastDate = new Date(lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      await supabase
        .from('roadmap_progress')
        .upsert({
          user_id: user.id,
          completed_actions: Array.from(completedActions),
          current_week: currentWeek,
          last_active_date: today,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      // Update stats
      await supabase
        .from('user_roadmap_stats')
        .upsert({
          user_id: user.id,
          total_points: userStats.totalPoints,
          level: userStats.level,
          streak: newStreak,
          weeks_completed: userStats.weeksCompleted,
          actions_completed: completedActions.size,
          badges: userStats.badges,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      setLastActiveDate(today);
      setUserStats(prev => ({ ...prev, streak: newStreak }));
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
    const wasCompleted = completedActions.has(actionId);
    
    setCompletedActions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(actionId)) {
        newSet.delete(actionId);
      } else {
        newSet.add(actionId);
      }
      return newSet;
    });

    if (!wasCompleted) {
      // Award points
      const pointsEarned = 10;
      const newPoints = userStats.totalPoints + pointsEarned;
      const newLevel = Math.floor(newPoints / 100) + 1;
      
      setUserStats(prev => ({
        ...prev,
        totalPoints: newPoints,
        level: newLevel,
        actionsCompleted: prev.actionsCompleted + 1
      }));

      // Show celebration
      toast.success(`+${pointsEarned} points! 🎉`);
      
      // Trigger confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      // Check achievements
      checkAchievements(newPoints, completedActions.size + 1);
    }
  };

  const checkAchievements = (points: number, actionsCount: number) => {
    // Check for new achievements
    if (actionsCount === 1 && !userStats.badges.includes('first_action')) {
      unlockAchievement('first_action');
    }
    
    if (userStats.streak === 7 && !userStats.badges.includes('streak_master')) {
      unlockAchievement('streak_master');
    }
    
    if (getOverallProgress() >= 50 && !userStats.badges.includes('halfway_hero')) {
      unlockAchievement('halfway_hero');
    }
    
    if (getOverallProgress() === 100 && !userStats.badges.includes('completion_king')) {
      unlockAchievement('completion_king');
    }
  };

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    setUserStats(prev => ({
      ...prev,
      badges: [...prev.badges, achievementId]
    }));

    setNewAchievement(achievement);
    setShowAchievementModal(true);

    // Big celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setShowAchievementModal(false);
    }, 3000);
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
    if (totalActions === 0) return 0;
    return Math.round((completedActions.size / totalActions) * 100);
  };

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
          
          {/* Achievement Modal */}
          {showAchievementModal && newAchievement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
              <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl transform animate-bounce-in">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                    <newAchievement.icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Achievement Unlocked!</h2>
                  <h3 className="text-xl font-semibold text-sky-600 mb-2">{newAchievement.title}</h3>
                  <p className="text-slate-600">{newAchievement.description}</p>
                  <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mt-4 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Level */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Level</p>
                  <p className="text-4xl font-bold">{userStats.level}</p>
                </div>
                <Crown className="w-12 h-12 opacity-80" />
              </div>
              <div className="mt-4">
                <div className="h-2 bg-purple-400 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${(userStats.totalPoints % 100)}%` }}
                  />
                </div>
                <p className="text-xs text-purple-100 mt-1">{userStats.totalPoints % 100}/100 XP</p>
              </div>
            </div>

            {/* Points */}
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sky-100 text-sm font-medium">Total Points</p>
                  <p className="text-4xl font-bold">{userStats.totalPoints}</p>
                </div>
                <Star className="w-12 h-12 opacity-80" />
              </div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Day Streak</p>
                  <p className="text-4xl font-bold">{userStats.streak}</p>
                </div>
                <Flame className="w-12 h-12 opacity-80" />
              </div>
              <p className="text-xs text-orange-100 mt-2">Keep it going! 🔥</p>
            </div>

            {/* Badges */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Badges</p>
                  <p className="text-4xl font-bold">{userStats.badges.length}/6</p>
                </div>
                <Award className="w-12 h-12 opacity-80" />
              </div>
            </div>
          </div>

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
              const isCompleted = progress === 100;

              return (
                <div
                  key={week.week}
                  className={`bg-white rounded-2xl shadow-lg border-2 transition-all ${
                    isCurrent ? 'border-sky-500 ring-2 ring-sky-200' : 'border-slate-200'
                  } ${isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''}`}
                >
                  {/* Week Header */}
                  <button
                    onClick={() => toggleWeek(week.week)}
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-t-2xl"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        isCompleted
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                          : isCurrent 
                          ? 'bg-sky-600 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : week.week}
                        {isCompleted && (
                          <div className="absolute -top-1 -right-1">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{week.theme}</h3>
                        <p className="text-sm text-slate-600">{week.focus}</p>
                        
                        {/* Skill Tags */}
                        {week.skillTags && week.skillTags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {week.skillTags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-700 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <div className={`text-2xl font-bold ${
                          isCompleted ? 'text-green-600' : 'text-sky-600'
                        }`}>
                          {progress}%
                        </div>
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
                          className={`h-full transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                              : 'bg-gradient-to-r from-sky-500 to-blue-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Actions */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-sky-600" />
                          Action Items ({week.actions.filter(action => 
                            completedActions.has(`${week.week}-${action}`)
                          ).length}/{week.actions.length})
                        </h4>
                        <div className="space-y-2">
                          {week.actions.map((action, idx) => {
                            const actionId = `${week.week}-${action}`;
                            const isActionCompleted = completedActions.has(actionId);

                            return (
                              <button
                                key={idx}
                                onClick={() => toggleAction(actionId)}
                                className={`w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left group hover:shadow-md ${
                                  isActionCompleted
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-slate-200 hover:border-sky-300'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                  isActionCompleted
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-slate-300 group-hover:border-sky-500'
                                }`}>
                                  {isActionCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
                                  )}
                                </div>
                                <span className={`flex-1 ${
                                  isActionCompleted ? 'text-green-700 font-medium' : 'text-slate-700'
                                }`}>
                                  {action}
                                </span>
                                {!isActionCompleted && (
                                  <span className="text-xs font-semibold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    +10 XP
                                  </span>
                                )}
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
                              <div key={idx} className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg border border-sky-100">
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

                      {/* Week Completion Reward */}
                      {isCompleted && (
                        <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Gift className="w-6 h-6 text-green-600" />
                            <div>
                              <h5 className="font-semibold text-green-900">Week Completed! 🎉</h5>
                              <p className="text-sm text-green-700">You earned 50 bonus XP!</p>
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-sky-600" />
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
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Recommended Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roadmap.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <span className="text-sky-600 mt-1">📚</span>
                    <span className="text-slate-700">{resource}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Gallery */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Achievement Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement) => {
                const unlocked = userStats.badges.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      unlocked
                        ? 'bg-white border-purple-300 shadow-md'
                        : 'bg-gray-100 border-gray-300 opacity-50 grayscale'
                    }`}
                  >
                    <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                      unlocked ? achievement.color : 'text-gray-400'
                    }`} />
                    <p className={`text-xs font-semibold ${
                      unlocked ? 'text-slate-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </p>
                    {unlocked && (
                      <p className="text-xs text-green-600 mt-1">✓ Unlocked</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="flex-1 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => {
                const nextWeek = Math.min(currentWeek + 1, roadmap.totalWeeks);
                setCurrentWeek(nextWeek);
                setExpandedWeeks(new Set([nextWeek]));
                toast.success(`Moved to Week ${nextWeek}!`);
              }}
              disabled={currentWeek >= roadmap.totalWeeks}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg font-semibold hover:from-sky-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Move to Week {currentWeek + 1}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}