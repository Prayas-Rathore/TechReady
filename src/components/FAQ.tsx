import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does MockitHub work?',
    answer: 'MockitHub lets you choose your interview type, start a realistic AI-powered mock session, and practice anytime. After every session, you get instant feedback and clear improvement tips to help you perform better.',
  },
  {
    question: 'Who runs the mock interviews?',
    answer: 'MockitHub uses AI trained on real interviews and industry hiring patterns to deliver realistic mock interview experiences. You get expert-level questions, follow-ups, and feedback designed to prepare you like top candidates .',
  },
  {
    question: 'What interview types I can practice?',
    answer: 'Practice technical, HR, behavioural, system design, and company-specific interviews — all in one powerful AI-driven platform built for real results',
  },
  {
    question: 'How long are the mock interview sessions?',
    answer: 'Each mock interview lasts 30–60 minutes and is designed to feel like a real company interview, complete with live questioning and instant feedback.',
  },
  {
    question: 'Can I reschedule or cancel a session?',
    answer: 'Yes — you can reschedule or cancel any session up to 24 hours before your slot. No penalties, no hassle. Your preparation stays flexible.',
  },
  {
    question: 'Is there a free trial?',
    answer: ': Yes — you get a free mock interview to experience MockitHub in action, complete with real-time feedback and performance insights.',
  },
  {
    question: 'How does AI feedback help me?',
    answer: 'You get powerful, instant feedback that exposes your weak points and gives you clear, actionable steps to improve faster and perform better',
  },
  {
    question: 'Are my sessions recorded?',
    answer: 'Yes — your sessions are recorded (with your consent) so you can rewatch, analyze, and improve. All recordings stay private inside your MockitHub dashboard.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Everything You're Wondering (FAQs)
          </h2>
          <p className="text-xl text-slate-600">
            Quick answers to everything you need to know about MockitHub.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden transition-all hover:border-sky-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-semibold text-slate-900 pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-sky-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-sky-600" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:bertvanspall@gmail.com"
            className="text-sky-600 hover:text-sky-700 font-semibold text-lg"
          >
            Contact our support team →
          </a>

          
        </div>
      </div>
    </section>
  );
}
