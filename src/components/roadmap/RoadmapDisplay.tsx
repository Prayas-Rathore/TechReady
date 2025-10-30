import { Download, RefreshCw, Share2, Sparkles } from 'lucide-react';
import { RoadmapData } from '../../data/roadmapData';
// import ReadinessScoreCard from './ReadinessScoreCard';
// import StrengthsCard from './StrengthsCard';
// import AreasToImproveCard from './AreasToImproveCard';
// import LearningPathTimeline from './LearningPathTimeline';
// import DailyScheduleCard from './DailyScheduleCard';
// import ResourcesList from './ResourcesList';
// import MilestonesChecklist from './MilestonesChecklist';
import { useNavigate } from 'react-router-dom';

interface RoadmapDisplayProps {
  roadmap: RoadmapData;
  onRegenerate?: () => void;
}

export default function RoadmapDisplay({ roadmap, onRegenerate }: RoadmapDisplayProps) {
  const handleDownload = () => {
    alert('PDF download feature coming soon!');
  };

  const navigate = useNavigate();

  const handleShare = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
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

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-blue-300"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-blue-300"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            {/* <Share2 className="w-5 h-5" /> */}
            <span>Get Detailed RoadMap</span>
          </button>
        </div>

         <div>
          <h1>Actual Data- Review This</h1>
          {/* Display roadmap.overview, roadmap.phases, etc */}
          <pre>{JSON.stringify(roadmap, null, 2)}</pre>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ReadinessScoreCard
            score={roadmap.readinessScore}
            estimatedWeeks={roadmap.estimatedWeeks}
          />
          <StrengthsCard strengths={roadmap.strengths} />
        </div>

        <div className="mb-6">
          <AreasToImproveCard areas={roadmap.areasToImprove} />
        </div>

        <div className="mb-6">
          <LearningPathTimeline phases={roadmap.learningPath} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DailyScheduleCard schedule={roadmap.dailySchedule} />
          <MilestonesChecklist milestones={roadmap.milestones} />
        </div>

        <div className="mb-6">
          <ResourcesList resources={roadmap.resources} />
        </div>

        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg">
          <p className="text-slate-600">
            Need help staying on track?{' '}
            <button className="text-blue-600 font-semibold hover:underline">
              Schedule a mentor session
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
}
