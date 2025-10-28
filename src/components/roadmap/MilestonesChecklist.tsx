import { useState } from 'react';
import { CheckCircle2, Circle, Target } from 'lucide-react';
import { Milestone } from '../../data/roadmapData';

interface MilestonesChecklistProps {
  milestones: Milestone[];
}

export default function MilestonesChecklist({ milestones: initialMilestones }: MilestonesChecklistProps) {
  const [milestones, setMilestones] = useState(initialMilestones);

  const toggleMilestone = (index: number) => {
    setMilestones(prev =>
      prev.map((milestone, i) =>
        i === index ? { ...milestone, completed: !milestone.completed } : milestone
      )
    );
  };

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Weekly Milestones</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{completedCount}/{milestones.length}</div>
          <div className="text-xs text-slate-500">Completed</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Overall Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            onClick={() => toggleMilestone(index)}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              milestone.completed
                ? 'bg-green-50 border-green-200 hover:bg-green-100'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="pt-0.5">
              {milestone.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-slate-400" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2 ${
                      milestone.completed
                        ? 'bg-green-200 text-green-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Week {milestone.week}
                  </span>
                  <p
                    className={`font-medium ${
                      milestone.completed ? 'text-green-900 line-through' : 'text-slate-900'
                    }`}
                  >
                    {milestone.task}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-600">Track your progress:</span> Click any milestone to mark it as complete. Stay accountable!
        </p>
      </div>
    </div>
  );
}
