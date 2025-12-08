import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Video, BookOpen, Trophy, Target, Users, X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
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
    <>
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 w-64 bg-white border-r border-slate-200 h-screen overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/user-dashboard" className="flex items-center gap-2">
              <Video className="w-8 h-8 text-sky-600" />
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
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

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}