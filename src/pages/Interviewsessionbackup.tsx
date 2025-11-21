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

  // const handleEndInterview = async () => {
  //   if (isListening) await handleStopRecording();

  //   await supabase
  //     .from('interview_sessions')
  //     .update({ status: 'completed', completed_at: new Date().toISOString() })
  //     .eq('id', sessionId);

  //   navigate('/user-dashboard');
  // };

const handleEndInterview = async () => {
  try {
    // Stop recording if active
    if (isListening) {
      await handleStopRecording();
    }

    // ✅ CRITICAL: Stop camera BEFORE navigation
    setCameraEnabled(false);
    
    // Wait a moment for camera to stop
    await new Promise(resolve => setTimeout(resolve, 300));

    // Update database
    await supabase
      .from('interview_sessions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', sessionId);

    // Now navigate
    navigate('/user-dashboard');
  } catch (err) {
    console.error('Error ending interview:', err);
    // Even if there's an error, try to stop camera
    setCameraEnabled(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
         {/* Camera and Transcription - Centered Grid */}
        <div className="grid grid-cols- md:grid-cols-2 gap-6 mb-4">
          {/* Camera View - Medium Size, Centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <CameraView 
                isEnabled={cameraEnabled} 
                onToggle={() => setCameraEnabled(!cameraEnabled)} 
              />
            </div>
          </div>

          {/* Live Transcription */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <TranscriptionBox 
                transcription={transcript} 
                isRecording={isListening} 
              />
            </div>
          </div>
        </div>
        {/* Question Display - Full Width */}
        <div className="mb-6">
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
        </div>

       

        {/* Submit Button - Centered */}
        <div className="flex justify-center">
          <button 
            onClick={handleEndInterview}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            Submit Interview
          </button>
        </div>
      </div>
    </div>
  );
}