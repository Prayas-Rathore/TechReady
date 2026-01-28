import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, ChevronDown, ChevronUp, Target, ArrowLeft } from 'lucide-react';
import { RoadmapData, DailyTask } from '../../types/roadmapTypes';
import { mockITHubFeatures } from '../../data/mockITHubFeatures';
import { toast } from 'react-hot-toast';
import { supabase } from '../../services/SupabaseClient';
import TaskCard from './TaskCard';

interface RoadmapDisplayProps {
  roadmap: any;
  onRegenerate?: () => void;
}

export default function RoadmapDisplay({ roadmap: rawRoadmap, onRegenerate }: RoadmapDisplayProps) {
  const navigate = useNavigate();
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  
  // ✅ Parse and maintain roadmap state
  const [roadmap, setRoadmap] = useState(() => {
    const parsed = {
      ...rawRoadmap,
      weekly_milestones: typeof rawRoadmap.weekly_milestones === 'string' 
        ? JSON.parse(rawRoadmap.weekly_milestones)
        : rawRoadmap.weekly_milestones
    };
    return parsed;
  });

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekNumber)) {
        newSet.delete(weekNumber);
      } else {
        newSet.add(weekNumber);
      }
      return newSet;
    });
  };

  const handleTaskComplete = async (task: DailyTask) => {
    try {
      // ✅ Update local state immediately
      const updatedMilestones = roadmap.weekly_milestones.map((milestone: any) => ({
        ...milestone,
        tasks: milestone.tasks.map((t: any) => 
          t.id === task.id 
            ? { ...t, completed: true, completedAt: new Date().toISOString() }
            : t
        )
      }));

      setRoadmap({
        ...roadmap,
        weekly_milestones: updatedMilestones
      });

      // ✅ Save to database
      const { error } = await supabase
        .from('roadmaps')
        .update({ 
          weekly_milestones: updatedMilestones,
          updated_at: new Date().toISOString()
        })
        .eq('id', roadmap.id);

      if (error) throw error;

      toast.success('Task completed! 🎉', {
        icon: '✅',
        duration: 2000
      });

    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to save progress');
    }
  };

  const getTaskStatus = (task: DailyTask): 'completed' | 'available' | 'locked' => {
    if (task.completed) return 'completed';
    
    // ✅ Get all tasks in order
    const allTasks = roadmap.weekly_milestones
      .flatMap((m: any) => m.tasks)
      .sort((a: any, b: any) => a.day - b.day);
    
    const currentTaskIndex = allTasks.findIndex((t: any) => t.id === task.id);
    
    // First task is always available
    if (currentTaskIndex === 0) return 'available';
    
    // Check if previous task is completed
    const previousTask = allTasks[currentTaskIndex - 1];
    if (previousTask && previousTask.completed) {
      return 'available';
    }
    
    return 'locked';
  };

  if (!roadmap.weekly_milestones || !Array.isArray(roadmap.weekly_milestones)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Invalid roadmap data</p>
          <button onClick={() => navigate('/assessment')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
          </button>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Your Interview Roadmap</h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">{roadmap.summary}</p>
            <div className="flex gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <Calendar className="inline w-4 h-4 mr-2" />
                {roadmap.timeline}
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <Trophy className="inline w-4 h-4 mr-2" />
                {roadmap.target_role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Milestones */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {roadmap.weekly_milestones.map((milestone: any) => {
            const isExpanded = expandedWeeks.has(milestone.week);

            return (
              <div key={milestone.week} className="bg-white rounded-2xl shadow-lg">
                <button
                  onClick={() => toggleWeek(milestone.week)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                      W{milestone.week}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-slate-900">{milestone.title}</h3>
                      <p className="text-slate-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </button>

                {isExpanded && (
                  <div className="p-6 pt-0 space-y-4">
                    {milestone.tasks.map((task: any) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        status={getTaskStatus(task)}
                        onComplete={handleTaskComplete}
                        feature={mockITHubFeatures.find(f => f.id === task.featureId)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="max-w-6xl mx-auto mt-12 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-lg border-2 border-slate-200"
          >
            Back to Dashboard
          </button>
          {/* {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg"
            >
              <Sparkles className="inline w-5 h-5 mr-2" />
              Regenerate Roadmap
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}