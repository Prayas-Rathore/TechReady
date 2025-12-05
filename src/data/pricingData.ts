export interface PricingFeature {
  text: string;
  included: boolean;
  bold?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  savings: number;
  badge: string | null;
  popular: boolean;
  ctaText: string;
  ctaStyle: 'primary' | 'secondary';
  features: PricingFeature[];
}

export interface OneTimePurchase {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  icon: string;
  deliveryTime: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  outcome: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'prod_TWY7vE5NGDjMYE',
    name: 'Basic',
    tagline: 'Basic Plan',
    monthlyPrice: 14.99,
    annualPrice: 149,
    savings: 79,
    badge: null,
    popular: false,
    ctaText: 'Start Free Trial',
    ctaStyle: 'secondary',
    features: [
      { text: 'Detailed 16-week roadmap', included: true },
      { text: '150+ personalized LeetCode problems', included: true },
      { text: '500+ interview questions', included: true },
      { text: 'Progress tracking dashboard', included: true },
      { text: 'Weekly progress reports', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'AI mock interviews', included: false },
      { text: 'Expert mentor sessions', included: false },
      { text: 'Resume review', included: false },
      { text: 'Company-specific prep', included: false }
    ]
  },
  {
    id: 'prod_TWY5iscQfEziK1',
    name: 'Starter',
    tagline: 'Most Popular - Best Value',
    monthlyPrice: 19.99,
    annualPrice: 399,
    savings: 189,
    badge: 'MOST POPULAR',
    popular: true,
    ctaText: 'Start Free Trial',
    ctaStyle: 'primary',
    features: [
      { text: 'Everything in Pro, PLUS:', included: true, bold: true },
      { text: '5 AI mock interviews/month', included: true },
      { text: '2 expert mentor sessions/month', included: true },
      { text: 'Resume review by FAANG engineers', included: true },
      { text: 'LinkedIn profile optimization', included: true },
      { text: 'Company-specific interview prep', included: true },
      { text: 'Salary negotiation guides', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Premium community access', included: true },
      { text: 'Priority support (24hr)', included: true }
    ]
  },
  {
    id: 'prod_TWY5qoq61HT7BO',
    name: 'Pro',
    tagline: 'For executives & urgent seekers',
    monthlyPrice: 29.99,
    annualPrice: 799,
    savings: 389,
    badge: 'VIP',
    popular: false,
    ctaText: 'Everything in Pro',
    ctaStyle: 'secondary',
    features: [
      { text: 'Everything in Premium, PLUS:', included: true, bold: true },
      { text: 'Unlimited AI mock interviews', included: true },
      { text: '8 mentor sessions/month (weekly)', included: true },
      { text: 'Dedicated career coach', included: true },
      { text: 'Personal accountability partner', included: true },
      { text: 'Resume distribution to partners', included: true },
      { text: 'Interview scheduling assistance', included: true },
      { text: 'White-glove service', included: true },
      { text: 'Exclusive FAANG engineer Q&As', included: true },
      { text: '1-year job guarantee program*', included: true }
    ]
  }
];

export const oneTimePurchases: OneTimePurchase[] = [
  {
    name: 'Resume Review',
    price: 29,
    description: 'Ex-FAANG recruiter feedback on your resume',
    icon: '📄',
    deliveryTime: '48 hours'
  },
  {
    name: 'Mock Interview Pack',
    price: 49,
    originalPrice: 69,
    description: '3 AI-powered mock interviews with detailed feedback',
    icon: '🎤',
    deliveryTime: 'Instant access'
  },
  {
    name: 'Custom LeetCode Roadmap',
    price: 19,
    description: 'Personalized 150-problem list based on your goals',
    icon: '📚',
    deliveryTime: '24 hours'
  },
  {
    name: 'System Design Guide',
    price: 39,
    description: 'Complete system design interview preparation',
    icon: '🏗️',
    deliveryTime: 'Instant download'
  }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Software Engineer',
    company: 'Google',
    image: 'placeholder',
    rating: 5,
    text: 'This platform helped me land my dream job at Google! The personalized roadmap and mock interviews were game-changers.',
    outcome: 'Landed Google L4 ($320k/year)'
  },
  {
    name: 'John Davis',
    role: 'Senior Developer',
    company: 'Amazon',
    image: 'placeholder',
    rating: 5,
    text: 'I went from struggling with LeetCode to solving mediums confidently in just 8 weeks. The mentor sessions were incredibly valuable.',
    outcome: 'Promoted to SDE2 ($210k/year)'
  },
  {
    name: 'Lisa Kumar',
    role: 'Tech Lead',
    company: 'Meta',
    image: 'placeholder',
    rating: 5,
    text: 'The company-specific prep helped me understand exactly what Meta was looking for. Worth every penny!',
    outcome: 'Landed Meta E4 ($280k/year)'
  },
  {
    name: 'Michael Chen',
    role: 'Backend Engineer',
    company: 'Netflix',
    image: 'placeholder',
    rating: 5,
    text: 'The Elite plan was worth every dollar. My dedicated coach helped me negotiate a $40k salary increase!',
    outcome: 'Netflix Senior Engineer ($350k/year)'
  }
];

export const faqs: FAQ[] = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! You can cancel your subscription at any time. No questions asked, no cancellation fees.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) through our secure Stripe integration.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Get 7 days free with any subscription. No credit card required to start.'
  },
  {
    question: 'Do you offer refunds?',
    answer: "Absolutely! We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund you in full."
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes! Students get 40% off any plan. Just verify your student status with your .edu email.'
  },
  {
    question: 'How do mentor sessions work?',
    answer: 'Mentor sessions are 45-minute 1-on-1 video calls with experienced engineers from FAANG companies. You can schedule them at your convenience.'
  },
  {
    question: 'What is the job guarantee program?',
    answer: 'Elite plan members who complete the full program and don\'t land a job within 1 year are eligible for a full refund. Terms and conditions apply.'
  }
];
