import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ } from '../../data/pricingData';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-slate-600 text-center mb-8">
        Everything you need to know about our plans
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
              {expandedIndex === index ? (
                <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>

            {expandedIndex === index && (
              <div className="px-5 pb-5 pt-0">
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-600 mb-4">Still have questions?</p>
        <button className="text-blue-600 font-semibold hover:underline">
          Contact our support team →
        </button>
      </div>
    </div>
  );
}
