import { TrendingUp, Info } from 'lucide-react';

interface ReadinessScoreCardProps {
  score: number;
  estimatedWeeks: number;
}

export default function ReadinessScoreCard({ score, estimatedWeeks }: ReadinessScoreCardProps) {
  const getColor = () => {
    if (score <= 40) return { stroke: '#dc2626', text: 'text-red-600', bg: 'bg-red-50' };
    if (score <= 70) return { stroke: '#d97706', text: 'text-amber-600', bg: 'bg-amber-50' };
    return { stroke: '#16a34a', text: 'text-green-600', bg: 'bg-green-50' };
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">Readiness Score</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="180" height="180" className="transform -rotate-90">
            <circle
              cx="90"
              cy="90"
              r="70"
              stroke="#e2e8f0"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="90"
              cy="90"
              r="70"
              stroke={color.stroke}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold ${color.text}`}>{score}</div>
            <div className="text-slate-500 text-sm">out of 100</div>
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Progress</span>
            <span>{score}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                score <= 40 ? 'bg-red-600' : score <= 70 ? 'bg-amber-600' : 'bg-green-600'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className={`mt-6 p-4 ${color.bg} rounded-lg w-full`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 ${color.text} mt-0.5 flex-shrink-0`} />
            <div>
              <p className={`text-sm font-semibold ${color.text} mb-1`}>
                Estimated Timeline
              </p>
              <p className="text-sm text-slate-700">
                With consistent daily practice, you'll be interview-ready in approximately{' '}
                <span className="font-bold">{estimatedWeeks} weeks</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
