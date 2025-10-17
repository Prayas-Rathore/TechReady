import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import ProgressBar from '../components/assessment/ProgressBar';
import QuestionCard from '../components/assessment/QuestionCard';
import Navigation from '../components/assessment/Navigation';
import SuccessScreen from '../components/assessment/SuccessScreen';
import { AssessmentData } from '../types/assessment';
import { questions } from '../data/questions';
import { supabase } from '../services/SupabaseClient';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [anonUserId, setAnonUserId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved answers from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('assessment_answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Generate or retrieve anonymous user ID
  useEffect(() => {
    const initializeAnonUser = async () => {
      try {
        const key = 'anon_user_id';
        let id = localStorage.getItem(key);
        
        // Generate new anonymous ID if doesn't exist
        if (!id) {
          const rand = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          id = `anon-${rand()}${rand()}-${Date.now().toString(36)}`;
          localStorage.setItem(key, id);
          console.log('🆔 Generated new anonymous ID:', id);
        } else {
          console.log('🆔 Retrieved existing anonymous ID:', id);
        }
        
        setAnonUserId(id);
      } catch (err) {
        console.error('❌ Could not access localStorage to set anon id:', err);
      }
    };

    initializeAnonUser();
  }, []);

  // Auto-save answers to localStorage (backup)
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('assessment_answers', JSON.stringify(answers));
    }
  }, [answers]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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
    setIsSaving(true);

    try {
      const id = anonUserId || localStorage.getItem('anon_user_id') || `anon-${Date.now()}`;
      
      console.log('💾 Saving assessment for anonymous user:', id);

      const session = await supabase.auth.getSession();
console.log('Supabase session:', session);
      console.log('Answers being saved:', answers);
      // Save to Supabase
      const { data, error } = await supabase
        .from('guest_assessments')
        .insert([
          console.log('Payload being sent:',{
            anon_user_id: id,
            answers: answers,
            submitted_at: new Date().toISOString()
          })
        ])
        .select();

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Assessment saved to Supabase successfully!', data);

      // Also save to localStorage as backup
      try {
        const resultsKey = 'assessment_results';
        const stored = localStorage.getItem(resultsKey);
        const parsed = stored ? JSON.parse(stored) : {};
        parsed[id] = parsed[id] || [];
        parsed[id].push({ 
          answers, 
          timestamp: new Date().toISOString(),
          supabaseId: data?.[0]?.id // Store the Supabase record ID
        });
        localStorage.setItem(resultsKey, JSON.stringify(parsed));
        console.log('✅ Assessment also backed up to localStorage');
      } catch (localErr) {
        console.warn('⚠️ LocalStorage backup failed (non-critical):', localErr);
      }

    } catch (err) {
      console.error('❌ Failed to save assessment:', err);
      
      // Fallback: Save only to localStorage if Supabase fails
      try {
        const id = anonUserId || localStorage.getItem('anon_user_id') || `anon-${Date.now()}`;
        const resultsKey = 'assessment_results';
        const stored = localStorage.getItem(resultsKey);
        const parsed = stored ? JSON.parse(stored) : {};
        parsed[id] = parsed[id] || [];
        parsed[id].push({ 
          answers, 
          timestamp: new Date().toISOString(),
          supabaseFailed: true 
        });
        localStorage.setItem(resultsKey, JSON.stringify(parsed));
        console.log('⚠️ Saved to localStorage as fallback');
      } catch (fallbackErr) {
        console.error('❌ Even fallback failed:', fallbackErr);
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsComplete(true);
    
    // Clear the in-progress answers (assessment is submitted)
    localStorage.removeItem('assessment_answers');

    // Redirect to results page
    setTimeout(() => {
      navigate('/signup');
    }, 3000);
  };

  const handleSaveAndExit = () => {
    localStorage.setItem('assessment_answers', JSON.stringify(answers));
    navigate('/');
  };

  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id];

    if (!answer) return false;

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    if (typeof answer === 'string') {
      return answer.trim().length > 0;
    }

    if (typeof answer === 'object') {
      return Object.values(answer).some(v => v !== null && v !== undefined);
    }

    return true;
  };

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
              Answer a few questions to help us create your custom learning path (8-10 minutes)
            </p>
          </div>

          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
          />

          <QuestionCard
            question={questions[currentQuestion]}
            answer={answers[questions[currentQuestion].id]}
            onAnswer={handleAnswer}
          />

          <Navigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
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