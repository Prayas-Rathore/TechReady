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

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [guestUserId, setGuestUserId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Build the visible question list based on professional status selection.
  // Build the visible question list based on professional status selection.
const visibleQuestions = useMemo(() => {
  // Always start with the professional_status question (index 0)
  const first = questions[0];

  const selected = answers['professional_status'];

  // Define index ranges for the two flows (based on current questions.ts layout)
  // junior flow: indices 1..18
  const juniorIndices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
  // mid-level flow: index 19 (mid_level_extra_1)
  const midLevelIndices = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];

  let flowQuestions: typeof questions = [] as any;

  if (selected && typeof selected === 'string') {
    if (selected.includes('Junior Developer')) {
      flowQuestions = juniorIndices.map(i => questions[i]).filter(Boolean);
    } else if (selected.includes('Mid-Level Developer')) {
      flowQuestions = midLevelIndices.map(i => questions[i]).filter(Boolean);
    }
  }

  // IMPORTANT: Do NOT append the "rest" — otherwise mid-level sees junior questions next.
  // If you later add truly post-flow common questions, append them explicitly via indices.
  return [first, ...flowQuestions];
}, [answers]);


  // Keep currentQuestion within bounds if visibleQuestions changes
  useEffect(() => {
    if (currentQuestion >= visibleQuestions.length) {
      setCurrentQuestion(Math.max(0, visibleQuestions.length - 1));
    }
  }, [visibleQuestions.length]);

  // If professional_status was just selected and we're still on the intro (index 0),
  // advance to the next visible question so the flow proceeds immediately.
  useEffect(() => {
    const prof = answers['professional_status'];
    if (prof && currentQuestion === 0) {
      // move to the second item in visibleQuestions (index 1) which will be
      // the mid-level extra question for Mid-Level users or the first junior question.
      setCurrentQuestion(1);
    }
  }, [answers['professional_status']]);

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
  setIsSaving(true);

  let savedRecord: any = null;

  try {
    const id =
      guestUserId ||
      localStorage.getItem("guest_user_id") ||
      `guest-${Date.now()}`;

    const payload = {
      anon_user_id: id,
      answers: answers,
      submitted_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("guest_assessments")
      .insert([payload])
      .select();

    if (error) {
      console.error("❌ Supabase Error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    savedRecord = data?.[0] ?? { ...payload };

    // 🔵 UPDATE USER PROFILE FLAG IN SUPABASE (ONLY IF LOGGED IN USER)
    try {
      if (user?.id) {
        await supabase
          .from("profiles")
          .update({ has_taken_assessment_quiz: true })
          .eq("id", user.id);

        console.log(
          "✔ Profile updated: has_taken_assessment_quiz = true"
        );
      }
    } catch (profileErr) {
      console.error("❌ Failed updating profile flag:", profileErr);
    }

    // Backup to localStorage
    try {
      const resultsKey = "assessment_results";
      const stored = localStorage.getItem(resultsKey);
      let parsed: any = stored ? JSON.parse(stored) : {};
      if (!parsed || typeof parsed !== "object") parsed = {};

      parsed[id] = parsed[id] || [];
      parsed[id].push({
        answers,
        timestamp: new Date().toISOString(),
        supabaseId: savedRecord?.id,
      });
      localStorage.setItem(resultsKey, JSON.stringify(parsed));
      console.log("✅ Assessment also backed up to localStorage");
    } catch (localErr) {
      console.warn(
        "⚠️ LocalStorage backup failed (non-critical):",
        localErr
      );
    }
  } catch (err) {
    console.error("❌ Failed to save assessment:", err);

    // Fallback: Save only to localStorage if Supabase fails
    try {
      const id =
        guestUserId ||
        localStorage.getItem("guest_user_id") ||
        `guest-${Date.now()}`;
      const resultsKey = "assessment_results";
      const stored = localStorage.getItem(resultsKey);
      let parsed: any = stored ? JSON.parse(stored) : {};
      if (!parsed || typeof parsed !== "object") parsed = {};
      parsed[id] = parsed[id] || [];
      parsed[id].push({
        answers,
        timestamp: new Date().toISOString(),
        supabaseFailed: true,
      });
      localStorage.setItem(resultsKey, JSON.stringify(parsed));
      console.log("⚠️ Saved to localStorage as fallback");

      // create a local savedRecord so we can forward something to the roadmap page
      savedRecord = {
        anon_user_id: id,
        answers,
        submitted_at: new Date().toISOString(),
        supabaseFailed: true,
      };
    } catch (fallbackErr) {
      console.error("❌ Even fallback failed:", fallbackErr);
    }
  } finally {
    setIsSaving(false);
  }

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  setIsComplete(true);

  // Clear the in-progress answers (assessment is submitted)
  localStorage.removeItem("assessment_answers");

  // Redirect to roadmap page, passing the savedRecord in navigation state
  setTimeout(() => {
    navigate("/roadmap", { state: { assessmentData: savedRecord } });
  }, 3000);
};


  const handleSaveAndExit = () => {
    localStorage.setItem('assessment_answers', JSON.stringify(answers));
    navigate('/login');
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