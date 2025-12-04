// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

declare const Deno: any;

serve(async (req: Request) => {
  console.log('🔔 Webhook request received')
  
  try {
    // Get signature from headers
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      console.error('❌ No Stripe signature header')
      return new Response(
        JSON.stringify({ error: 'No signature provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get environment variables
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    console.log('Checking environment variables...')
    console.log('STRIPE_SECRET_KEY:', stripeKey ? '✅ Set' : '❌ Missing')
    console.log('STRIPE_WEBHOOK_SECRET:', webhookSecret ? '✅ Set' : '❌ Missing')
    console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
    console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing')

    if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing required environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get raw body
    const body = await req.text()

    // Verify webhook signature using Stripe API
    console.log('Verifying webhook signature...')
    
    const encoder = new TextEncoder()
    const payloadData = encoder.encode(body)
    
    // Parse signature header
    const sigHeader = signature.split(',').reduce((acc: any, pair: string) => {
      const [key, value] = pair.split('=')
      acc[key] = value
      return acc
    }, {})

    const timestamp = sigHeader.t
    const signatures = sigHeader.v1 ? [sigHeader.v1] : []

    if (!timestamp || signatures.length === 0) {
      console.error('❌ Invalid signature format')
      return new Response(
        JSON.stringify({ error: 'Invalid signature format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Construct signed payload
    const signedPayload = `${timestamp}.${body}`
    
    // Compute expected signature
    const key = encoder.encode(webhookSecret)
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signatureBytes = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      encoder.encode(signedPayload)
    )
    
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Verify signature
    const isValid = signatures.some((sig: string) => sig === expectedSignature)

    if (!isValid) {
      console.error('❌ Invalid signature')
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ Signature verified')

    // Parse event
    const event = JSON.parse(body)
    console.log('📨 Event type:', event.type)
    console.log('📨 Event ID:', event.id)

    // Handle events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        console.log('Processing checkout.session.completed')
        console.log('Session ID:', session.id)
        console.log('Customer:', session.customer)
        console.log('Subscription:', session.subscription)

        if (!session.subscription || !session.customer) {
          console.log('⚠️ No subscription or customer in session')
          break
        }

        // Get subscription from Stripe
        console.log('Fetching subscription from Stripe...')
        const subResponse = await fetch(
          `https://api.stripe.com/v1/subscriptions/${session.subscription}`,
          {
            headers: { 'Authorization': `Bearer ${stripeKey}` }
          }
        )

        if (!subResponse.ok) {
          console.error('❌ Failed to fetch subscription')
          break
        }

        const subscription = await subResponse.json()
        console.log('✅ Subscription fetched:', subscription.id)

        // Prepare data
        const subscriptionData = {
          user_id: session.metadata?.supabase_user_id,
          stripe_customer_id: session.customer,
          stripe_subscription_id: subscription.id,
          stripe_price_id: subscription.items.data[0].price.id,
          subscription_tier: session.metadata?.tier || 'pro',
          status: subscription.status,
          trial_end: subscription.trial_end 
            ? new Date(subscription.trial_end * 1000).toISOString() 
            : null,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          created_at: new Date().toISOString()
        }

        console.log('Inserting subscription into database...')

        // Insert into database
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(subscriptionData)
        })

        if (!insertResponse.ok) {
          const error = await insertResponse.text()
          console.error('❌ Database insert failed:', error)
        } else {
          console.log('✅ Subscription saved to database')
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        console.log('Processing customer.subscription.updated:', subscription.id)

        const updateData = {
          status: subscription.status,
          trial_end: subscription.trial_end 
            ? new Date(subscription.trial_end * 1000).toISOString() 
            : null,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end || false,
          updated_at: new Date().toISOString(),
        }

        const updateResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(updateData)
          }
        )

        if (!updateResponse.ok) {
          console.error('❌ Update failed')
        } else {
          console.log('✅ Subscription updated')
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        console.log('Processing customer.subscription.deleted:', subscription.id)

        const deleteResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              status: 'canceled',
              updated_at: new Date().toISOString()
            })
          }
        )

        if (!deleteResponse.ok) {
          console.error('❌ Cancel failed')
        } else {
          console.log('✅ Subscription canceled')
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object

        console.log('Processing invoice.payment_failed')

        if (invoice.subscription) {
          const failResponse = await fetch(
            `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${invoice.subscription}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseServiceKey,
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({
                status: 'past_due',
                updated_at: new Date().toISOString()
              })
            }
          )

          if (!failResponse.ok) {
            console.error('❌ Payment failed update error')
          } else {
            console.log('✅ Payment failure recorded')
          }
        }
        break
      }

      default:
        console.log('ℹ️ Unhandled event type:', event.type)
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (err: any) {
    console.error('❌ Webhook error:', err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})