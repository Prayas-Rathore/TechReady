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

    const body = {
      model: 'gpt-4o',
      // Enforce pure JSON output (no code fences)
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            `You are an expert interview coach. Respond with a SINGLE JSON object only, no markdown, no code fences. It must match this schema exactly:

{
  "summary": "string",
  "readinessScore": number,
  "estimatedWeeks": number,
  "strengths": ["string"],
  "areasToImprove": [
    { "area": "string", "reason": "string", "priority": "high" | "medium" | "low" }
  ],
  "learningPath": [
    { "phase": "string", "duration": "string", "focus": "string", "topics": ["string"], "status": "not-started" }
  ],
  "dailySchedule": {
    "totalHours": number,
    "breakdown": [{ "activity": "string", "hours": number, "color": "string" }]
  },
  "milestones": [
    { "week": number, "title": "string", "description": "string", "completed": false }
  ],
  "resources": [
    { "title": "string", "type": "string", "url": "string", "description": "string" }
  ]
}

Rules:
- Return ONLY valid JSON. No extra keys. Do not wrap in backticks.`
        },
        {
          role: 'user',
          content: `Create personalized interview roadmap for: ${JSON.stringify(assessmentData)}`
        }
      ],
      temperature: 0.2,
      max_tokens: 3000,
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
      console.error('OpenAI API Error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || 'OpenAI request failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: openaiResponse.status }
      );
    }

    // Robust parse: prefer raw JSON; if fences slip through, sanitize
    const raw = data?.choices?.[0]?.message?.content ?? '';
    let roadmap;

    try {
      roadmap = JSON.parse(raw);
    } catch {
      // Strip ```json ... ``` or ``` ... ```
      const cleaned = raw
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```$/i, '');
      roadmap = JSON.parse(cleaned);
    }

    return new Response(
      JSON.stringify({ success: true, roadmap }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('Function Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
