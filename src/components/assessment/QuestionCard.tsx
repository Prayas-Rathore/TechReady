import { Question } from '../../data/interviewMindsetQuestions';

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (questionId: string, answer: any) => void;
}

export default function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const handleSingleSelect = (option: string) => {
    onAnswer(question.id, option);
  };

  const handleMultiSelect = (option: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a: string) => a !== option)
      : [...currentAnswers, option];
    onAnswer(question.id, newAnswers);
  };

  const handleScaleSelect = (value: number) => {
    onAnswer(question.id, value);
  };

  const handleTextInput = (value: string) => {
    onAnswer(question.id, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {question.question}
        </h2>
        {question.required && (
          <span className="text-sm text-red-600 font-medium">* Required</span>
        )}
      </div>

      {/* Single Select */}
      {question.type === 'single' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSingleSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                answer === option
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answer === option
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  {answer === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className={`text-base ${answer === option ? 'font-semibold text-blue-900' : 'text-slate-700'}`}>
                  {option}
                </span>
              </div>
            </button>
          ))}
          
          {question.hasOther && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Other (please specify)"
                value={typeof answer === 'string' && !question.options?.includes(answer) ? answer : ''}
                onChange={(e) => handleTextInput(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* Multi Select */}
      {question.type === 'multi' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => {
            const isSelected = Array.isArray(answer) && answer.includes(option);
            return (
              <button
                key={index}
                onClick={() => handleMultiSelect(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 shadow-md'
                    : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      isSelected
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className={`text-base ${isSelected ? 'font-semibold text-purple-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
          
          {question.hasOther && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Other (please specify)"
                onChange={(e) => {
                  const currentAnswers = Array.isArray(answer) ? answer.filter((a: string) => question.options?.includes(a)) : [];
                  if (e.target.value.trim()) {
                    onAnswer(question.id, [...currentAnswers, e.target.value]);
                  } else {
                    onAnswer(question.id, currentAnswers);
                  }
                }}
                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-purple-600 focus:outline-none"
              />
            </div>
          )}
          
          <p className="text-sm text-slate-500 mt-2">
            Select all that apply
          </p>
        </div>
      )}

      {/* Scale (1-5) */}
      {question.type === 'scale' && question.scaleLabels && (
        <div className="space-y-6">
          <div className="flex justify-between items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleScaleSelect(value)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                  answer === value
                    ? 'border-green-600 bg-green-50 shadow-md scale-105'
                    : 'border-slate-200 hover:border-green-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${answer === value ? 'text-green-700' : 'text-slate-600'}`}>
                    {value}
                  </div>
                  <div className={`text-xs ${answer === value ? 'text-green-600 font-semibold' : 'text-slate-500'}`}>
                    {question.scaleLabels[value]}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-slate-600 px-2">
            <span>← Less confident</span>
            <span>More confident →</span>
          </div>
        </div>
      )}

      {/* Text Input */}
      {question.type === 'text' && (
        <textarea
          value={answer || ''}
          onChange={(e) => handleTextInput(e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
          className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
        />
      )}
    </div>
  );
}