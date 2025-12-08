import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Video, BookOpen, Trophy, Target, Users
} from 'lucide-react';
// import { FeatureLock } from './protection/FeatureLock';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/user-dashboard' },
    { icon: Video, label: 'Interview Practice', path: '/jobdescription' },
    { icon: Video, label: 'Cv Optimizer', path: '/cv-dashboard' },
    { icon: BookOpen, label: 'Post Job RoadMap', path: '/postroadmap', locked: true },
    { icon: Trophy, label: 'Free Interview Practice', path: '/ai_jobdescription' },
    { icon: Target, label: 'Assessment', path: '/assessment' },
    { icon: Users, label: 'Buddy Connector', path: '/buddy-connector' },
  ];

  const isActive = (path: string) => {
    if (path === '/user-dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/user-dashboard" className="flex items-center gap-2 mb-8">
          <Video className="w-8 h-8 text-sky-600" />
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            // if (item.locked) {
            //   return (
            //     <FeatureLock key={item.path} icon={Icon} label={item.label}>
            //       <Link
            //         to={item.path}
            //         className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            //           active
            //             ? 'bg-sky-50 text-sky-600 font-medium'
            //             : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            //         }`}
            //       >
            //         <Icon className="w-5 h-5" />
            //         <span>{item.label}</span>
            //       </Link>
            //     </FeatureLock>
            //   );
            // }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-sky-50 text-sky-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}