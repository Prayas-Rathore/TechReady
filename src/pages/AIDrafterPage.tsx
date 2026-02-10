import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Upload, FileText, CheckCircle, Zap, Clock } from 'lucide-react';

export default function AIDrafterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl mb-4">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              AI Drafter
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Generate role specific cover letters and application emails in seconds not hours
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Stop Rewriting Cover Letters — Let AI Do It
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Applying shouldn't feel exhausting.
                </p>
              </div>

              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  With MockITHub, you can:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Generate Tailored Cover Letters</p>
                      <p className="text-sm text-gray-600">Create personalized cover letters that match each job role</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Draft Application Emails</p>
                      <p className="text-sm text-gray-600">Professional email templates ready to send</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Create Follow-Up Emails</p>
                      <p className="text-sm text-gray-600">Stay top of mind with polished follow-up messages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Polished LinkedIn Messages</p>
                      <p className="text-sm text-gray-600">Connect with recruiters using our AI Drafter</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Apply Faster — Without Sounding Generic</p>
                      <p className="text-sm text-gray-600">Each message is unique and personalized to the role</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">How to use:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Upload an updated CV</p>
                      <p className="text-sm text-gray-600">Provide your latest CV for personalized content generation</p>
                    </div>
                    <Upload className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Choose output type and additional information</p>
                      <p className="text-sm text-gray-600">Select what you need: cover letter, email, or LinkedIn message</p>
                    </div>
                    <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Generate content instantly</p>
                      <p className="text-sm text-gray-600">AI creates professional, tailored content in seconds</p>
                    </div>
                    <Zap className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              </div>

              <div className="mb-6 p-6 bg-blue-600 rounded-xl text-center">
                <p className="text-lg sm:text-xl font-bold text-white">
                  More applications. Better quality. Less burnout.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/email-generator')}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  Start Drafting
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Save Hours</h4>
                  <p className="text-sm text-gray-600">
                    Generate professional content in seconds
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Role-Specific</h4>
                  <p className="text-sm text-gray-600">
                    Tailored to each job and company
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Never Generic</h4>
                  <p className="text-sm text-gray-600">
                    Unique, personalized messages every time
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
