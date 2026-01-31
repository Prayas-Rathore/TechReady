import { supabase } from '../services/SupabaseClient';
import { JobSearchParams, JobSearchResult, JobFilterOptions } from '../types/job.types';

// In-memory cache for filter options (refreshed every 5 minutes)
let filterOptionsCache: {
  data: JobFilterOptions | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Search jobs using optimized RPC function
 */
export async function searchJobs(params: JobSearchParams): Promise<{
  data: JobSearchResult[];
  totalCount: number;
}> {
  const { data, error } = await supabase.rpc('search_jobs', {
    search_query: params.search || null,
    location_filter: params.location || null,
    company_filter: params.company || null,
    contract_type_filter: params.contractType || null,
    experience_level_filter: params.experienceLevel || null,
    page_number: params.page,
    page_size: params.pageSize,
  });

  if (error) {
    console.error('Job search error:', error);
    throw new Error(error.message || 'Failed to search jobs');
  }

  const totalCount = data && data.length > 0 ? data[0].total_count : 0;

  return {
    data: data || [],
    totalCount,
  };
}

/**
 * Get filter options with caching
 */
export async function getJobFilterOptions(): Promise<JobFilterOptions> {
  const now = Date.now();

  // Return cached data if valid
  if (filterOptionsCache.data && (now - filterOptionsCache.timestamp) < CACHE_DURATION) {
    return filterOptionsCache.data;
  }

  // Fetch fresh data
  const { data, error } = await supabase.rpc('get_job_filter_options');

  if (error) {
    console.error('Failed to fetch filter options:', error);
    throw new Error('Failed to load filter options');
  }

  const filterOptions: JobFilterOptions = data && data.length > 0 ? {
    locations: data[0].locations || [],
    companies: data[0].companies || [],
    contract_types: data[0].contract_types || [],
    experience_levels: data[0].experience_levels || [],
  } : {
    locations: [],
    companies: [],
    contract_types: [],
    experience_levels: [],
  };

  // Update cache
  filterOptionsCache = {
    data: filterOptions,
    timestamp: now,
  };

  return filterOptions;
}

/**
 * Manually refresh filter options cache
 */
export function invalidateFilterCache() {
  filterOptionsCache = {
    data: null,
    timestamp: 0,
  };
}