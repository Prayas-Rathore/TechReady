import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import ProgressBar from '../components/assessment/ProgressBar';
import QuestionCard from '../components/postjobroadmap/QuestionCard';
import Navigation from '../components/assessment/Navigation';
import { supabase } from '../services/SupabaseClient';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

interface PostJobAnswers {
  [questionId: string]: string | string[];
}

const POST_JOB_QUESTIONS = [
  {
    id: 'role_type',
    type: 'single',
    text: 'What type of role did you start?',
    options: [
      { id: 'software-dev', text: 'Software Developer / Engineer', icon: '💻' },
      { id: 'qa-testing', text: 'QA / Testing', icon: '🧪' },
      { id: 'data-analytics', text: 'Data / Analytics', icon: '📊' },
      { id: 'it-support', text: 'IT Support', icon: '🛠️' },
      { id: 'business-analyst', text: 'Business / Product Analyst', icon: '📈' },
      { id: 'cloud-devops', text: 'Cloud / DevOps', icon: '☁️' },
      { id: 'cybersecurity', text: 'Cybersecurity', icon: '🔒' },
      { id: 'other', text: 'Other tech role', icon: '🎯' },
    ]
  },
  {
    id: 'company_type',
    type: 'single',
    text: 'What kind of company are you joining?',
    options: [
      { id: 'startup', text: 'Startup', icon: '🚀' },
      { id: 'scaleup', text: 'Scale-up', icon: '📈' },
      { id: 'midsize', text: 'Mid-size company', icon: '🏢' },
      { id: 'enterprise', text: 'Enterprise / Corporate', icon: '🏛️' },
      { id: 'consultancy', text: 'Consultancy', icon: '💼' },
    ]
  },
  {
    id: 'work_mode',
    type: 'single',
    text: 'How will you be working?',
    options: [
      { id: 'remote', text: 'Fully remote', icon: '🏠' },
      { id: 'hybrid', text: 'Hybrid', icon: '🔄' },
      { id: 'office', text: 'Office-based', icon: '🏢' },
    ]
  },
  {
    id: 'experience_level',
    type: 'single',
    text: 'How experienced do you feel in this role?',
    options: [
      { id: 'new', text: 'Brand new — learning everything', icon: '🌱' },
      { id: 'some', text: 'Some familiarity', icon: '📚' },
      { id: 'comfortable', text: 'Comfortable but growing', icon: '🌿' },
      { id: 'confident', text: 'Confident', icon: '🌳' },
    ]
  },
  {
    id: 'confidence_level',
    type: 'slider',
    text: 'How confident do you feel starting this role?',
    sliderConfig: {
      min: 1,
      max: 5,
      labels: ['😰 Nervous', '😐 Calm', '😊 Confident'],
      description: "We'll focus on confidence and clarity early on."
    }
  },
  {
    id: 'worries',
    type: 'multiple',
    text: 'What are you most worried about right now?',
    subtitle: 'Select all that apply',
    options: [
      { id: 'mistakes', text: 'Making mistakes', icon: '⚠️' },
      { id: 'questions', text: 'Asking "stupid" questions', icon: '❓' },
      { id: 'technical', text: 'Keeping up technically', icon: '⚙️' },
      { id: 'manager', text: 'Communicating with my manager', icon: '👔' },
      { id: 'systems', text: 'Understanding company systems', icon: '🖥️' },
      { id: 'imposter', text: 'Imposter syndrome', icon: '🎭' },
      { id: 'proving', text: 'Proving myself quickly', icon: '⏱️' },
    ]
  },
  {
    id: 'role_clarity',
    type: 'single',
    text: 'How clear are your role expectations?',
    options: [
      { id: 'very-unclear', text: 'Very unclear', icon: '🌫️' },
      { id: 'somewhat', text: 'Somewhat clear', icon: '🌤️' },
      { id: 'mostly', text: 'Mostly clear', icon: '☀️' },
      { id: 'very-clear', text: 'Very clear', icon: '✨' },
    ]
  },
  {
    id: 'learning_style',
    type: 'single',
    text: 'How do you learn best at work?',
    options: [
      { id: 'hands-on', text: 'Hands-on tasks', icon: '🛠️' },
      { id: 'documentation', text: 'Documentation & reading', icon: '📖' },
      { id: 'asking', text: 'Asking questions', icon: '💬' },
      { id: 'shadowing', text: 'Shadowing others', icon: '👥' },
      { id: 'mix', text: 'A mix of everything', icon: '🎯' },
    ]
  },
  {
    id: 'main_goal',
    type: 'single',
    text: "What's your main goal in the next 6 months?",
    options: [
      { id: 'perform', text: 'Perform confidently in my role', icon: '💪' },
      { id: 'feedback', text: 'Get positive feedback', icon: '⭐' },
      { id: 'confirmation', text: 'Secure confirmation / probation pass', icon: '✅' },
      { id: 'promotion', text: 'Prepare for promotion', icon: '📈' },
      { id: 'foundations', text: 'Build strong technical foundations', icon: '🏗️' },
    ]
  },
  {
    id: 'priority_timeline',
    type: 'single',
    text: "What's your biggest priority right now?",
    options: [
      { id: '30-days', text: 'First 30 days', icon: '📅' },
      { id: '60-days', text: 'First 60 days', icon: '📆' },
      { id: '90-days', text: 'First 90 days', icon: '🗓️' },
      { id: 'long-term', text: 'Long-term growth', icon: '🌟' },
    ]
  },
  {
    id: 'support_needs',
    type: 'multiple',
    text: 'What support would help you most?',
    subtitle: 'Select all that apply',
    options: [
      { id: 'daily-guidance', text: 'Daily guidance & checklists', icon: '📋' },
      { id: 'confidence', text: 'Confidence & mindset coaching', icon: '🧠' },
      { id: 'role-specific', text: 'Role-specific learning', icon: '🎓' },
      { id: 'communication', text: 'Communication & feedback skills', icon: '💬' },
      { id: 'peer-support', text: 'Peer support / buddy system', icon: '🤝' },
    ]
  },
];

