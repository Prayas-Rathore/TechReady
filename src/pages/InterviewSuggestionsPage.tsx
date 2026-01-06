import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingUp, TrendingDown, Lightbulb, BookOpen, Target, Clock, MessageSquare, ArrowRight, Home, FileText, Award, AlertCircle, Edit3, Save, X, Download } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

interface InterviewResponse {
  id: string;
  question_number: number;
  question_text: string;
  transcription: string;
  audio_duration: number;
}

interface SessionData {
  id: string;
  job_description_text: string;
  questions: string[];
  completed_at: string;
}

export default function InterviewSuggestionsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [responses, setResponses] = useState<InterviewResponse[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  
  // Edit states
  const [editMode, setEditMode] = useState<{[key: string]: boolean}>({});
  const [editedResponses, setEditedResponses] = useState<{[key: string]: string}>({});
  const [saveStatus, setSaveStatus] = useState<{[key: string]: 'idle' | 'saving' | 'saved' | 'error'}>({});

  useEffect(() => {
    loadSessionData();
  }, [sessionId]);

  const loadSessionData = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase
        .from('interview_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('status', 'completed')
        .single();

      if (sessionError) throw sessionError;

      if (!sessionData) {
        navigate('/interview-prep');
        return;
      }

      const { data: responsesData, error: responsesError } = await supabase
        .from('interview_responses')
        .select('*')
        .eq('session_id', sessionId)
        .order('question_number', { ascending: true });

      if (responsesError) throw responsesError;

      setSession(sessionData);
      setResponses(responsesData || []);
      calculateOverallScore(responsesData || []);
    } catch (err) {
      console.error('Error loading session data:', err);
      navigate('/interview-prep');
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallScore = (responses: InterviewResponse[]) => {
    if (responses.length === 0) {
      setOverallScore(0);
      return;
    }

    let totalScore = 0;
    responses.forEach(response => {
      const wordCount = response.transcription.split(' ').length;
      const duration = response.audio_duration;

      let score = 50;

      if (wordCount > 100) score += 15;
      else if (wordCount > 50) score += 10;
      else if (wordCount > 20) score += 5;

      if (duration > 60 && duration < 120) score += 20;
      else if (duration > 30 && duration < 150) score += 15;
      else if (duration > 15) score += 10;

      if (response.transcription.toLowerCase().includes('experience')) score += 5;
      if (response.transcription.toLowerCase().includes('project')) score += 5;
      if (response.transcription.toLowerCase().includes('team')) score += 5;

      totalScore += Math.min(score, 100);
    });

    const averageScore = Math.round(totalScore / responses.length);
    setOverallScore(averageScore);
  };

  const handleEditResponse = (responseId: string, currentText: string) => {
    setEditMode({ ...editMode, [responseId]: true });
    setEditedResponses({ ...editedResponses, [responseId]: currentText });
  };

  const handleCancelEdit = (responseId: string) => {
    setEditMode({ ...editMode, [responseId]: false });
    setEditedResponses({ ...editedResponses, [responseId]: '' });
  };

  const handleSaveEdit = async (responseId: string) => {
    const newText = editedResponses[responseId];
    
    if (!newText || !newText.trim()) {
      alert('Response cannot be empty');
      return;
    }

    try {
      setSaveStatus({ ...saveStatus, [responseId]: 'saving' });

      const { error } = await supabase
        .from('interview_responses')
        .update({ transcription: newText })
        .eq('id', responseId);

      if (error) throw error;

      // Update local state
      const updatedResponses = responses.map(r => 
        r.id === responseId ? { ...r, transcription: newText } : r
      );
      setResponses(updatedResponses);
      
      // Recalculate score
      calculateOverallScore(updatedResponses);

      // Update status
      setSaveStatus({ ...saveStatus, [responseId]: 'saved' });
      setEditMode({ ...editMode, [responseId]: false });

      // Clear saved status after 2 seconds
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, [responseId]: 'idle' });
      }, 2000);
    } catch (err) {
      console.error('Error saving edit:', err);
      setSaveStatus({ ...saveStatus, [responseId]: 'error' });
    }
  };

  // const exportResults = () => {
  //   const exportData = {
  //     session: {
  //       id: session?.id,
  //       completed_at: session?.completed_at,
  //       job_description: session?.job_description_text
  //     },
  //     overall_score: overallScore,
  //     responses: responses.map(r => ({
  //       question_number: r.question_number,
  //       question: r.question_text,
  //       answer: r.transcription,
  //       duration: r.audio_duration,
  //       word_count: r.transcription.split(' ').length
  //     }))
  //   };

  //   const dataStr = JSON.stringify(exportData, null, 2);
  //   const blob = new Blob([dataStr], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = `interview_${sessionId}_results.json`;
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 40) return 'text-amber-600 bg-amber-100 border-amber-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent Performance! You demonstrated strong interview skills.';
    if (score >= 60) return 'Good Job! You showed solid understanding with room for improvement.';
    if (score >= 40) return 'Fair Attempt! Keep practicing to build confidence and clarity.';
    return 'Needs Improvement! Focus on preparation and practice more.';
  };

  const getResponseQuality = (response: InterviewResponse) => {
    const wordCount = response.transcription.split(' ').length;
    if (wordCount > 100) return { label: 'Excellent', color: 'text-green-600', icon: TrendingUp };
    if (wordCount > 50) return { label: 'Good', color: 'text-blue-600', icon: TrendingUp };
    if (wordCount > 20) return { label: 'Fair', color: 'text-amber-600', icon: TrendingDown };
    return { label: 'Needs Work', color: 'text-red-600', icon: TrendingDown };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Analyzing your interview performance...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Interview Complete!</h1>
                  <p className="text-sky-100">Here's your performance analysis and suggestions</p>
                </div>
              </div>
              
              {/* <button
                onClick={exportResults}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Results
              </button> */}
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 font-semibold">Overall Score</span>
                  <Award className="w-5 h-5 text-sky-600" />
                </div>
                <div className={`text-4xl font-bold ${getScoreColor(overallScore)} inline-block px-4 py-2 rounded-lg border`}>
                  {overallScore}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 font-semibold">Questions Answered</span>
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-600">
                  {responses.length}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 font-semibold">Total Time</span>
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-purple-600">
                  {Math.round(responses.reduce((sum, r) => sum + r.audio_duration, 0) / 60)}m
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border mb-8 ${getScoreColor(overallScore)}`}>
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Performance Summary</h3>
                  <p className="text-sm">{getScoreMessage(overallScore)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-bold text-slate-900">Question-by-Question Analysis</h2>
              </div>

              <div className="space-y-4">
                {responses.map((response) => {
                  const quality = getResponseQuality(response);
                  const QualityIcon = quality.icon;
                  const isEditing = editMode[response.id];
                  const status = saveStatus[response.id] || 'idle';

                  return (
                    <div key={response.id} className="border border-slate-200 rounded-lg p-4 hover:border-sky-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-slate-500">Q{response.question_number}</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${quality.color} bg-opacity-10 flex items-center gap-1`}>
                              <QualityIcon className="w-3 h-3" />
                              {quality.label}
                            </span>
                            
                            {status === 'saved' && (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Saved
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-slate-800 mb-2">{response.question_text}</p>
                        </div>

                        {!isEditing && (
                          <button
                            onClick={() => handleEditResponse(response.id, response.transcription)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </button>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-3">
                          <textarea
                            value={editedResponses[response.id] || response.transcription}
                            onChange={(e) => setEditedResponses({ ...editedResponses, [response.id]: e.target.value })}
                            className="w-full h-32 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                            autoFocus
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveEdit(response.id)}
                              disabled={status === 'saving'}
                              className="flex items-center gap-1 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                              <Save className="w-4 h-4" />
                              {status === 'saving' ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                              onClick={() => handleCancelEdit(response.id)}
                              className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                          {status === 'error' && (
                            <p className="text-sm text-red-600">Failed to save. Please try again.</p>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="bg-slate-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">
                              {response.transcription || 'No response recorded'}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {response.audio_duration}s
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {response.transcription.split(' ').length} words
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900">Key Suggestions</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <AlertCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 mb-1">Be Specific</h3>
                    <p className="text-xs text-slate-600">Use concrete examples and metrics to support your answers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 mb-1">Structure Responses</h3>
                    <p className="text-xs text-slate-600">Use STAR method: Situation, Task, Action, Result.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 mb-1">Time Management</h3>
                    <p className="text-xs text-slate-600">Keep answers between 1-2 minutes for most questions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <BookOpen className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 mb-1">Practice More</h3>
                    <p className="text-xs text-slate-600">Regular practice builds confidence and improves delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Ready for More?</h3>
              <p className="text-sm text-sky-100 mb-4">
                Continue practicing to improve your interview skills and boost your confidence.
              </p>
              <button
                onClick={() => navigate('/interview-prep')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Start Another Interview
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}