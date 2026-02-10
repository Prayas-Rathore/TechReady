
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase } from 'lucide-react';

export default function MockitHubMidLevelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/interview-toolkit')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Interview Toolkit</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Mid Level Interview Prep</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Strategies for experienced professionals
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Mid Level Expectations</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Mid-level interviews assess your proven track record, technical expertise, and ability to work independently while collaborating effectively with teams.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Proven Experience</h3>
                  <p className="text-slate-700 text-sm">Demonstrate 3-5 years of relevant work history with concrete achievements</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Technical Depth</h3>
                  <p className="text-slate-700 text-sm">Show deep knowledge in your domain and ability to solve complex problems</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Project Leadership</h3>
                  <p className="text-slate-700 text-sm">Highlight instances where you led projects or mentored junior team members</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Business Impact</h3>
                  <p className="text-slate-700 text-sm">Quantify your contributions to company goals and bottom line</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
