import { Award, Star } from 'lucide-react';
import { Badge } from '../../types/roadmapTypes';

interface BadgeDisplayProps {
  badges: Badge[];
}

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-400 to-pink-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      case 'common':
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-yellow-400';
      case 'epic':
        return 'border-purple-400';
      case 'rare':
        return 'border-blue-400';
      case 'common':
      default:
        return 'border-slate-300';
    }
  };

  if (badges.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Your Badges</h3>
          <p className="text-slate-600">
            Earned {badges.length} badge{badges.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative group bg-gradient-to-br ${getRarityColor(badge.rarity)} p-1 rounded-xl`}
          >
            <div className="bg-white rounded-lg p-4 h-full">
              {/* Badge Icon */}
              <div className="text-center mb-3">
                <div className="text-5xl mb-2">{badge.icon}</div>
                
                {/* Rarity Indicator */}
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full">
                  <Star className={`w-3 h-3 fill-current ${
                    badge.rarity === 'legendary' ? 'text-yellow-500' :
                    badge.rarity === 'epic' ? 'text-purple-500' :
                    badge.rarity === 'rare' ? 'text-blue-500' :
                    'text-slate-400'
                  }`} />
                  <span className="text-xs font-semibold text-slate-700 uppercase">
                    {badge.rarity}
                  </span>
                </div>
              </div>

              {/* Badge Info */}
              <h4 className="font-bold text-slate-900 text-center mb-2 text-sm">
                {badge.name}
              </h4>
              <p className="text-xs text-slate-600 text-center mb-3">
                {badge.description}
              </p>

              {/* Earned Date */}
              {badge.earnedAt && (
                <p className="text-xs text-slate-500 text-center">
                  Earned {new Date(badge.earnedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              )}

              {/* Hover Effect - Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(badge.rarity)} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Summary */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['legendary', 'epic', 'rare', 'common'].map((rarity) => {
            const count = badges.filter(b => b.rarity === rarity).length;
            return (
              <div key={rarity} className="bg-slate-50 rounded-lg p-3">
                <div className={`text-2xl font-bold ${
                  rarity === 'legendary' ? 'text-yellow-600' :
                  rarity === 'epic' ? 'text-purple-600' :
                  rarity === 'rare' ? 'text-blue-600' :
                  'text-slate-600'
                }`}>
                  {count}
                </div>
                <div className="text-xs text-slate-600 uppercase font-semibold">
                  {rarity}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}