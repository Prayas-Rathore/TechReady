import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award } from 'lucide-react';

export default function MockitHubSeniorLevelPage() {
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
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Senior / Management Prep</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Leadership interview strategies
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Senior Level Requirements</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Senior and management interviews focus on strategic thinking, leadership capabilities, and your ability to drive organizational success.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Strategic Vision</h3>
                  <p className="text-slate-700 text-sm">Demonstrate ability to set direction and align teams with company goals</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Team Leadership</h3>
                  <p className="text-slate-700 text-sm">Show experience managing, developing, and inspiring high-performing teams</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Stakeholder Management</h3>
                  <p className="text-slate-700 text-sm">Highlight collaboration with executives and cross-functional partners</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Change Management</h3>
                  <p className="text-slate-700 text-sm">Showcase instances of driving organizational transformation</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Business Acumen</h3>
                  <p className="text-slate-700 text-sm">Prove understanding of business metrics and P&L responsibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
