import React from 'react';

interface OnlineStatusDotProps {
  isOnline: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OnlineStatusDot: React.FC<OnlineStatusDotProps> = ({ isOnline, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="relative inline-block">
      <div 
        className={`${sizeClasses[size]} rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      {isOnline && (
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-green-500 animate-ping opacity-75`}
        />
      )}
    </div>
  );
};