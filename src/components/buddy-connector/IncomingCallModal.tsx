import React, { useEffect, useState } from 'react';
import { Phone, PhoneOff } from 'lucide-react';

interface IncomingCallModalProps {
  callerName: string;
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  callerName,
  onAccept,
  onDecline
}) => {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    // Play ringtone (you can add actual audio here)
    const timer = setTimeout(() => {
      setIsRinging(false);
    }, 30000); // Auto-decline after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 w-full max-w-md text-white text-center shadow-2xl">
        <div className="mb-6">
          <div className={`w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center ${isRinging ? 'animate-pulse' : ''}`}>
            <Phone size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Incoming Call</h2>
          <p className="text-lg text-white text-opacity-90">{callerName}</p>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={onDecline}
            className="p-6 bg-red-500 rounded-full hover:bg-red-600 transition transform hover:scale-110"
          >
            <PhoneOff size={32} />
          </button>

          <button
            onClick={onAccept}
            className="p-6 bg-green-500 rounded-full hover:bg-green-600 transition transform hover:scale-110 animate-bounce"
          >
            <Phone size={32} />
          </button>
        </div>

        <p className="mt-6 text-sm text-white text-opacity-75">
          {isRinging ? 'Ringing...' : 'Call will end soon'}
        </p>
      </div>
    </div>
  );
};