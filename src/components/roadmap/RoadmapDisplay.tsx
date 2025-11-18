import { Download, RefreshCw, Sparkles } from 'lucide-react';
import { RoadmapData } from '../../data/roadmapData';
import ReadinessScoreCard from './ReadinessScoreCard';
import StrengthsCard from './StrengthsCard';
import AreasToImproveCard from './AreasToImproveCard';
import LearningPathTimeline from './LearningPathTimeline';
import DailyScheduleCard from './DailyScheduleCard';
import MilestonesChecklist from './MilestonesChecklist';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface RoadmapDisplayProps {
  roadmap: RoadmapData;
  onRegenerate?: () => void;
}

export default function RoadmapDisplay({ roadmap, onRegenerate }: RoadmapDisplayProps) {
  const navigate = useNavigate();
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownload = async () => {
    if (!roadmapRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Hide buttons temporarily
      const buttons = roadmapRef.current.querySelector('.action-buttons') as HTMLElement;
      if (buttons) buttons.style.display = 'none';

      // Capture the roadmap content
      const canvas = await html2canvas(roadmapRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Show buttons again
      if (buttons) buttons.style.display = 'flex';

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm
      
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 0;

      // Function to add watermark to current page
      const addWatermark = () => {
        // Set watermark properties
        pdf.setFontSize(50);
        pdf.setTextColor(200, 200, 200); // Light gray
        pdf.setFont('helvetica', 'bold');
        
        // Calculate center position with rotation
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeightPDF = pdf.internal.pageSize.getHeight();
        
        // Save the current graphics state
        pdf.saveGraphicsState();
        
        // Set transparency (opacity)
        pdf.setGState(new pdf.GState({ opacity: 0.15 }));
        
        // Rotate and add watermark text
        pdf.text('Mockithub', pageWidth / 2, pageHeightPDF / 2, {
          angle: 45,
          align: 'center',
          baseline: 'middle'
        });
        
        // Restore the graphics state
        pdf.restoreGraphicsState();
      };

      // Add first page with image and watermark
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      addWatermark();
      heightLeft -= pageHeight;
      pageNumber++;

      // Add additional pages if content is longer
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        addWatermark();
        heightLeft -= pageHeight;
        pageNumber++;
      }

      // Download
      pdf.save(`interview-roadmap-${Date.now()}.pdf`);
      
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-12 px-4">
      <div className="max-w-6xl mx-auto" ref={roadmapRef}>
        {/* Header */}
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

        {/* Action Buttons */}
        <div className="action-buttons flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={handleDownload}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
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
            <span>Get Detailed RoadMap</span>
          </button>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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

        {/* Footer */}
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