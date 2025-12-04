import { Video, Linkedin, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: ' Win Stories', href: '#pricing' },
    { name: ' Plans & Pricing', href: '#how-it-works' },
    { name: 'MockitHub Work', href: '#testimonials' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Media Kit', href: '#' },
    { name: 'Career Blog', href: '#' },
    { name: 'Join our Team', href: '#' },
  ],
  resources: [
    { name: 'Support Hub', href: '#' },
    { name: 'Quick FAQs', href: '#faq' },
    { name: 'Community Space', href: '#' },
    { name: 'Interview Playbooks', href: '#faq' },
  ],
 legal: [
  { name: 'Users Terms', href: '/terms-of-service' },
  { name: 'Privacy Promise', href: '/privacy-policy' },
  { name: 'Cookie Settings', href: '/cookies-policy' },
  { name: 'Consent Policy', href: '/consent-policy' },
],

};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-8 h-8 text-sky-500" />
              <span className="text-2xl font-bold text-white">MockITHub</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Built to turn job seekers into top performers through powerful AI mock interviews and real-world feedback .
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">PRODUCT</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 MockitHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="mailto:bertvanspall@gmail.com" 
                className="hover:text-sky-400 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                bertvanspall@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
