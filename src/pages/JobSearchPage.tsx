import { useState, useEffect } from 'react';
import { JobSearchBar } from '../components/jobs/JobSearchBar';
import { JobFilters } from '../components/jobs/JobFilters';
import { JobList } from '../components/jobs/JobList';
import { JobPagination } from '../components/jobs/JobPagination';
import { useJobFilters } from '../hooks/useJobFilters';
import { useJobSearch } from '../hooks/useJobSearch';
import { ArrowLeft, X } from 'lucide-react';
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
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  useEffect(() => {
    setShowWelcomeModal(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Job Search</h2>
                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-slate-600">
                  If our search engine doesn't return vacancies in your region, please source a job description from a local platform and proceed within MockITHub.
                </p>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Start with the right roles (this changes everything)
                  </h3>
                  <p className="text-slate-600">
                    Most job searches fail before they even begin — because people apply to the wrong roles.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">How to use:</h4>
                  <p className="text-slate-600 mb-3">
                    Use our search engine to filter available roles based on:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>Job Title</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>Location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>Contract type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>Experience level</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-sky-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md"
                >
                  Start Searching
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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