export default function PostJobRoadmap() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PostJobAnswers>({});
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRoadmap = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in to continue');
        navigate('/login', { state: { from: '/post-job-roadmap' } });
        return;
      }
      
      setUser(user);

      const { data: existingData, error } = await supabase
        .from('post_job_roadmap')
        .select('id, completed_at')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking roadmap:', error);
      }

      if (existingData && existingData.completed_at) {
        navigate('/roadmap-results', { replace: true });
        return;
      }

      setIsLoading(false);
    };

    checkAuthAndRoadmap();
  }, [navigate]);

  useEffect(() => {
    if (!user?.id || Object.keys(answers).length === 0) return;
    
    const draftKey = `post_job_roadmap_draft_${user.id}`;
    localStorage.setItem(draftKey, JSON.stringify(answers));
  }, [answers, user?.id]);

  useEffect(() => {
    if (!user?.id || isLoading) return;

    const draftKey = `post_job_roadmap_draft_${user.id}`;
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
  }, [user?.id, isLoading]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < POST_JOB_QUESTIONS.length - 1) {
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
      const { data, error } = await supabase
        .from('post_job_roadmap')
        .upsert({
          user_id: user.id,
          answers: answers,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already completed this roadmap');
          navigate('/roadmap-results');
          return;
        }
        throw error;
      }

      await supabase
        .from('profiles')
        .update({ has_taken_roadmap_quiz: true })
        .eq('id', user.id);

      const draftKey = `post_job_roadmap_draft_${user.id}`;
      localStorage.removeItem(draftKey);

      toast.success('Roadmap completed successfully!');
      
      setTimeout(() => {
        navigate('/roadmap-results');
      }, 1500);

    } catch (err: any) {
      console.error('Failed to save roadmap:', err);
      toast.error(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndExit = () => {
    if (!user?.id) return;
    toast.success('Progress saved');
    navigate('/user-dashboard');
  };

  const isCurrentQuestionAnswered = () => {
    const question = POST_JOB_QUESTIONS[currentQuestion];
    const answer = answers[question.id];

    if (!answer) return false;

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    if (typeof answer === 'string') {
      return answer.trim().length > 0;
    }

    return true;
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <AssessmentHeader onSaveAndExit={handleSaveAndExit} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Your Post-Job Roadmap
            </h1>
            <p className="text-lg text-slate-600">
              Help us create your personalized 90-day success plan
            </p>
          </div>

          <ProgressBar 
            current={currentQuestion + 1} 
            total={POST_JOB_QUESTIONS.length} 
          />

          <QuestionCard
            question={POST_JOB_QUESTIONS[currentQuestion]}
            answer={answers[POST_JOB_QUESTIONS[currentQuestion].id]}
            onAnswer={handleAnswer}
          />

          <Navigation
            currentQuestion={currentQuestion}
            totalQuestions={POST_JOB_QUESTIONS.length}
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