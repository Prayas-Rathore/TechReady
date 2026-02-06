import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { Room } from 'livekit-client';

interface ActiveCallUIProps {
  buddyName: string;
  room: Room;
  onEndCall: () => void;
}

export const ActiveCallUI: React.FC<ActiveCallUIProps> = ({ buddyName, room, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if connected
    if (room.state === 'connected') {
      setIsConnected(true);
    }

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [room]);

  const toggleMute = async () => {
    try {
      await room.localParticipant.setMicrophoneEnabled(isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-8 w-full max-w-md text-white text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">{buddyName[0].toUpperCase()}</span>
          </div>
          <h2 className="text-2xl font-bold">{buddyName}</h2>
          <p className="text-white text-opacity-80 mt-2">
            {isConnected ? formatDuration(callDuration) : 'Connecting...'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition ${
              isMuted ? 'bg-red-500' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <button
            onClick={onEndCall}
            className="p-4 bg-red-500 rounded-full hover:bg-red-600 transition"
          >
            <PhoneOff size={24} />
          </button>
        </div>

        {!isConnected && (
          <p className="mt-4 text-sm text-white text-opacity-75 animate-pulse">
            Connecting to call...
          </p>
        )}
      </div>
    </div>
  );
};