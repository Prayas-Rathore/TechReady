export interface RoadmapData {
  readinessScore: number;
  estimatedWeeks: number;
  summary: string;
  strengths: string[];
  areasToImprove: AreaToImprove[];
  learningPath: LearningPhase[];
  dailySchedule: DailySchedule;
  resources: Resource[];
  milestones: Milestone[];
}

export interface AreaToImprove {
  area: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

export interface LearningPhase {
  phase: number;
  name: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  goals: string[];
}

export interface DailySchedule {
  morning: ScheduleBlock;
  evening: ScheduleBlock;
}

export interface ScheduleBlock {
  duration: string;
  activities: string[];
}

export interface Resource {
  type: 'course' | 'book' | 'platform';
  name: string;
  platform?: string;
  author?: string;
  price?: string;
  priority: 'high' | 'medium' | 'low';
}


export interface Milestone {
  week: number;
  title: string;
  description: string;
  completed: boolean;
}


export const mockRoadmapData: RoadmapData = {
  readinessScore: 45,
  estimatedWeeks: 12,
  summary: "You have solid React skills but need to work on algorithms. With 2-3 hours daily, you'll be interview-ready in 12 weeks.",

  strengths: [
    "Strong React fundamentals",
    "Good JavaScript ES6+ knowledge",
    "Experience with real projects",
    "Git and version control"
  ],

  areasToImprove: [
    { area: "Data Structures", priority: "high", reason: "Arrays, trees, graphs" },
    { area: "Algorithms", priority: "high", reason: "Sorting, searching, recursion" },
    { area: "System Design", priority: "medium", reason: "Scalability basics" },
    { area: "Behavioral Questions", priority: "medium", reason: "STAR method practice" }
  ],

  learningPath: [
    {
      phase: 1,
      name: "Foundations",
      duration: "Weeks 1-4",
      status: "upcoming",
      goals: [
        "Master basic data structures",
        "Solve 30 easy LeetCode problems",
        "Learn Big-O notation",
        "Understand time/space complexity"
      ]
    },
    {
      phase: 2,
      name: "Core Patterns",
      duration: "Weeks 5-8",
      status: "upcoming",
      goals: [
        "Two pointers, sliding window",
        "40 medium problems",
        "Linked lists & recursion",
        "Hash tables and sets"
      ]
    },
    {
      phase: 3,
      name: "Advanced Topics",
      duration: "Weeks 9-12",
      status: "upcoming",
      goals: [
        "Trees & binary search",
        "Graphs, DFS, BFS",
        "25 medium + 5 hard problems",
        "Dynamic programming basics"
      ]
    },
    {
      phase: 4,
      name: "Interview Prep",
      duration: "Weeks 13-16",
      status: "upcoming",
      goals: [
        "10 mock interviews",
        "System design practice",
        "Behavioral prep with STAR",
        "Company-specific prep"
      ]
    }
  ],

 dailySchedule: {
  morning: {
    duration: "2 hours",
    activities: [
      "Technical Study (1.5 hrs)",
      "Communication Skills (1 hr)"
    ]
  },
  evening: {
    duration: "2 hours",
    activities: [
      "Coding Practice (1 hr)",
      "Mock Interviews (0.5 hr)"
    ]
  }
},


  resources: [
  {
    type: "course",
    name: "JavaScript Algorithms Masterclass",
    platform: "Udemy",
    price: "$19.99",
    priority: "high"
  },
  {
    type: "book",
    name: "Cracking the Coding Interview",
    author: "Gayle McDowell",
    priority: "high"
  },
  {
    type: "platform",
    name: "LeetCode Premium",
    price: "$35/month",
    priority: "medium"
  },
  {
    type: "course",
    name: "System Design Interview",
    platform: "Educative",
    price: "$49",
    priority: "medium"
  },
  {
    type: "book",
    name: "Elements of Programming Interviews",
    author: "Aziz, Lee, Prakash",
    priority: "medium"
  },
  {
    type: "platform",
    name: "AlgoExpert",
    price: "$99/year",
    priority: "low"
  }
],


  milestones: [
    { week: 1, title: "Master 15 array problems", description:"test",completed: false },
    { week: 2, title: "Build word search project", description:"test",completed: false },
    { week: 4, title: "Solve first medium problem", description:"test",completed: false },
    { week: 6, title: "Recognize 5 patterns", description:"test",completed: false },
    { week: 8, title: "Complete portfolio project", description:"test",completed: false },
    { week: 10, title: "Complete 100 total problems", description:"test",completed: false },
    { week: 12, title: "Pass first mock interview", description:"test",completed: false }
  ]
};
