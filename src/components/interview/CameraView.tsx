import { useEffect, useRef, useState } from 'react';
import { Video, VideoOff, Camera } from 'lucide-react';

interface CameraViewProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export default function CameraView({ isEnabled, onToggle }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isEnabled) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      {/* Header */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Camera View</span>
        </div>
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isEnabled
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isEnabled ? (
            <>
              <VideoOff className="w-4 h-4" />
              <span>Turn Off</span>
            </>
          ) : (
            <>
              <Video className="w-4 h-4" />
              <span>Turn On</span>
            </>
          )}
        </button>
      </div>

      {/* Video Container - Medium Size */}
      <div className="bg-slate-50 p-4">
        <div className="relative w-full rounded-lg overflow-hidden bg-slate-900" style={{ aspectRatio: '16/9' }}>
          {isEnabled ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-full">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-semibold">LIVE</span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <VideoOff className="w-16 h-16 mb-3" />
              <p className="text-lg font-semibold">Camera is off</p>
              <p className="text-sm mt-1">Click "Turn On" to enable camera</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/95">
              <div className="text-center px-6">
                <VideoOff className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <p className="text-white font-semibold mb-2">Camera Error</p>
                <p className="text-sm text-slate-300">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}