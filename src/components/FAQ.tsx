import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does InterviewPro work?',
    answer: 'InterviewPro connects you with industry experts for 1-on-1 mock interviews. Simply choose your interview type, schedule a session at your convenience, and practice in a realistic environment. After each session, you receive detailed feedback and actionable insights to improve your performance.',
  },
  {
    question: 'Who are the interviewers?',
    answer: 'Our interviewers are experienced professionals from top tech companies like Google, Amazon, Microsoft, Meta, and more. They have conducted hundreds of real interviews and know exactly what hiring managers look for. Each interviewer is vetted and trained to provide constructive, helpful feedback.',
  },
  {
    question: 'What types of interviews can I practice?',
    answer: 'We offer mock interviews for various formats including technical coding interviews, system design, behavioral questions, HR rounds, case studies, and domain-specific interviews. You can practice for specific companies or general interview skills.',
  },
  {
    question: 'How long are the mock interview sessions?',
    answer: 'Standard mock interview sessions are 45-60 minutes long, similar to real interviews. This includes the interview itself and a feedback session. You can also book shorter 30-minute focused sessions for specific skills like resume review or quick practice rounds.',
  },
  {
    question: 'Can I reschedule or cancel a session?',
    answer: 'Yes, you can reschedule or cancel any session up to 24 hours before the scheduled time without any penalty. Cancellations made less than 24 hours in advance will count toward your monthly quota.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a free trial session so you can experience the quality of our mock interviews before committing to a paid plan. This includes one complete mock interview with feedback.',
  },
  {
    question: 'How will the feedback help me improve?',
    answer: 'After each session, you receive a detailed report covering your technical accuracy, communication skills, problem-solving approach, and areas for improvement. You also get access to recorded sessions, performance analytics over time, and personalized improvement plans.',
  },
  {
    question: 'Is my practice session recorded?',
    answer: 'Yes, all sessions are recorded (with your consent) so you can review your performance later. You have full access to your recordings through your dashboard. Recordings are private and only visible to you and your interviewer.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about InterviewPro
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
          <a href="#" className="text-sky-600 hover:text-sky-700 font-semibold text-lg">
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
