export interface UserExperience {
  company: string
  role: string
  duration: string
  responsibilities: string[] | string
}

export interface UserEducation {
  degree: string
  institution: string
  year: string
}

export interface Profile {
  id: string
  full_name: string | null
  email: string | null
}

export interface CoverLetterRequest {
  jobTitle: string
  companyName: string
  jobDescription: string
  tone?: 'professional' | 'enthusiastic' | 'formal'
}

// types/coverLetter.ts
export interface CoverLetterRequest {
  jobTitle: string
  companyName: string
  maximumWords?: string
  jobDescription: string
  tone?: 'professional' | 'enthusiastic' | 'formal'
}