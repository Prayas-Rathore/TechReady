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
    const { cvText } = await req.json();

    // Basic validation
    if (!cvText || cvText.trim().length < 100) {
      return new Response(
        JSON.stringify({
          success: false,
          isCV: false,
          confidence: 0,
          reason: 'Document too short or empty',
          documentType: 'invalid'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Use first 2500 characters for validation (cost-effective)
    const textSample = cvText.substring(0, 2500);

    console.log('Validating document with length:', textSample.length);

    // Call OpenAI for CV validation
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a CV/Resume validator. Determine if a document is a legitimate CV/Resume.

A valid CV/Resume MUST have:
1. Contact information (name, email, phone, or address)
2. Work experience OR education section with dates
3. Professional/career-related content
4. Skills or qualifications

REJECT these document types:
- Financial documents (invoices, receipts, bills, bank statements, purchase orders)
- Legal documents (contracts, agreements, terms and conditions, legal notices)
- Academic papers (research papers, essays, theses, dissertations, abstracts)
- Medical records (prescriptions, diagnoses, health reports, medical forms)
- Business reports (sales reports, analytics, quarterly reports, project reports)
- Technical manuals (user guides, documentation, installation guides)
- Random text, stories, or articles
- Marketing materials (brochures, advertisements, flyers)
- Government documents (tax forms, licenses, permits)

Respond ONLY with valid JSON:
{
  "isCV": true or false,
  "confidence": 0-100,
  "reason": "brief explanation why it is or isn't a CV",
  "documentType": "CV" or "invoice" or "report" or "legal" or "academic" or "medical" or "other"
}`
          },
          {
            role: 'user',
            content: `Analyze if this is a CV/Resume. Respond ONLY with JSON:\n\n${textSample}`
          }
        ],
        temperature: 0.1,
        max_tokens: 200,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error('OpenAI API request failed');
    }

    const openAIData = await openAIResponse.json();
    const aiResponse = openAIData.choices[0].message.content.trim();

    console.log('AI Response:', aiResponse);

    // Parse AI response
    let validation;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      validation = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      // Fallback parsing
      validation = {
        isCV: aiResponse.toLowerCase().includes('"iscv": true'),
        confidence: 50,
        reason: 'Could not parse AI response properly',
        documentType: 'unknown'
      };
    }

    console.log('Parsed validation:', validation);

    // Only accept if confidence is high enough (70% threshold)
    const isValid = validation.isCV === true && validation.confidence >= 70;

    return new Response(
      JSON.stringify({
        success: true,
        isCV: isValid,
        confidence: validation.confidence,
        reason: validation.reason,
        documentType: validation.documentType
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Validation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Validation failed',
        isCV: false,
        confidence: 0,
        reason: 'Server error during validation',
        documentType: 'error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});