import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CallButtonProps {
  buddyId: string;
  buddyName: string;
  isOnline: boolean;
  onCallInitiated: (buddyId: string, buddyName: string) => void;
}

export const CallButton: React.FC<CallButtonProps> = ({ 
  buddyId, 
  buddyName, 
  isOnline,
  onCallInitiated 
}) => {
  const [isInitiating, setIsInitiating] = useState(false);

  const handleCall = async () => {
    if (!isOnline) {
      toast.error(`${buddyName} is offline`);
      return;
    }

    setIsInitiating(true);
    try {
      onCallInitiated(buddyId, buddyName);
    } catch (error: any) {
      toast.error(error.message || 'Failed to initiate call');
    } finally {
      setIsInitiating(false);
    }
  };

  return (
    <button
      onClick={handleCall}
      disabled={!isOnline || isInitiating}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        isOnline
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      <Phone size={18} />
      {isInitiating ? 'Calling...' : 'Call'}
    </button>
  );
};