import { useEffect, useRef } from 'react';
import { Mic, FileText } from 'lucide-react';

interface TranscriptionBoxProps {
  transcription: string;
  isRecording: boolean;
}

export default function TranscriptionBox({ transcription, isRecording }: TranscriptionBoxProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [transcription]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Live Transcription</span>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
            <Mic className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Recording</span>
          </div>
        )}
      </div>

      <div
        ref={textRef}
        className="flex-1 p-6 overflow-y-auto bg-slate-50"
        style={{ minHeight: '400px', maxHeight: '600px' }}
      >
        {transcription ? (
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {transcription}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Mic className="w-16 h-16 mb-4" />
            <p className="text-lg font-semibold mb-2">No transcription yet</p>
            <p className="text-sm text-center max-w-xs">
              Start recording to see your speech transcribed in real-time
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 px-6 py-4 bg-white">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Words: {transcription.split(/\s+/).filter(w => w.length > 0).length}</span>
          <span>Characters: {transcription.length}</span>
        </div>
      </div>
    </div>
  );
}
