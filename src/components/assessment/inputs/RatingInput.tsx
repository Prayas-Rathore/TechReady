import { Frown, Meh, Smile, Laugh } from 'lucide-react';

interface RatingInputProps {
  labels: string[];
  value: { [key: string]: number };
  onChange: (value: { [key: string]: number }) => void;
}

const emojiIcons = [Frown, Meh, Meh, Smile, Laugh];
const emojiColors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-emerald-500'
];

export default function RatingInput({ labels, value = {}, onChange }: RatingInputProps) {
  const handleRating = (label: string, rating: number) => {
    onChange({
      ...value,
      [label]: rating
    });
  };

  return (
    <div className="space-y-6">
      {labels.map((label) => {
        const currentRating = value[label] || 0;

        return (
          <div key={label} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-slate-900">{label}</span>
              {currentRating > 0 && (
                <span className="text-sm font-medium text-sky-600">
                  {currentRating} / 5
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => {
                const EmojiIcon = emojiIcons[rating - 1];
                const isSelected = currentRating >= rating;

                return (
                  <button
                    key={rating}
                    onClick={() => handleRating(label, rating)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-white shadow-md scale-105'
                        : 'border-slate-300 bg-white hover:border-slate-400 hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <EmojiIcon
                        className={`w-8 h-8 ${
                          isSelected ? emojiColors[rating - 1] : 'text-slate-400'
                        }`}
                      />
                      <span className={`text-xs font-medium ${
                        isSelected ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {rating}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
