import { memo } from 'react';
import PolicyLayout from '../components/PolicyLayout';

const ConsentPolicyPage = memo(() => {
  return (
    <PolicyLayout title="Consent Policy" lastUpdated="December 3, 2025">
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
            MockITHub Ltd is committed to processing personal data lawfully, fairly, and transparently in accordance with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>UK General Data Protection Regulation (UK GDPR)</li>
            <li>Data Protection Act 2018</li>
            <li>Privacy and Electronic Communications Regulations (PECR)</li>
            <li>ICO guidance on consent</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-3">
            This Consent Policy explains:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>When we rely on consent</li>
            <li>How consent is obtained</li>
            <li>How consent is recorded</li>
            <li>How consent may be withdrawn</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            This Policy should be read alongside our Privacy Policy and Cookie Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Lawful Basis for Processing</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Under UK GDPR, personal data may be processed on several lawful bases. MockITHub relies on:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Contractual necessity</li>
            <li>Legitimate interests</li>
            <li>Legal obligation</li>
            <li>Consent (where required)</li>
          </ul>
          <p className="text-slate-700 leading-relaxed font-semibold">
            Not all processing requires consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Account Registration & Service Delivery</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">3.1 Account Registration (Not Consent-Based)</h3>
            <p className="text-blue-800 text-sm mb-3">
              By completing account registration, you agree to the processing of your personal data necessary to provide the MockITHub services.
            </p>
            <p className="text-blue-800 text-sm mb-3">
              The processing required to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm ml-4 mb-3">
              <li>Create your account</li>
              <li>Provide subscription services</li>
              <li>Process CV uploads</li>
              <li>Deliver AI-powered interview simulations</li>
              <li>Provide roadmap features</li>
              <li>Manage billing and account administration</li>
            </ul>
            <p className="text-blue-800 text-sm mb-3">
              is carried out under <strong>contractual necessity</strong>, not consent.
            </p>
            <p className="text-blue-800 text-sm">
              This processing is required to deliver the services you request and cannot be withdrawn unless you close your account. If you do not agree to this processing, account registration cannot be completed.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">3.2 Contract-Based Processing (Not Consent)</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            The following processing activities are based on contractual necessity and do not rely on consent:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>CV uploads and analysis</li>
            <li>AI interview simulations</li>
            <li>Roadmap generation</li>
            <li>Job filtering features</li>
            <li>Subscription management</li>
            <li>Account communications</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            You may stop this processing only by closing your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. When We Require Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We rely on consent only where legally required. Consent is:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Freely given</li>
            <li>Specific</li>
            <li>Informed</li>
            <li>Unambiguous</li>
            <li>Recorded</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-6">
            We do not use pre-ticked boxes or bundled consent.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">4.1 Marketing Communications</h3>
              <p className="text-slate-700 text-sm mb-2">
                We request separate opt-in consent for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Email newsletters</li>
                <li>Promotional campaigns</li>
                <li>Product announcements</li>
                <li>Discounts and offers</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">
                You may withdraw consent at any time without affecting your account.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">4.2 Non-Essential Cookies</h3>
              <p className="text-slate-700 text-sm mb-2">
                We request consent before placing:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Analytics cookies</li>
                <li>Performance cookies</li>
                <li>Advertising or targeting cookies</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">
                Essential cookies do not require consent.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">4.3 Testimonials & Public Use of Content</h3>
              <p className="text-slate-700 text-sm mb-2">
                We request explicit consent before:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Publishing testimonials</li>
                <li>Displaying success stories</li>
                <li>Using feedback for promotional purposes</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">4.4 Optional AI Research or Model Improvement</h3>
              <p className="text-slate-700 text-sm mb-2">
                If we wish to use identifiable data for research, AI model improvement, or development beyond core service delivery, we will request separate explicit consent.
              </p>
              <p className="text-slate-700 text-sm">
                We do not use identifiable data for such purposes without lawful basis.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. How Consent Is Obtained</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Where consent is required, it is obtained through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Unticked checkboxes</li>
            <li>Clear "I Agree" buttons</li>
            <li>Separate opt-in fields</li>
            <li>Granular selection options</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            We provide clear explanations before consent is requested.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Withdrawing Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You may withdraw consent at any time. Withdrawal does not affect processing carried out before withdrawal.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            You may withdraw consent by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Updating privacy settings in your account</li>
            <li>Clicking "Unsubscribe" in marketing emails</li>
            <li>Adjusting cookie preferences</li>
            <li>Contacting support@mockithub.ai</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Consequences of Withdrawing Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Depending on the consent withdrawn:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Marketing emails will stop</li>
            <li>Interview recording features may be disabled</li>
            <li>Optional AI features may be restricted</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            Core services based on contract will continue unless you close your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Automated Processing & Profiling</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            MockITHub uses AI to generate:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Interview feedback</li>
            <li>CV recommendations</li>
            <li>Behavioural insights</li>
            <li>Readiness indicators</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            AI outputs are advisory and not legally binding.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            Where profiling is used:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>You are informed before processing</li>
            <li>You may request human review (where available)</li>
            <li>We do not make solely automated decisions with legal or similarly significant effects without safeguards</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Record of Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            MockITHub securely maintains records of:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>What consent was provided</li>
            <li>Date and time of consent</li>
            <li>Method of consent</li>
            <li>Any withdrawal or modification</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            You may request your consent record by contacting support@mockithub.ai .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            MockITHub is not intended for individuals under 18 years of age.
          </p>
          <p className="text-slate-700 leading-relaxed">
            If we become aware that we have collected personal data from a minor, we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Updates to This Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            This Consent Policy is reviewed annually or following significant legal or platform changes. We will notify you of material changes via email or platform notification.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            For questions about consent or data processing:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Support:</strong> support@mockithub.ai</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, 165–169 Great Portland Street, 5th Floor, W1W 5PF, London, United Kingdom</p>
            <p className="text-slate-700"><strong>Website:</strong> www.mockithub.ai</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
});

ConsentPolicyPage.displayName = 'ConsentPolicyPage';

export default ConsentPolicyPage;