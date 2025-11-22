// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { questionId, questionText, userPick, userPickText, optionsBlock } = await req.json();

    // Build prompt
    const prompt = `
You are an objective career coach. Do not praise or flatter.

Question: "${questionText}"
Options:
${optionsBlock}
User selected: ${userPick} — "${userPickText}"

Return a short structured explanation:
1) First line:
   - If user's choice is strongest → "You chose the stronger approach: <LETTER> — <short rationale>"
   - Otherwise → "Stronger approach: <LETTER> — <short rationale>"
2) Then 2–3 bullets (each ≤ 10 words)
3) End with: "Try: <one action>"
`.trim();

    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: "Provide explanation. Keep it short and structured." },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 400,
    };

    // Call OpenAI
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
      console.error("OpenAI API Error:", data);
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || "OpenAI request failed" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: openaiResponse.status }
      );
    }

    const raw = data?.choices?.[0]?.message?.content ?? "";
    let text = raw;

    // Clean accidental code fences
    text = text
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '');

    return new Response(
      JSON.stringify({ success: true, text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error("Function Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Internal server error" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
