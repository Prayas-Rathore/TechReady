import { JobSearchBar } from '../components/jobs/JobSearchBar';
import { JobFilters } from '../components/jobs/JobFilters';
import { JobList } from '../components/jobs/JobList';
import { JobPagination } from '../components/jobs/JobPagination';
import { useJobFilters } from '../hooks/useJobFilters';
import { useJobSearch } from '../hooks/useJobSearch';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function JobSearchPage() {
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useJobFilters();
  const {
    jobs,
    loading,
    error,
    totalCount,
    page,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = useJobSearch(filters, 20);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Search through thousands of job opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <JobSearchBar
            value={filters.search}
            onChange={(value) => updateFilter('search', value)}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <JobFilters
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Job List */}
        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          totalCount={totalCount}
        />

        {/* Pagination */}
        <JobPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
        />
      </div>
    </div>
  );
}