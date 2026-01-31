import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { JobSearchResult, JobFilters } from '../types/job.types';
import { searchJobs } from '../services/jobService';
import toast from 'react-hot-toast';

interface UseJobSearchReturn {
  jobs: JobSearchResult[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  refetch: () => void;
}

export function useJobSearch(
  filters: JobFilters,
  pageSize: number = 20
): UseJobSearchReturn {
  const [jobs, setJobs] = useState<JobSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Debounce ONLY the search query (400ms delay)
  const debouncedSearch = useDebounce(filters.search, 400);

  // Track if this is the initial mount
  const isInitialMount = useRef(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await searchJobs({
        search: debouncedSearch,
        location: filters.location,
        company: filters.company,
        contractType: filters.contractType,
        experienceLevel: filters.experienceLevel,
        page,
        pageSize,
      });

      setJobs(result.data);
      setTotalCount(result.totalCount);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs';
      setError(errorMessage);
      toast.error(errorMessage);
      setJobs([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearch, // Only debounced search here
    filters.location,
    filters.company,
    filters.contractType,
    filters.experienceLevel,
    page,
    pageSize,
  ]);

  // Fetch jobs when dependencies change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Reset to page 1 when filters change (but NOT on every keystroke)
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only reset page when non-search filters change
    setPage(1);
  }, [
    filters.location,
    filters.company,
    filters.contractType,
    filters.experienceLevel,
    debouncedSearch, // Use debounced value here too
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  return {
    jobs,
    loading,
    error,
    totalCount,
    page,
    pageSize,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    refetch: fetchJobs,
  };
}