import { useState, useCallback } from 'react';
import { JobFilters } from '../types/job.types';

const initialFilters: JobFilters = {
  search: '',
  location: '',
  company: '',
  contractType: '',
  experienceLevel: '',
};

export function useJobFilters() {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof JobFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
}