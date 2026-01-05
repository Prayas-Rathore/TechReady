import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/MockITLogo-2.png';

export default function FooterSection() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={LogoImage} 
              alt="MockITHub Logo" 
              className="h-10 -auto transition-transform group-hover:scale-105" 
            />
          </Link>
              {/* <span className="text-xl font-bold text-white">MockITHub</span> */}
            </div>
            <p className="text-slate-400">
              AI-powered interview preparation platform helping you land your dream job.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/cookies-policy" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><Link to="/consent-policy" className="hover:text-white transition-colors">Consent</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} MockITHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
