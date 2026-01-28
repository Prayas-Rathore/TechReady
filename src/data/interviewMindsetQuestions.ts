// Interview Mindset Questions for AI Roadmap Generation

export interface Question {
  id: string;
  question: string;
  type: 'single' | 'multi' | 'scale' | 'text';
  options?: string[];
  scaleLabels?: { [key: number]: string };
  required: boolean;
  hasOther?: boolean;
}

export const interviewMindsetQuestions: Question[] = [
  {
    id: 'career_stage',
    question: 'Where are you currently in your career?',
    type: 'single',
    options: [
      'Student / Final-year student',
      'Recent graduate (0–1 years)',
      'Early-career professional (1–3 years)',
      'Mid-career professional (3+ years)',
      'Senior-career professional (8+ years)',
      'Career switcher into tech',
      'Re-entering the workforce'
    ],
    required: true
  },
  {
    id: 'target_role',
    question: 'What type of role are you preparing for?',
    type: 'multi',
    options: [
      'Software Developer / Engineer',
      'QA / Testing',
      'Data / Analytics',
      'IT Support / Helpdesk',
      'Product / Business Analyst',
      'Cloud / DevOps',
      'Cybersecurity',
      'Other'
    ],
    hasOther: true,
    required: true
  },
  {
    id: 'experience_level',
    question: 'How much experience do you have in this field?',
    type: 'single',
    options: [
      'No professional experience',
      'Projects / internships only',
      '1–3 years experience',
      '4–7 years experience',
      '8+ years experience'
    ],
    required: true
  },
  {
    id: 'confidence_level',
    question: 'How confident do you feel about interviews right now?',
    type: 'scale',
    scaleLabels: {
      1: 'Very nervous',
      2: 'Not confident',
      3: 'Neutral',
      4: 'Somewhat confident',
      5: 'Very confident'
    },
    required: true
  },
  {
    id: 'biggest_struggles',
    question: 'What do you struggle with the most?',
    type: 'multi',
    options: [
      'Knowing how to answer interview questions',
      'Explaining my experience clearly',
      'Technical interview questions',
      'Behavioural questions',
      'Confidence / nervousness',
      'CV not getting shortlisted',
      'Not knowing what recruiters want',
      'Fear of rejection'
    ],
    required: true
  },
  {
    id: 'interview_experience',
    question: 'How many interviews have you done so far?',
    type: 'single',
    options: [
      'None yet',
      '1–3',
      '4–7',
      '8+'
    ],
    required: true
  },
  {
    id: 'application_status',
    question: 'What best describes your current situation?',
    type: 'single',
    options: [
      'Haven\'t started applying yet',
      'Applying but no responses',
      'Getting interviews but no offers',
      'Actively interviewing',
      'Offer received (want to improve performance)'
    ],
    required: true
  },
  {
    id: 'preparation_style',
    question: 'How do you prefer to prepare?',
    type: 'single',
    options: [
      'Practice-heavy (mock interviews)',
      'Short daily tasks',
      'Peer support / buddy system',
      'A mix of everything'
    ],
    required: true
  },
  {
    id: 'time_commitment',
    question: 'How much time can you realistically spend per day?',
    type: 'single',
    options: [
      '10–30 minutes',
      '30–60 minutes',
      '1 hour+'
    ],
    required: true
  },
  {
    id: 'short_term_goal',
    question: 'What is your main goal right now?',
    type: 'single',
    options: [
      'Land my first tech job',
      'Move into a better role/company',
      'Switch careers into tech',
      'Improve interview confidence',
      'Get consistent interview calls'
    ],
    required: true
  },
  {
    id: 'target_timeline',
    question: 'When do you want to be interview-ready?',
    type: 'single',
    options: [
      'Within 2 weeks',
      '4 weeks',
      '8–12 weeks',
      'No fixed timeline'
    ],
    required: true
  },
  {
    id: 'support_preference',
    question: 'What kind of support helps you most?',
    type: 'single',
    options: [
      'AI feedback',
      'Structured guidance',
      'Community / buddy support',
      'Self-practice tools',
      'A combination'
    ],
    required: true
  }
];