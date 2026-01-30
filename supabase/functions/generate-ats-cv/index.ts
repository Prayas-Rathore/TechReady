// supabase/functions/generate-ats-cv/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface CVGenerationRequest {
  cvText: string;
  jobDescription: string;
  targetRole?: string;
}

interface OptimizedCVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
  };
  profile: string;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    location?: string;
    achievements: string[];
  }>;
  skills: {
    technical: string[];
    frameworks: string[];
    tools: string[];
    methodologies: string[];
  };
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    location?: string;
  }>;
  projects: Array<{
    title: string;
    technologies: string;
    description: string[];
  }>;
  certifications: string[];
  atsScore: number;
  optimizationNotes: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ✅ RATE LIMITING - Check user's generation count
    const { data: usageData } = await supabase
      .from('cv_generation_usage')
      .select('count, last_reset')
      .eq('user_id', user.id)
      .single();

    const now = new Date();
    const lastReset = usageData?.last_reset ? new Date(usageData.last_reset) : null;
    const hoursSinceReset = lastReset ? (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60) : 25;

    if (usageData && usageData.count >= 5 && hoursSinceReset < 24) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. You can generate 5 CVs per day.',
          resetIn: Math.ceil(24 - hoursSinceReset)
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { cvText, jobDescription, targetRole }: CVGenerationRequest = await req.json();

    if (!cvText || !jobDescription) {
      return new Response(
        JSON.stringify({ error: 'CV text and job description are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ✅ OPTIMIZATION: Single comprehensive AI call instead of multiple
    const optimizedPrompt = `You are an expert ATS CV optimizer and professional resume writer. 

TASK: Transform the provided CV to achieve 90%+ ATS score for the given job description.

ORIGINAL CV:
${cvText.substring(0, 4000)} // Limit tokens

JOB DESCRIPTION:
${jobDescription.substring(0, 2000)} // Limit tokens

INSTRUCTIONS:
1. Extract and enhance all relevant information
2. Match keywords from JD naturally (not keyword stuffing)
3. Quantify achievements with metrics
4. Use strong action verbs
5. Ensure ATS-friendly formatting
6. Remove generic phrases
7. Tailor content to JD requirements

Return ONLY valid JSON with this EXACT structure (no markdown, no explanations):
{
  "personalInfo": {
    "name": "Full Name",
    "title": "Professional Title matching JD",
    "email": "email@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/profile",
    "github": "github.com/username",
    "location": "City, Country"
  },
  "profile": "2-3 sentence professional summary matching JD requirements with quantified achievements",
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Month Year - Month Year",
      "location": "City, Country",
      "achievements": [
        "Achievement with metrics (e.g., Increased X by 40%)",
        "Technical achievement with technologies from JD",
        "Leadership/Impact achievement"
      ]
    }
  ],
  "skills": {
    "technical": ["Primary technical skills from JD"],
    "frameworks": ["Frameworks and libraries from JD"],
    "tools": ["Development tools and platforms"],
    "methodologies": ["Methodologies mentioned in JD"]
  },
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "duration": "Year - Year",
      "location": "City, Country"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "technologies": "Tech stack matching JD",
      "description": [
        "Key achievement or feature",
        "Impact with metrics",
        "Technologies used"
      ]
    }
  ],
  "certifications": ["Certification Name - Provider"],
  "atsScore": 95,
  "optimizationNotes": [
    "Added X keywords from JD",
    "Quantified Y achievements",
    "Restructured Z section for ATS"
  ]
}`;

    // ✅ Call OpenAI with optimized settings
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // ✅ Cost-effective model
        messages: [
          { role: 'system', content: 'You are an expert ATS CV optimizer. Return only valid JSON.' },
          { role: 'user', content: optimizedPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000, // ✅ Limit response size
        response_format: { type: "json_object" } // ✅ Force JSON response
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const cvData: OptimizedCVData = JSON.parse(aiResponse.choices[0].message.content);

    // ✅ Update usage tracking
    if (usageData) {
      const newCount = hoursSinceReset >= 24 ? 1 : usageData.count + 1;
      const resetTime = hoursSinceReset >= 24 ? now.toISOString() : usageData.last_reset;
      
      await supabase
        .from('cv_generation_usage')
        .update({ count: newCount, last_reset: resetTime })
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('cv_generation_usage')
        .insert({ user_id: user.id, count: 1, last_reset: now.toISOString() });
    }

    // ✅ Store generated CV for future reference (optional caching)
    await supabase.from('generated_cvs').insert({
      user_id: user.id,
      cv_data: cvData,
      job_description_hash: await hashString(jobDescription.substring(0, 200)),
      created_at: now.toISOString()
    });

    return new Response(
      JSON.stringify({ success: true, cvData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate CV' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// ✅ Helper function for caching
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};