import { JobSearchResult } from '../../types/job.types';
import { JobCard } from './JobCard';
import { Loader2, Search } from 'lucide-react';

interface JobListProps {
  jobs: JobSearchResult[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export function JobList({ jobs, loading, error, totalCount }: JobListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Searching jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Found <span className="font-semibold">{totalCount.toLocaleString()}</span> jobs
      </p>
      
      {/* Grid Layout: 4 columns on desktop, responsive on smaller screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.serial_number} job={job} />
        ))}
      </div>
    </div>
  );
}