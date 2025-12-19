import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, FileText, Briefcase, Sparkles, ArrowBigLeftIcon, Menu, X } from 'lucide-react';

export default function CVDashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: ArrowBigLeftIcon, label: 'Back', path: '/user-dashboard' },
    { icon: Home, label: 'Home', path: '/cv-dashboard' },
    { icon: FileText, label: 'CV Analysis', path: '/cv-dashboard/analysis' },
    { icon: Briefcase, label: 'JD to CV Generator', path: '/cv-dashboard/jd-generator' },
    // { icon: MailMinus, label: 'Cover Letter', path: '/cv-dashboard/cover-letter' }
  ];

  const isActive = (path: string) => {
    if (path === '/cv-dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="flex">
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-slate-200 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 sm:p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">CV Tools</h2>
                  <p className="text-xs text-slate-600">AI-Powered Suite</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium shadow-lg shadow-sky-500/30'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 w-full lg:w-auto">
          <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

