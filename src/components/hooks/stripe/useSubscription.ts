import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../../services/SupabaseClient'

export interface Subscription {
  id: string
  subscription_tier: string
  status: string
  trial_end: string | null
  current_period_end: string
  cancel_at_period_end: boolean
}

export const useSubscription = () => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return null
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .in('status', ['active', 'trialing'])
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        console.error('Subscription query error:', error)
        throw error
      }
      
      return data as Subscription | null
    },
  })
}

export const useCreateCheckout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ priceId, tier }: { priceId: string; tier: string }) => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session?.user) {
        throw new Error('You must be logged in to subscribe. Please log in and try again.')
      }

      console.log('🔒 Creating checkout via Edge Function')
      console.log('Request:', { priceId, tier })

      const { data, error } = await supabase.functions.invoke(
        'create-checkout',
        {
          body: { priceId, tier },
        }
      )

      if (error) {
        console.error('Edge function error:', error)
        throw new Error(error.message || 'Failed to create checkout session')
      }

      if (!data?.url) {
        console.error('Invalid response:', data)
        throw new Error('No checkout URL returned')
      }

      console.log('✅ Checkout URL received, redirecting...')
      window.location.href = data.url
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
    },
  })
}