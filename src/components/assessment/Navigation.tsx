import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface NavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  isSubmitting: boolean;
}

export default function Navigation({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  canGoNext,
  isSubmitting
}: NavigationProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent font-medium"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext || isSubmitting}
        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : isLastQuestion ? (
          <span>Submit Assessment</span>
        ) : (
          <>
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}
