import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface GenerateEmailRequest {
  cvText: string;
  outputType: 'role_fit_summary' | 'application_email' | 'linkedin_message' | 'follow_up_email';
  roleTitle?: string;
  companyName?: string;
  recruiterName?: string;
  candidateName?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validate if document is a CV
function validateCV(text: string): { isValid: boolean; confidence: number; reason?: string } {
  const cvKeywords = [
    'experience', 'education', 'skills', 'work', 'employment',
    'project', 'qualification', 'degree', 'university', 'company'
  ];
  
  const lowerText = text.toLowerCase();
  const matches = cvKeywords.filter(kw => lowerText.includes(kw)).length;
  
  // At least 4 CV keywords for 60%+ confidence
  const confidence = (matches / cvKeywords.length);
  
  if (confidence < 0.4) {
    return {
      isValid: false,
      confidence,
      reason: 'Document does not appear to be a CV. Please upload a valid resume/CV.'
    };
  }
  
  return { isValid: true, confidence };
}

// Extract key information from CV (minimal tokens)
function extractCVHighlights(cvText: string): string {
  // Take first 2000 characters (most relevant info usually at top)
  const relevantPart = cvText.slice(0, 2000);
  
  // Extract key sections using simple pattern matching
  const sections = {
    skills: extractSection(relevantPart, ['skills', 'technical skills', 'core competencies']),
    experience: extractSection(relevantPart, ['experience', 'work experience', 'employment']),
    education: extractSection(relevantPart, ['education', 'qualification']),
    projects: extractSection(relevantPart, ['projects', 'key projects'])
  };
  
  return Object.entries(sections)
    .filter(([_, content]) => content)
    .map(([key, content]) => `${key}: ${content}`)
    .join('\n');
}

function extractSection(text: string, keywords: string[]): string {
  const lowerText = text.toLowerCase();
  
  for (const keyword of keywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      // Get 200 chars after keyword
      return text.slice(index, index + 200).trim();
    }
  }
  
  return '';
}

