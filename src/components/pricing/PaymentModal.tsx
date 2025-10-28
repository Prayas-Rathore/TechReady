import { X, Lock, CreditCard, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { PricingTier, OneTimePurchase } from '../../data/pricingData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: PricingTier | OneTimePurchase | null;
  billingPeriod?: 'monthly' | 'annual';
  itemType: 'subscription' | 'purchase';
}

export default function PaymentModal({ isOpen, onClose, selectedItem, billingPeriod = 'annual', itemType }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !selectedItem) return null;

  const getPrice = () => {
    if (itemType === 'purchase') {
      return (selectedItem as OneTimePurchase).price;
    }
    const tier = selectedItem as PricingTier;
    return billingPeriod === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  };

  const getTitle = () => {
    if (itemType === 'purchase') {
      return (selectedItem as OneTimePurchase).name;
    }
    return `${(selectedItem as PricingTier).name} Plan - ${billingPeriod === 'monthly' ? 'Monthly' : 'Annual'}`;
  };

  const getSavings = () => {
    if (itemType === 'subscription' && billingPeriod === 'annual') {
      return (selectedItem as PricingTier).savings;
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const shouldSucceed = Math.random() > 0.1;

    if (shouldSucceed) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setLoading(false);
      }, 2000);
    } else {
      setError('Payment failed. Please check your card details and try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-600 mb-6">
            Your purchase has been completed. Check your email for details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Complete Your Purchase</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Item</span>
              <span className="font-semibold text-slate-900">{getTitle()}</span>
            </div>
            {getSavings() > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600">Annual Savings</span>
                <span className="font-semibold text-green-600">-${getSavings()}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-bold text-2xl text-slate-900">${getPrice()}</span>
              </div>
              {itemType === 'subscription' && (
                <p className="text-xs text-slate-500 text-right mt-1">
                  Billed {billingPeriod === 'monthly' ? 'monthly' : 'annually'}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Payment Method
              </label>
              <div className="border-2 border-slate-200 rounded-lg p-4 focus-within:border-blue-500 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Card number"
                    className="flex-1 outline-none text-slate-900"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="outline-none text-slate-900 border-t border-slate-200 pt-3"
                    required
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="outline-none text-slate-900 border-t border-slate-200 pt-3"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <Lock className="w-3 h-3" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Complete Purchase</span>
                </>
              )}
            </button>

            <p className="text-xs text-center text-slate-500">
              30-day money-back guarantee • Cancel anytime
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
