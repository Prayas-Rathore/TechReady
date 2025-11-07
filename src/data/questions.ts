import { Question } from '../types/assessment';

export const questions: Question[] =[

  { 
    id: 'professional_status',
     section: 'Background',
     type: 'single',
      question: "What's your current professional status?",
       options: [
        'Junior Developer (0-1 years)',
        'Mid-Level Developer (1-3 years)'
       ] 
      },
  {
    id: 'growth_1',
    section: 'Growth Mindset, Confidence & Self-Awareness',
    type: 'single',
    question: "When my code or project doesn’t work, I usually:",
    options: [
      'Feel stressed and want to give up.',
      'Try to fix it a few times or ask a friend for help.',
      'Stay calm and figure out why it failed.'
    ]
  },
  {
    id: 'growth_2',
    section: 'Growth Mindset, Confidence & Self-Awareness',
    type: 'single',
    question: 'When someone gives me feedback on my project:',
    options: [
      'I feel bad or defensive.',
      'I think about it but sometimes ignore it.',
      'I use it to learn and improve my next attempt.'
    ]
  },
  {
    id: 'growth_3',
    section: 'Growth Mindset, Confidence & Self-Awareness',
    type: 'single',
    question: 'When I see classmates or peers doing better than me:',
    options: [
      'I feel discouraged.',
      'I compare to see what I can do differently.',
      'I feel inspired and motivated to learn more.'
    ]
  },
  {
    id: 'growth_4',
    section: 'Growth Mindset, Confidence & Self-Awareness',
    type: 'single',
    question: 'When I think “I’m not good enough for tech,” I usually:',
    options: [
      'Believe it’s true.',
      'Try to ignore the thought.',
      'Remind myself learning takes time and practice.'
    ]
  },
  {
    id: 'growth_5',
    section: 'Growth Mindset, Confidence & Self-Awareness',
    type: 'single',
    question: 'How comfortable are you asking questions in class, group chats, or online forums?',
    options: [
      'Very uncomfortable.',
      'A bit nervous but I still try.',
      'Confident and curious to ask.'
    ]
  },
  {
    id: 'growth_6',
    section: 'Growth Mindset, Confidence & Self-Awareness',
    type: 'single',
    question: 'When something doesn’t go as planned (like a project or exam):',
    options: [
      'I lose motivation for a while.',
      'I take a short break and come back later.',
      'I think about what I can control and improve next time.'
    ]
  },

  // Section 2: Technical Learning Style & Curiosity
  {
    id: 'learning_1',
    section: 'Technical Learning Style & Curiosity',
    type: 'single',
    question: 'How do you learn best when trying new technology?',
    options: [
      'By watching YouTube tutorials.',
      'By practicing through small projects.',
      'By explaining what I learned to others or posting about it.'
    ]
  },
  {
    id: 'learning_2',
    section: 'Technical Learning Style & Curiosity',
    type: 'single',
    question: 'When you face a problem you haven’t seen before:',
    options: [
      'I get anxious and wait for guidance.',
      'I try searching and testing simple ideas.',
      'I experiment and test different approaches.'
    ]
  },
  {
    id: 'learning_3',
    section: 'Technical Learning Style & Curiosity',
    type: 'single',
    question: 'How familiar are you with your chosen tech area (e.g., web, data, or AI)?',
    options: [
      'Still exploring what I like.',
      'I’ve learned the basics and done tutorials.',
      'I’ve built or contributed to small projects.'
    ]
  },
  {
    id: 'learning_4',
    section: 'Technical Learning Style & Curiosity',
    type: 'single',
    question: 'How often do you read blogs or watch talks about new tech topics?',
    options: [
      'Rarely.',
      'Sometimes.',
      'Often — I like learning what’s new.'
    ]
  },
  {
    id: 'learning_5',
    section: 'Technical Learning Style & Curiosity',
    type: 'single',
    question: 'When you get stuck during practice:',
    options: [
      'I panic or stop trying.',
      'I ask someone or check online help.',
      'I debug step by step and note what I learn.'
    ]
  },
  {
    id: 'learning_6',
    section: 'Technical Learning Style & Curiosity',
    type: 'single',
    question: 'How would you describe your technical confidence right now?',
    options: [
      'Unsure — I’m still figuring it out.',
      'Growing with each project.',
      'Curious and excited to try new things.'
    ]
  },

  // Section 3: Communication & Interview Readiness
  {
    id: 'communication_1',
    section: 'Communication & Interview Readiness',
    type: 'single',
    question: 'How do you feel before interviews, presentations, or networking events?',
    options: [
      'Very nervous.',
      'Nervous but I prepare.',
      'Confident and focused.'
    ]
  },
  {
    id: 'communication_2',
    section: 'Communication & Interview Readiness',
    type: 'single',
    question: 'If someone asks you to explain your project:',
    options: [
      'I struggle to find the right words.',
      'I describe the steps I took.',
      'I use simple examples to make it easy to understand.'
    ]
  },
  {
    id: 'communication_3',
    section: 'Communication & Interview Readiness',
    type: 'single',
    question: 'When someone disagrees with your idea in a group:',
    options: [
      'I stay quiet or change my idea.',
      'I explain my view politely.',
      'I listen and discuss both sides.'
    ]
  },
  {
    id: 'communication_4',
    section: 'Communication & Interview Readiness',
    type: 'single',
    question: 'During practice interviews or presentations:',
    options: [
      'I freeze when I forget something.',
      'I take a pause and continue.',
      'I stay calm and explain my thinking.'
    ]
  },
  {
    id: 'communication_5',
    section: 'Communication & Interview Readiness',
    type: 'single',
    question: 'How often do you practice introducing yourself professionally?',
    options: [
      'Never.',
      'Occasionally before interviews.',
      'Regularly — I’ve refined my pitch.'
    ]
  },
  {
    id: 'communication_6',
    section: 'Communication & Interview Readiness',
    type: 'single',
    question: 'If you don’t know an answer in an interview or class:',
    options: [
      'I panic or say “I don’t know.”',
      'I guess or say I’ll check later.',
      'I admit it and explain how I’d find out.'
    ]
  },

  // Mid Junior Developer Questions

   // 🌱 Section 1: Growth Mindset, Bias Awareness & Resilience
  {
    id: 'mid_growth_1',
    section: 'Growth Mindset, Bias Awareness & Resilience',
    type: 'single',
    question: 'How often do you step outside your comfort zone at work?',
    options: ['A. Rarely.', 'B. Occasionally.', 'C. Often.']
  },
  {
    id: 'mid_growth_2',
    section: 'Growth Mindset, Bias Awareness & Resilience',
    type: 'single',
    question:
      'What limits your confidence most — skill gaps, imposter thoughts, or perfectionism?',
    options: ['A. Skill gaps.', 'B. Imposter thoughts.', 'C. Perfectionism.']
  },
  {
    id: 'mid_growth_3',
    section: 'Growth Mindset, Bias Awareness & Resilience',
    type: 'single',
    question: 'How do you respond when a peer challenges your idea?',
    options: ['A. Withdraw.', 'B. Listen and adjust.', 'C. Facilitate discussion calmly.']
  },
  {
    id: 'mid_growth_4',
    section: 'Growth Mindset, Bias Awareness & Resilience',
    type: 'single',
    question: 'How regularly do you reflect on your performance and mental load?',
    options: ['A. Never.', 'B. Monthly.', 'C. Weekly.']
  },
  {
    id: 'mid_growth_5',
    section: 'Growth Mindset, Bias Awareness & Resilience',
    type: 'single',
    question:
      'How do you handle multiple feedback sources (peer, mentor, manager)?',
    options: ['A. Overwhelmed.', 'B. Reflect selectively.', 'C. Create actions and plan.']
  },
  {
    id: 'mid_growth_6',
    section: 'Growth Mindset, Bias Awareness & Resilience',
    type: 'single',
    question:
      'How open are you to being coached or attending mindset/work-skills workshops?',
    options: ['A. Hesitant.', 'B. Receptive.', 'C. Proactive.']
  },

  // 💻 Section 2: Technical Depth & Expertise
  {
    id: 'mid_tech_1',
    section: 'Technical Depth & Expertise',
    type: 'single',
    question:
      'How do you stay updated in your tech domain (newsletters, courses, projects)?',
    options: ['A. Rarely.', 'B. Occasionally.', 'C. Consistently.']
  },
  {
    id: 'mid_tech_2',
    section: 'Technical Depth & Expertise',
    type: 'single',
    question:
      'How do you debug complex issues — guess, logs, or structured analysis?',
    options: ['A. Guess.', 'B. Use logs.', 'C. Structured root-cause analysis.']
  },
  {
    id: 'mid_tech_3',
    section: 'Technical Depth & Expertise',
    type: 'single',
    question: 'How often do you automate repetitive tasks?',
    options: ['A. Never.', 'B. Occasionally.', 'C. Regularly.']
  },
  {
    id: 'mid_tech_4',
    section: 'Technical Depth & Expertise',
    type: 'single',
    question: 'How often do you experiment with new tools or frameworks?',
    options: ['A. Rarely.', 'B. Occasionally.', 'C. Frequently.']
  },

  // 🎤 Section 3: Interview & Communication Mastery
  {
    id: 'mid_comm_1',
    section: 'Interview & Communication Mastery',
    type: 'single',
    question: 'How do you prepare for interviews or internal promotions?',
    options: [
      'A. Reactively.',
      'B. Occasionally practice.',
      'C. Regular mock sessions + feedback.'
    ]
  },
  {
    id: 'mid_comm_2',
    section: 'Interview & Communication Mastery',
    type: 'single',
    question: 'How often do you present in technical or client meetings?',
    options: ['A. Rarely.', 'B. Occasionally.', 'C. Frequently.']
  },
  {
    id: 'mid_comm_3',
    section: 'Interview & Communication Mastery',
    type: 'single',
    question: 'How do you handle tricky or unexpected stakeholder questions?',
    options: [
      'A. Go blank.',
      'B. Try to answer.',
      'C. Ask clarifying questions and respond confidently.'
    ]
  },
  {
    id: 'mid_comm_4',
    section: 'Interview & Communication Mastery',
    type: 'single',
    question:
      'How often do you practice storytelling or presentation delivery?',
    options: ['A. Never.', 'B. Occasionally.', 'C. Routinely.']
  },
  {
    id: 'mid_comm_5',
    section: 'Interview & Communication Mastery',
    type: 'single',
    question:
      'How comfortable are you discussing failures or lessons-learned publicly?',
    options: [
      'A. Very uncomfortable.',
      'B. Somewhat comfortable.',
      'C. Comfortable and open.'
    ]
  },

  // 🧠 Section 4: On-the-Job Practical Mastery
  {
    id: 'mid_practical_1',
    section: 'On-the-Job Practical Mastery',
    type: 'single',
    question: 'How do you communicate blockers to management or clients?',
    options: [
      'A. Late or evasively.',
      'B. On time but defensively.',
      'C. Early, clearly, with action plan.'
    ]
  },
  {
    id: 'mid_practical_2',
    section: 'On-the-Job Practical Mastery',
    type: 'single',
    question: 'How well do you ensure documentation quality in your work?',
    options: ['A. Poor.', 'B. Adequate.', 'C. Excellent and reused.']
  },
  {
    id: 'mid_practical_3',
    section: 'On-the-Job Practical Mastery',
    type: 'single',
    question: 'How do you handle high-pressure deadlines?',
    options: ['A. Overwhelmed.', 'B. Manage okay.', 'C. Thrive under pressure.']
  },
  {
    id: 'mid_practical_4',
    section: 'On-the-Job Practical Mastery',
    type: 'single',
    question: 'How often do you mentor or support junior colleagues?',
    options: ['A. Seldom.', 'B. Sometimes.', 'C. Regularly.']
  },
  {
    id: 'mid_practical_5',
    section: 'On-the-Job Practical Mastery',
    type: 'single',
    question: 'Do you identify and propose process improvements?',
    options: ['A. Rarely.', 'B. Occasionally.', 'C. Frequently.']
  },
  {
    id: 'mid_practical_6',
    section: 'On-the-Job Practical Mastery',
    type: 'single',
    question: 'How do you balance speed and quality in your work?',
    options: [
      'A. Focus on speed only.',
      'B. Try to balance.',
      'C. Maintain quality with reasonable speed.'
    ]
  }
];
