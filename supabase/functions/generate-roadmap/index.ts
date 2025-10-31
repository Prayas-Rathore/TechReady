// This file is a Deno/Supabase Edge Function — suppress local TS resolver errors for the std import
// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Running in Deno (Supabase Edge Functions) — quiet the TypeScript checker about the Deno global
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

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
  },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert interview coach. Analyze the assessment and return JSON in this EXACT format:

        {
          "summary": "string",
          "readinessScore": number (0-100),
          "estimatedWeeks": number,
          "strengths": ["string"],
          "areasToImprove": [
            {
              "area": "string",
              "reason": "string",
              "priority": "high|medium|low"
            }
          ],
          "learningPath": [
            {
              "phase": "string",
              "duration": "string",
              "focus": "string",
              "topics": ["string"],
              "status": "not-started"
            }
          ],
          "dailySchedule": {
            "totalHours": number,
            "breakdown": [
              { "activity": "string", "hours": number, "color": "bg-blue-500" }
            ]
          },
          "milestones": [
            {
              "week": number,
              "title": "string",
              "description": "string",
              "completed": false
            }
          ],
          "resources": [
            {
              "title": "string",
              "type": "string",
              "url": "string (optional)",
              "description": "string"
            }
          ]
        }

        Return ONLY valid JSON. No additional text.`
      },
      {
        role: 'user',
        content: `Create personalized interview roadmap for: ${JSON.stringify(assessmentData)}`
      }
    ],
    temperature: 0.7,
    max_tokens: 3000,
  }),
})

const data = await openaiResponse.json()

// If the OpenAI API returned an error, handle gracefully
if (!openaiResponse.ok) {
  console.error("OpenAI API Error:", data)
  return new Response(
    JSON.stringify({ success: false, error: data.error?.message || "OpenAI request failed" }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: openaiResponse.status }
  )
}

let roadmap
try {
  roadmap = JSON.parse(data.choices[0].message.content)
} catch (err) {
  console.error("JSON Parse Error:", data.choices[0].message.content)
  return new Response(
    JSON.stringify({
      success: false,
      error: "Invalid JSON from OpenAI. Check system prompt formatting.",
      raw: data.choices[0].message.content,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
  )
}

return new Response(
  JSON.stringify({ success: true, roadmap }),
  { headers: { ...corsHeaders, "Content-Type": "application/json" } }
)
  } catch (err:any) {
    console.error("Function Error:", err)
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }
})