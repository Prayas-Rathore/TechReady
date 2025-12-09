import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How does InterviewPro work?',
    answer: 'InterviewPro connects you with industry experts for 1-on-1 mock interviews. Simply choose your interview type, schedule a session at your convenience, and practice in a realistic environment. After each session, you receive detailed feedback and actionable insights to improve your performance.',
  },
  {
    question: 'Who are the interviewers?',
    answer: 'Our interviewers are experienced professionals from top tech companies like Google, Amazon, Microsoft, Meta, and more. They have conducted hundreds of real interviews and know exactly what hiring managers look for.',
  },
  {
    question: 'What types of interviews can I practice?',
    answer: 'We offer mock interviews for various formats including technical coding interviews, system design, behavioral questions, HR rounds, case studies, and domain-specific interviews.',
  },
  {
    question: 'How long are the mock interview sessions?',
    answer: 'Standard mock interview sessions are 45-60 minutes long, similar to real interviews. This includes the interview itself and a feedback session. You can also book shorter 30-minute focused sessions.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a free trial session so you can experience the quality of our mock interviews before committing to a paid plan. This includes one complete mock interview with feedback.',
  },
];

export default function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 lg:py-32 bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about InterviewPro
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all hover:border-white/20"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center transition-transform ${
                  openFaqIndex === index ? 'rotate-180' : ''
                }`}>
                  {openFaqIndex === index ? (
                    <Minus className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-400" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Still have questions?
          </p>
          <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg transition-colors">
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
