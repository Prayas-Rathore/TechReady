import { FileText, Mic } from 'lucide-react';

interface TranscriptionBoxProps {
  transcription: string;
  isRecording: boolean;
}

export default function TranscriptionBox({ transcription, isRecording }: TranscriptionBoxProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
      {/* Header - Compact */}
      <div className="bg-slate-800 px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <FileText className="w-4 h-4 text-white" />
        <span className="text-white font-medium text-sm">Live Transcription</span>
        {isRecording && (
          <span className="ml-auto flex items-center gap-1.5 text-red-400 text-xs">
            <Mic className="w-3 h-3 animate-pulse" />
            Recording
          </span>
        )}
      </div>

      {/* Transcription Content - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {transcription ? (
          <div className="p-4 text-gray-700 text-sm leading-relaxed">
            {transcription}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4">
            <Mic className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm font-medium">No transcription yet</p>
            <p className="text-xs mt-1 text-center text-gray-400">
              Start recording to see your speech transcribed in real-time
            </p>
          </div>
        )}
      </div>

      {/* Footer - Word/Character count */}
      <div className="border-t border-gray-200 px-3 py-2 text-xs text-gray-500 flex justify-between bg-gray-50 flex-shrink-0">
        <span>Words: {transcription.trim().split(/\s+/).filter(Boolean).length}</span>
        <span>Characters: {transcription.length}</span>
      </div>
    </div>
  );
}
