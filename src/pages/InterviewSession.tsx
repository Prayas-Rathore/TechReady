import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/SupabaseClient';
import { useSpeechRecognition } from '../components/hooks/useSpeechRecognition';
import CameraView from '../components/interview/CameraView';
import TranscriptionBox from '../components/interview/TranscriptionBox';
import QuestionDisplay from '../components/interview/QuestionDisplay';

// Debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function InterviewSession() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Editable transcript state
  const [editableTranscript, setEditableTranscript] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [existingResponseId, setExistingResponseId] = useState<string | null>(null);

  const maxRecordingTime = 120;

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  // Sync live transcript with editable version
  useEffect(() => {
    if (isListening) {
      setEditableTranscript(transcript);
    }
  }, [transcript, isListening]);

  // Recording timer
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

  // Autosave draft every 10 seconds while recording
  useEffect(() => {
    if (isListening && editableTranscript.trim()) {
      const autosaveTimer = setInterval(() => {
        saveDraft(editableTranscript);
      }, 10000);
      return () => clearInterval(autosaveTimer);
    }
  }, [isListening, editableTranscript]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Component unmounting - ensuring camera is off');
      setCameraEnabled(false);
    };
  }, []);

  // Load existing response when question changes
  useEffect(() => {
    if (session) {
      loadExistingResponse();
    }
  }, [currentQuestionIndex, session]);

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
      console.error('Error loading session:', err);
      navigate('/interview-prep');
    } finally {
      setLoading(false);
    }
  };

  const loadExistingResponse = async () => {
    try {
      const { data, error } = await supabase
        .from('interview_responses')
        .select('*')
        .eq('session_id', sessionId)
        .eq('question_number', currentQuestionIndex + 1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setEditableTranscript(data.transcription || '');
        setExistingResponseId(data.id);
      } else {
        setEditableTranscript('');
        setExistingResponseId(null);
      }
    } catch (err) {
      console.error('Error loading existing response:', err);
    }
  };

  const saveDraft = async (text: string) => {
    if (!text.trim()) return;

    try {
      const responseData = {
        session_id: sessionId,
        question_number: currentQuestionIndex + 1,
        question_text: session.questions[currentQuestionIndex],
        transcription: text,
        audio_duration: recordingTime
      };

      if (existingResponseId) {
        await supabase
          .from('interview_responses')
          .update(responseData)
          .eq('id', existingResponseId);
      } else {
        const { data } = await supabase
          .from('interview_responses')
          .insert(responseData)
          .select()
          .single();
        
        if (data) {
          setExistingResponseId(data.id);
        }
      }
    } catch (err) {
      console.error('Error autosaving:', err);
    }
  };

  const handleStartRecording = () => {
    resetTranscript();
    setRecordingTime(0);
    startListening();
  };

  const handleStopRecording = async () => {
    stopListening();

    if (!editableTranscript.trim()) {
      setSaveStatus('error');
      return;
    }

    try {
      setSaveStatus('saving');

      const responseData = {
        session_id: sessionId,
        question_number: currentQuestionIndex + 1,
        question_text: session.questions[currentQuestionIndex],
        transcription: editableTranscript,
        audio_duration: recordingTime
      };

      if (existingResponseId) {
        await supabase
          .from('interview_responses')
          .update(responseData)
          .eq('id', existingResponseId);
      } else {
        const { data } = await supabase
          .from('interview_responses')
          .insert(responseData)
          .select()
          .single();
        
        if (data) {
          setExistingResponseId(data.id);
        }
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error saving response:', err);
      setSaveStatus('error');
    }
  };

  const handleEditTranscript = (text: string) => {
    setEditableTranscript(text);
    // Debounced save when user manually edits
    debouncedSave(text);
  };

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((text: string) => {
      saveDraft(text);
    }, 2000),
    [currentQuestionIndex, existingResponseId]
  );

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
    try {
      console.log('🏁 Ending interview...');
      
      if (isListening) {
        console.log('🎤 Stopping recording...');
        await handleStopRecording();
      }

      console.log('🎥 Disabling camera...');
      setCameraEnabled(false);
      
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log('💾 Updating database...');
      await supabase
        .from('interview_sessions')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', sessionId);

      console.log('✅ Interview ended successfully');
      
      navigate(`/interview/${sessionId}/suggestions`);
    } catch (err) {
      console.error('❌ Error ending interview:', err);
      setCameraEnabled(false);
      navigate('/user-dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading interview session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Save Status Indicator */}
        {saveStatus !== 'idle' && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            saveStatus === 'saving' ? 'bg-blue-50 text-blue-700' :
            saveStatus === 'saved' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            {saveStatus === 'saving' && '💾 Saving...'}
            {saveStatus === 'saved' && '✅ Saved successfully'}
            {saveStatus === 'error' && '❌ Save failed - Please try again'}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <CameraView 
                isEnabled={cameraEnabled} 
                onToggle={() => setCameraEnabled(!cameraEnabled)} 
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <TranscriptionBox 
                transcription={editableTranscript} 
                isRecording={isListening}
                onEdit={handleEditTranscript}
                isEditable={!isListening}
              />
            </div>
          </div>
        </div>

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