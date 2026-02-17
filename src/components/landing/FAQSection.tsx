import { useState, memo, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is MockITHub?',
    answer:
      'MockITHub is an AI-powered tech career preparation platform that helps you search for roles, optimise your CV, generate applications, practise interviews, and follow a personalised roadmap to become interview-ready and grow on the job.',
  },
  {
    question: 'Who is MockITHub designed for?',
    answer: (
      <ul className="list-disc list-inside space-y-1">
        <li>Students and graduates</li>
        <li>Early-career tech professionals</li>
        <li>Career switchers</li>
        <li>Professionals preparing for interviews or promotions</li>
      </ul>
    ),
  },
  {
    question: 'How does the Interview Mindset Roadmap work?',
    answer:
      'The roadmap gives you a personalised plan from today to interview-ready. It breaks preparation into manageable daily tasks, milestones, and confidence-building exercises.',
  },
  {
    question: 'How does the CV Optimizer help me?',
    answer: (
      <>
        <p className="mb-2">Our AI analyses your CV against real job descriptions to:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Improve ATS compatibility</li>
          <li>Align keywords with job requirements</li>
          <li>Strengthen structure and clarity</li>
        </ul>
        <p>You stay in control of your final CV.</p>
      </>
    ),
  },
  {
    question: 'Can MockITHub generate cover letters and emails?',
    answer: (
      <>
        <p className="mb-2">Yes. The AI Drafter creates role-specific:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Cover letters</li>
          <li>LinkedIn messages</li>
          <li>Application emails</li>
          <li>Follow-up emails</li>
        </ul>
        <p>All generated in seconds based on the job description.</p>
      </>
    ),
  },
  {
    question: 'How do AI mock interviews work?',
    answer:
      'You practise interview questions based on real job descriptions. The system evaluates your responses and provides real-time feedback on structure, clarity, and relevance.',
  },
  {
    question: 'What are STAR interview scenarios?',
    answer:
      'STAR (Situation, Task, Action, Result) is a method used to answer behavioural questions. MockITHub helps you practise STAR-based scenarios and improve answer structure.',
  },
  {
    question: "Does MockITHub guarantee I'll get a job?",
    answer:
      'No. MockITHub provides preparation tools and guidance, but job offers depend on many factors including market conditions, experience, and employer decisions.',
  },
  {
    question: 'Can I practise with real people?',
    answer:
      'Yes. Through the Buddy Connector, you can explore feeds and practise interview scenarios via live mock interview voice calls.',
  },
  {
    question: 'What happens after I land a job?',
    answer: (
      <>
        <p className="mb-2">You can continue using the Post-Job Roadmap to:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Stay consistent</li>
          <li>Build new skills</li>
          <li>Track professional growth</li>
        </ul>
        <p>MockITHub supports you beyond just getting hired.</p>
      </>
    ),
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. We use encrypted systems, secure hosting, and strict access controls. Payment information is processed securely through providers like Stripe.',
  },
  {
    question: 'Is my CV used to train AI?',
    answer:
      'No. Your personal data is not used for AI training without your explicit consent.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes. You can cancel at any time from your account settings. Your access will continue until the end of your billing cycle.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Because MockITHub provides instant digital access, refunds are only available if no paid features have been used. Full details are available in our Terms of Service.',
  },
  {
    question: 'How do I contact support?',
    answer: (
      <>
        <p className="mb-2">You can reach our support team at:</p>
        <a
          href="mailto:support@mockithub.ai"
          className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
        >
          📧 support@mockithub.ai
        </a>
        <p className="mt-2">We aim to respond promptly to all queries.</p>
      </>
    ),
  },
  {
    question: 'Do I need technical experience to use MockITHub?',
    answer:
      "No. MockITHub is designed to guide you step-by-step. Whether you're a beginner, graduate, or experienced professional, the roadmap adapts to your level.",
  },
  {
    question: 'How personalised is the platform?',
    answer: (
      <>
        <p className="mb-2">MockITHub personalises your experience based on your:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Career goals</li>
          <li>Experience level</li>
          <li>Job descriptions you upload</li>
          <li>Interview performance</li>
        </ul>
        <p>Your roadmap and feedback evolve as you progress.</p>
      </>
    ),
  },
  {
    question: 'Can I use MockITHub for multiple job applications?',
    answer:
      'Yes. You can optimise your CV and generate tailored applications for different job descriptions as often as your plan allows.',
  },
  {
    question: 'Does MockITHub work on mobile devices?',
    answer:
      'Yes. MockITHub is accessible via modern web browsers on desktop, laptop, tablet, and mobile devices. Some features (like live voice calls) work best on stable internet connections — preferably desktop or laptop.',
  },
  {
    question: 'What makes MockITHub different from other career platforms?',
    answer: (
      <>
        <p className="mb-2">MockITHub combines:</p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>Job filtering</li>
          <li>CV optimisation</li>
          <li>AI Cover Letter & Email Generator</li>
          <li>STAR Scenario Practice</li>
          <li>AI interview simulations</li>
          <li>Live Peer Voice Practice</li>
          <li>Personalised daily roadmaps</li>
          <li>Post-Job Growth roadmap</li>
        </ul>
        <p>All in one structured system — from job search to post-job growth.</p>
      </>
    ),
  },
];

const FAQItem = memo(({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all hover:border-white/20">
    <button
      onClick={() => onToggle(index)}
      className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="text-lg font-semibold text-white pr-8">
        {faq.question}
      </span>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        {isOpen ? (
          <Minus className="w-5 h-5 text-purple-400" />
        ) : (
          <Plus className="w-5 h-5 text-purple-400" />
        )}
      </div>
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}
    >
      <div className="px-8 pb-6 text-slate-400 leading-relaxed">
        {faq.answer}
      </div>
    </div>
  </div>
));

FAQItem.displayName = 'FAQItem';

const FAQSection = memo(() => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="faq" className="relative py-20 lg:py-32 bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about MockITHub
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openFaqIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@mockithub.ai"
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg transition-colors"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

export default FAQSection;