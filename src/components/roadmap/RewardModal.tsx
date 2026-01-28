import { useEffect, useState } from 'react';
import { X, Trophy, Star, Flame, Gift, Sparkles } from 'lucide-react';
import { Reward, Badge } from '../../types/roadmapTypes';
import confetti from 'canvas-confetti';

interface RewardModalProps {
  reward: Reward;
  onClose: () => void;
}

export default function RewardModal({ reward, onClose }: RewardModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setIsVisible(true);

    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const getRewardIcon = () => {
    switch (reward.type) {
      case 'points':
        return <Star className="w-16 h-16 text-yellow-500" />;
      case 'badge':
        return <Trophy className="w-16 h-16 text-purple-500" />;
      case 'streak':
        return <Flame className="w-16 h-16 text-orange-500" />;
      case 'milestone':
        return <Gift className="w-16 h-16 text-blue-500" />;
      default:
        return <Sparkles className="w-16 h-16 text-pink-500" />;
    }
  };

  const getRewardColor = () => {
    switch (reward.type) {
      case 'points':
        return 'from-yellow-400 to-amber-500';
      case 'badge':
        return 'from-purple-400 to-pink-500';
      case 'streak':
        return 'from-orange-400 to-red-500';
      case 'milestone':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-pink-400 to-purple-500';
    }
  };

  const badge = reward.type === 'badge' ? (reward.value as Badge) : null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRewardColor()} p-8 rounded-t-2xl text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 text-center">
            <div className="inline-block mb-4 animate-bounce">
              {getRewardIcon()}
            </div>
            
            <h2 className="text-3xl font-bold mb-2">
              {reward.type === 'points' && '🎉 Points Earned!'}
              {reward.type === 'badge' && '🏆 Badge Unlocked!'}
              {reward.type === 'streak' && '🔥 Streak Bonus!'}
              {reward.type === 'milestone' && '🎊 Milestone Reached!'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Points Display */}
          {reward.type === 'points' && (
            <div className="mb-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
                +{reward.value}
              </div>
              <div className="text-lg text-slate-600">Points</div>
            </div>
          )}

          {/* Badge Display */}
          {badge && (
            <div className="mb-6">
              <div className="text-6xl mb-3">{badge.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {badge.name}
              </h3>
              <p className="text-slate-600 mb-4">
                {badge.description}
              </p>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                badge.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                badge.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white' :
                badge.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                'bg-slate-200 text-slate-700'
              }`}>
                {badge.rarity.toUpperCase()}
              </div>
            </div>
          )}

          {/* Streak Display */}
          {reward.type === 'streak' && (
            <div className="mb-6">
              <div className="text-6xl mb-3">🔥</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {reward.value} Day Streak!
              </div>
              <p className="text-slate-600">
                Keep it up! Daily consistency is key to success.
              </p>
            </div>
          )}

          {/* Milestone Display */}
          {reward.type === 'milestone' && (
            <div className="mb-6">
              <div className="text-6xl mb-3">🎊</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Bonus: +{reward.value} Points
              </div>
            </div>
          )}

          {/* Message */}
          <p className="text-lg text-slate-700 mb-6">
            {reward.message}
          </p>

          {/* Continue Button */}
          <button
            onClick={onClose}
            className={`w-full px-6 py-4 bg-gradient-to-r ${getRewardColor()} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
          >
            Awesome! Continue
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}