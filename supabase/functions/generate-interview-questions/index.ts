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
    const { jobDescription } = await req.json()

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `Generate exactly 5 interview questions based on this job description. Return ONLY a JSON array of strings.

        // Job Description: ${jobDescription}

        // Format: ["question 1", "question 2", "question 3", "question 4", "question 5"]`
              },
      {
        role: 'user',
        content: `Create personalized interview roadmap for: ${JSON.stringify(jobDescription)}`
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




// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// }

// serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   try {
//     const { jobDescription } = await req.json()

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`
//       },
//       body: JSON.stringify({
//         model: 'gpt-4o-mini',
//         messages: [{
//           role: 'user',
//           content: `Generate exactly 5 interview questions based on this job description. Return ONLY a JSON array of strings.

// Job Description: ${jobDescription}

// Format: ["question 1", "question 2", "question 3", "question 4", "question 5"]`
//         }],
//         temperature: 0.7
//       })
//     })

//     const data = await response.json()
//     const questions = JSON.parse(data.choices[0].message.content)

//     return new Response(
//       JSON.stringify({ questions }),
//       { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//     )
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
//     )
//   }
// })