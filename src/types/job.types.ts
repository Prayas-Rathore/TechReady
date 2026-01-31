export interface Job {
  serial_number: number;
  title: string;
  location: string;
  posted_time: string;
  company_name: string;
  description: string;
  contract_type: string;
  experience_level: string;
  salary: string;
  apply_url: string;
  job_url: string;
}

export interface JobSearchResult extends Job {
  total_count: number;
  relevance_score: number;
}

export interface JobFilters {
  search: string;
  location: string;
  company: string;
  contractType: string;
  experienceLevel: string;
}

export interface JobFilterOptions {
  locations: string[];
  companies: string[];
  contract_types: string[];
  experience_levels: string[];
}

export interface JobSearchParams extends JobFilters {
  page: number;
  pageSize: number;
}