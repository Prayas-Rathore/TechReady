import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, FileText, Briefcase, Sparkles, ArrowBigLeftIcon } from 'lucide-react';

export default function CVDashboardLayout() {
  const location = useLocation();

  const menuItems = [
    { icon: ArrowBigLeftIcon, label: 'Back', path: '/user-dashboard' },
    { icon: Home, label: 'Home', path: '/cv-dashboard' },
    { icon: FileText, label: 'CV Analysis', path: '/cv-dashboard/analysis' },
    { icon: Briefcase, label: 'JD Generator', path: '/cv-dashboard/jd-generator' },
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
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 sticky top-0">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">CV Tools</h2>
                <p className="text-xs text-slate-600">AI-Powered Suite</p>
              </div>
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

          <div className="p-4 absolute bottom-0 left-0 right-0">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">Pro Tip</h3>
              </div>
              <p className="text-xs text-white/90">
                Turn your CV into a job-winning weapon for every application.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