// Build optimized prompts for each output type
function buildPrompt(request: GenerateEmailRequest, cvHighlights: string): string {
  const { outputType, roleTitle, companyName, recruiterName, candidateName } = request;
  
  const baseContext = `CV Highlights:\n${cvHighlights}\n\n`;
  
  const prompts = {
    role_fit_summary: `${baseContext}Generate a professional Cover Letter for the ${roleTitle || '[Role]'} position at ${companyName || '[Company]'}.

CORE PURPOSES TO ADDRESS:
1. Personalization: Show research about ${companyName || 'the company'} and ${roleTitle || 'the role'}
2. Storytelling: Explain WHY applying and HOW experiences from CV align
3. Context: Address any career transitions or unique aspects with positive spin
4. Soft Skills Showcase: Demonstrate communication, enthusiasm, and professionalism
5. Call to Action: End with confident request for interview

FORMAT (3-4 paragraphs, 250-350 words):

Dear Hiring Manager,

[Opening Paragraph - Personalization & Hook]
- State the position and company with enthusiasm
- Show you've researched ${companyName || 'the company'} (mention something specific if possible from general knowledge)
- 2-3 sentences max

[Body Paragraph 1 - Storytelling & Experience Alignment]
- Draw from CV highlights to tell WHY this role excites you
- Connect 2-3 specific experiences/skills from CV to role requirements
- Show how your background uniquely positions you for THIS role
- 3-4 sentences

[Body Paragraph 2 - Soft Skills & Value Proposition]
- Highlight soft skills demonstrated in CV (leadership, problem-solving, collaboration)
- Explain what unique value you bring beyond technical skills
- Address any transitions or context positively
- 3-4 sentences

[Closing Paragraph - Call to Action]
- Express strong interest and confidence
- Request an interview/conversation
- Professional sign-off with candidate name
- 2-3 sentences

${candidateName ? `Sign as: ${candidateName}` : 'Sign as: [Your Name]'}

RULES:
- Use ONLY information from CV highlights above
- Be authentic, not generic or overly formal
- Show genuine enthusiasm
- Be specific about experiences, not vague claims
- Professional but personable tone
- NO fabricated skills or experiences
- Keep it concise but impactful`,

    application_email: `${baseContext}Generate a professional application email.

Details:
- Role: ${roleTitle || '[Role]'}
- Company: ${companyName || '[Company]'}
- Candidate: ${candidateName || '[Your Name]'}

Format:
Subject: Application for ${roleTitle || '[Role]'} – ${candidateName || '[Your Name]'}

Dear Hiring Manager,

[2-3 sentences introducing yourself and the role, referencing 2-3 specific CV skills/experiences that match the role requirements]

[1 sentence about why you're excited about this opportunity]

I've attached my CV for your review and would welcome the opportunity to discuss how I can add value to your team.

Kind regards,
${candidateName || '[Your Name]'}

Rules:
- Use ONLY CV-based information
- No fabricated skills or experience
- Keep it under 150 words
- Professional and concise`,

    linkedin_message: `${baseContext}Generate a short LinkedIn recruiter message (50-70 words).

Details:
- Role: ${roleTitle || '[Role]'}
- Company: ${companyName || '[Company]'}
- Recruiter: ${recruiterName || '[Name]'}
- Candidate: ${candidateName || '[Your Name]'}

Format:
Hi ${recruiterName || '[Name]'},

[1 sentence introduction mentioning the role application]
[1 sentence highlighting 1-2 key CV skills/experiences that align with the role]
[Brief closing expressing interest to connect]

Best,
${candidateName || '[Your Name]'}

Rules:
- Conversational but professional
- Brief and impactful
- Only CV-based points`,

    follow_up_email: `${baseContext}Generate a polite follow-up email (60-80 words).

Details:
- Role: ${roleTitle || '[Role]'}
- Company: ${companyName || '[Company]'}
- Recruiter: ${recruiterName || '[Name]'}
- Candidate: ${candidateName || '[Your Name]'}

Format:
Hi ${recruiterName || '[Name]'},

I hope you're well. I wanted to follow up on my application for the ${roleTitle || '[Role]'} position${companyName ? ' at ' + companyName : ''}. [1 sentence briefly reinforcing your fit based on CV]. I remain very interested and would welcome the opportunity to discuss further.

Thank you for your time and consideration.

Kind regards,
${candidateName || '[Your Name]'}

Rules:
- Respectful and brief
- No pressure
- Subtle value reinforcement from CV`
  };
  
  return prompts[outputType];
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Parse request
    const request: GenerateEmailRequest = await req.json();
    const { cvText, outputType } = request;

    // Validate required fields
    if (!cvText || !outputType) {
      throw new Error('Missing required fields: cvText and outputType');
    }

    // Validate it's actually a CV
    const validation = validateCV(cvText);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          error: validation.reason,
          confidence: validation.confidence
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Extract CV highlights (reduce token usage)
    const cvHighlights = extractCVHighlights(cvText);

    // Build optimized prompt
    const prompt = buildPrompt(request, cvHighlights);

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-effective model
        messages: [
          {
            role: 'system',
            content: 'You are a professional career advisor and cover letter expert. Generate content ONLY from the provided CV information. Never fabricate or assume information not in the CV. Be authentic, specific, and professional. Show genuine enthusiasm while maintaining professionalism.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500, // Increased for cover letter
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const openAIData = await openAIResponse.json();
    const generatedContent = openAIData.choices[0].message.content;

    // Log usage for monitoring (optional)
    const tokensUsed = openAIData.usage?.total_tokens || 0;
    console.log(`Tokens used: ${tokensUsed} for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        content: generatedContent,
        outputType,
        tokensUsed,
        confidence: validation.confidence
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});