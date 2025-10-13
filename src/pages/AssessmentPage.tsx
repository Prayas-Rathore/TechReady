import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import ProgressBar from '../components/assessment/ProgressBar';
import QuestionCard from '../components/assessment/QuestionCard';
import Navigation from '../components/assessment/Navigation';
import SuccessScreen from '../components/assessment/SuccessScreen';
import { AssessmentData, Question } from '../types/assessment';
import { questions } from '../data/questions';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('assessment_answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsComplete(true);
    localStorage.removeItem('assessment_answers');

    setTimeout(() => {
      navigate('/');
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
