import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface SocialLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  pendingRequestsCount?: number;
}

export const SocialLayout: React.FC<SocialLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  pendingRequestsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { id: 'post', label: 'Feed', icon: '🏠', mobileIcon: '🏠' },
    { id: 'domains', label: 'Interests', icon: '🎯', mobileIcon: '🎯' },
    { id: 'suggestions', label: 'Discover', icon: '🔍', mobileIcon: '🔍' },
    { id: 'requests', label: 'Notifications', icon: '🔔', mobileIcon: '🔔', badge: pendingRequestsCount },
    { id: 'buddies', label: 'Network', icon: '👥', mobileIcon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl">🤝</span>
            <span className="font-bold text-slate-900">BuddyConnect</span>
          </div>

          <button
            onClick={() => onNavigate('requests')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative"
          >
            <span className="text-xl">🔔</span>
            {pendingRequestsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${
                  currentPage === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-slate-900">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex pt-14 lg:pt-0">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-30">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              <span className="text-xl font-bold text-slate-900">BuddyConnect</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {(user?.email?.[0] || 'U').toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user?.full_name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative ${
                currentPage === item.id ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <span className="text-2xl">{item.mobileIcon}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for bottom nav on mobile */}
      <div className="lg:hidden h-16" />
    </div>
  );
};
