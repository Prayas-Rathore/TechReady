import React from 'react';

interface Option {
  id: string;
  text: string;
  icon?: string;
}

interface SliderConfig {
  min: number;
  max: number;
  labels: string[];
  description?: string;
}

interface Question {
  id: string;
  type: 'single' | 'multiple' | 'slider' | 'text';
  text: string;
  subtitle?: string;
  options?: Option[];
  sliderConfig?: SliderConfig;
}

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (questionId: string, answer: any) => void;
}

export default function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const handleSingleSelect = (optionId: string) => {
    onAnswer(question.id, optionId);
  };

  const handleMultipleSelect = (optionId: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const newAnswers = currentAnswers.includes(optionId)
      ? currentAnswers.filter((id) => id !== optionId)
      : [...currentAnswers, optionId];
    onAnswer(question.id, newAnswers);
  };

  const handleSliderChange = (value: number) => {
    onAnswer(question.id, value.toString());
  };

  const getSliderLabel = (value: number) => {
    if (!question.sliderConfig) return '';
    const { min, max, labels } = question.sliderConfig;
    const range = max - min;
    const step = range / (labels.length - 1);
    
    for (let i = 0; i < labels.length; i++) {
      if (value <= min + step * i + step / 2) {
        return labels[i];
      }
    }
    return labels[labels.length - 1];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {question.text}
        </h2>
        {question.subtitle && (
          <p className="text-slate-600 text-lg">{question.subtitle}</p>
        )}
      </div>

      {/* Single Select */}
      {question.type === 'single' && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSingleSelect(option.id)}
              className={`w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4 group ${
                answer === option.id
                  ? 'border-sky-500 bg-sky-50 shadow-md'
                  : 'border-slate-200 hover:border-sky-300 hover:shadow-sm'
              }`}
            >
              {option.icon && (
                <span className="text-3xl md:text-4xl">{option.icon}</span>
              )}
              <div className="flex-1">
                <span className={`text-base md:text-lg font-medium ${
                  answer === option.id ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {option.text}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                answer === option.id
                  ? 'border-sky-500 bg-sky-500'
                  : 'border-slate-300'
              }`}>
                {answer === option.id && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Multiple Select */}
      {question.type === 'multiple' && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = Array.isArray(answer) && answer.includes(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => handleMultipleSelect(option.id)}
                className={`w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50 shadow-md'
                    : 'border-slate-200 hover:border-sky-300 hover:shadow-sm'
                }`}
              >
                {option.icon && (
                  <span className="text-3xl md:text-4xl">{option.icon}</span>
                )}
                <div className="flex-1">
                  <span className={`text-base md:text-lg font-medium ${
                    isSelected ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-500'
                    : 'border-slate-300'
                }`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Slider */}
      {question.type === 'slider' && question.sliderConfig && (
        <div className="space-y-6">
          <div className="px-2">
            <input
              type="range"
              min={question.sliderConfig.min}
              max={question.sliderConfig.max}
              value={answer ? parseInt(answer) : Math.floor((question.sliderConfig.min + question.sliderConfig.max) / 2)}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${
                  ((parseInt(answer || question.sliderConfig.min) - question.sliderConfig.min) /
                    (question.sliderConfig.max - question.sliderConfig.min)) *
                  100
                }%, #e2e8f0 ${
                  ((parseInt(answer || question.sliderConfig.min) - question.sliderConfig.min) /
                    (question.sliderConfig.max - question.sliderConfig.min)) *
                  100
                }%, #e2e8f0 100%)`,
              }}
            />
            <div className="flex justify-between mt-3 text-sm text-slate-600">
              {question.sliderConfig.labels.map((label, idx) => (
                <span key={idx} className="text-center flex-1 text-xs md:text-sm">
                  {label}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              {getSliderLabel(parseInt(answer || question.sliderConfig.min))}
            </p>
            {question.sliderConfig.description && (
              <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
                <p className="text-sm md:text-base text-sky-900">
                  💡 {question.sliderConfig.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Text Input (if needed) */}
      {question.type === 'text' && (
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none resize-none"
          rows={4}
        />
      )}

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #0ea5e9;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #0ea5e9;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}