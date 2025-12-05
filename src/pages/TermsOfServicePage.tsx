import PolicyLayout from '../components/PolicyLayout';

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="December 3, 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Welcome to MockITHub. By accessing or using our platform, services, or any related content
            (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").
            If you do not agree to these Terms, please do not use our Services.
          </p>
          <p className="text-slate-700 leading-relaxed">
            These Terms constitute a legally binding agreement between you and MockITHub Ltd ("MockITHub,"
            "we," "us," or "our"). We reserve the right to modify these Terms at any time, and your continued
            use of the Services constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            MockITHub provides an online platform for interview preparation, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Mock interview sessions with AI-powered feedback</li>
            <li>CV and resume analysis and optimization</li>
            <li>Job description generation and analysis</li>
            <li>Interview question banks and practice materials</li>
            <li>Personalized learning paths and recommendations</li>
            <li>Performance tracking and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Account Registration and Security</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.1 Account Creation</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            To access certain features, you must create an account. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Be at least 18 years of age</li>
            <li>Not create an account using false or misleading information</li>
            <li>Not create multiple accounts for fraudulent purposes</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.2 Account Security</h3>
          <p className="text-slate-700 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials and for all
            activities that occur under your account. You must immediately notify us of any unauthorized use
            or security breach. We are not liable for any loss or damage arising from your failure to protect
            your account information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Conduct and Prohibited Activities</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Upload harmful code, viruses, or malware</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Use automated systems to access the Services without permission</li>
            <li>Scrape, mine, or extract data from our platform</li>
            <li>Share your account credentials with others</li>
            <li>Use the Services for any illegal or unauthorized purpose</li>
            <li>Interfere with or disrupt the Services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property Rights</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">5.1 Our Content</h3>
          <p className="text-slate-700 leading-relaxed">
            All content on MockITHub, including text, graphics, logos, software, and other materials
            (collectively, "Our Content"), is owned by or licensed to MockITHub and is protected by copyright,
            trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or
            exploit Our Content without our express written permission.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">5.2 Your Content</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            When you upload content to MockITHub (including resumes, interview recordings, and responses),
            you retain ownership but grant us a license to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Store, process, and analyze your content to provide the Services</li>
            <li>Use anonymized and aggregated data for improving our Services</li>
            <li>Display your content back to you through our platform</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            You represent that you have all necessary rights to the content you upload and that it does not
            violate any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Payment and Subscriptions</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6.1 Pricing</h3>
          <p className="text-slate-700 leading-relaxed">
            Some Services require payment. Prices are displayed in your local currency and are subject to change.
            We reserve the right to modify our pricing with notice to existing subscribers.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6.2 Billing</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            By purchasing a subscription, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Provide accurate payment information</li>
            <li>Automatic recurring billing for subscription plans</li>
            <li>Pay all applicable fees and taxes</li>
            <li>Update payment information to avoid service interruption</li>
          </ul> <p> .</p>
          <p>Payment card details are processed securely by our payment provider; we do not store full card information.
</p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6.3 Cancellation and Refunds</h3>
          <p className="text-slate-700 leading-relaxed">
            You may cancel your subscription at any time. Cancellations take effect at the end of the current
            billing period. We do not provide refunds for partial subscription periods, except as required by
            law or at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Disclaimers and Limitations of Liability</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">7.1 Service Availability</h3>
          <p className="text-slate-700 leading-relaxed">
            The Services are provided "as is" and "as available" without warranties of any kind. We do not
            guarantee uninterrupted, error-free, or secure access to our Services. We may modify, suspend,
            or discontinue any aspect of the Services at any time.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">7.2 No Employment Guarantee</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900 font-semibold mb-2">Important Notice</p>
            <p className="text-amber-800 text-sm">
              MockITHub provides interview preparation and educational services only. We do not guarantee
              employment, job placement, or specific interview outcomes. Success depends on many factors
              beyond our control.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">7.3 Limitation of Liability</h3>
          <p className="text-slate-700 leading-relaxed">
            To the maximum extent permitted by law, MockITHub shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use of the Services. Our total
            liability shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Indemnification</h2>
          <p className="text-slate-700 leading-relaxed">
            You agree to indemnify, defend, and hold harmless MockITHub and its officers, directors, employees,
            and agents from any claims, liabilities, damages, losses, and expenses arising from your violation
            of these Terms, your use of the Services, or your violation of any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may terminate or suspend your account and access to the Services:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>For violation of these Terms</li>
            <li>For fraudulent or illegal activity</li>
            <li>For extended inactivity</li>
            <li>At our discretion with or without notice</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            Upon termination, your right to use the Services ceases immediately. You may still exercise your data protection rights regarding any retained data as required by law.

          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Governing Law and Dispute Resolution</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms are governed by the laws of the United Kingdom, without regard to conflict of law
            principles. Any disputes arising from these Terms or the Services shall be resolved in the court, unless arbitration is mutually agreed upon.

          </p>
          <p className="text-slate-700 leading-relaxed">
            You agree to first attempt to resolve any dispute informally by contacting us at
            legal@mockithub.com before initiating formal proceedings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Miscellaneous</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">11.1 Entire Agreement</h3>
          <p className="text-slate-700 leading-relaxed">
            These Terms, together with our Privacy Policy and any additional policies, constitute the entire
            agreement between you and MockITHub.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">11.2 Severability</h3>
          <p className="text-slate-700 leading-relaxed">
            If any provision of these Terms is found to be unenforceable, the remaining provisions shall
            remain in full force and effect.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">11.3 Waiver</h3>
          <p className="text-slate-700 leading-relaxed">
            Our failure to enforce any right or provision shall not constitute a waiver of that right or provision.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">11.4 Assignment</h3>
          <p className="text-slate-700 leading-relaxed">
            You may not assign these Terms without our consent. We may assign these Terms without restriction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Information</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            For questions about these Terms, please contact us:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Email:</strong> legal@mockithub.com</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, United Kingdom</p>
            <p className="text-slate-700"><strong>Website:</strong> www.mockithub.com</p>
          </div>
        </section>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mt-8">
          <p className="text-sky-900 font-semibold mb-2">Agreement</p>
          <p className="text-sky-800 text-sm">
            By using MockITHub, you acknowledge that you have read, understood, and agree to be bound by
            these Terms of Service.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
