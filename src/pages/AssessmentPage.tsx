import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import ProgressBar from '../components/assessment/ProgressBar';
import QuestionCard from '../components/assessment/QuestionCard';
import Navigation from '../components/assessment/Navigation';
import SuccessScreen from '../components/assessment/SuccessScreen';
import { AssessmentData } from '../types/assessment';
import { interviewMindsetQuestions } from '../data/interviewMindsetQuestions';
import { supabase } from '../services/SupabaseClient';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { CheckCircle, Target, Sparkles } from 'lucide-react';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAlreadyTaken, setHasAlreadyTaken] = useState(false);
  const [existingAssessment, setExistingAssessment] = useState<any>(null);

  // Check authentication and existing assessment on mount
  useEffect(() => {
    const checkAuthAndAssessment = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in to take the assessment');
        navigate('/login', { state: { from: '/assessment' } });
        return;
      }
      
      setUser(user);

      // Check if user has already taken the assessment
      const { data: existingAssessments, error } = await supabase
        .from('assessments')
        .select('id, submitted_at, is_completed, answers')
        .eq('user_id', user.id)
        .eq('is_completed', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking assessment:', error);
      }

      if (existingAssessments) {
        setHasAlreadyTaken(true);
        setExistingAssessment(existingAssessments);
      }

      setIsLoading(false);
    };

    checkAuthAndAssessment();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        toast.error('Session expired. Please log in again.');
        navigate('/login', { state: { from: '/assessment' } });
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // All questions are visible (no conditional flow)
  const visibleQuestions = useMemo(() => {
    return interviewMindsetQuestions;
  }, []);

  // Load saved draft answers
  useEffect(() => {
    if (!user?.id || hasAlreadyTaken) return;

    const loadDraft = async () => {
      const draftKey = `interview_mindset_draft_${user.id}`;
      const saved = localStorage.getItem(draftKey);
      
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            setAnswers(parsed);
          }
        } catch (err) {
          console.warn('Could not parse saved draft', err);
        }
      }
    };

    loadDraft();
  }, [user?.id, hasAlreadyTaken]);

  // Auto-save draft answers to localStorage
  useEffect(() => {
    if (!user?.id || Object.keys(answers).length === 0 || hasAlreadyTaken) return;

    const draftKey = `interview_mindset_draft_${user.id}`;
    localStorage.setItem(draftKey, JSON.stringify(answers));
  }, [answers, user?.id, hasAlreadyTaken]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error('Authentication required');
      navigate('/login');
      return;
    }

    setIsSaving(true);

    try {
      // Save assessment to database
      const { data, error } = await supabase
        .from('assessments')
        .insert({
          user_id: user.id,
          answers: answers,
          submitted_at: new Date().toISOString(),
          is_completed: true,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already taken this assessment');
          setHasAlreadyTaken(true);
          return;
        }
        throw error;
      }

      // Update profile flag
      await supabase
        .from('profiles')
        .update({ has_taken_assessment_quiz: true })
        .eq('id', user.id);

      // Clear draft from localStorage
      const draftKey = `interview_mindset_draft_${user.id}`;
      localStorage.removeItem(draftKey);

      toast.success('Assessment submitted successfully!', {
        icon: '🎉',
        duration: 3000
      });
      
      // Show success screen briefly
      setIsComplete(true);

      // Navigate to roadmap generation
      setTimeout(() => {
        navigate('/roadmap', { state: { assessmentData: data, answers: answers } });
      }, 2000);

    } catch (err: any) {
      console.error('Failed to save assessment:', err);
      toast.error(err.message || 'Failed to submit assessment. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndExit = () => {
    if (!user?.id) return;
    
    toast.success('Progress saved', { icon: '💾' });
    navigate('/user-dashboard');
  };

  const isCurrentQuestionAnswered = () => {
    const question = visibleQuestions[currentQuestion];
    const answer = answers[question.id];

    if (!answer) return false;

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    if (typeof answer === 'string') {
      return answer.trim().length > 0;
    }

    if (typeof answer === 'number') {
      return answer > 0;
    }

    if (typeof answer === 'object') {
      return Object.values(answer).some((v) => v !== null && v !== undefined);
    }

    return true;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // Already taken screen
  // Find this section in AssessmentPage.tsx (around line 260)
if (hasAlreadyTaken) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <AssessmentHeader onSaveAndExit={() => navigate('/user-dashboard')} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Assessment Already Completed
            </h1>
            
            <p className="text-lg text-slate-600 mb-3">
              You've already completed the interview mindset assessment.
            </p>
            
            {existingAssessment?.submitted_at && (
              <p className="text-sm text-slate-500 mb-8">
                Completed on {new Date(existingAssessment.submitted_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}

            <div className="space-y-4">
              <button
                onClick={async () => {
                  // ✅ NEW: Fetch and navigate to existing roadmap
                  const { data: { user } } = await supabase.auth.getUser();
                  if (user) {
                    const { data: roadmaps } = await supabase
                      .from('roadmaps')
                      .select('*')
                      .eq('user_id', user.id)
                      .order('created_at', { ascending: false })
                      .limit(1);
                    
                    if (roadmaps && roadmaps.length > 0) {
                      // Navigate directly to roadmap display
                      navigate('/roadmap', { 
                        state: { 
                          roadmapData: roadmaps[0],
                          fromAssessment: false 
                        } 
                      });
                    } else {
                      // No roadmap exists, go to generator
                      navigate('/roadmap', { 
                        state: { 
                          answers: existingAssessment?.answers 
                        } 
                      });
                    }
                  }
                }}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Sparkles className="inline-block w-5 h-5 mr-2" />
                View Your Roadmap
              </button>
              
              <button
                onClick={() => navigate('/user-dashboard')}
                className="w-full md:w-auto px-8 py-3 bg-white text-slate-700 font-semibold rounded-lg border-2 border-slate-200 hover:bg-slate-50 transition-colors duration-200 ml-0 md:ml-4"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  if (isComplete) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <AssessmentHeader onSaveAndExit={handleSaveAndExit} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  Interview Mindset Assessment
                </h1>
                <p className="text-slate-600">
                  Let's understand your interview preparation journey
                </p>
              </div>
            </div>
            <p className="text-lg text-slate-600 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <strong>Why this matters:</strong> Your personalized roadmap will include daily tasks using MockITHub features, 
              tailored to your career stage, goals, and available time.
            </p>
          </div>

          <ProgressBar current={currentQuestion + 1} total={visibleQuestions.length} />

          <QuestionCard
            question={visibleQuestions[currentQuestion]}
            answer={answers[visibleQuestions[currentQuestion].id]}
            onAnswer={handleAnswer}
          />

          <Navigation
            currentQuestion={currentQuestion}
            totalQuestions={visibleQuestions.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoNext={isCurrentQuestionAnswered()}
            isSubmitting={isSaving}
          />
        </div>
      </div>
    </div>
  );
}