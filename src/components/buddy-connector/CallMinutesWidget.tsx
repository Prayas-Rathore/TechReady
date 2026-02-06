import React, { useState, useEffect } from 'react';
import { Clock, Phone } from 'lucide-react';
import { livekitService } from '../../services/livekit/livekitService';

export const CallMinutesWidget: React.FC = () => {
  const [minutesInfo, setMinutesInfo] = useState({
    used: 0,
    granted: 500,
    remaining: 500
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMinutesInfo();
  }, []);

  const loadMinutesInfo = async () => {
    try {
      const info = await livekitService.getCallMinutesInfo();
      setMinutesInfo(info);
    } catch (error) {
      console.error('Failed to load call minutes:', error);
    } finally {
      setLoading(false);
    }
  };

  const percentageUsed = (minutesInfo.used / minutesInfo.granted) * 100;
  const isLow = minutesInfo.remaining < 50;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-4 border border-blue-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">Call Minutes</h3>
        </div>
        <Clock size={16} className="text-gray-500" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <p className={`text-3xl font-bold ${isLow ? 'text-red-600' : 'text-blue-600'}`}>
              {minutesInfo.remaining}
            </p>
            <p className="text-sm text-gray-600">minutes left</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {minutesInfo.used} / {minutesInfo.granted} used
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isLow ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentageUsed}%` }}
          />
        </div>

        {isLow && (
          <p className="text-xs text-red-600 font-medium">
            ⚠️ Running low on minutes
          </p>
        )}
      </div>
    </div>
  );
};