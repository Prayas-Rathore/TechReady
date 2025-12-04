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
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Decode JWT to get user ID
    const token = authHeader.replace('Bearer ', '')
    const payload = JSON.parse(atob(token.split('.')[1]))
    const userId = payload.sub

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    console.log('✅ User authenticated:', userId)

    const body = await req.json()
    const { priceId, tier } = body

    // Validate inputs
    if (!priceId || !priceId.startsWith('price_')) {
      return new Response(
        JSON.stringify({ error: 'Invalid price ID' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const validTiers = ['pro', 'premium', 'elite']
    if (!tier || !validTiers.includes(tier)) {
      return new Response(
        JSON.stringify({ error: 'Invalid tier' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Check if user already has active subscription
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    const checkSubResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${userId}&status=in.(active,trialing)&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        }
      }
    )

    const existingSubs = await checkSubResponse.json()

    if (existingSubs && existingSubs.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Already has active subscription' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get or create Stripe customer
    let customerId: string = ''

    const customerResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${userId}&select=stripe_customer_id&limit=1`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        }
      }
    )

    const customerRecords = await customerResponse.json()
    
    if (customerRecords && customerRecords.length > 0 && customerRecords[0].stripe_customer_id) {
      customerId = customerRecords[0].stripe_customer_id
      console.log('Using existing customer:', customerId)
    } else {
      // Create new Stripe customer
      const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
      
      // Get user email
      const userResponse = await fetch(
        `${supabaseUrl}/auth/v1/user`,
        {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': authHeader,
          }
        }
      )
      const userData = await userResponse.json()
      const userEmail = userData.email || ''

      const createCustomerResponse = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: userEmail,
          'metadata[supabase_user_id]': userId,
        }).toString(),
      })

      if (!createCustomerResponse.ok) {
        const errorData = await createCustomerResponse.json()
        throw new Error(errorData.error?.message || 'Failed to create Stripe customer')
      }

      const customer = await createCustomerResponse.json()
      customerId = customer.id
      console.log('Created new customer:', customerId)
    }

    // Ensure customerId exists
    if (!customerId) {
      throw new Error('Failed to get or create Stripe customer')
    }

    // Create Stripe checkout session
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    const origin = req.headers.get('origin') || 'http://localhost:5173'

    const sessionParams = new URLSearchParams({
      customer: customerId,
      mode: 'subscription',
      'payment_method_types[0]': 'card',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'subscription_data[trial_period_days]': '3',
      'subscription_data[metadata][supabase_user_id]': userId,
      'subscription_data[metadata][tier]': tier,
      success_url: `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      'metadata[supabase_user_id]': userId,
      'metadata[tier]': tier,
    })

    const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sessionParams.toString(),
    })

    if (!sessionResponse.ok) {
      const errorData = await sessionResponse.json()
      console.error('Stripe session error:', errorData)
      throw new Error(errorData.error?.message || 'Failed to create checkout session')
    }

    const session = await sessionResponse.json()
    console.log('✅ Checkout session created:', session.id)

    return new Response(
      JSON.stringify({ 
        sessionId: session.id, 
        url: session.url 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err: any) {
    console.error('❌ Function error:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})