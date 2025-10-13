import { Check } from 'lucide-react';

interface MultipleChoiceProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MultipleChoice({ options, value = [], onChange }: MultipleChoiceProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = value.includes(option);
        return (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-6 py-3 rounded-full border-2 transition-all font-medium ${
              isSelected
                ? 'border-sky-500 bg-sky-500 text-white shadow-lg hover:bg-sky-600'
                : 'border-slate-300 bg-white text-slate-700 hover:border-sky-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{option}</span>
              {isSelected && <Check className="w-4 h-4" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
