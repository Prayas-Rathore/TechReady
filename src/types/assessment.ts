export interface Question {
  id: string;
  section: string;
  type: 'single' | 'multiple' | 'text' | 'slider' | 'rating' | 'textarea';
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
  minChars?: number;
  maxChars?: number;
  ratingLabels?: string[];
}

export interface AssessmentData {
  [key: string]: any;
}
