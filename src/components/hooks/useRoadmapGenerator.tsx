import { useState } from 'react'
import { supabase } from '../../services/SupabaseClient'

export const useRoadmapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roadmap, setRoadmap] = useState<any>(null)

  const generateRoadmap = async (assessmentData: any) => {
  setIsGenerating(true)
  setError(null)

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const answers = assessmentData?.answers || assessmentData
    
    // ✅ Calculate days based on timeline
    const timelineMap: { [key: string]: number } = {
      'Within 2 weeks': 14,
      '4 weeks': 28,
      '8–12 weeks': 56,
      'No fixed timeline': 28
    }
    
    const totalDays = timelineMap[answers.target_timeline] || 28
    const totalWeeks = Math.ceil(totalDays / 7)
    
    console.log(`📅 Timeline: ${answers.target_timeline} = ${totalDays} days (${totalWeeks} weeks)`)

    await new Promise(resolve => setTimeout(resolve, 2000))

    // ✅ Generate weeks dynamically
    const weeklyMilestones = []
    
    for (let week = 1; week <= totalWeeks; week++) {
      const weekTasks = []
      const tasksPerWeek = 5 // Adjust based on time_commitment
      
      for (let dayInWeek = 1; dayInWeek <= tasksPerWeek; dayInWeek++) {
        const absoluteDay = (week - 1) * 7 + dayInWeek
        if (absoluteDay > totalDays) break
        
        weekTasks.push({
          id: `task_${week}_${dayInWeek}`,
          day: absoluteDay,
          title: getTaskTitle(week, dayInWeek),
          description: getTaskDescription(week, dayInWeek),
          featureId: getFeatureId(week, dayInWeek),
          estimatedTime: "20-30 min",
          difficulty: getDifficulty(week),
          points: getPoints(getDifficulty(week)),
          completed: false,
          tips: [`Tip for day ${absoluteDay}`],
          requiredActions: [`Complete task ${absoluteDay}`]
        })
      }
      
      weeklyMilestones.push({
        week,
        title: `Week ${week}: ${getWeekTitle(week, totalWeeks)}`,
        description: getWeekDescription(week, totalWeeks),
        tasks: weekTasks,
        total_points: weekTasks.reduce((sum, t) => sum + t.points, 0),
        earned_points: 0,
        completed: false
      })
    }

    const mockRoadmap = {
      user_id: user.id,
      title: `${totalWeeks}-Week Interview Preparation Roadmap`,
      summary: `Personalized ${answers.target_timeline} plan for ${answers.target_role}`,
      target_role: Array.isArray(answers.target_role) 
        ? answers.target_role[0] 
        : (answers.target_role || "Software Developer"),
      timeline: answers.target_timeline || "4 weeks",
      career_stage: answers.career_stage || "Recent graduate",
      confidence_level: answers.confidence_level || 3,
      weekly_milestones: weeklyMilestones,
      total_days: totalDays,
      total_points: weeklyMilestones.reduce((sum, m) => sum + m.total_points, 0),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Save to database
    const { data: savedRoadmap, error: saveError } = await supabase
      .from('roadmaps')
      .insert(mockRoadmap)
      .select()
      .single()

    if (saveError) throw saveError

    setRoadmap(savedRoadmap)
    return savedRoadmap

  } catch (err: any) {
    setError(err.message)
    throw err
  } finally {
    setIsGenerating(false)
  }
}

// Helper functions
function getWeekTitle(week: number, totalWeeks: number): string {
  if (week === 1) return "Foundation Building"
  if (week === totalWeeks) return "Interview Mastery"
  if (week <= totalWeeks / 2) return "Skill Development"
  return "Advanced Practice"
}

function getWeekDescription(week: number, totalWeeks: number): string {
  if (week === 1) return "Build your interview foundation"
  if (week === totalWeeks) return "Final preparation and polish"
  return "Develop and practice interview skills"
}

function getTaskTitle(week: number, day: number): string {
  const tasks = [
    "CV Review & Optimization",
    "STAR Framework Training",
    "Confidence Building",
    "AI Mock Interview",
    "Behavioral Questions Practice",
    "Technical Prep",
    "Company Research"
  ]
  return tasks[(day - 1) % tasks.length]
}

function getTaskDescription(week: number, day: number): string {
  return `Complete this task to build your interview skills`
}

function getFeatureId(week: number, day: number): string {
  const features = [
    'cv_review',
    'answer_framework',
    'confidence_building',
    'ai_mock_interview',
    'behavioral_questions',
    'technical_questions',
    'company_research'
  ]
  return features[(day - 1) % features.length]
}

function getDifficulty(week: number): 'easy' | 'medium' | 'hard' {
  if (week <= 2) return 'easy'
  if (week <= 5) return 'medium'
  return 'hard'
}

function getPoints(difficulty: 'easy' | 'medium' | 'hard'): number {
  const pointsMap = { easy: 10, medium: 20, hard: 30 }
  return pointsMap[difficulty]
}

  return { generateRoadmap, isGenerating, error, roadmap }
}