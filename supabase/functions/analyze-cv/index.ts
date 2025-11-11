// supabase/functions/analyze-cv/index.ts
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
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Extract user from JWT token
    const token = authHeader.replace('Bearer ', '')
    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload.sub

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const body = await req.json()
    const { cvText, jobDescription } = body

    console.log('Received:', { 
      hasCvText: !!cvText?.trim(), 
      hasJobDescription: !!jobDescription?.trim() 
    })

    const hasCvText = cvText && typeof cvText === 'string' && cvText.trim().length > 0
    const hasJobDescription = jobDescription && typeof jobDescription === 'string' && jobDescription.trim().length > 0

    if (!hasCvText && !hasJobDescription) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide at least CV or Job Description' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    let userPrompt = ''
    if (hasCvText && hasJobDescription) {
      userPrompt = `CV:\n${cvText}\n\nJob Description:\n${jobDescription}`
    } else if (hasCvText) {
      userPrompt = `Analyze this CV and provide general feedback:\n\n${cvText}`
    } else {
      userPrompt = `Analyze this Job Description:\n\n${jobDescription}`
    }

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
            content: `You are a professional resume analyst. 
            ${hasCvText && hasJobDescription ? 'Compare the CV with the job description.' : 'Analyze the provided content.'}
            Return ONLY valid JSON — no markdown, no code fences, no explanations:
            {
              "score": number,
              "strengths": ["strength 1", "strength 2", "strength 3"],
              "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
              "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
              "keywords": { "matched": ["keyword1", "keyword2"], "missing": ["keyword3", "keyword4"] },
              "sections": [{ "name": "section name", "score": number, "feedback": "feedback text" }]
            }
            Provide at least 3 items for strengths, weaknesses, suggestions.`
                      },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 2000,
      }),
    })

    const data = await openaiResponse.json()

    if (!openaiResponse.ok) {
      console.error('OpenAI API Error:', data)
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || 'OpenAI failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: openaiResponse.status }
      )
    }

    try {
      let content = data.choices[0].message.content.trim()

      // Remove code fences if they exist
      if (content.startsWith('```')) {
        content = content.replace(/^```(json)?\n?/, '').replace(/```$/, '').trim()
      }

      const analysis = JSON.parse(content)

      // Store in Supabase using REST API
      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

      await fetch(`${supabaseUrl}/rest/v1/cv_reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          user_id: userId,
          report: analysis,
          created_at: new Date().toISOString()
        })
      })

      return new Response(
        JSON.stringify({ success: true, analysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (err) {
      console.error('JSON Parse Error:', data.choices[0].message.content)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON from OpenAI. Check system prompt formatting.',
          raw: data.choices[0].message.content,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

  } catch (err: any) {
    console.error('Function error:', err)
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})