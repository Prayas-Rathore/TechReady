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

      // ✅ FIX: Extract answers from assessmentData
      const answers = assessmentData?.answers || assessmentData
      
      console.log('📊 Assessment Answers:', answers)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockRoadmap = {
  user_id: user.id,
  title: `Interview Preparation Roadmap`,
  summary: `Personalized plan to ace your interviews`,
  target_role: Array.isArray(answers.target_role) 
    ? answers.target_role[0] 
    : (answers.target_role || "Software Developer"),
  timeline: answers.target_timeline || "4 weeks",
  career_stage: answers.career_stage || "Recent graduate",  // ✅ Changed
  confidence_level: answers.confidence_level || 3,          // ✅ Changed
  weekly_milestones: [                                      // ✅ Changed
    {
      week: 1,
      title: "Foundation Building Week",
      description: "Build your interview foundation and confidence",
      tasks: [
        {
          id: "task_1_1",
          day: 1,
          title: "CV Review & Optimization",
          description: "Get AI-powered feedback on your CV to pass ATS systems",
          featureId: "cv_review",
          estimatedTime: "15-20 min",
          difficulty: "easy",
          points: 10,
          completed: false,
          tips: [
            "Focus on quantifiable achievements",
            "Use strong action verbs",
            "Tailor to job descriptions"
          ],
          requiredActions: [
            "Upload your current CV",
            "Review AI suggestions",
            "Apply recommended changes"
          ]
        },
        {
          id: "task_1_2",
          day: 2,
          title: "Master the STAR Answer Framework",
          description: "Learn the proven framework for answering behavioral questions",
          featureId: "answer_framework",
          estimatedTime: "20-25 min",
          difficulty: "easy",
          points: 10,
          completed: false,
          tips: [
            "STAR = Situation, Task, Action, Result",
            "Keep each section to 20-30 seconds",
            "Practice with real examples"
          ],
          requiredActions: [
            "Watch STAR framework tutorial",
            "Write 3 STAR stories",
            "Practice out loud"
          ]
        },
        {
          id: "task_1_3",
          day: 3,
          title: "Confidence Building Exercises",
          description: "Reduce nervousness and build interview confidence",
          featureId: "confidence_building",
          estimatedTime: "15-20 min",
          difficulty: "easy",
          points: 10,
          completed: false,
          tips: [
            "Practice power poses",
            "Use 4-7-8 breathing technique",
            "Reframe nervousness as excitement"
          ],
          requiredActions: [
            "Complete anxiety assessment",
            "Practice breathing exercises",
            "Record confident introduction"
          ]
        },
        {
          id: "task_1_4",
          day: 4,
          title: "First AI Mock Interview",
          description: "Practice with AI interviewer and get feedback",
          featureId: "ai_mock_interview",
          estimatedTime: "30-45 min",
          difficulty: "medium",
          points: 20,
          completed: false,
          tips: [
            "Treat it like a real interview",
            "Have STAR stories ready",
            "Review AI feedback carefully"
          ],
          requiredActions: [
            "Complete 20-minute mock interview",
            "Review feedback report",
            "Identify top 3 improvements"
          ]
        }
      ],
      total_points: 50,     // ✅ Changed
      earned_points: 0,     // ✅ Changed
      completed: false,
      badge: {
        id: "week_1_badge",
        name: "Foundation Builder",
        description: "Completed Week 1",
        icon: "🏗️",
        rarity: "rare"
      }
    },
    {
      week: 2,
      title: "Practice & Skills Week",
      description: "Practice interviews and develop key skills",
      tasks: [
        {
          id: "task_2_1",
          day: 8,
          title: "Behavioral Questions Practice",
          description: "Master common behavioral questions",
          featureId: "behavioral_questions",
          estimatedTime: "25-30 min",
          difficulty: "medium",
          points: 20,
          completed: false,
          tips: ["Prepare 8 different STAR stories"],
          requiredActions: ["Practice 4 questions", "Get AI feedback"]
        },
        {
          id: "task_2_2",
          day: 9,
          title: "Buddy Practice Session",
          description: "Practice with a peer",
          featureId: "buddy_practice",
          estimatedTime: "45-60 min",
          difficulty: "medium",
          points: 20,
          completed: false,
          tips: ["Take turns interviewing each other"],
          requiredActions: ["Complete mock interview", "Exchange feedback"]
        }
      ],
      total_points: 40,   // ✅ Changed
      earned_points: 0,   // ✅ Changed
      completed: false
    }
  ],
  total_days: 14,         // ✅ Changed
  total_points: 90,       // ✅ Changed
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

      // Save to database
      const { data: savedRoadmap, error: saveError } = await supabase
        .from('roadmaps')
        .insert(mockRoadmap)
        .select()
        .single()

      if (saveError) {
        console.error('❌ Save Error:', saveError)
        throw saveError
      }

      console.log('✅ Roadmap Saved:', savedRoadmap)

      setRoadmap(savedRoadmap)
      return savedRoadmap

    } catch (err: any) {
      console.error('❌ Generate Error:', err)
      setError(err.message)
      throw err
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateRoadmap, isGenerating, error, roadmap }
}