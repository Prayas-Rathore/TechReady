import { Clock  } from 'lucide-react';
import { DailySchedule } from '../../data/roadmapData';

interface DailyScheduleCardProps {
  schedule: DailySchedule;
}

export default function DailyScheduleCard({ schedule }: DailyScheduleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Daily Schedule</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Daily Hours: <span className="font-semibold text-gray-900">{schedule.totalHours}</span>
        </p>
      </div>

      <div className="space-y-3">
        {schedule.breakdown.map((item, index) => (
          <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: item.color }}>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">{item.activity}</span>
              <span className="text-sm text-gray-600">{item.hours}h</span>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Add a visual representation */}
      <div className="mt-6">
        <div className="flex h-8 rounded-lg overflow-hidden">
          {schedule.breakdown.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-white text-xs font-medium"
              style={{
                backgroundColor: item.color,
                width: `${(item.hours / schedule.totalHours) * 100}%`
              }}
            >
              {item.hours}h
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
