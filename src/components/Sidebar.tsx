import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Video, BookOpen, Trophy, Target, Users, X,MapPin ,StickyNote,
  MailMinus
} from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import LogoImage from '../assets/images/MockITLogo-2.png';

interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { isFree, isPremium,tier } = useSubscription(); // ✅ Get both statuses

  // // ✅ TEMPORARY DEBUG
  // console.log("=== SIDEBAR DEBUG ===");
  // console.log("isFree:", isFree);
  // console.log("isPremium:", isPremium);
  // console.log("tier:", tier);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/user-dashboard' },
    { icon: Video, label: 'Interview Toolkit', path: '/jobdescription', paidOnly: true }, // ✅ Only paid users
    { icon: Trophy, label: 'Interview Practice', path: '/ai_jobdescription', freeOnly: true }, // ✅ Only free users
    { icon: StickyNote, label: 'Cv Optimizer', path: '/cv-dashboard' },
    { icon: MailMinus, label: 'Profiling', path: '/cv-dashboard/cover-letter' },
    { icon: Target, label: 'Interview Mindset', path: '/assessment'}, // ✅ Only paid users
    { icon: Users, label: 'Buddy Connector', path: '/buddy-connector'},
    { icon: MapPin, label: 'Post Job RoadMap', path: '/postroadmap', requiresPro: true },
  ];

  const isActive = (path: string) => {
    if (path === '/user-dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // ✅ Filter menu items based on subscription
  const visibleMenuItems = menuItems.filter(item => {
    // Hide free-only items for paid users
    if (item.freeOnly && !isFree) {
      return false;
    }
    
    // ✅ Hide paid-only items for free users
    if (item.paidOnly && !isPremium) {
      return false;
    }
    
    return true;
  });

  
  return (
    <>
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 w-64 bg-white border-r border-slate-200 h-screen overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Link to="/user-dashboard" className="flex items-center mb-24">
              <img 
                src={LogoImage} 
                alt="MockITHub Logo" 
                className="h-21 w-auto hover:opacity-90 transition-opacity" 
              />
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <nav className="space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
               // In the render:
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
                {item.requiresPro && tier !== 'Pro' && (
                  <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Pro
                  </span>
                )}
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
