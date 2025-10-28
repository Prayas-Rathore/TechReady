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
  title: string;
  priority: 'high' | 'medium' | 'low';
  desc: string;
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
  task: string;
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
    { title: "Data Structures", priority: "high", desc: "Arrays, trees, graphs" },
    { title: "Algorithms", priority: "high", desc: "Sorting, searching, recursion" },
    { title: "System Design", priority: "medium", desc: "Scalability basics" },
    { title: "Behavioral Questions", priority: "medium", desc: "STAR method practice" }
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
      duration: "1 hour",
      activities: [
        "30 min: Review yesterday's problems",
        "30 min: Learn new concept"
      ]
    },
    evening: {
      duration: "1.5-2 hours",
      activities: [
        "45 min: Solve 2-3 problems",
        "30 min: Code review",
        "15 min: Document learnings"
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
    { week: 1, task: "Master 15 array problems", completed: false },
    { week: 2, task: "Build word search project", completed: false },
    { week: 4, task: "Solve first medium problem", completed: false },
    { week: 6, task: "Recognize 5 patterns", completed: false },
    { week: 8, task: "Complete portfolio project", completed: false },
    { week: 10, task: "Complete 100 total problems", completed: false },
    { week: 12, task: "Pass first mock interview", completed: false }
  ]
};
