// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PostJobAnswers {
  role_type?: string;
  company_type?: string;
  work_mode?: string;
  experience_level?: string;
  confidence_level?: string;
  worries?: string[];
  role_clarity?: string;
  learning_style?: string;
  main_goal?: string;
  priority_timeline?: string;
  support_needs?: string[];
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { answers, userId } = await req.json();

    if (!answers || !userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing answers or userId' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Parse answers
    const userAnswers: PostJobAnswers = answers;
    
    // Determine timeline (default to 90 days)
    let totalDays = 90;
    if (userAnswers.priority_timeline === '30-days') totalDays = 30;
    else if (userAnswers.priority_timeline === '60-days') totalDays = 60;
    else if (userAnswers.priority_timeline === '90-days') totalDays = 90;
    else if (userAnswers.priority_timeline === 'long-term') totalDays = 120;

    const totalWeeks = Math.ceil(totalDays / 7);

    // Build comprehensive prompt
    const prompt = `
You are an expert career coach creating a personalized onboarding roadmap for a new hire.

USER PROFILE:
- Role: ${userAnswers.role_type || 'tech role'}
- Company: ${userAnswers.company_type || 'unknown'}
- Work Mode: ${userAnswers.work_mode || 'unknown'}
- Experience: ${userAnswers.experience_level || 'unknown'}
- Confidence Level: ${userAnswers.confidence_level || '3'}/5
- Primary Worries: ${Array.isArray(userAnswers.worries) ? userAnswers.worries.join(', ') : 'none specified'}
- Role Clarity: ${userAnswers.role_clarity || 'unclear'}
- Learning Style: ${userAnswers.learning_style || 'mixed'}
- Main Goal: ${userAnswers.main_goal || 'perform well'}
- Priority Timeline: ${userAnswers.priority_timeline || '90 days'}
- Support Needs: ${Array.isArray(userAnswers.support_needs) ? userAnswers.support_needs.join(', ') : 'none specified'}

TASK:
Create a ${totalWeeks}-week personalized onboarding roadmap (${totalDays} days total).

REQUIREMENTS:
1. Generate EXACTLY ${totalWeeks} weeks of plans
2. Each week must have:
   - Week number (1-${totalWeeks})
   - Clear theme/focus
   - 3-5 specific action items
   - 1-2 key milestones
   - Expected outcomes
3. Progress should be logical: foundations → skills → autonomy → impact
4. Address their specific worries and learning style
5. Align with their main goal and support needs

STRUCTURE YOUR RESPONSE AS JSON:
{
  "summary": "2-3 sentence overview of the roadmap",
  "keyFocusAreas": ["focus1", "focus2", "focus3"],
  "weeks": [
    {
      "week": 1,
      "theme": "Week theme",
      "focus": "Primary focus area",
      "actions": ["Action 1", "Action 2", "Action 3"],
      "milestones": ["Milestone 1", "Milestone 2"],
      "outcomes": ["Expected outcome 1", "Expected outcome 2"],
      "tips": "Helpful tip for this week"
    }
  ],
  "successMetrics": ["How to measure success 1", "How to measure success 2"],
  "resources": ["Recommended resource 1", "Recommended resource 2"]
}

IMPORTANT:
- Be specific and actionable
- Consider their confidence level (${userAnswers.confidence_level}/5)
- Address their worries: ${Array.isArray(userAnswers.worries) ? userAnswers.worries.join(', ') : 'general concerns'}
- Match their learning style: ${userAnswers.learning_style}
- Return ONLY valid JSON, no markdown formatting
`.trim();

    // Call OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: "You are an expert career coach. Generate structured, actionable onboarding roadmaps. Return only valid JSON." 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: "json_object" }
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI API Error:", data);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data.error?.message || "OpenAI request failed" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: openaiResponse.status 
        }
      );
    }

    const raw = data?.choices?.[0]?.message?.content ?? "";
    
    // Parse JSON response
    let roadmap;
    try {
      roadmap = JSON.parse(raw);
    } catch (parseErr) {
      console.error("JSON Parse Error:", parseErr);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to parse AI response" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      );
    }

    // Validate response structure
    if (!roadmap.weeks || !Array.isArray(roadmap.weeks)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid roadmap structure" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      );
    }

    // Add metadata
    const enrichedRoadmap = {
      ...roadmap,
      totalWeeks,
      totalDays,
      generatedAt: new Date().toISOString(),
      userProfile: {
        role: userAnswers.role_type,
        company: userAnswers.company_type,
        timeline: userAnswers.priority_timeline,
        confidenceLevel: userAnswers.confidence_level
      }
    };

    return new Response(
      JSON.stringify({ 
        success: true, 
        roadmap: enrichedRoadmap 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (err: any) {
    console.error("Function Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message || "Internal server error" 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});