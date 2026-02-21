import PolicyLayout from '../components/PolicyLayout';

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="November 24, 2025">
      <div className="space-y-8">
        {/* Company Information */}
        <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <p className="text-slate-700"><strong>Company Name:</strong> MockITHub Ltd</p>
          <p className="text-slate-700"><strong>Company Number:</strong> 16823684</p>
          <p className="text-slate-700"><strong>Registered Office:</strong> 165–169 Great Portland Street, 5th Floor, W1W 5PF, London, United Kingdom</p>
          <p className="text-slate-700"><strong>Email:</strong> support@mockithub.ai</p>
          <p className="text-slate-700"><strong>Data Protection Contact:</strong> support@mockithub.ai</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            MockITHub Ltd is a UK-registered company providing AI-powered career preparation and interview readiness services.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            This Privacy Policy explains how we collect, use, store, protect, and share personal data when you use:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Interview Mindset Roadmap</li>
            <li>Find a Tech Role feature</li>
            <li>CV Optimizer (AI-powered CV alignment)</li>
            <li>AI Drafter (cover letters, emails, LinkedIn messages)</li>
            <li>Interview Toolkit (AI mock interviews, STAR practice)</li>
            <li>Buddy Connector (community feeds &amp; live voice practice)</li>
            <li>Post-Job Roadmap</li>
            <li>Website and subscription services</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            We comply with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>UK General Data Protection Regulation (UK GDPR)</li>
            <li>Data Protection Act 2018</li>
            <li>Privacy and Electronic Communications Regulations (PECR)</li>
            <li>Applicable international data protection standards</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            By using our platform, you acknowledge this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Personal Data We Collect</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We collect personal data necessary to operate the platform effectively.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">A. Information You Provide Directly</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            When creating an account or using features, we may collect:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Account login details</li>
            <li>Uploaded CVs and resumes</li>
            <li>Job descriptions you input</li>
            <li>Interview responses (text, audio, video)</li>
            <li>Career history and experience data</li>
            <li>Goals and roadmap preferences</li>
            <li>Community posts and voice session participation</li>
            <li>Feedback submissions</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">B. AI-Generated &amp; Derived Data</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            When you use our AI features, we may generate:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>CV scoring and ATS analysis</li>
            <li>Interview performance scoring</li>
            <li>STAR scenario evaluations</li>
            <li>Behavioural insights</li>
            <li>Confidence readiness indicators</li>
            <li>Personalised roadmap milestones</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            These outputs are generated automatically using AI systems.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">C. Payment Information</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Payments are processed by third-party providers (e.g., Stripe).</li>
            <li>We do not store full card numbers.</li>
            <li>We may receive limited billing metadata (e.g., subscription status, last 4 digits of card, transaction ID).</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">D. Technical &amp; Usage Data</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Automatically collected data may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Session timestamps</li>
            <li>Clickstream behaviour</li>
            <li>Page interactions</li>
            <li>Crash logs and error diagnostics</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">E. Cookies &amp; Tracking Technologies</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            We use cookies for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Essential platform functionality</li>
            <li>Authentication</li>
            <li>Preferences</li>
            <li>Analytics (with consent)</li>
            <li>Marketing (with explicit consent under UK PECR rules)</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            Users can manage cookie preferences via our cookie banner.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Personal Data</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use personal data only where lawful and necessary.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">A. Delivering Core Services</h3>
          <p className="text-slate-700 leading-relaxed mb-3">To provide:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Interview Mindset Roadmaps</li>
            <li>CV Optimisation &amp; ATS analysis</li>
            <li>AI-generated interview simulations</li>
            <li>AI cover letter and message drafting</li>
            <li>Job filtering functionality</li>
            <li>Buddy Connector features</li>
            <li>Subscription management</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">B. AI Processing</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Your uploaded CVs and interview responses are processed to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Generate feedback</li>
            <li>Create job-aligned outputs</li>
            <li>Simulate realistic interviews</li>
            <li>Deliver roadmap insights</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            We do not use your identifiable data for AI training without separate explicit consent.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">C. Improving Platform Performance</h3>
          <p className="text-slate-700 leading-relaxed mb-3">We may use:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Aggregated and anonymised usage data</li>
            <li>Performance analytics</li>
            <li>Error monitoring</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            This helps improve reliability and accuracy.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">D. Communications</h3>
          <p className="text-slate-700 leading-relaxed mb-3">We may send:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Account confirmations</li>
            <li>Subscription notices</li>
            <li>Renewal reminders</li>
            <li>Service updates</li>
            <li>Security alerts</li>
            <li>Support responses</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            Marketing emails are sent only if you opt in.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">E. Compliance &amp; Legal Obligations</h3>
          <p className="text-slate-700 leading-relaxed mb-3">We process data to:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Prevent fraud</li>
            <li>Maintain accounting records</li>
            <li>Comply with tax law</li>
            <li>Meet regulatory requirements</li>
            <li>Respond to lawful requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Legal Basis for Processing (UK GDPR)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 rounded-lg">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-800 font-semibold">Purpose</th>
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-800 font-semibold">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Account &amp; subscription services</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Contract</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">AI CV/interview processing</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Contract</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">AI model improvement (if identifiable)</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Explicit Consent</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Marketing emails</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Consent</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Platform analytics</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Legitimate Interest or Consent</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Fraud prevention</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Legitimate Interest</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Accounting &amp; compliance</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Legal Obligation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Automated Decision-Making &amp; AI Transparency</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            MockITHub uses AI systems to generate:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Interview questions</li>
            <li>Performance scoring</li>
            <li>CV recommendations</li>
            <li>Behavioural insights</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            These are automated processes.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3 font-semibold">Important:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>AI outputs are advisory only</li>
            <li>They do not replace human judgement</li>
            <li>They do not produce legally binding decisions</li>
            <li>Users may request human review where available</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            You have the right not to be subject solely to automated decision-making with significant legal effects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Sharing</h2>
          <p className="text-slate-700 leading-relaxed mb-4 font-semibold">
            We do not sell personal data.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may share data with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Payment processors (e.g., Stripe)</li>
            <li>Cloud hosting providers</li>
            <li>AI processing infrastructure providers</li>
            <li>Analytics providers</li>
            <li>Email communication services</li>
            <li>Security monitoring providers</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            All third parties are bound by contractual data protection obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. International Transfers</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Due to global infrastructure, data may be processed outside the UK.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            We safeguard transfers through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>UK-approved Standard Contractual Clauses (SCCs)</li>
            <li>Adequacy decisions</li>
            <li>Data processing agreements</li>
            <li>Encrypted infrastructure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Retention</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We retain data only as long as necessary.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 rounded-lg">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-800 font-semibold">Data Type</th>
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-800 font-semibold">Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">CV uploads</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">12–24 months</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Interview recordings</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">12 months</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Account data</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">While account is active</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Payment records</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">7 years (legal requirement)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Analytics data</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Up to 26 months</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Community content</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Until deleted by user or account closure</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 leading-relaxed mt-4">
            Users may request earlier deletion where legally permitted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Your Rights</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Under UK GDPR, you have the right to:
          </p>
          <div className="space-y-3">
            {[
              'Access your data',
              'Correct inaccurate data',
              'Request deletion',
              'Restrict processing',
              'Object to processing',
              'Withdraw consent',
              'Data portability',
              'Request human review of automated outputs',
            ].map((right) => (
              <div key={right} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                <p className="text-slate-700 text-sm">{right}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-700 leading-relaxed mt-6">
            To exercise your rights: <strong>support@mockithub.ai</strong>
          </p>
          <p className="text-slate-700 leading-relaxed mt-2">
            We respond within one month unless extended under lawful circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Security Measures</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We implement industry-standard security measures:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Encryption in transit (TLS)</li>
            <li>Encryption at rest</li>
            <li>Role-based access control</li>
            <li>Multi-factor authentication for staff</li>
            <li>Regular vulnerability assessments</li>
            <li>Access logging &amp; monitoring</li>
            <li>Incident response procedures</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            In case of a data breach, we will notify affected users and regulators where legally required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Children's Privacy</h2>
          <p className="text-slate-700 leading-relaxed">
            MockITHub is not intended for individuals under 18. If we discover data from a minor, it will be deleted promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Complaints</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You may lodge a complaint with:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-4">
            <p className="text-slate-700 font-semibold">Information Commissioner's Office (ICO)</p>
            <p className="text-slate-700">
              Website:{' '}
              <a href="https://ico.org.uk" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>
            </p>
          </div>
          <p className="text-slate-700 leading-relaxed">
            We encourage contacting us first at <strong>support@mockithub.ai</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to This Policy</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may update this Privacy Policy periodically. Significant changes will be communicated via email or platform notification.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Continued use of the platform indicates acceptance of updates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Third-Party Links</h2>
          <p className="text-slate-700 leading-relaxed">
            Our platform may contain links to third-party websites. We are not responsible for their privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Contact Information</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700 font-semibold">MockITHub Ltd</p>
            <p className="text-slate-700">165–169 Great Portland Street</p>
            <p className="text-slate-700">5th Floor, W1W 5PF</p>
            <p className="text-slate-700">London, United Kingdom</p>
            <p className="text-slate-700 mt-3"><strong>Support:</strong> support@mockithub.ai</p>
            <p className="text-slate-700"><strong>Company Number:</strong> 16823684</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
}