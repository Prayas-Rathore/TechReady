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
            <li>Buddy Connector (community feeds & live voice practice)</li>
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

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">B. AI-Generated & Derived Data</h3>
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
            <li>Payments are processed by third-party providers (e.g., Stripe)</li>
            <li>We do not store full card numbers</li>
            <li>We may receive limited billing metadata (e.g., subscription status, last 4 digits of card, transaction ID)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">D. Technical & Usage Data</h3>
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

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">E. Cookies & Tracking Technologies</h3>
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
            <li>CV Optimisation & ATS analysis</li>
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
            <li>Optional marketing emails (requires opt-in consent)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">E. Legal Compliance</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Fraud detection and prevention</li>
            <li>Responding to legal requests</li>
            <li>Enforcing our Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Legal Basis for Processing (UK GDPR)</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We process your personal data under the following legal bases:
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">A. Contractual Necessity</h3>
          <p className="text-slate-700 leading-relaxed">
            Processing is required to deliver services you subscribed to (e.g., CV analysis, interview preparation).
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">B. Consent</h3>
          <p className="text-slate-700 leading-relaxed">
            We rely on your explicit consent for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Marketing emails</li>
            <li>Non-essential cookies (analytics, advertising)</li>
            <li>Voice recordings in Buddy Connector</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">C. Legitimate Interests</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            For:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Platform improvement</li>
            <li>Security and fraud prevention</li>
            <li>Internal analytics (using aggregated/anonymised data)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">D. Legal Obligations</h3>
          <p className="text-slate-700 leading-relaxed">
            To comply with UK law (e.g., data retention for accounting purposes, responding to lawful requests).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Sharing & Third-Party Processors</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may share data with trusted third parties under strict contractual terms.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">A. Service Providers</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li><strong>OpenAI:</strong> For AI-powered features (CV analysis, interview simulation, drafting)</li>
            <li><strong>Supabase:</strong> Database hosting and authentication</li>
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>LiveKit:</strong> Voice call infrastructure (Buddy Connector)</li>
            <li><strong>Email Service Providers:</strong> Transactional and marketing emails</li>
            <li><strong>Cloud Hosting Providers:</strong> Data storage and infrastructure</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">B. Analytics Providers</h3>
          <p className="text-slate-700 leading-relaxed">
            We use Google Analytics and similar tools (only with consent) to understand user behaviour.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">C. Legal Disclosure</h3>
          <p className="text-slate-700 leading-relaxed">
            We may disclose data if required by law, court order, or regulatory authority.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">D. Business Transfers</h3>
          <p className="text-slate-700 leading-relaxed">
            If MockITHub is acquired or merged, your data may be transferred to the new entity under equivalent privacy protections.
          </p>

          <p className="text-slate-700 leading-relaxed mt-4 font-semibold">
            We do not sell personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. International Data Transfers</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Some third-party processors are located outside the UK/EEA (e.g., OpenAI in the USA).
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We ensure appropriate safeguards are in place:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>EU/UK Standard Contractual Clauses (SCCs)</li>
            <li>Adequacy decisions (where applicable)</li>
            <li>Additional security measures compliant with UK GDPR</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We retain personal data only as long as necessary.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3">
            <div>
              <p className="text-slate-700"><strong>CVs and Career Data:</strong> 12–24 months after account closure</p>
            </div>
            <div>
              <p className="text-slate-700"><strong>Interview Recordings:</strong> 12 months (or user-requested deletion)</p>
            </div>
            <div>
              <p className="text-slate-700"><strong>Account Data:</strong> Until account deletion, then 30 days</p>
            </div>
            <div>
              <p className="text-slate-700"><strong>Payment Records:</strong> 7 years (UK tax/accounting requirements)</p>
            </div>
            <div>
              <p className="text-slate-700"><strong>Analytics Data:</strong> Up to 26 months (aggregated/anonymised)</p>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mt-4">
            You may request earlier deletion by contacting us at support@mockithub.ai
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Your Rights Under UK GDPR</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You have the following rights:
          </p>

          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right of Access (Subject Access Request)</h4>
              <p className="text-slate-700 text-sm">Request a copy of all personal data we hold about you.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Rectification</h4>
              <p className="text-slate-700 text-sm">Correct inaccurate or incomplete data.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Erasure ("Right to be Forgotten")</h4>
              <p className="text-slate-700 text-sm">Request deletion of your data (subject to legal obligations).</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Restriction</h4>
              <p className="text-slate-700 text-sm">Limit how we process your data in certain circumstances.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Data Portability</h4>
              <p className="text-slate-700 text-sm">Receive your data in a machine-readable format (e.g., JSON, CSV).</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Object</h4>
              <p className="text-slate-700 text-sm">Object to processing based on legitimate interests or direct marketing.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Withdraw Consent</h4>
              <p className="text-slate-700 text-sm">Withdraw consent at any time (e.g., marketing emails, analytics cookies).</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Right to Lodge a Complaint</h4>
              <p className="text-slate-700 text-sm">
                File a complaint with the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>
              </p>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mt-6">
            To exercise any of these rights, contact us at <strong>support@mockithub.ai</strong>. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Security Measures</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We implement industry-standard security measures:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Encryption in transit (TLS/SSL)</li>
            <li>Encryption at rest for sensitive data</li>
            <li>Regular security audits and monitoring</li>
            <li>Access controls and role-based permissions</li>
            <li>Secure authentication mechanisms</li>
            <li>Data backup and disaster recovery plans</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            However, no method is 100% secure. We encourage users to use strong, unique passwords and enable two-factor authentication where available.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children's Privacy</h2>
          <p className="text-slate-700 leading-relaxed">
            MockITHub is not intended for users under 18. We do not knowingly collect data from children. If you believe we have inadvertently collected data from a minor, contact us immediately at support@mockithub.ai
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. AI-Specific Privacy Considerations</h2>
          
          <h3 className="text-xl font-semibold text-slate-800 mb-3">A. AI Model Training</h3>
          <p className="text-slate-700 leading-relaxed">
            We do not use your identifiable personal data (CVs, interview recordings, or uploads) to train our AI models without explicit, separate consent.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">B. Third-Party AI Providers</h3>
          <p className="text-slate-700 leading-relaxed">
            OpenAI processes data to generate outputs but does not use customer data for model training (per OpenAI's API terms).
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">C. AI-Generated Outputs</h3>
          <p className="text-slate-700 leading-relaxed">
            AI-generated feedback, CV scores, and interview simulations are derived from your inputs but do not expose your data to other users.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">D. Accuracy Disclaimer</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900 text-sm">
              AI outputs are probabilistic and may contain inaccuracies. Users should verify AI-generated content before use in real-world scenarios.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Updates to This Privacy Policy</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time to reflect:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Changes in our services</li>
            <li>Legal or regulatory requirements</li>
            <li>Improvements to our data practices</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            We will notify you of material changes via email or a prominent notice on our website. Continued use after notification constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            For privacy-related questions, data requests, or complaints:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Email:</strong> support@mockithub.ai</p>
            <p className="text-slate-700"><strong>Data Protection Officer:</strong> support@mockithub.ai</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, 165–169 Great Portland Street, 5th Floor, W1W 5PF, London, United Kingdom</p>
            <p className="text-slate-700"><strong>Website:</strong> www.mockithub.ai</p>
          </div>
          <p className="text-slate-700 leading-relaxed mt-4">
            <strong>UK Supervisory Authority:</strong> Information Commissioner's Office (ICO) - <a href="https://ico.org.uk" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}