import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import ProgressBar from '../components/assessment/ProgressBar';
import QuestionCard from '../components/assessment/QuestionCard';
import Navigation from '../components/assessment/Navigation';
import SuccessScreen from '../components/assessment/SuccessScreen';
import { AssessmentData } from '../types/assessment';
import { questions } from '../data/questions';
import { supabase } from '../services/SupabaseClient';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

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
        .select('id, submitted_at, is_completed')
        .eq('user_id', user.id)
        .eq('is_completed', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned (user hasn't taken it)
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

  // Build visible questions based on professional status
  const visibleQuestions = useMemo(() => {
    const first = questions[0];
    const selected = answers['professional_status'];

    const juniorIndices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    const midLevelIndices = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];

    let flowQuestions: typeof questions = [];

    if (selected && typeof selected === 'string') {
      if (selected.includes('Junior Developer')) {
        flowQuestions = juniorIndices.map(i => questions[i]).filter(Boolean);
      } else if (selected.includes('Mid-Level Developer')) {
        flowQuestions = midLevelIndices.map(i => questions[i]).filter(Boolean);
      }
    }

    return [first, ...flowQuestions];
  }, [answers]);

  // Keep currentQuestion within bounds
  useEffect(() => {
    if (currentQuestion >= visibleQuestions.length) {
      setCurrentQuestion(Math.max(0, visibleQuestions.length - 1));
    }
  }, [visibleQuestions.length, currentQuestion]);

  // Auto-advance after professional_status selection
  useEffect(() => {
    const prof = answers['professional_status'];
    if (prof && currentQuestion === 0) {
      setCurrentQuestion(1);
    }
  }, [answers, currentQuestion]);

  // Load saved draft answers (optional feature)
  useEffect(() => {
    if (!user?.id || hasAlreadyTaken) return;

    const loadDraft = async () => {
      const draftKey = `assessment_draft_${user.id}`;
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

    const draftKey = `assessment_draft_${user.id}`;
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
        // Check if it's a unique constraint violation
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
      const draftKey = `assessment_draft_${user.id}`;
      localStorage.removeItem(draftKey);

      toast.success('Assessment submitted successfully!');
      
      // Show success screen briefly
      setIsComplete(true);

      // Navigate to roadmap
      setTimeout(() => {
        navigate('/roadmap', { state: { assessmentData: data } });
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
    
    // Draft is already auto-saved
    toast.success('Progress saved');
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

    if (typeof answer === 'object') {
      return Object.values(answer).some((v) => v !== null && v !== undefined);
    }

    return true;
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show "Already Taken" screen
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
                You have already taken this assessment.
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
                  onClick={() => navigate('/user-dashboard')}
                  className="w-full md:w-auto px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Go to Dashboard
                </button>
                
                {/* <button
                  onClick={() => navigate('/roadmap')}
                  className="w-full md:w-auto px-8 py-3 bg-white text-sky-600 font-semibold rounded-lg border-2 border-sky-600 hover:bg-sky-50 transition-colors duration-200 ml-0 md:ml-4"
                >
                  View Your Roadmap
                </button> */}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                {/* <p className="text-sm text-slate-500">
                  Need to retake the assessment?{' '}
                  <button 
                    onClick={() => {
                      toast.info('Please contact support to reset your assessment');
                    }}
                    className="text-sky-600 hover:text-sky-700 underline"
                  >
                    Contact Support
                  </button>
                </p> */}
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
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Let's Personalize Your Interview Prep Journey
            </h1>
            <p className="text-lg text-slate-600">
              Answer a few questions to help us create your custom learning path
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