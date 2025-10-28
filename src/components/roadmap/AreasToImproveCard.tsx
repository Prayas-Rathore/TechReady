import { AlertCircle, TrendingUp } from 'lucide-react';
import { AreaToImprove } from '../../data/roadmapData';

interface AreasToImproveCardProps {
  areas: AreaToImprove[];
}

export default function AreasToImproveCard({ areas }: AreasToImproveCardProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          badge: 'bg-red-100 text-red-700 border-red-200',
          card: 'bg-red-50 border-red-200',
          icon: 'text-red-600'
        };
      case 'medium':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          card: 'bg-amber-50 border-amber-200',
          icon: 'text-amber-600'
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          card: 'bg-slate-50 border-slate-200',
          icon: 'text-slate-600'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-amber-600" />
        <h2 className="text-2xl font-bold text-slate-900">Areas to Improve</h2>
      </div>

      <div className="space-y-4">
        {areas.map((area, index) => {
          const style = getPriorityStyle(area.priority);
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${style.card} hover:shadow-md transition-all duration-200`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle className={`w-5 h-5 ${style.icon} mt-0.5 flex-shrink-0`} />
                  <div>
                    <h3 className="font-semibold text-slate-900">{area.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{area.desc}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${style.badge} whitespace-nowrap`}>
                  {area.priority.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-600">Focus strategy:</span> Tackle high-priority items first for maximum impact.
        </p>
      </div>
    </div>
  );
}
