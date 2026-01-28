import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, Lock, ExternalLink, Clock, 
  Award, Lightbulb, ChevronDown, ChevronUp 
} from 'lucide-react';
import { DailyTask } from '../../types/roadmapTypes';
import { MockITHubFeature } from '../../data/mockITHubFeatures';

interface TaskCardProps {
  task: DailyTask;
  status: 'completed' | 'available' | 'locked';
  onComplete: (task: DailyTask) => void;
  feature?: MockITHubFeature;
}

export default function TaskCard({ task, status, onComplete, feature }: TaskCardProps) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const handleComplete = async () => {
    if (status !== 'available' || isCompleting) return;
    
    setIsCompleting(true);
    try {
      await onComplete(task);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleStartTask = () => {
    if (feature?.route) {
      navigate(feature.route, { state: { taskId: task.id, fromRoadmap: true } });
    }
  };

  return (
    <div
      className={`border-2 rounded-xl transition-all duration-200 ${
        status === 'completed'
          ? 'bg-green-50 border-green-300'
          : status === 'available'
          ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
          : 'bg-slate-50 border-slate-200 opacity-60'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div className="flex-shrink-0 mt-1">
            {status === 'completed' && (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            )}
            {status === 'available' && (
              <Circle className="w-6 h-6 text-blue-600" />
            )}
            {status === 'locked' && (
              <Lock className="w-6 h-6 text-slate-400" />
            )}
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {/* Title & Day */}
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                Day {task.day}
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded border ${getDifficultyColor(task.difficulty)}`}>
                {task.difficulty}
              </span>
              {feature && (
                <span className="text-xl">{feature.icon}</span>
              )}
            </div>

            <h4 className={`text-lg font-bold mb-2 ${
              status === 'locked' ? 'text-slate-400' : 'text-slate-900'
            }`}>
              {task.title}
            </h4>

            <p className={`text-sm mb-3 ${
              status === 'locked' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {task.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{task.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-600">
                <Award className="w-4 h-4" />
                <span className="font-semibold">{task.points} points</span>
              </div>
            </div>

            {/* Show Details Button */}
            {(task.tips || task.requiredActions) && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mb-3"
              >
                <Lightbulb className="w-4 h-4" />
                {showDetails ? 'Hide' : 'Show'} Details
                {showDetails ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Details Section */}
            {showDetails && (
              <div className="bg-blue-50 rounded-lg p-4 mb-3 space-y-3">
                {task.tips && task.tips.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2 text-sm">💡 Tips:</h5>
                    <ul className="space-y-1">
                      {task.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {task.requiredActions && task.requiredActions.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2 text-sm">✅ Required Actions:</h5>
                    <ul className="space-y-1">
                      {task.requiredActions.map((action, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">→</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
                {status === 'available' && !task.completed && (
                <button
                    onClick={() => onComplete(task)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm"
                >
                    Mark as Complete
                </button>
                )}

            {/* Completed Badge */}
            {status === 'completed' && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  Completed {task.completedAt && `on ${new Date(task.completedAt).toLocaleDateString()}`}
                </span>
              </div>
            )}

            {/* Locked Message */}
            {status === 'locked' && (
              <div className="flex items-center gap-2 text-slate-500">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Complete previous tasks to unlock
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}