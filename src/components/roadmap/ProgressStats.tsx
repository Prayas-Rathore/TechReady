import { Trophy, Flame, Star, TrendingUp, Calendar, Award } from 'lucide-react';
import { UserProgress, RoadmapData } from '../../types/roadmapTypes';

interface ProgressStatsProps {
  progress: UserProgress;
  roadmap: RoadmapData;
}

export default function ProgressStats({ progress, roadmap }: ProgressStatsProps) {
  const totalTasks = roadmap.weeklyMilestones.reduce((sum, m) => sum + m.tasks.length, 0);
  const completedTasks = progress.completedTasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      icon: <Star className="w-6 h-6" />,
      label: 'Total Points',
      value: progress.totalPoints.toLocaleString(),
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      icon: <Flame className="w-6 h-6" />,
      label: 'Current Streak',
      value: `${progress.currentStreak} days`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      label: 'Badges Earned',
      value: progress.earnedBadges.length,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Completion',
      value: `${completionPercentage}%`,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ];

  const daysActive = Math.floor(
    (new Date().getTime() - new Date(progress.startedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="mb-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl p-5 border-2 border-transparent hover:border-${stat.textColor.split('-')[1]}-300 transition-all duration-200`}
          >
            <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-lg mb-3`}>
              <div className="text-white">
                {stat.icon}
              </div>
            </div>
            <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-bold text-slate-900">Overall Progress</h3>
              <p className="text-sm text-slate-600">
                Day {progress.currentDay} of {roadmap.totalDays} • {daysActive} days active
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {completedTasks}/{totalTasks}
            </div>
            <div className="text-sm text-slate-600">tasks completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500 relative"
              style={{ width: `${completionPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -top-8 left-0 right-0 flex justify-between text-xs text-slate-500">
            <span>Start</span>
            <span className="font-semibold text-blue-600">{completionPercentage}%</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Milestone Indicators */}
        <div className="flex justify-between mt-4 pt-4 border-t border-slate-200">
          {roadmap.weeklyMilestones.map((milestone, index) => {
            const weekProgress = milestone.tasks.filter(t => 
              progress.completedTasks.includes(t.id)
            ).length / milestone.tasks.length * 100;

            return (
              <div key={index} className="text-center flex-1">
                <div className="text-xs text-slate-600 mb-1">Week {milestone.week}</div>
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  weekProgress === 100 
                    ? 'bg-green-500 text-white' 
                    : weekProgress > 0 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {weekProgress === 100 ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-bold">{Math.round(weekProgress)}%</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Encouragement */}
      {progress.currentStreak > 0 && (
        <div className="mt-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-600" />
            <div>
              <h4 className="font-bold text-orange-900">
                {progress.currentStreak} Day Streak! 🔥
              </h4>
              <p className="text-sm text-orange-700">
                {progress.currentStreak >= progress.longestStreak 
                  ? "You're on your longest streak! Keep it up!"
                  : `Your longest streak is ${progress.longestStreak} days. Can you beat it?`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}