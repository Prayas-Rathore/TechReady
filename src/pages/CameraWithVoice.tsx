import React, { useRef } from "react";
import Webcam from "react-webcam";
import { useVoiceToText } from "@lakshmiprasanth/react-voice-to-text";

const CameraWithVoice: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
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
        gap: "20px",
      }}
    >
      <h2>🎥 Camera + 🎙️ Voice Interview</h2>

      {/* Webcam preview */}
      <Webcam
        ref={webcamRef}
        audio={false} // 👈 Don't record audio via webcam
        mirrored
        style={{
          width: 400,
          height: 300,
          borderRadius: "10px",
          border: "2px solid #16a34a",
        }}
      />

      {/* Audio recording button */}
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
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {isRecording ? "🛑 Stop Recording" : "🎙️ Start Speaking"}
      </button>

      {/* Transcript */}
      {results.length > 0 && (
        <div style={{ maxWidth: 500, textAlign: "left" }}>
          <h4>Transcript:</h4>
          {results.map((r, i) => (
            <p key={i}>
              {r.transcript}{" "}
              <small>(Confidence: {(r.confidence * 100).toFixed(1)}%)</small>
            </p>
          ))}
        </div>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default CameraWithVoice;
