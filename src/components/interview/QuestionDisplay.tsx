import { Mic, Square, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionDisplayProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  isRecording: boolean;
  recordingTime: number;
  maxTime: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export default function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  isRecording,
  recordingTime,
  maxTime,
  onStartRecording,
  onStopRecording,
  onNextQuestion,
  onPreviousQuestion,
  canGoNext,
  canGoPrevious
}: QuestionDisplayProps) {
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (recordingTime / maxTime) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
      
      {/* Header - Progress indicators */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <span className="text-sm text-gray-500 font-medium">
          Question {questionNumber} of {totalQuestions}
        </span>
        
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i + 1 === questionNumber
                  ? 'bg-blue-600 w-6'
                  : i + 1 < questionNumber
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Content - Grows to fill space */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 min-h-0">
        <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed mb-8">
          {question}
        </h2>

        {/* Timer */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-gray-800 mb-1">
            {formatTime(recordingTime)}
          </div>
          <div className="text-sm text-gray-500">
            / {formatTime(maxTime)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                progress > 90 ? 'bg-red-500' : progress > 70 ? 'bg-yellow-500' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Recording Button */}
        <button
          onClick={isRecording ? onStopRecording : onStartRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRecording ? (
            <Square className="w-7 h-7 text-white" fill="white" />
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </button>

        <p className="text-sm text-gray-500 mt-3">
          {isRecording ? 'Click to stop recording' : 'Click to start recording'}
        </p>
      </div>

      {/* Navigation Footer */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
        <button
          onClick={onPreviousQuestion}
          disabled={!canGoPrevious}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            canGoPrevious
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={onNextQuestion}
          disabled={!canGoNext}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            canGoNext
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canGoNext ? 'Next' : 'Last Question'}
          {canGoNext && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
