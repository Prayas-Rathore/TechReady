import { CheckCircle2, Award } from 'lucide-react';

interface StrengthsCardProps {
  strengths: string[];
}

export default function StrengthsCard({ strengths }: StrengthsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-slate-900">Your Strengths</h2>
      </div>

      <div className="space-y-3">
        {strengths.map((strength, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-slate-700 font-medium">{strength}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-600">Great foundation!</span> Build on these strengths while addressing improvement areas.
        </p>
      </div>
    </div>
  );
}
