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
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Looking for a skilled Frontend Developer to build responsive and intuitive web applications. You will work with HTML, CSS, JavaScript, and modern frameworks like React, Vue, or Angular. Experience with RESTful APIs, state management, and cross-browser compatibility is required.',
    category: 'Engineering'
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'We are hiring a Backend Developer to design and implement server-side logic, APIs, and databases. You will work with technologies like Node.js, Python, Java, or Go, and manage data storage solutions. Strong understanding of system architecture, security, and scalability is essential.',
    category: 'Engineering'
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    description: 'Seeking a versatile Full-Stack Developer to work on both frontend and backend systems. You will build end-to-end features, integrate APIs, and collaborate across teams. Proficiency in modern web technologies, databases, and cloud platforms is required.',
    category: 'Engineering'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'We need a DevOps Engineer to streamline development and deployment processes. Responsibilities include CI/CD pipeline management, infrastructure automation, monitoring, and incident response. Experience with Docker, Kubernetes, and cloud platforms (AWS, Azure, GCP) is essential.',
    category: 'Engineering'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Looking for a Cloud Engineer to design, implement, and manage cloud infrastructure. You will work with cloud platforms like AWS, Azure, or GCP, optimize costs, ensure security, and support scalability. Knowledge of IaC tools like Terraform or CloudFormation is required.',
    category: 'Engineering'
  },
  // {
  //   id: 'qa-engineer',
  //   title: 'QA Engineer',
  //   description: 'Seeking a meticulous QA Engineer to ensure software quality through comprehensive testing. You will create test plans, execute manual and automated tests, report bugs, and collaborate with development teams. Experience with testing frameworks and CI/CD integration is essential.',
  //   category: 'Engineering'
  // },
  {
    id: 'test-automation-engineer',
    title: 'Test Automation Engineer',
    description: 'We are hiring a Test Automation Engineer to build and maintain automated testing frameworks. You will design test scripts, integrate with CI/CD pipelines, and analyze test results. Proficiency in Selenium, Cypress, or similar tools and programming skills are required.',
    category: 'Engineering'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'We are hiring a Data Analyst to transform raw data into actionable insights. Responsibilities include data collection, analysis, visualization, and reporting. Proficiency in SQL, Excel, and data visualization tools like Tableau or Power BI is essential.',
    category: 'Analytics'
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Seeking an AI/ML Engineer to develop and deploy machine learning models. You will work on data preprocessing, model training, optimization, and production deployment. Strong knowledge of Python, TensorFlow/PyTorch, and MLOps practices is required.',
    category: 'Engineering'
  },
  {
    id: 'data-visualization-developer',
    title: 'BI Developer',
    description: 'Looking for a BI Developer to create interactive dashboards and reports. You will work with business stakeholders to understand requirements, design data models, and build visualizations using tools like Power BI, Tableau, or Looker. SQL expertise is essential.',
    category: 'Analytics'
  },
  {
    id: 'ai-prompt-engineer',
    title: 'AI Prompt Engineer',
    description: 'We need an AI Prompt Engineer to optimize interactions with large language models. You will design, test, and refine prompts for various AI applications, analyze model outputs, and improve response quality. Understanding of LLM capabilities and limitations is crucial.',
    category: 'Engineering'
  },
  // {
  //   id: 'ai-data-annotator',
  //   title: 'AI Data Annotator',
  //   description: 'Seeking an AI Data Annotator to label and categorize data for machine learning models. You will review images, text, or audio data, ensure annotation quality, and follow detailed guidelines. Attention to detail and consistency are essential.',
  //   category: 'Analytics'
  // },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'We are hiring a Cybersecurity Analyst to protect systems and data from security threats. Responsibilities include monitoring networks, analyzing vulnerabilities, responding to incidents, and implementing security measures. Knowledge of security tools and compliance frameworks is required.',
    category: 'Engineering'
  },
  {
    id: 'infrastructure-engineer',
    title: 'Infrastructure Engineer',
    description: 'Looking for an Infrastructure Engineer to manage and optimize IT infrastructure. You will handle server management, network configuration, performance monitoring, and disaster recovery. Experience with Linux/Windows systems and virtualization technologies is essential.',
    category: 'Engineering'
  },
  {
    id: 'technical-support-engineer',
    title: 'Technical Support Engineer',
    description: 'Seeking a Technical Support Engineer to provide technical assistance to customers and internal teams. You will troubleshoot issues, document solutions, escalate complex problems, and maintain knowledge bases. Strong problem-solving and communication skills are required.',
    category: 'Engineering'
  },
  {
    id: 'automation-engineer',
    title: 'Automation Engineer',
    description: 'We need an Automation Engineer to develop RPA solutions and automate repetitive processes. You will analyze workflows, design automation scripts, and deploy bots using tools like UiPath, Automation Anywhere, or Power Automate. Programming knowledge is beneficial.',
    category: 'Engineering'
  },
  {
    id: 'ux-ui-designer',
    title: 'UX/UI Designer',
    description: 'Looking for a talented UX/UI Designer to create intuitive and beautiful user experiences. You will conduct user research, create wireframes and prototypes, and collaborate with developers to implement designs. Strong portfolio and knowledge of design tools like Figma or Adobe XD required.',
    category: 'Design'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Looking for an experienced Product Manager to lead product strategy and development. You will work closely with engineering, design, and business teams to define product vision, roadmap, and features. Strong analytical skills, customer empathy, and ability to prioritize are crucial.',
    category: 'Product'
  }
];