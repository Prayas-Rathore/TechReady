import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { assessmentData } = await req.json()

    // Get OpenAI API key from environment
    const openaiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiKey) throw new Error('OpenAI API key not configured')

    // Build prompt from assessment data
    const prompt = buildPrompt(assessmentData)

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career coach creating personalized interview preparation roadmaps. Return ONLY valid JSON, no markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const roadmapJson = data.choices[0].message.content

    // Parse and validate
    const roadmap = JSON.parse(roadmapJson)

    // Save to database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: user } = await supabase.auth.getUser(
      req.headers.get('Authorization')?.replace('Bearer ', '') ?? ''
    )

    if (!user) throw new Error('Not authenticated')

    const { data: savedRoadmap, error: saveError } = await supabase
      .from('roadmaps')
      .insert({
        user_id: user.user.id,
        ...roadmap,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (saveError) throw saveError

    return new Response(
      JSON.stringify({ success: true, roadmap: savedRoadmap }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

function buildPrompt(assessmentData: any): string {
  return `Create a personalized interview preparation roadmap based on:

Career Stage: ${assessmentData.career_stage}
Target Role: ${assessmentData.target_role}
Experience: ${assessmentData.experience_level}
Confidence: ${assessmentData.confidence_level}/5
Struggles: ${assessmentData.biggest_struggles}
Timeline: ${assessmentData.target_timeline}
Time/Day: ${assessmentData.time_commitment}

Return ONLY this JSON structure (no markdown):
{
  "title": "string",
  "summary": "string",
  "targetRole": "string",
  "timeline": "string",
  "careerStage": "string",
  "confidenceLevel": number,
  "weeklyMilestones": [
    {
      "week": 1,
      "title": "string",
      "description": "string",
      "tasks": [
        {
          "id": "task_1_1",
          "day": 1,
          "title": "string",
          "description": "string",
          "featureId": "cv_review",
          "estimatedTime": "15-20 min",
          "difficulty": "easy",
          "points": 10,
          "completed": false,
          "tips": ["tip1", "tip2"],
          "requiredActions": ["action1", "action2"]
        }
      ],
      "totalPoints": 0,
      "earnedPoints": 0,
      "completed": false
    }
  ],
  "totalDays": 28,
  "totalPoints": 0
}

Use these featureIds: cv_review, ai_mock_interview, buddy_practice, behavioral_questions, technical_questions, company_research, confidence_building, answer_framework, salary_negotiation, body_language, industry_insights, portfolio_review`
}