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
    const { jobDescription, questionType = 'mixed', difficultyLevel = 'intermediate' } = await req.json()

    // Build question type instructions
    const typeInstructions = {
      behavioral: `Focus on behavioral and situational questions that assess soft skills, past experiences, teamwork, conflict resolution, and how candidates handle various workplace scenarios.
      
      IMPORTANT: The FIRST question MUST be a self-introduction question such as:
      - "Tell me about yourself"
      - "Can you introduce yourself and walk me through your background?"
      - "Tell me about your professional journey"
      - "Walk me through your resume"
      
      The remaining 6 questions should cover behavioral topics like teamwork, conflict resolution, leadership, problem-solving situations, and past experiences.`,
      
      analytical: 'Focus on analytical and problem-solving questions that test logical thinking, data interpretation, decision-making processes, and analytical reasoning skills.',
      
      technical: 'Focus on technical questions specific to the role that test hard skills, tools, technologies, methodologies, coding abilities, and domain expertise.',
      
      mixed: `Create a balanced mix that comprehensively assesses the candidate:
      
      IMPORTANT: The FIRST question MUST be a self-introduction question such as:
      - "Tell me about yourself"
      - "Can you introduce yourself and walk me through your background?"
      
      Then include:
      - 2-3 behavioral questions (teamwork, conflict, past experiences)
      - 2 analytical questions (problem-solving, logical thinking)
      - 2-3 technical questions (role-specific skills and knowledge)`
    };

    // Build difficulty instructions
    const difficultyInstructions = {
      basic: 'Keep questions at an entry-level difficulty suitable for candidates with 0-2 years of experience. Focus on fundamental concepts, basic scenarios, and foundational knowledge.',
      intermediate: 'Create questions at a mid-level difficulty suitable for candidates with 2-5 years of experience. Include moderately complex scenarios and require practical application of knowledge.',
      advanced: 'Design challenging questions suitable for senior candidates with 5+ years of experience. Include complex scenarios, strategic thinking, leadership situations, and deep technical knowledge.'
    };

    const systemPrompt = `You are an expert interview question generator. Generate exactly 7 interview questions based on the following criteria:

Job Description: ${jobDescription}

Question Type: ${questionType.toUpperCase()}
${typeInstructions[questionType as keyof typeof typeInstructions]}

Difficulty Level: ${difficultyLevel.toUpperCase()}
${difficultyInstructions[difficultyLevel as keyof typeof difficultyInstructions]}

Requirements:
- Generate EXACTLY 7 questions
${questionType === 'behavioral' || questionType === 'mixed' 
  ? '- Question #1 MUST be a self-introduction question (e.g., "Tell me about yourself", "Walk me through your background", "Introduce yourself")'
  : ''}
- Each question should be clear, specific, and relevant to the job description
- Match the specified question type and difficulty level
- Questions should be open-ended and encourage detailed responses
- Avoid yes/no questions
- Make questions realistic and commonly asked in real interviews
- Maintain proper ordering (introduction first for behavioral/mixed types)

Return ONLY valid JSON — no markdown, no code fences, no explanations.

Format: ["question 1", "question 2", "question 3", "question 4", "question 5", "question 6", "question 7"]`;

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
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Create ${questionType} interview questions at ${difficultyLevel} difficulty level for: ${JSON.stringify(jobDescription)}.
            ${questionType === 'behavioral' || questionType === 'mixed' 
              ? 'Remember: Start with a self-introduction question as the first question.' 
              : ''}`
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
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

      let questions = JSON.parse(content)
      
      // Validate we got exactly 7 questions
      if (!Array.isArray(questions) || questions.length !== 7) {
        console.error("Invalid number of questions generated:", questions.length)
        return new Response(
          JSON.stringify({
            success: false,
            error: "Failed to generate exactly 7 questions",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        )
      }

      // Fallback: Ensure first question is introduction for behavioral/mixed types
      if (questionType === 'behavioral' || questionType === 'mixed') {
        const introKeywords = ['tell me about yourself', 'introduce yourself', 'walk me through', 'your background', 'your resume', 'professional journey'];
        const firstQuestionLower = questions[0].toLowerCase();
        const hasIntroQuestion = introKeywords.some(keyword => firstQuestionLower.includes(keyword));
        
        if (!hasIntroQuestion) {
          // Insert a default introduction question at the start
          const introQuestion = difficultyLevel === 'basic' 
            ? "Tell me about yourself and your background."
            : difficultyLevel === 'intermediate'
            ? "Can you walk me through your professional background and what brings you to this role?"
            : "Tell me about yourself, your professional journey, and what has shaped your career path so far.";
          
          questions = [introQuestion, ...questions.slice(0, 6)]; // Keep it to 7 questions
        }
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          questions,
          metadata: {
            questionType,
            difficultyLevel
          }
        }),
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