import { ExternalLink, BookOpen } from 'lucide-react';
import { Resource } from '../../data/roadmapData';

interface ResourcesListProps {
  resources: Resource[];
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '🎓';
      case 'book':
        return '📚';
      case 'platform':
        return '💻';
      default:
        return '📖';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">Recommended Resources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-5 border border-slate-200 hover:border-blue-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{getTypeIcon(resource.type)}</div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(
                  resource.priority
                )}`}
              >
                {resource.priority.toUpperCase()}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{resource.name}</h3>

            <div className="space-y-1 mb-4">
              {resource.platform && (
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Platform:</span> {resource.platform}
                </p>
              )}
              {resource.author && (
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Author:</span> {resource.author}
                </p>
              )}
              {resource.price && (
                <p className="text-sm font-semibold text-blue-600">{resource.price}</p>
              )}
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm group-hover:bg-blue-600 group-hover:text-white">
              <span>Learn More</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-600">Investment tip:</span> Start with high-priority free resources, then consider paid options as you progress.
        </p>
      </div>
    </div>
  );
}
