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
  const [guestUserId, setGuestUserId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved answers from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('assessment_answers');
    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
        }
      } catch (err) {
        console.warn('Could not parse saved answers', err);
      }
    }
  }, []);

  // Generate guest user ID
  useEffect(() => {
    const key = 'guest_user_id';
    let id = localStorage.getItem(key);
    
    if (!id) {
      const rand = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      id = `guest-${rand()}${rand()}-${Date.now().toString(36)}`;
      localStorage.setItem(key, id);
      console.log('🆔 Generated guest ID:', id);
    } else {
      console.log('🆔 Retrieved guest ID:', id);
    }
    
    setGuestUserId(id);
  }, []);

  // Auto-save answers
  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      localStorage.setItem('assessment_answers', JSON.stringify(answers));
    }
  }, [answers]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
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
      const id = guestUserId || `guest-${Date.now()}`;
      
      console.log('💾 Submitting assessment...');
      console.log('Guest ID:', id);
      console.log('Answers:', answers);

      const payload = {
        anon_user_id: id,
        answers: answers,
        submitted_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('guest_assessments')
        .insert([payload])
        .select();

      if (error) {
        console.error('❌ Supabase Error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('✅ Saved to Supabase:', data);

      // Backup to localStorage
      const resultsKey = 'assessment_results';
      const stored = localStorage.getItem(resultsKey);
      let parsed: any = stored ? JSON.parse(stored) : {};
      if (!parsed || typeof parsed !== 'object') parsed = {};
      
      parsed[id] = parsed[id] || [];
      parsed[id].push({
        answers,
        timestamp: new Date().toISOString(),
        supabaseId: data?.[0]?.id
      });
      localStorage.setItem(resultsKey, JSON.stringify(parsed));

    } catch (err) {
      console.error('❌ Failed to save:', err);
      
      // Fallback to localStorage only
      const id = guestUserId || `guest-${Date.now()}`;
      const resultsKey = 'assessment_results';
      const stored = localStorage.getItem(resultsKey);
      let parsed: any = stored ? JSON.parse(stored) : {};
      if (!parsed || typeof parsed !== 'object') parsed = {};
      
      parsed[id] = parsed[id] || [];
      parsed[id].push({
        answers,
        timestamp: new Date().toISOString(),
        supabaseFailed: true
      });
      localStorage.setItem(resultsKey, JSON.stringify(parsed));
    } finally {
      setIsSaving(false);
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsComplete(true);
    localStorage.removeItem('assessment_answers');

    setTimeout(() => {
      navigate('/signup');
    }, 3000);
  };

  const handleSaveAndExit = () => {
    localStorage.setItem('assessment_answers', JSON.stringify(answers));
    navigate('/signup');
  };

  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id];

    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === 'string') return answer.trim().length > 0;
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