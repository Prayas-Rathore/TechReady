import PolicyLayout from '../components/PolicyLayout';

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="December 3, 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Welcome to MockITHub ("we," "our," or "us"). We are committed to protecting your personal information
            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our interview preparation platform and services.
          </p>
          <p className="text-slate-700 leading-relaxed">
            By using MockITHub, you agree to the collection and use of information in accordance with this policy.
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.1 Personal Information</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            We collect personal information that you provide to us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Name and contact information (email address, phone number)</li>
            <li>Account credentials (username and password)</li>
            <li>Professional information (resume/CV, work experience, skills)</li>
            <li>Payment and billing information</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.2 Usage Data</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            We automatically collect certain information when you use our platform:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Interview practice sessions and performance data</li>
            <li>Responses to interview questions and assessments</li>
            <li>Video and audio recordings (with your consent)</li>
            <li>Device information and IP address</li>
            <li>Browser type and operating system</li>
            <li>Usage patterns and interaction with our services</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
          <p className="text-slate-700 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience. Please refer to our
            Cookies Policy for detailed information about our use of cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Providing and maintaining our interview preparation services</li>
            <li>Personalizing your learning experience and recommendations</li>
            <li>Processing payments and managing your account</li>
            <li>Analyzing your performance and providing feedback</li>
            <li>Communicating with you about updates, promotions, and support</li>
            <li>Improving our platform and developing new features</li>
            <li>Detecting and preventing fraud and security threats</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How We Share Your Information</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Service Providers:</strong> We share data with third-party vendors who help us operate our platform</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
          <p className="text-slate-700 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
            over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
          <p className="text-slate-700 leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required by law. When you delete your account,
            we will delete or anonymize your personal information within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights and Choices</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Objection:</strong> Object to certain processing of your data</li>
            <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            To exercise these rights, please contact us at privacy@mockithub.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
          <p className="text-slate-700 leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect
            personal information from children. If you believe we have collected information from a child,
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. International Data Transfers</h2>
          <p className="text-slate-700 leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence.
            These countries may have different data protection laws. We ensure appropriate safeguards are in place
            to protect your information in accordance with this Privacy Policy.
          
          Where required, we use UK-approved data transfer safeguards such as the UK International Data Transfer Agreement (IDTA) or the UK Addendum to the EU Standard Contractual Clauses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
            new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this
            Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            If you have any questions about this Privacy Policy, please contact us:
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
