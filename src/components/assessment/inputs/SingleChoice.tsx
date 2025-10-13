import { Check } from 'lucide-react';

interface SingleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SingleChoice({ options, value, onChange }: SingleChoiceProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
            value === option
              ? 'border-sky-500 bg-sky-50 shadow-md'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`font-medium ${
              value === option ? 'text-sky-900' : 'text-slate-700'
            }`}>
              {option}
            </span>
            {value === option && (
              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
