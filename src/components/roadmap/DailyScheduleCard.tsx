import { Sun, Moon, Calendar, Lightbulb } from 'lucide-react';
import { DailySchedule } from '../../data/roadmapData';

interface DailyScheduleCardProps {
  schedule: DailySchedule;
}

export default function DailyScheduleCard({ schedule }: DailyScheduleCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Daily Study Schedule</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Morning Session</h3>
              <p className="text-sm text-blue-100">{schedule.morning.duration}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {schedule.morning.activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-blue-200 mt-1">•</span>
                <span className="text-blue-50">{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Evening Session</h3>
              <p className="text-sm text-blue-100">{schedule.evening.duration}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {schedule.evening.activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-purple-200 mt-1">•</span>
                <span className="text-purple-50">{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Weekly Goals</h3>
              <p className="text-sm text-blue-100">Total: 15-20 hours/week</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-200 mt-1">•</span>
              <span className="text-blue-50">Complete 15-20 coding problems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200 mt-1">•</span>
              <span className="text-blue-50">Review and reflect on mistakes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200 mt-1">•</span>
              <span className="text-blue-50">One mock interview or project work</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold mb-1">Pro Tip</p>
            <p className="text-sm text-blue-50">
              Consistency beats intensity. It's better to study 2 hours daily than 14 hours once a week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
