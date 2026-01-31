import { MapPin, Building2, Briefcase, Clock, ExternalLink } from 'lucide-react';
import { JobSearchResult } from '../../types/job.types';

interface JobCardProps {
  job: JobSearchResult;
}

export function JobCard({ job }: JobCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col h-full">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 flex-1 leading-tight">
            {job.title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1 flex-shrink-0">
            <Clock className="h-3 w-3" />
            {job.posted_time}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
          <Building2 className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{job.company_name}</span>
        </div>

        {job.location && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.contract_type && (
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.contract_type}
          </span>
        )}
        {job.experience_level && job.experience_level !== 'Not Applicable' && (
          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">
            {truncateText(job.experience_level, 15)}
          </span>
        )}
        {job.salary && (
          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">
            {job.salary}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-4 line-clamp-3 flex-1">
        {truncateText(job.description, 120)}
      </p>

      {/* Apply Button - Always at bottom */}
      
        <a href={job.apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full mt-auto"
      >
        Apply Now
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}