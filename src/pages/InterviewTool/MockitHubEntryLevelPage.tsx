import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';

export default function MockitHubEntryLevelPage() {
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
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Entry Level Interview Prep</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Guidance for those starting their career journey
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Entry Level Focus Areas</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Entry-level interviews focus on your potential, eagerness to learn, and foundational skills.
                Employers want to see your enthusiasm and willingness to grow.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Educational Background</h3>
                  <p className="text-slate-700 text-sm">Highlight relevant coursework and projects from your studies</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Internships & Volunteer Work</h3>
                  <p className="text-slate-700 text-sm">Showcase any hands-on experience, even if unpaid</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Soft Skills</h3>
                  <p className="text-slate-700 text-sm">Emphasize communication, teamwork, and adaptability</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-bold text-slate-900 mb-2">Enthusiasm & Growth Mindset</h3>
                  <p className="text-slate-700 text-sm">Show genuine interest in learning and developing professionally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
