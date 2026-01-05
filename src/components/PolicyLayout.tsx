import { Link } from 'react-router-dom';
import { ArrowLeft, Video } from 'lucide-react';
import LogoImage from '../assets/images/MockITLogo-2.png';

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={LogoImage} 
              alt="MockITHub Logo" 
              className="h-14 w-auto transition-transform group-hover:scale-105" 
            />
          </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 sm:px-8 py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-sky-100 text-sm sm:text-base">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <div className="px-6 sm:px-8 py-8 sm:py-12">
            <div className="prose prose-slate max-w-none">
              {children}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-200 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-sky-600" />
              <span className="text-slate-600 text-sm">
                © 2024 MockITHub. All rights reserved.
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <Link to="/privacy-policy" className="text-slate-600 hover:text-sky-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-slate-600 hover:text-sky-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies-policy" className="text-slate-600 hover:text-sky-600 transition-colors">
                Cookies Policy
              </Link>
              <Link to="/consent-policy" className="text-slate-600 hover:text-sky-600 transition-colors">
                Consent Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
