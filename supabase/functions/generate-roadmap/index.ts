// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { assessmentData } = await req.json()

    // Extract actual answers from the assessmentData
    const answers = assessmentData?.answers || assessmentData;

    const body = {
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are an expert technical interview coach analyzing assessment results.

**CRITICAL INSTRUCTIONS:**
1. Return ONLY valid JSON matching the exact schema below
2. NO markdown, NO code fences, NO extra text
3. ReadinessScore must be 30-85 (NOT 7-8!) based on:
   - 30-45: Beginner (needs 12-16 weeks)
   - 46-65: Intermediate (needs 8-12 weeks)
   - 66-85: Advanced (needs 4-8 weeks)
4. Create EXACTLY 4 learning phases with realistic goals
5. Each phase should build on the previous one progressively

**EXACT JSON SCHEMA (match this perfectly):**
{
  "summary": "2-3 sentence personalized summary based on their experience level and goals",
  "readinessScore": 30-85,
  "estimatedWeeks": 4-16,
  "strengths": ["string", "string", "string"],
  "areasToImprove": [
    { "area": "string", "reason": "string", "priority": "high" | "medium" | "low" }
  ],
  "learningPath": [
    {
      "phase": 1,
      "name": "Phase name",
      "duration": "Weeks X-Y",
      "status": "upcoming",
      "goals": ["goal1", "goal2", "goal3", "goal4"]
    }
  ],
  "dailySchedule": {
    "totalHours": 2-4,
    "breakdown": [
      { "activity": "Data Structures & Algorithms", "hours": 1.5, "color": "#3B82F6" },
      { "activity": "Coding Practice", "hours": 1, "color": "#8B5CF6" },
      { "activity": "System Design", "hours": 0.5, "color": "#10B981" }
    ]
  },
  "milestones": [
    { "week": 1, "title": "string", "description": "string", "completed": false }
  ],
  "resources": [
    { "type": "course"|"book"|"platform", "name": "string", "platform": "string", "price": "string", "priority": "high"|"medium"|"low" }
  ]
}`
        },
        {
          role: 'user',
          content: `Analyze this developer assessment and create a realistic interview prep roadmap.

**Assessment Answers:**
${JSON.stringify(answers, null, 2)}

**Instructions:**
1. Identify their professional level (Junior/Mid-level)
2. Analyze their technical skills from the answers
3. Calculate realistic readinessScore (30-85 range, NOT single digits!)
4. Create 4 progressive learning phases:
   - Phase 1: Foundations (basics they're missing)
   - Phase 2: Core Skills (main interview topics)
   - Phase 3: Advanced Topics (complex patterns/systems)
   - Phase 4: Interview Ready (mock interviews, polish)
5. Each phase should have 4-5 specific, actionable goals
6. Estimate 8-16 weeks total based on their starting level
7. Provide 3-5 resources that match their level
8. Create 6-8 weekly milestones spread across the timeline

Return ONLY the JSON object, no extra text.`
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    };

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: JSON.stringify(body),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error('❌ OpenAI API Error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || 'OpenAI request failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: openaiResponse.status }
      );
    }

    const raw = data?.choices?.[0]?.message?.content ?? '';
    let roadmap;

    try {
      roadmap = JSON.parse(raw);
    } catch {
      // Strip markdown fences if present
      const cleaned = raw
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```$/i, '');
      roadmap = JSON.parse(cleaned);
    }

    // ✅ Validate and fix the response
    if (roadmap.readinessScore < 30 || roadmap.readinessScore > 100) {
      console.warn('⚠️ Invalid readinessScore, defaulting to 45');
      roadmap.readinessScore = 45;
    }

    if (!roadmap.learningPath || roadmap.learningPath.length === 0) {
      console.error('❌ Empty learningPath received from GPT');
      // Fallback phases
      roadmap.learningPath = [
        {
          phase: 1,
          name: "Foundations",
          duration: "Weeks 1-4",
          status: "upcoming",
          goals: [
            "Master basic data structures (arrays, strings, hash maps)",
            "Understand Big-O notation and complexity analysis",
            "Solve 30 easy coding problems",
            "Learn common problem-solving patterns"
          ]
        },
        {
          phase: 2,
          name: "Core Skills",
          duration: "Weeks 5-8",
          status: "upcoming",
          goals: [
            "Practice two pointers and sliding window techniques",
            "Master linked lists and stack/queue problems",
            "Solve 40 medium difficulty problems",
            "Build 2 small projects demonstrating skills"
          ]
        },
        {
          phase: 3,
          name: "Advanced Topics",
          duration: "Weeks 9-12",
          status: "upcoming",
          goals: [
            "Learn tree and graph traversal algorithms",
            "Practice dynamic programming basics",
            "Solve 30 medium + 10 hard problems",
            "Study system design fundamentals"
          ]
        },
        {
          phase: 4,
          name: "Interview Ready",
          duration: "Weeks 13-16",
          status: "upcoming",
          goals: [
            "Complete 10 timed mock interviews",
            "Practice behavioral questions with STAR method",
            "Review company-specific interview patterns",
            "Polish resume and portfolio projects"
          ]
        }
      ];
    }

    console.log('✅ Roadmap generated successfully');
    console.log('📊 Readiness Score:', roadmap.readinessScore);
    console.log('📅 Estimated Weeks:', roadmap.estimatedWeeks);
    console.log('🎯 Phases:', roadmap.learningPath?.length || 0);

    return new Response(
      JSON.stringify({ success: true, roadmap }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('❌ Function Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});