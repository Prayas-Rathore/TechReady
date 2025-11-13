export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
}

export interface QuizSection {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: 'practical',
    title: 'Practical Readiness',
    description: 'Planning, organization, feedback, productivity.',
    questions: [
      { id: 'p1', text: 'When planning your daily learning or tasks:', options: { A: 'I just go with the flow.', B: 'I make a small to-do list or tracker.', C: 'I plan loosely.' } },
      { id: 'p2', text: 'When instructions are unclear:', options: { A: 'I guess what to do.', B: 'I ask for hints.', C: 'I clarify and confirm before starting.' } },
      { id: 'p3', text: 'When managing deadlines for assignments or projects:', options: { A: 'Often finish at the last minute.', B: 'Try to finish a bit early.', C: 'Plan ahead and review before submitting.' } },
      { id: 'p4', text: 'How do you keep notes of what you learn?', options: { A: 'I don\'t take notes.', B: 'I write short points for myself.', C: 'I keep organized notes or digital journals.' } },
      { id: 'p5', text: 'When someone gives you feedback:', options: { A: 'I feel bad or defensive.', B: 'I listen but may forget to apply it.', C: 'I apply it and check if I improved.' } },
      { id: 'p6', text: 'How do you manage multiple study or project tasks?', options: { A: 'I get overwhelmed.', B: 'I try to organize them.', C: 'I plan with calendars or task apps.' } },
      { id: 'p7', text: 'When a project doesn\'t succeed:', options: { A: 'I feel like I failed.', B: 'I feel sad but move on.', C: 'I review what went wrong to learn.' } },
      { id: 'p8', text: 'How do you balance learning and rest?', options: { A: 'I study too much or too little.', B: 'I sometimes plan breaks.', C: 'I balance study with rest to stay productive.' } },
      { id: 'p9', text: 'When working with others on a team project:', options: { A: 'I prefer to work alone.', B: 'I help when asked.', C: 'I enjoy sharing ideas and helping teammates.' } },
      { id: 'p10', text: 'If a friend is struggling with a coding problem:', options: { A: 'I don\'t know how to help.', B: 'I give small hints.', C: 'I try to guide them patiently.' } }
    ]
  },
  {
    id: 'cultural',
    title: 'Cultural Fit',
    description: 'Adaptability, values, and alignment with workplace culture.',
    questions: [
      { id: 'c1', text: 'How do you handle a workplace disagreement?', options: { A: 'Avoid the person or stay silent.', B: 'Share my view politely.', C: 'Listen first, then suggest solutions calmly.' } },
      { id: 'c2', text: 'If your company changes its policies suddenly:', options: { A: 'I get frustrated easily.', B: 'I take time to adjust.', C: 'I adapt and look for new opportunities to learn.' } }
    ]
  },
  {
    id: 'social',
    title: 'Social & Communication',
    description: 'Empathy, clarity, and collaboration in teams.',
    questions: [
      { id: 's1', text: 'When a teammate struggles to explain something:', options: { A: 'I get impatient.', B: 'I listen halfway.', C: 'I listen carefully and ask clarifying questions.' } },
      { id: 's2', text: 'How do you share your ideas in a group?', options: { A: 'I hesitate to speak up.', B: 'I share when asked.', C: 'I express ideas confidently but respectfully.' } }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Problem-Solving',
    description: 'Learning tools, debugging, and problem-solving habits.',
    questions: [
      { id: 't1', text: 'When learning a new tool or framework:', options: { A: 'I avoid it if it looks complex.', B: 'I follow tutorials step-by-step.', C: 'I explore and experiment with examples.' } },
      { id: 't2', text: 'If your code or design does not work:', options: { A: 'I get frustrated and give up.', B: 'I retry a few fixes.', C: 'I debug systematically or seek help.' } }
    ]
  }
];
