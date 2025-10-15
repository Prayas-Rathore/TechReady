import { Video, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AssessmentHeaderProps {
  onSaveAndExit: () => void;
}

export default function AssessmentHeader({ onSaveAndExit }: AssessmentHeaderProps) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Video className="w-8 h-8 text-sky-600" />
            <span className="text-2xl font-bold text-slate-900">MockIthub</span>
          </Link>

          <button
            onClick={onSaveAndExit}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save & Exit</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
