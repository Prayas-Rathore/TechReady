import { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import BillingToggle from '../components/pricing/BillingToggle';
import PricingCard from '../components/pricing/PricingCard';
import FeatureComparisonTable from '../components/pricing/FeatureComparisonTable';
import TestimonialCarousel from '../components/pricing/TestimonialCarousel';
import FAQSection from '../components/pricing/FAQSection';
import TrustIndicators from '../components/pricing/TrustIndicators';
import OneTimePurchases from '../components/pricing/OneTimePurchases';
import PaymentModal from '../components/pricing/PaymentModal';
import { pricingTiers, oneTimePurchases, testimonials, faqs, PricingTier, OneTimePurchase } from '../data/pricingData';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PricingTier | OneTimePurchase | null>(null);
  const [itemType, setItemType] = useState<'subscription' | 'purchase'>('subscription');

  const handleSelectPlan = (tier: PricingTier) => {
    if (tier.ctaText === 'Contact Sales') {
      window.location.href = 'mailto:sales@interviewpro.com';
      return;
    }
    setSelectedItem(tier);
    setItemType('subscription');
    setIsModalOpen(true);
  };

  const handlePurchase = (purchase: OneTimePurchase) => {
    setSelectedItem(purchase);
    setItemType('purchase');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-slate-900">Limited Time Offer - 33% Off Annual Plans</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Choose Your Path to Success
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto">
            Join 10,000+ developers who landed their dream jobs
          </p>

          <div className="flex items-center justify-center gap-2 text-slate-600 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span>from 3,451 reviews</span>
          </div>

          <BillingToggle billingPeriod={billingPeriod} onToggle={setBillingPeriod} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map(tier => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingPeriod={billingPeriod}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <FeatureComparisonTable tiers={pricingTiers} onSelectPlan={handleSelectPlan} />
      </div>

      <TrustIndicators />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <OneTimePurchases purchases={oneTimePurchases} onPurchase={handlePurchase} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <TestimonialCarousel testimonials={testimonials} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <FAQSection faqs={faqs} />
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your free trial today. No credit card required.
          </p>
          <button
            onClick={() => handleSelectPlan(pricingTiers[1])}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            Get Started Free →
          </button>
          <p className="text-sm text-blue-100 mt-4">
            Join 10,000+ developers who are already succeeding
          </p>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItem={selectedItem}
        billingPeriod={billingPeriod}
        itemType={itemType}
      />
    </div>
  );
}
