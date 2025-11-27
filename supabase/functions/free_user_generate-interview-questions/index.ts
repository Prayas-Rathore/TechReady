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
    const { jobDescription } = await req.json()

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 300,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
            Generate exactly 3 short and technical interview questions based strictly on the job description.
            Return ONLY valid JSON — no markdown, no extra text, no explanations.
            Format: ["question 1", "question 2", "question 3"]
          `
        },
        {
          role: "user",
          content: `Job Description: ${jobDescription}`
        }
      ]
    }),
    })

    const data = await openaiResponse.json()

    if (!openaiResponse.ok) {
      console.error("OpenAI API Error:", data)
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || "OpenAI request failed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: openaiResponse.status }
      )
    }

    try {
      let content = data.choices[0].message.content.trim()

      // Remove code fences if they exist
      if (content.startsWith("```")) {
        content = content.replace(/^```(json)?\n?/, "").replace(/```$/, "").trim()
      }

      const questions = JSON.parse(content)
      
      return new Response(
        JSON.stringify({ success: true, questions }), // Changed from 'roadmap' to 'questions'
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )

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

  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    )
  }
})