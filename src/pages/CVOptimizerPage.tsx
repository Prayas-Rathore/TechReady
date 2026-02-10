import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Upload, Download, CheckCircle, Zap } from 'lucide-react';

export default function CVOptimizerPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              CV Optimizer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Optimise your CV with job descriptions to pass ATS and recruiter screening
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  Your CV Should Match the Job — Not the Other Way Around
                </h2>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Recruiters don't read CVs. They scan for matches.
                </p>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  MockITHub helps you optimise your CV for real job descriptions, not generic templates.
                </p>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-sky-600" />
                  Why CV Optimization Matters
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Pass ATS Screening</p>
                      <p className="text-sm text-slate-600">Applicant Tracking Systems scan for keywords and relevance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Match Job Requirements</p>
                      <p className="text-sm text-slate-600">Align your experience with what recruiters are looking for</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Stand Out Instantly</p>
                      <p className="text-sm text-slate-600">Highlight relevant skills and achievements that matter most</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">How to use:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 mb-1">Upload your CV and Job Description</p>
                      <p className="text-sm text-slate-600">Provide both documents for AI-powered analysis</p>
                    </div>
                    <Upload className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 mb-1">Generate and download an editable CV</p>
                      <p className="text-sm text-slate-600">Receive AI suggestions to optimize your CV for the role</p>
                    </div>
                    <Download className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/cv-analyzer')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-sky-500/30 flex items-center justify-center gap-3"
                >
                  <FileText className="w-5 h-5" />
                  Start Optimization
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">ATS-Friendly Format</h4>
                  <p className="text-sm text-slate-600">
                    Our AI ensures your CV is readable by Applicant Tracking Systems
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Instant Results</h4>
                  <p className="text-sm text-slate-600">
                    Get your optimized CV in minutes, ready to apply
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
