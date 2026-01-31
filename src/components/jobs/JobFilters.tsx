import { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { JobFilters as JobFiltersType, JobFilterOptions } from '../../types/job.types';
import { getJobFilterOptions } from '../../services/jobService';
import toast from 'react-hot-toast';

interface JobFiltersProps {
  filters: JobFiltersType;
  onFilterChange: (key: keyof JobFiltersType, value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function JobFilters({ filters, onFilterChange, onReset, hasActiveFilters }: JobFiltersProps) {
  const [options, setOptions] = useState<JobFilterOptions>({
    locations: [],
    companies: [],
    contract_types: [],
    experience_levels: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const data = await getJobFilterOptions();
      setOptions(data);
    } catch (error) {
      toast.error('Failed to load filter options');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filter */}
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {options.locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        {/* Company Filter */}
        <select
          value={filters.company}
          onChange={(e) => onFilterChange('company', e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Companies</option>
          {options.companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>

        {/* Contract Type Filter */}
        <select
          value={filters.contractType}
          onChange={(e) => onFilterChange('contractType', e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Contract Types</option>
          {options.contract_types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Experience Level Filter */}
        <select
          value={filters.experienceLevel}
          onChange={(e) => onFilterChange('experienceLevel', e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Experience Levels</option>
          {options.experience_levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
}