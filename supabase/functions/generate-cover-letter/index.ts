// supabase/functions/generate-cover-letter/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req:any) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { jobTitle, companyName, jobDescription, maximumWords, tone = 'professional' } = await req.json()

    // Validate required fields
    if (!jobTitle || !companyName || !jobDescription) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate and set word limit (default: 100, min: 100, max: 500)
    let wordLimit = 100
    if (maximumWords) {
      const parsedWords = parseInt(maximumWords)
      if (isNaN(parsedWords) || parsedWords < 100 || parsedWords > 500) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid word limit',
            suggestion: 'Please enter a number between 100 and 500'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      wordLimit = parsedWords
    }

    // Calculate max_tokens dynamically (words * 1.4 for buffer)
    const maxTokens = Math.ceil(wordLimit * 1.4)

    // Fetch basic profile info
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Truncate job description to reduce input tokens
    const truncatedJD = jobDescription.substring(0, 800)

    // Simplified prompt
    const prompt = `Write a ${wordLimit}-word cover letter for ${jobTitle} at ${companyName}.

Job Description: ${truncatedJD}

Candidate: ${profile.full_name || 'Candidate'}

Requirements:
- Maximum ${wordLimit} words
- ${tone} tone
- Match 2-3 key requirements from job description
- No greetings/signatures, just body`

    // Call OpenAI API
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Write concise, professional cover letters. Stay within ${wordLimit} words.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      throw new Error(`OpenAI API error: ${errorData.error?.message}`)
    }

    const openaiData = await openaiResponse.json()
    const generatedLetter = openaiData.choices[0].message.content.trim()

    // Save to database
    const { data: coverLetter, error: dbError } = await supabaseClient
      .from('cover_letters')
      .insert({
        user_id: user.id,
        job_title: jobTitle,
        company_name: companyName,
        job_description: jobDescription,
        generated_letter: generatedLetter,
        tone: tone,
        status: 'draft'
      })
      .select()
      .single()

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        coverLetter: coverLetter,
        generatedText: generatedLetter
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error:any) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})