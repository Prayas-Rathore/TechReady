import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Video, Users, BookOpen, BarChart3, DollarSign,
  FileText, Bell, Settings, Menu, X, Shield, Database, Package, Mail
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const menuSections = [
    {
      title: 'Main',
      items: [
        // { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        // { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        { icon: Users, label: 'Users', path: '/admin/users' }
      ]
    },
    // {
    //   title: 'Management',
    //   items: [
    //     { icon: Users, label: 'Users', path: '/admin/users' },
    //     { icon: BookOpen, label: 'Content', path: '/admin/content' },
    //     { icon: Package, label: 'Subscriptions', path: '/admin/subscriptions' },
    //     { icon: FileText, label: 'Reports', path: '/admin/reports' },
    //   ]
    // },
    // {
    //   title: 'Finance',
    //   items: [
    //     { icon: DollarSign, label: 'Revenue', path: '/admin/revenue' },
    //     { icon: FileText, label: 'Invoices', path: '/admin/invoices' },
    //   ]
    // },
    // {
    //   title: 'System',
    //   items: [
    //     { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    //     { icon: Mail, label: 'Email Templates', path: '/admin/emails' },
    //     { icon: Database, label: 'Database', path: '/admin/database' },
    //     { icon: Shield, label: 'Security', path: '/admin/security' },
    //     { icon: Settings, label: 'Settings', path: '/admin/settings' },
    //   ]
    // }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900">MockitHub</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Shield className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Admin Panel
          </span>
        </div>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      active
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/30'
                        : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200">
        {/* <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">System Status</p>
              <p className="text-xs text-white/80">All systems operational</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Uptime</span>
              <span className="font-semibold">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Active Users</span>
              <span className="font-semibold">1,842</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Server Load</span>
              <span className="font-semibold">23%</span>
            </div>
          </div>
        </div> */}

        {/* <button className="w-full mt-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          View Documentation
        </button> */}
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl shadow-lg transition-all ${
          isMobileOpen
            ? 'bg-white text-slate-900'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
        }`}
        aria-label="Toggle admin menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-72 bg-white border-r border-slate-200
          flex flex-col z-40
          transition-transform duration-300 ease-in-out
          shadow-xl lg:shadow-none
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
