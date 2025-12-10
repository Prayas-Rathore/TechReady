export interface JobDescription {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const predefinedJobDescriptions: JobDescription[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'We are seeking a talented Software Engineer to join our development team. You will be responsible for designing, developing, and maintaining software applications. Strong knowledge of programming languages, data structures, and algorithms is required. Experience with modern frameworks and version control systems is essential.',
    category: 'Engineering'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Looking for an experienced Product Manager to lead product strategy and development. You will work closely with engineering, design, and business teams to define product vision, roadmap, and features. Strong analytical skills, customer empathy, and ability to prioritize are crucial.',
    category: 'Product'
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'We need a detail-oriented Business Analyst to bridge the gap between business needs and technical solutions. Responsibilities include gathering requirements, analyzing data, creating documentation, and facilitating communication between stakeholders and development teams.',
    category: 'Business'
  },
  {
    id: 'marketing-specialist',
    title: 'Marketing Specialist',
    description: 'Seeking a creative Marketing Specialist to develop and execute marketing campaigns. You will manage social media, content creation, email marketing, and analytics. Strong communication skills and knowledge of digital marketing tools are required.',
    category: 'Marketing'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'We are hiring a Data Analyst to transform raw data into actionable insights. Responsibilities include data collection, analysis, visualization, and reporting. Proficiency in SQL, Excel, and data visualization tools is essential.',
    category: 'Analytics'
  },
  {
    id: 'ux-ui-designer',
    title: 'UX/UI Designer',
    description: 'Looking for a talented UX/UI Designer to create intuitive and beautiful user experiences. You will conduct user research, create wireframes and prototypes, and collaborate with developers to implement designs. Strong portfolio required.',
    category: 'Design'
  },
  // {
  //   id: 'sales-representative',
  //   title: 'Sales Representative',
  //   description: 'Seeking a motivated Sales Representative to drive revenue growth. You will prospect new clients, conduct product demos, negotiate contracts, and maintain customer relationships. Strong communication and persuasion skills are essential.',
  //   category: 'Sales'
  // },
  // {
  //   id: 'hr-specialist',
  //   title: 'Human Resources Specialist',
  //   description: 'We need an HR Specialist to manage recruitment, employee relations, and HR policies. Responsibilities include conducting interviews, onboarding new hires, managing benefits, and ensuring compliance with labor laws.',
  //   category: 'Human Resources'
  // },
  // {
  //   id: 'customer-service',
  //   title: 'Customer Service Representative',
  //   description: 'Looking for a friendly Customer Service Representative to assist customers with inquiries and issues. You will provide support via phone, email, and chat, resolve complaints, and ensure customer satisfaction.',
  //   category: 'Customer Service'
  // },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    description: 'Seeking a meticulous QA Engineer to ensure software quality. Responsibilities include creating test plans, executing manual and automated tests, reporting bugs, and collaborating with development teams to resolve issues.',
    category: 'Engineering'
  }
];
