// supabase/functions/generate-cv/index.ts
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
    const { jobDescription, userProfile } = body

    if (!jobDescription?.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Job Description is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Generate CV content
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
            content: `You are an expert CV writer. Generate a professional, ATS-friendly CV tailored to the job description.
Create realistic, detailed content that matches the job requirements.

IMPORTANT: Use the user's actual information if provided. If user profile is empty or minimal, generate realistic professional details.

Return ONLY valid JSON — no markdown, no code fences:
{
  "personalInfo": {
    "name": "realistic full name",
    "email": "professional email",
    "phone": "realistic phone number",
    "location": "City, Country",
    "linkedin": "linkedin.com/in/username",
    "portfolio": "optional portfolio website"
  },
  "summary": "Compelling 3-4 sentence professional summary that highlights key strengths matching the job requirements. Be specific and use keywords from the job description.",
  "experience": [
    {
      "title": "Job Title matching JD requirements",
      "company": "Realistic Company Name",
      "location": "City, State/Country",
      "duration": "Month Year - Month Year (or Present)",
      "responsibilities": [
        "Detailed achievement with metrics (e.g., 'Increased revenue by 35%')",
        "Specific technical accomplishment matching job requirements",
        "Leadership or team collaboration example",
        "Another quantifiable result"
      ]
    }
  ],
  "skills": {
    "technical": ["Extract from job description and add relevant ones"],
    "soft": ["Leadership", "Communication", "Problem Solving", "Team Collaboration"]
  },
  "education": [
    {
      "degree": "Relevant degree for the position",
      "institution": "Realistic University Name",
      "location": "City, State",
      "year": "Graduation Year",
      "gpa": "Optional: 3.5/4.0 or omit"
    }
  ],
  "projects": [
    {
      "name": "Relevant project matching job requirements",
      "description": "Detailed description of what was built and its impact",
      "technologies": ["Technologies from job description"],
      "highlights": ["Quantifiable achievement", "User impact or scale"]
    }
  ],
  "certifications": ["Relevant certifications for the role"]
}

Generate 2-3 experience entries, 8-12 technical skills, 2-3 projects, and 1-2 education entries.
Make everything realistic and professionally written.`
          },
          {
            role: 'user',
            content: `Job Description:
${jobDescription}

${userProfile?.name || userProfile?.email ? `User Information:
Name: ${userProfile?.name || 'Not provided'}
Email: ${userProfile?.email || 'Not provided'}
Phone: ${userProfile?.phone || 'Not provided'}
Location: ${userProfile?.location || 'Not provided'}
Skills: ${userProfile?.skills?.join(', ') || 'Not provided'}
Experience Level: ${userProfile?.experienceLevel || 'Not provided'}

Use this actual user information in the CV. Fill in missing details professionally.` : 'No user profile provided. Generate realistic professional details that match the job description.'}

Generate a complete, professional CV tailored to this job description.`
          }
        ],
        temperature: 0.8,
        max_tokens: 3500,
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

      if (content.startsWith('```')) {
        content = content.replace(/^```(json)?\n?/, '').replace(/```$/, '').trim()
      }

      const cvData = JSON.parse(content)

      // Store in database
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
          operation_type: 'generate',
          report: cvData,
          created_at: new Date().toISOString()
        })
      })

      return new Response(
        JSON.stringify({ 
          success: true, 
          cvData: cvData
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (err) {
      console.error('JSON Parse Error:', data.choices[0].message.content)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON from OpenAI',
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