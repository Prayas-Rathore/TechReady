import { Download, RefreshCw, Sparkles } from 'lucide-react';
import ReadinessScoreCard from './ReadinessScoreCard';
import StrengthsCard from './StrengthsCard';
import AreasToImproveCard from './AreasToImproveCard';
import LearningPathTimeline from './LearningPathTimeline';
import DailyScheduleCard from './DailyScheduleCard';
import MilestonesChecklist from './MilestonesChecklist';
import { useNavigate } from 'react-router-dom';

// ✅ CHANGED: Import mockRoadmapData directly (no props needed)
import { mockRoadmapData } from '../../data/roadmapData';

// ----------------------------------------------------
// ❗ CHANGED: Removed roadmap prop entirely
// ----------------------------------------------------
interface RoadmapDisplayProps {
  onRegenerate?: () => void;
}

export default function RoadmapDisplay({ onRegenerate }: RoadmapDisplayProps) {
  const navigate = useNavigate();

  // ----------------------------------------------------
  // ❗ CHANGED: Use mockRoadmapData instead of props
  // Guarantees roadmap is NEVER undefined
  // ----------------------------------------------------
  const roadmap = mockRoadmapData;

  const handleDownload = () => {
    alert('PDF download feature coming soon!');
  };

  const handleShare = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* -------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Your Personalized Roadmap</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            AI Interview Roadmap
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {roadmap.summary}
          </p>
        </div>

        {/* -------------------------------------------- */}
        {/* ACTION BUTTONS */}
        {/* -------------------------------------------- */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all border border-slate-200 hover:border-blue-300"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold shadow-md hover:shadow-lg border border-slate-200 hover:border-blue-300"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg"
          >
            <span>Get Detailed RoadMap</span>
          </button>
        </div>

        {/* -------------------------------------------- */}
        {/* SCORE + STRENGTHS */}
        {/* -------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ReadinessScoreCard
            score={roadmap.readinessScore}
            estimatedWeeks={roadmap.estimatedWeeks}
          />
          <StrengthsCard strengths={roadmap.strengths} />
        </div>

        {/* -------------------------------------------- */}
        {/* AREAS TO IMPROVE */}
        {/* -------------------------------------------- */}
        <div className="mb-6">
          <AreasToImproveCard areas={roadmap.areasToImprove} />
        </div>

        {/* -------------------------------------------- */}
        {/* LEARNING PATH */}
        {/* -------------------------------------------- */}
        <div className="mb-6">
          <LearningPathTimeline phases={roadmap.learningPath} />
        </div>

        {/* -------------------------------------------- */}
        {/* DAILY SCHEDULE + MILESTONES */}
        {/* -------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DailyScheduleCard schedule={roadmap.dailySchedule} />
          <MilestonesChecklist milestones={roadmap.milestones} />
        </div>

        {/* -------------------------------------------- */}
        {/* FOOTER */}
        {/* -------------------------------------------- */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg">
          <p className="text-slate-600">
            Need help staying on track?{' '}
            <button className="text-blue-600 font-semibold hover:underline">
              Schedule a mentor session
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
