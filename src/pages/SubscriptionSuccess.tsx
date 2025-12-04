import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    const verifySubscription = async () => {
      try {
        console.log('Verifying session:', sessionId);
        
        // Wait for webhook to process (give it a few seconds)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Check if subscription was created
        const { data: sub, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .in('status', ['active', 'trialing'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (subError) {
          console.error('Error fetching subscription:', subError);
          throw new Error('Failed to verify subscription');
        }

        if (!sub) {
          // Subscription not created yet, wait a bit more
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Try again
          const { data: sub2, error: subError2 } = await supabase
            .from('subscriptions')
            .select('*')
            .in('status', ['active', 'trialing'])
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (subError2 || !sub2) {
            throw new Error('Subscription is being processed. Please check your email for confirmation.');
          }
          
          setSubscription(sub2);
        } else {
          setSubscription(sub);
        }

        setLoading(false);
      } catch (err) {
        console.error('Verification error:', err);
        setError(err instanceof Error ? err.message : 'Failed to verify subscription');
        setLoading(false);
      }
    };

    verifySubscription();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Processing your subscription...</p>
          <p className="text-sm text-slate-500 mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Received</h1>
          <p className="text-slate-600 mb-6">
            {error}
          </p>
          <p className="text-sm text-slate-500 mb-6">
            If you don't receive confirmation within 10 minutes, please contact support.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
            >
              Back to Pricing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Welcome to TechREADY! 🎉
        </h1>
        <p className="text-slate-600 mb-6">
          Your subscription is now active. You have a 3-day free trial starting now.
        </p>
        
        {subscription && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-slate-900 mb-2">Subscription Details:</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Plan: <span className="font-semibold capitalize">{subscription.subscription_tier}</span></li>
              <li>• Status: <span className="font-semibold capitalize">{subscription.status}</span></li>
              {subscription.trial_end && (
                <li>• Trial ends: {new Date(subscription.trial_end).toLocaleDateString()}</li>
              )}
            </ul>
          </div>
        )}

        <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-slate-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>✓ Start your first mock interview</li>
            <li>✓ Generate your personalized roadmap</li>
            <li>✓ Analyze your CV with AI</li>
            <li>✓ Track your progress</li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          Go to Dashboard
        </button>

        <p className="text-xs text-slate-500 mt-4">
          A confirmation email has been sent to your inbox
        </p>
      </div>
    </div>
  );
}