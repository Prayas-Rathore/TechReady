// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

declare const Deno: any;

function toISO(unixTimestamp: any): string | null {
  if (!unixTimestamp || unixTimestamp === 0 || isNaN(unixTimestamp)) {
    return null;
  }
  try {
    const date = new Date(unixTimestamp * 1000);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString();
  } catch {
    return null;
  }
}

// Ensure required timestamp fields are NEVER null
function requireISO(unixTimestamp: any, fallback: Date): string {
  const result = toISO(unixTimestamp);
  if (result === null) {
    return fallback.toISOString();
  }
  return result;
}

serve(async (req: Request) => {
  console.log('📨 Webhook received')
  
  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response(JSON.stringify({ error: 'No signature' }), { status: 400 })
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Config error' }), { status: 500 })
    }

    const body = await req.text()
    const encoder = new TextEncoder()
    
    const sigHeader = signature.split(',').reduce((acc: any, pair: string) => {
      const [key, value] = pair.split('=')
      acc[key] = value
      return acc
    }, {})

    const timestamp = sigHeader.t
    const signatures = sigHeader.v1 ? [sigHeader.v1] : []

    if (!timestamp || signatures.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 })
    }

    const signedPayload = `${timestamp}.${body}`
    const key = encoder.encode(webhookSecret)
    const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const signatureBytes = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(signedPayload))
    const expectedSignature = Array.from(new Uint8Array(signatureBytes)).map(b => b.toString(16).padStart(2, '0')).join('')

    if (!signatures.some((sig: string) => sig === expectedSignature)) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 })
    }

    console.log('✅ Verified')

    const event = JSON.parse(body)
    console.log('Event:', event.type)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.supabase_user_id

        console.log('User ID:', userId)
        console.log('Subscription:', session.subscription)

        if (!userId || !session.subscription) {
          console.log('Missing user_id or subscription')
          break
        }

        const subResponse = await fetch(
          `https://api.stripe.com/v1/subscriptions/${session.subscription}`,
          { headers: { 'Authorization': `Bearer ${stripeKey}` } }
        )

        if (!subResponse.ok) {
          console.error('Failed to fetch subscription')
          break
        }

        const subscription = await subResponse.json()
        const tier = subscription.metadata?.tier || session.metadata?.tier || 'pro'

        console.log('Subscription fetched:', subscription.id)
        console.log('Status:', subscription.status)
        console.log('Period start:', subscription.current_period_start)
        console.log('Period end:', subscription.current_period_end)

        // Use requireISO for NOT NULL fields - GUARANTEES non-null value
        const now = new Date()
        const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

        const subscriptionData = {
          user_id: userId,
          stripe_customer_id: session.customer,
          stripe_subscription_id: subscription.id,
          stripe_price_id: subscription.items.data[0].price.id,
          subscription_tier: tier,
          status: subscription.status,
          trial_end: toISO(subscription.trial_end), // Can be null
          current_period_start: requireISO(subscription.current_period_start, now), // NEVER null
          current_period_end: requireISO(subscription.current_period_end, oneMonthLater), // NEVER null
          cancel_at_period_end: subscription.cancel_at_period_end || false,
          created_at: now.toISOString(),
          updated_at: now.toISOString()
        }

        console.log('Data to save:', JSON.stringify(subscriptionData, null, 2))

        const checkResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            headers: {
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
            }
          }
        )

        const existing = await checkResponse.json()
        
        if (existing && existing.length > 0) {
          console.log('Updating existing...')
          
          const updateResponse = await fetch(
            `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseServiceKey,
                'Authorization': `Bearer ${supabaseServiceKey}`,
              },
              body: JSON.stringify({
                status: subscriptionData.status,
                trial_end: subscriptionData.trial_end,
                current_period_start: subscriptionData.current_period_start,
                current_period_end: subscriptionData.current_period_end,
                cancel_at_period_end: subscriptionData.cancel_at_period_end,
                updated_at: subscriptionData.updated_at
              })
            }
          )

          if (updateResponse.ok) {
            console.log('✅ Updated')
          } else {
            const error = await updateResponse.text()
            console.error('Update error:', error)
          }
        } else {
          console.log('Inserting new...')

          const insertResponse = await fetch(`${supabaseUrl}/rest/v1/subscriptions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify(subscriptionData)
          })

          if (insertResponse.ok) {
            console.log('✅ Created')
          } else {
            const error = await insertResponse.text()
            console.error('Insert error:', error)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        const now = new Date()
        const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

        const updateData = {
          status: subscription.status,
          trial_end: toISO(subscription.trial_end),
          current_period_start: requireISO(subscription.current_period_start, now),
          current_period_end: requireISO(subscription.current_period_end, oneMonthLater),
          cancel_at_period_end: subscription.cancel_at_period_end || false,
          updated_at: now.toISOString(),
        }

        const updateResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify(updateData)
          }
        )

        if (updateResponse.ok) {
          console.log('✅ Updated')
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              status: 'canceled',
              updated_at: new Date().toISOString()
            })
          }
        )
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        if (invoice.subscription) {
          await fetch(
            `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${invoice.subscription}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseServiceKey,
                'Authorization': `Bearer ${supabaseServiceKey}`,
              },
              body: JSON.stringify({
                status: 'active',
                updated_at: new Date().toISOString()
              })
            }
          )
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        if (invoice.subscription) {
          await fetch(
            `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${invoice.subscription}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseServiceKey,
                'Authorization': `Bearer ${supabaseServiceKey}`,
              },
              body: JSON.stringify({
                status: 'past_due',
                updated_at: new Date().toISOString()
              })
            }
          )
        }
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })

  } catch (err: any) {
    console.error('Error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})