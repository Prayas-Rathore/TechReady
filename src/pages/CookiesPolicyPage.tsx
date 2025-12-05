import PolicyLayout from '../components/PolicyLayout';

export default function CookiesPolicyPage() {
  return (
    <PolicyLayout title="Cookies Policy" lastUpdated="December 3, 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What Are Cookies?</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
          <p className="text-slate-700 leading-relaxed">
            MockITHub uses cookies and similar tracking technologies to enhance your experience, analyze usage
            patterns, and improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Types of Cookies We Use</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.1 Essential Cookies</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            These cookies are necessary for the website to function properly. They enable core functionality such as:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>User authentication and account access</li>
            <li>Security and fraud prevention</li>
            <li>Remembering your privacy settings</li>
            <li>Load balancing and performance optimization</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Duration:</strong> Session cookies (deleted when you close your browser) or persistent cookies
            (remain for a set period)
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.2 Performance and Analytics Cookies</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            These cookies help us understand how visitors interact with our platform by collecting aggregated or pseudonymised information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Number of visitors and pages viewed</li>
            <li>Time spent on pages</li>
            <li>Navigation patterns and user flow</li>
            <li>Error messages and technical issues</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Duration:</strong> Up to 2 years
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.3 Functional Cookies</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            These cookies enable enhanced functionality and personalization:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Remembering your preferences and settings</li>
            <li>Personalizing content and recommendations</li>
            <li>Language and region preferences</li>
            <li>Chat and support features</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Duration:</strong> Up to 1 year
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.4 Targeting and Advertising Cookies</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            These cookies are used to deliver relevant advertisements and track campaign effectiveness:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Displaying personalized ads based on your interests</li>
            <li>Limiting the number of times you see an ad</li>
            <li>Measuring advertising campaign effectiveness</li>
            <li>Understanding user behavior across websites</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Duration:</strong> Up to 2 years
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Third-Party Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We work with third-party service providers who may set cookies on your device. These include:
          </p>

          <div className="space-y-4 mt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Google Analytics</h4>
              <p className="text-slate-700 text-sm">
                Used to analyze website traffic and user behavior. Learn more at{' '}
                <a href="https://policies.google.com/privacy" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy
                </a>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Payment Processors</h4>
              <p className="text-slate-700 text-sm">
                Secure payment processing cookies from our payment partners (e.g., Stripe)
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Social Media Platforms</h4>
              <p className="text-slate-700 text-sm">
                Cookies from social media platforms for sharing and engagement features
              </p>
            </div>
          
          </div><div className="mt-4"></div>

          <p className="text-slate-700 leading-relaxed mb-3">Google Analytics cookies are only set after you provide consent through our cookie banner.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How to Manage Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You have several options to manage or disable cookies:
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">4.1 Browser Settings</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Most browsers allow you to control cookies through their settings. You can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Block all cookies</li>
            <li>Block third-party cookies only</li>
            <li>Delete cookies after each browsing session</li>
            <li>View and delete individual cookies</li>
          </ul>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</p>
            <p><strong>Firefox:</strong> Options → Privacy & Security → Cookies</p>
            <p><strong>Safari:</strong> Preferences → Privacy → Cookies</p>
            <p><strong>Edge:</strong> Settings → Privacy → Cookies</p>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4.2 Cookie Consent Tool</h3>
          <p className="text-slate-700 leading-relaxed">
            When you first visit MockITHub, you'll see a cookie consent banner. You can customize your cookie
            preferences by clicking "Cookie Settings" at any time.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4.3 Opt-Out Links</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            You can opt out of certain third-party cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out
              </a>
            </li>
            <li>
              <a href="https://www.youronlinechoices.com/" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Your Online Choices (EU)
              </a>
            </li>
            <li>
              <a href="https://optout.networkadvertising.org/" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Network Advertising Initiative Opt-out
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Impact of Disabling Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Please note that disabling cookies may affect your experience on MockITHub:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>You may need to log in repeatedly</li>
            <li>Personalized features may not work properly</li>
            <li>Some pages may load more slowly</li>
            <li>Certain features may become unavailable</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Essential cookies cannot be disabled as they are necessary for the website to function.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Updates to This Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            We may update this Cookies Policy from time to time to reflect changes in technology, legislation,
            or our practices. We encourage you to review this page periodically. The "Last Updated" date at
            the top indicates when the policy was last revised.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            If you have questions about our use of cookies, please contact us:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Email:</strong> privacy@mockithub.com</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, United Kingdom</p>
            <p className="text-slate-700"><strong>Website:</strong> www.mockithub.com</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
}
