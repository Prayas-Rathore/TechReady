import { Question } from '../types/assessment';

export const questions: Question[] = [
  {
    id: 'professional_status',
    section: 'Background',
    type: 'single',
    question: "What's your current professional status?",
    options: [
      'Student',
      'Recent Graduate',
      'Junior Developer (0-2 years)',
      'Mid-Level Developer (3-5 years)',
      'Senior Developer (5+ years)',
      'Career Switcher',
      'Other'
    ]
  },
  {
    id: 'years_experience',
    section: 'Background',
    type: 'slider',
    question: 'How many years of professional tech experience do you have?',
    min: 0,
    max: 15
  },
  {
    id: 'target_role',
    section: 'Background',
    type: 'text',
    question: "What's your target role?",
    placeholder: 'e.g., Software Engineer, Frontend Developer...',
    options: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full-Stack Developer',
      'DevOps Engineer',
      'Data Engineer',
      'Product Manager',
      'Other'
    ]
  },
  {
    id: 'interview_timeline',
    section: 'Background',
    type: 'single',
    question: 'When are you planning to interview?',
    options: [
      'Within 1 month',
      '1-3 months',
      '3-6 months',
      '6+ months',
      'Just exploring'
    ]
  },
  {
    id: 'programming_languages',
    section: 'Technical Skills',
    type: 'multiple',
    question: 'Which programming languages are you comfortable with? (Select all)',
    options: [
      'JavaScript',
      'Python',
      'Java',
      'C++',
      'Go',
      'Rust',
      'TypeScript',
      'C#',
      'Other'
    ]
  },
  {
    id: 'confidence_areas',
    section: 'Technical Skills',
    type: 'rating',
    question: 'Rate your confidence in these areas (1-5 scale)',
    ratingLabels: [
      'Data Structures & Algorithms',
      'System Design',
      'Frontend Development',
      'Backend Development',
      'Databases'
    ]
  },
  {
    id: 'interview_experience',
    section: 'Technical Skills',
    type: 'single',
    question: 'Have you interviewed at tech companies before?',
    options: [
      'Never',
      '1-2 times',
      '3-5 times',
      '5+ times'
    ]
  },
  {
    id: 'biggest_challenge',
    section: 'Technical Skills',
    type: 'single',
    question: "What's your biggest challenge in technical interviews?",
    options: [
      'Solving coding problems under pressure',
      'Explaining my thought process',
      'System design questions',
      'Behavioral questions',
      'Time management',
      'Nervousness/anxiety'
    ]
  },
  {
    id: 'proud_project',
    section: 'Open-Ended',
    type: 'textarea',
    question: "Describe a technical project you're proud of (2-3 sentences)",
    minChars: 150,
    maxChars: 300,
    placeholder: 'Tell us about a project that showcases your skills and problem-solving abilities...'
  },
  {
    id: 'difficult_problem',
    section: 'Open-Ended',
    type: 'textarea',
    question: 'Tell us about a time you solved a difficult bug or problem',
    minChars: 150,
    maxChars: 300,
    placeholder: 'Describe the problem, your approach, and how you resolved it...'
  },
  {
    id: 'improvement_goals',
    section: 'Goals',
    type: 'multiple',
    question: 'What do you want to improve most?',
    options: [
      'Coding speed',
      'Problem-solving approach',
      'Communication skills',
      'System design thinking',
      'Behavioral interview answers',
      'Confidence'
    ]
  },
  {
    id: 'learning_preference',
    section: 'Goals',
    type: 'single',
    question: 'How do you prefer to learn?',
    options: [
      'Practice problems',
      'Video tutorials',
      'Mock interviews',
      'Reading articles/docs',
      'Peer discussion',
      'All of the above'
    ]
  }
];
