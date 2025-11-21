import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface CameraViewProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export default function CameraView({ isEnabled, onToggle }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isEnabled) {
      startCamera();
    } else {
      stopCamera();
    }

    // ✅ Cleanup on unmount - ALWAYS stop camera
    return () => {
      stopCamera();
    };
  }, [isEnabled]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    console.log('🎥 Stopping camera...');
    
    // Stop all tracks from the stream
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('🛑 Stopping track:', track.label);
        track.stop();
      });
      setStream(null);
    }

    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header - Compact */}
      <div className="bg-slate-800 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white text-sm">
          <Camera className="w-4 h-4" />
          <span className="font-medium">Camera View</span>
        </div>
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            isEnabled
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isEnabled ? 'Turn Off' : 'Turn On'}
        </button>
      </div>

      {/* Video/Placeholder - Compact aspect ratio */}
      <div className="relative bg-slate-900 aspect-video">
        {isEnabled ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <CameraOff className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">Camera is off</p>
            <p className="text-xs mt-1 text-gray-500">Click "Turn On" to enable camera</p>
          </div>
        )}
      </div>
    </div>
  );
}