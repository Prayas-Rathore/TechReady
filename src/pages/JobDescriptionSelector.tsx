import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, FileText, Upload } from 'lucide-react';
import { predefinedJobDescriptions } from '../data/JobDescription';
import { supabase } from '../services/SupabaseClient';

export default function JobDescriptionSelector() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isCustom = selectedJob === 'custom';
  const maxChars = 5000;
  const remainingChars = maxChars - customDescription.length;

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    if (jobId !== 'custom') {
      const job = predefinedJobDescriptions.find(j => j.id === jobId);
      if (job) {
        setCustomDescription(job.description);
      }
    } else {
      setCustomDescription('');
    }
    setError('');
  };

  const generateQuestions = async () => {
  if (!customDescription.trim()) {
    setError('Please enter or select a job description');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    // Call Edge Function
    const { data: questionsData, error: questionsError } = await supabase.functions.invoke(
      'generate-interview-questions',
      { body: { jobDescription: customDescription } }
    );

    if (questionsError) throw questionsError;

    // Save to database
    const { data: session, error: sessionError } = await supabase
      .from('interview_sessions')
      .insert({
        user_id: user.id,
        job_description_text: customDescription,
        questions: questionsData.questions,
        status: 'pending'
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    navigate(`/interview/${session.id}`);
  } catch (err: any) {
    setError(err.message || 'Failed to generate questions');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Interview Practice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Select a Job Description
          </h1>
          <p className="text-lg text-slate-600">
            Choose a role or write your own description to generate personalized interview questions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Choose Your Role</h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => handleJobSelect('custom')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedJob === 'custom'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Custom Job Description
            </button>
            {predefinedJobDescriptions.map(job => (
              <button
                key={job.id}
                onClick={() => handleJobSelect(job.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedJob === job.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {job.title}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {isCustom ? 'Paste your job description here' : 'Job Description'}
            </label>
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Select a job role above or paste your own description here..."
              className="w-full h-64 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-slate-700"
              maxLength={maxChars}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-slate-500">
                {remainingChars} chars left
              </span>
              {!isCustom && selectedJob && (
                <span className="text-sm text-blue-600 font-medium">
                  ✓ Pre-defined description loaded
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={generateQuestions}
            disabled={loading || !customDescription.trim()}
            className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-900 hover:to-black transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Questions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Questions</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 mt-4">
            AI will generate 7 personalized interview questions based on your job description
          </p>
        </div>
      </div>
    </div>
  );
}
