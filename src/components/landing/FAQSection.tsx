import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How does MockITHub work?',
    answer: 'MockITHub is an online AI-powered interview platform that simulates real job interviews. You select your job role, interview type, and experience level, and the AI conducts a realistic mock interview while analyzing your answers in real time.',
  },
  {
    question: 'Is MockITHub an AI interview platform?',
    answer: 'Yes. MockITHub uses advanced AI to ask interview questions, evaluate your responses, analyze communication skills, and provide instant, data-driven feedback after each session.',
  },
  {
    question: 'What types of interviews can I practice on MockITHub?',
    answer: 'You can practice technical interviews, behavioral interviews, HR rounds, system design interviews, and role-specific interviews tailored to your job profile.',
  },
  {
    question: 'How long is an AI mock interview session?',
    answer: 'Most AI mock interview sessions last between 30 to 60 minutes, depending on the interview type you choose. You can also take shorter focused practice sessions.',
  },
  {
    question: 'Do I receive feedback after the interview?',
    answer: 'Yes. After each session, MockITHub provides detailed AI-generated feedback including strengths, weaknesses, answer quality, confidence level, communication clarity, and improvement suggestions.',
  },
  {
    question: 'Can I practice interviews unlimited times?',
    answer: 'With MockITHub, you can take multiple mock interviews to continuously improve your skills. Your past interview data and performance reports help you track progress over time.',
  },
  {
    question: 'Does MockITHub support different job roles and experience levels?',
    answer: 'Yes. MockITHub customizes interview questions based on your selected job role, technology stack, and experience level—from freshers to experienced professionals.',
  },
  {
    question: 'Is MockITHub suitable for students and working professionals?',
    answer: 'MockITHub is designed for students, job seekers, and working professionals preparing for placements, job switches, internships, and high-stakes interviews.',
  },
  {
    question: 'Are the interviews conducted online?',
    answer: 'Yes. All interviews are conducted completely online using AI, allowing you to practice anytime and from anywhere without scheduling with a human interviewer.',
  },
  {
    question: 'Is MockITHub free to use?',
    answer: 'MockITHub offers free AI mock interviews with optional premium features for advanced analytics, detailed reports, and personalized interview preparation.',
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
