// src/types/roadmap.ts (or wherever your types are defined)

export interface RoadmapData {
  success: boolean;
  summary: string;
  readinessScore: number;
  estimatedWeeks: number;
  strengths: string[];
  areasToImprove: AreaToImprove[];
  learningPath: LearningPhase[];
  dailySchedule: DailySchedule;
  milestones: Milestone[];
  resources: Resource[];
}

export interface AreaToImprove {
  area: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface LearningPhase {
  phase: string;
  duration: string;
  focus: string;
  topics: string[];
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface DailySchedule {
  totalHours: number;
  breakdown: ScheduleActivity[];
}

export interface ScheduleActivity {
  activity: string;
  hours: number;
  color: string;
}

export interface Milestone {
  week: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface Resource {
  title: string;
  type: 'book' | 'website' | 'organization' | 'course' | 'video';
  url: string;
  description: string;
}