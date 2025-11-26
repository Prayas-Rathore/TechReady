import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Video, BookOpen, Trophy, Target, Settings,
  Users, DollarSign, BarChart3, FileText, Calendar, Bell
} from 'lucide-react';

interface SidebarProps {
  role: 'user' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();

  const userMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/user-dashboard' },
    { icon: Video, label: 'Interview Practice', path: '/jobdescription' },
    { icon: Video, label: 'Cv Optimizer', path: '/cv-dashboard' },
    { icon: BookOpen, label: 'Post Job RoadMap', path: '/postroadmap' },
    // { icon: Trophy, label: 'Achievements', path: '/achievements' },
    // { icon: Target, label: 'Goals', path: '/goals' },
    // { icon: Calendar, label: 'Schedule', path: '/schedule' },
    // { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Content', path: '/admin/content' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: DollarSign, label: 'Revenue', path: '/admin/revenue' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  const isActive = (path: string) => {
    if (path === '/dashboard' || path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/user-dashboard" className="flex items-center gap-2 mb-8">
          <Video className={`w-8 h-8 ${role === 'admin' ? 'text-purple-600' : 'text-sky-600'}`} />
          <div>
            {/* <span className="text-xl font-bold text-slate-900">MockIthub</span> */}
            {role === 'admin' && (
              <span className="ml-2 text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                ADMIN
              </span>
            )}
          </div>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? role === 'admin'
                      ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'bg-sky-50 text-sky-600 font-medium'
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

      {/* <div className={`mx-6 mb-6 p-4 rounded-xl ${
        role === 'admin'
          ? 'bg-gradient-to-br from-purple-500 to-pink-600'
          : 'bg-gradient-to-br from-sky-500 to-blue-600'
      }`}>
        <div className="text-white">
          <p className="text-sm font-semibold mb-2">
            {role === 'admin' ? 'Need Help?' : 'Upgrade to Pro'}
          </p>
          <p className="text-xs text-white/80 mb-3">
            {role === 'admin'
              ? 'Check our documentation for admin features'
              : 'Get unlimited access to all features'
            }
          </p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all">
            {role === 'admin' ? 'View Docs' : 'Upgrade Now'}
          </button>
        </div>
      </div> */}
    </aside>
  );
}
