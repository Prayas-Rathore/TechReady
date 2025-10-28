import { Users, Star, TrendingUp, Shield } from 'lucide-react';

export default function TrustIndicators() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Students',
      color: 'text-blue-300'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Rating',
      color: 'text-yellow-300'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Success Rate',
      color: 'text-green-300'
    },
    {
      icon: Shield,
      value: '30-Day',
      label: 'Money-Back Guarantee',
      color: 'text-purple-300'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-blue-100">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
