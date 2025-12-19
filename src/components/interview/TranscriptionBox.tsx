import { useState, useEffect } from 'react';
import { FileText, Edit3, Save, X } from 'lucide-react';

interface TranscriptionBoxProps {
  transcription: string;
  isRecording: boolean;
  onEdit?: (text: string) => void;
  isEditable?: boolean;
}

export default function TranscriptionBox({ 
  transcription, 
  isRecording, 
  onEdit,
  isEditable = true 
}: TranscriptionBoxProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState(transcription);

  // Sync with incoming transcription when recording
  useEffect(() => {
    if (isRecording) {
      setEditedText(transcription);
      setIsEditMode(false);
    }
  }, [transcription, isRecording]);

  // Sync editedText when transcription changes (but not in edit mode)
  useEffect(() => {
    if (!isEditMode) {
      setEditedText(transcription);
    }
  }, [transcription]);

  const handleSave = () => {
    if (onEdit && editedText.trim()) {
      onEdit(editedText);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedText(transcription);
    setIsEditMode(false);
  };

  const wordCount = transcription.trim() ? transcription.trim().split(/\s+/).length : 0;
  const charCount = transcription.length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header - Matches original dark design */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-white" />
          <h3 className="text-sm font-semibold text-white">Live Transcription</h3>
        </div>
        
        {/* Show Edit button when not recording and there's content */}
        {!isRecording && isEditable && !isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            Edit
          </button>
        )}

        {/* Show Save/Cancel when in edit mode */}
        {isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Save className="w-3 h-3" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Content Area - Maintains original layout */}
      <div className="flex-1 p-6 flex items-center justify-center bg-white">
        {isEditMode ? (
          // Edit Mode - Full height textarea
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-full p-4 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            placeholder="Type or edit your response here..."
            autoFocus
          />
        ) : transcription ? (
          // Display Mode - Show transcription
          <div className="w-full h-full overflow-y-auto">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {transcription}
            </p>
          </div>
        ) : (
          // Empty State - Show placeholder
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-slate-500 font-medium mb-1">
              {isRecording ? 'Listening...' : 'No transcription yet'}
            </h4>
            <p className="text-xs text-slate-400">
              {isRecording 
                ? 'Your speech will appear here in real-time' 
                : 'Start recording to see your speech transcribed in real-time'}
            </p>
          </div>
        )}
      </div>

      {/* Footer - Word/Character count */}
      <div className="border-t border-slate-200 px-4 py-2 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
      </div>
    </div>
  );
}