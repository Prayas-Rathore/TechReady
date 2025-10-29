import React from "react";
import { useVoiceToText } from "@lakshmiprasanth/react-voice-to-text";

const VoiceRecorderPage: React.FC = () => {
  const {
    isInitialized,
    isRecording,
    results,
    error,
    startRecording,
    stopRecording,
  } = useVoiceToText();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        background: "#f4f4f4",
      }}
    >
      <h1>🎤 AI Interview Voice Recorder</h1>
      <p>Click the button below to start or stop recording.</p>

    <button
        onClick={() => {
            if (isRecording) stopRecording();
            else startRecording();
        }}
        disabled={!isInitialized}
        style={{
            background: isRecording ? "#dc2626" : "#16a34a",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
        }}
        >
        {isRecording ? "🛑 Stop Recording" : "🎙️ Start Recording"}
        </button>


      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>Error: {error}</p>
      )}

      {results.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            width: "80%",
            maxWidth: "600px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>🗣️ Transcription:</h3>
          {results.map((r, i) => (
            <p key={i}>
              {r.transcript}{" "}
              <small style={{ color: "#666" }}>
                (Confidence: {(r.confidence * 100).toFixed(1)}%)
              </small>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorderPage;
