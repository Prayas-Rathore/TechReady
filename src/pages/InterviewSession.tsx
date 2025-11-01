import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/SupabaseClient';
import { useSpeechRecognition } from '../components/hooks/useSpeechRecognition';
import CameraView from '../components/interview/CameraView';
import TranscriptionBox from '../components/interview/TranscriptionBox';
import QuestionDisplay from '../components/interview/QuestionDisplay';

export default function InterviewSession() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const maxRecordingTime = 120;

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev + 1 >= maxRecordingTime) {
            handleStopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const loadSession = async () => {
    try {
      const { data, error } = await supabase
        .from('interview_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      setSession(data);

      if (data.status === 'pending') {
        await supabase
          .from('interview_sessions')
          .update({ status: 'in_progress', started_at: new Date().toISOString() })
          .eq('id', sessionId);
      }
    } catch (err) {
      navigate('/interview-prep');
    } finally {
      setLoading(false);
    }
  };

  const handleStartRecording = () => {
    resetTranscript();
    setRecordingTime(0);
    startListening();
  };

  const handleStopRecording = async () => {
    stopListening();

    if (!transcript.trim()) return;

    try {
      await supabase.from('interview_responses').insert({
        session_id: sessionId,
        question_number: currentQuestionIndex + 1,
        question_text: session.questions[currentQuestionIndex],
        transcription: transcript,
        audio_duration: recordingTime
      });
    } catch (err) {
      console.error('Error saving response:', err);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setRecordingTime(0);
      resetTranscript();
    } else {
      handleEndInterview();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setRecordingTime(0);
      resetTranscript();
    }
  };

  const handleEndInterview = async () => {
    if (isListening) await handleStopRecording();

    await supabase
      .from('interview_sessions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', sessionId);

    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuestionDisplay
              question={session.questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={session.questions.length}
              isRecording={isListening}
              recordingTime={recordingTime}
              maxTime={maxRecordingTime}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              canGoNext={currentQuestionIndex < session.questions.length - 1}
              canGoPrevious={currentQuestionIndex > 0}
            />
            <CameraView isEnabled={cameraEnabled} onToggle={() => setCameraEnabled(!cameraEnabled)} />
          </div>
          <div className="lg:col-span-1">
            <TranscriptionBox transcription={transcript} isRecording={isListening} />
          </div>
        </div>
        <div className="mt-6 p-4 bg-white rounded-xl shadow-lg">
          <button onClick={handleEndInterview} className="px-6 py-2 bg-red-500 text-white rounded-lg">
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
}
