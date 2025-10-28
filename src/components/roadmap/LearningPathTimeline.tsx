import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { LearningPhase } from '../../data/roadmapData';

interface LearningPathTimelineProps {
  phases: LearningPhase[];
}

export default function LearningPathTimeline({ phases }: LearningPathTimelineProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const getPhaseStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          border: 'border-green-500',
          bg: 'bg-green-50',
          icon: 'text-green-600',
          iconBg: 'bg-green-100',
          text: 'text-green-700'
        };
      case 'current':
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          iconBg: 'bg-blue-100',
          text: 'text-blue-700'
        };
      default:
        return {
          border: 'border-slate-300',
          bg: 'bg-slate-50',
          icon: 'text-slate-400',
          iconBg: 'bg-slate-100',
          text: 'text-slate-600'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">Learning Path Timeline</h2>
      </div>

      <div className="relative">
        {phases.map((phase, index) => {
          const style = getPhaseStyle(phase.status);
          const isExpanded = expandedPhase === phase.phase;
          const isLast = index === phases.length - 1;

          return (
            <div key={phase.phase} className="relative">
              {!isLast && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-slate-200 -mb-6" />
              )}

              <div
                className={`relative border-l-4 ${style.border} rounded-lg mb-6 ${style.bg} hover:shadow-md transition-all duration-200 cursor-pointer`}
                onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${style.iconBg} flex-shrink-0`}>
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className={`w-6 h-6 ${style.icon}`} />
                      ) : (
                        <Circle className={`w-6 h-6 ${style.icon}`} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-semibold ${style.text}`}>
                              Phase {phase.phase}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-600">{phase.duration}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{phase.name}</h3>
                        </div>

                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {phase.status === 'current' && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-slate-600 mb-2">
                            <span>Progress</span>
                            <span>35%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                              style={{ width: '35%' }}
                            />
                          </div>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3">Goals:</h4>
                          <ul className="space-y-2">
                            {phase.goals.map((goal, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-700">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
