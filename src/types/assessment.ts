export interface Question {
  id: string;
  // Optional pointer to parent section id
  section?: string;
  // Support both a simple typed question set and the QUIZ_SECTIONS shape
  // Primary text field used by UI components is `text`.
  text: string;
  // Backwards-compat: some places may still use `question`; keep it optional
  question?: string;
  // Options may be an array (simple list) or an object mapping keys (A/B/C) to text
  options?: { [key: string]: string } | string[];
  type?: 'single' | 'multiple' | 'text' | 'slider' | 'rating' | 'textarea';
  min?: number;
  max?: number;
  placeholder?: string;
  minChars?: number;
  maxChars?: number;
  ratingLabels?: string[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface AssessmentData {
  [key: string]: any;
}


