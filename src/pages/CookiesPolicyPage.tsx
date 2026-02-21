import { memo } from 'react';
import PolicyLayout from '../components/PolicyLayout';

const CookiesPolicyPage = memo(() => {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="24 November 2025">
      <div className="space-y-8">
        {/* Company Information */}
        <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <p className="text-slate-700"><strong>Company:</strong> MockITHub Ltd</p>
          <p className="text-slate-700"><strong>Company Number:</strong> 16823684</p>
          <p className="text-slate-700"><strong>Registered Office:</strong> 165–169 Great Portland Street, 5th Floor, W1W 5PF, London, United Kingdom</p>
          <p className="text-slate-700"><strong>Email:</strong> support@mockithub.ai</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            This Cookie Policy explains how MockITHub Ltd uses cookies and similar technologies when you visit our website or use our platform.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            This Policy should be read alongside our Privacy Policy.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            We comply with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>UK General Data Protection Regulation (UK GDPR)</li>
            <li>Data Protection Act 2018</li>
            <li>Privacy and Electronic Communications Regulations (PECR)</li>
            <li>ICO cookie guidance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. What Are Cookies?</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cookies are small text files placed on your device (computer, tablet, or mobile) when you visit a website.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            They help websites:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Remember your preferences</li>
            <li>Keep you logged in</li>
            <li>Improve performance</li>
            <li>Understand how users interact with the platform</li>
            <li>Deliver relevant content or advertisements</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-3">
            Cookies may be:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Session cookies</strong> – deleted when you close your browser</li>
            <li><strong>Persistent cookies</strong> – remain for a set period or until manually deleted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Types of Cookies We Use</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            We use four categories of cookies:
          </p>

          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">A. Strictly Necessary Cookies (Always Active)</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                These cookies are essential for the platform to function properly. They allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                <li>Log in securely</li>
                <li>Maintain session authentication</li>
                <li>Navigate between pages</li>
                <li>Process payments securely</li>
                <li>Use AI tools and account features</li>
              </ul>
              <div className="bg-green-100 rounded p-3 mt-3">
                <p className="text-green-900 text-sm"><strong>Legal basis:</strong> Legitimate interest / Contractual necessity</p>
                <p className="text-green-900 text-sm"><strong>Consent:</strong> Not required under PECR</p>
                <p className="text-green-900 text-sm mt-2">Without these cookies, the platform cannot operate.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">B. Functional Cookies</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                These cookies allow us to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Remember your preferences</li>
                <li>Save language or region settings</li>
                <li>Store roadmap progress</li>
                <li>Maintain feature customisation</li>
              </ul>
              <p className="text-slate-700 text-sm mt-3">
                <strong>Legal basis:</strong> Legitimate interest or consent (where required)
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">C. Analytics & Performance Cookies</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                These cookies help us understand how users interact with MockITHub, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
                <li>Page views</li>
                <li>Session duration</li>
                <li>Feature usage (e.g., Interview Toolkit, CV Optimizer)</li>
                <li>Error tracking</li>
                <li>Performance monitoring</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-3">
                This may include tools such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Google Analytics (if implemented)</li>
                <li>Platform analytics tools</li>
              </ul>
              <div className="bg-blue-100 rounded p-3 mt-3">
                <p className="text-blue-900 text-sm"><strong>Legal basis:</strong> Consent</p>
                <p className="text-blue-900 text-sm mt-1">Analytics cookies are only activated after you accept them in our cookie banner.</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">D. Marketing & Advertising Cookies (Optional)</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                If enabled, these cookies may:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Measure advertising effectiveness</li>
                <li>Show relevant content</li>
                <li>Track campaign performance</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-3">
                These are only used if you provide explicit consent.
              </p>
              <p className="text-slate-700 leading-relaxed mt-3 font-semibold">
                We do not sell personal data.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Some cookies may be placed by third-party providers such as:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Stripe</h4>
              <p className="text-slate-700 text-sm">Secure payment processing</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Analytics Providers</h4>
              <p className="text-slate-700 text-sm">Usage analytics and insights</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Cloud Hosting</h4>
              <p className="text-slate-700 text-sm">Infrastructure and data storage</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Security Services</h4>
              <p className="text-slate-700 text-sm">Platform security and fraud prevention</p>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed mt-4">
            These third parties may process limited technical data according to their own privacy policies. We ensure contractual safeguards are in place where required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. How We Obtain Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            When you first visit MockITHub:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>You will see a cookie banner</li>
            <li>You can accept, reject, or customise your preferences</li>
            <li>Non-essential cookies are disabled until consent is given</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-3">
            You can change your preferences at any time via:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>The "Cookie Settings" link on our website</li>
            <li>Your browser settings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Managing or Deleting Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            You can manage cookies by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Adjusting browser settings</li>
            <li>Clearing cookies manually</li>
            <li>Blocking certain categories</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-amber-900 text-sm">
              <strong>Please note:</strong> Blocking essential cookies may affect platform functionality.
            </p>
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            <p><strong>Chrome:</strong> <a href="https://support.google.com" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">support.google.com</a></p>
            <p><strong>Firefox:</strong> <a href="https://support.mozilla.org" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">support.mozilla.org</a></p>
            <p><strong>Safari:</strong> <a href="https://support.apple.com" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">support.apple.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookie Retention Periods</h2>
          <p className="text-slate-700 leading-relaxed">
            Retention periods may vary depending on the cookie type and third-party providers. Session cookies are deleted when you close your browser, while persistent cookies may remain for periods ranging from days to years based on their purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Protection & Security</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Cookies may collect limited personal data such as IP address or device identifiers. We:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Encrypt data in transit</li>
            <li>Limit access to authorised personnel</li>
            <li>Use secure hosting infrastructure</li>
            <li>Monitor for misuse or abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Updates to This Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            We may update this Cookie Policy from time to time. Changes will be reflected by updating the "Last Updated" date at the top. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            For questions about cookies or this policy:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Email:</strong> support@mockithub.ai</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, 165–169 Great Portland Street, 5th Floor, W1W 5PF, London, United Kingdom</p>
            <p className="text-slate-700"><strong>Website:</strong> www.mockithub.ai</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
});

CookiesPolicyPage.displayName = 'CookiesPolicyPage';

export default CookiesPolicyPage;