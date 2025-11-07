import { useState } from 'react';
import { Mic, Square, ChevronRight, ChevronLeft } from 'lucide-react';

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
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (recordingTime / maxTime) * 100;
  const isOverTime = recordingTime > maxTime;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPreviousQuestion}
          disabled={!canGoPrevious}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Question Generation</span>
        </button>

        <div className="flex items-center gap-3">
          {[...Array(totalQuestions)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i + 1 === questionNumber
                  ? 'bg-blue-600 text-white'
                  : i + 1 < questionNumber
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <button
          onClick={onNextQuestion}
          disabled={!canGoNext}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="font-medium">End & Review</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 leading-relaxed">
          {question}
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <div className={`text-5xl md:text-6xl font-bold mb-2 ${isOverTime ? 'text-red-600' : 'text-slate-700'}`}>
              {formatTime(recordingTime)}
            </div>
            <div className="text-slate-500">/ {formatTime(maxTime)}</div>
          </div>

          <div className="w-full max-w-md">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isOverTime ? 'bg-red-600' : 'bg-blue-600'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRecording ? (
              <Square className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>

          <p className="text-slate-600 text-center">
            {isRecording ? (
              <>Click to <span className="font-semibold">stop recording</span></>
            ) : (
              <>Or <button className="text-blue-600 hover:underline font-semibold">type your answer</button></>
            )}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6 space-y-3">
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
        >
          <span className="font-semibold text-slate-700">Feedback</span>
          <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showFeedback ? 'rotate-90' : ''}`} />
        </button>

        <button
          onClick={() => setShowSample(!showSample)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
        >
          <span className="font-semibold text-slate-700">Sample Response</span>
          <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showSample ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Pro Tip</p>
            <p className="text-sm text-blue-800">
              Use the STAR method: Situation, Task, Action, Result. Be specific with examples.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
