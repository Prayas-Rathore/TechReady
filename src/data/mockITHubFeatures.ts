// MockITHub Features Configuration
// These features will be integrated into daily tasks

export interface MockITHubFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  route?: string;
  estimatedTime: string;
}

export const mockITHubFeatures: MockITHubFeature[] = [
  {
    id: 'ai_mock_interview',
    name: 'AI Mock Interview',
    description: 'Practice with AI interviewer and get instant feedback',
    icon: '🤖',
    route: '/mock-interview',
    estimatedTime: '30-45 min'
  },
  {
    id: 'buddy_practice',
    name: 'Buddy Practice Session',
    description: 'Connect with peers for mock interviews',
    icon: '👥',
    route: '/buddy-connector',
    estimatedTime: '30-60 min'
  },
  {
    id: 'cv_review',
    name: 'CV Review & Optimization',
    description: 'Get AI-powered feedback on your CV',
    icon: '📄',
    route: '/cv-analyzer',
    estimatedTime: '15-20 min'
  },
  {
    id: 'behavioral_questions',
    name: 'Behavioral Questions Practice',
    description: 'Master STAR method with common behavioral questions',
    icon: '💬',
    route: '/practice/behavioral',
    estimatedTime: '20-30 min'
  },
  {
    id: 'technical_questions',
    name: 'Technical Interview Prep',
    description: 'Practice role-specific technical questions',
    icon: '💻',
    route: '/practice/technical',
    estimatedTime: '30-60 min'
  },
  {
    id: 'company_research',
    name: 'Company Research Template',
    description: 'Learn how to research companies effectively',
    icon: '🔍',
    route: '/resources/company-research',
    estimatedTime: '15-20 min'
  },
  {
    id: 'confidence_building',
    name: 'Confidence Building Exercises',
    description: 'Reduce nervousness and build interview confidence',
    icon: '💪',
    route: '/resources/confidence',
    estimatedTime: '10-15 min'
  },
  {
    id: 'answer_framework',
    name: 'Answer Framework Training',
    description: 'Learn structured ways to answer any interview question',
    icon: '📋',
    route: '/resources/frameworks',
    estimatedTime: '20-25 min'
  },
  {
    id: 'salary_negotiation',
    name: 'Salary Negotiation Guide',
    description: 'Learn how to negotiate your worth confidently',
    icon: '💰',
    route: '/resources/negotiation',
    estimatedTime: '15-20 min'
  },
  {
    id: 'body_language',
    name: 'Body Language & Communication',
    description: 'Master non-verbal communication for interviews',
    icon: '🎭',
    route: '/resources/communication',
    estimatedTime: '10-15 min'
  },
  {
    id: 'industry_insights',
    name: 'Industry Insights & Trends',
    description: 'Stay updated with tech industry trends',
    icon: '📊',
    route: '/resources/industry',
    estimatedTime: '15-20 min'
  },
  {
    id: 'portfolio_review',
    name: 'Portfolio/Project Showcase',
    description: 'Learn to present your projects effectively',
    icon: '🎨',
    route: '/resources/portfolio',
    estimatedTime: '20-25 min'
  }
];

// Feature categories for better organization
export const featureCategories = {
  practice: ['ai_mock_interview', 'buddy_practice', 'behavioral_questions', 'technical_questions'],
  preparation: ['cv_review', 'company_research', 'answer_framework', 'portfolio_review'],
  skills: ['confidence_building', 'body_language', 'salary_negotiation', 'industry_insights']
};