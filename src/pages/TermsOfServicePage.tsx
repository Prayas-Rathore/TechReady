import { memo } from 'react';
import PolicyLayout from '../components/PolicyLayout';

const TermsOfServicePage = memo(() => {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="November 24, 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Welcome to MockITHub</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            MockITHub is an AI-powered career and interview preparation platform designed to help you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Find suitable tech roles</li>
            <li>Improve your CV and applications</li>
            <li>Practise interviews</li>
            <li>Build confidence with structured roadmaps</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            By creating an account, subscribing, or using any part of MockITHub, you agree to these Terms of Service ("Terms").
          </p>
          <p className="text-slate-700 leading-relaxed">
            If you don't agree, please don't use the platform. MockITHub Ltd is a company registered in the United Kingdom.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Who Can Use MockITHub</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            To use MockITHub, you must:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
            <li>Be 18 years or older</li>
            <li>Provide accurate information when signing up</li>
            <li>Use the platform legally and responsibly</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            We may suspend or close accounts if these rules are broken.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. What MockITHub Offers</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            MockITHub provides digital, subscription-based services. Depending on your plan, you may have access to the following:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">1️⃣ Interview Mindset Roadmap (Personalised)</h3>
              <p className="text-slate-700 text-sm">
                A personalised roadmap that guides you from where you are today to being interview-ready, with clear tasks and milestones.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">2️⃣ Find a Tech Role</h3>
              <p className="text-slate-700 text-sm mb-2">Search and filter tech jobs using:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Job title</li>
                <li>Location</li>
                <li>Contract type</li>
                <li>Experience level</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">This helps you focus only on roles that fit your profile.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">3️⃣ CV Optimizer – Tailored CV with AI</h3>
              <p className="text-slate-700 text-sm mb-2">We analyse your CV and job descriptions to help:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Improve ATS compatibility</li>
                <li>Match recruiter expectations</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">You remain responsible for reviewing and submitting your CV.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">4️⃣ AI Drafter – Cover Letters & Emails</h3>
              <p className="text-slate-700 text-sm mb-2">Generate role-specific:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Cover letters</li>
                <li>LinkedIn messages</li>
                <li>Application emails</li>
                <li>Follow-up emails</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">Content is generated quickly using AI based on your inputs.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">5️⃣ Interview Toolkit – AI & MockITHub</h3>
              <p className="text-slate-700 text-sm mb-2">Practise:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>STAR scenario questions</li>
                <li>Interview questions based on real job descriptions</li>
                <li>AI-powered mock interviews with real-time feedback</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">This is for practice only and does not guarantee interview success.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">6️⃣ Buddy Connector</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Explore community feeds</li>
                <li>Practise interview scenarios via live mock interview voice calls</li>
                <li>Connect with other users</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2">You must treat other users professionally and respectfully.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">7️⃣ Post-Job Roadmap</h3>
              <p className="text-slate-700 text-sm mb-2">After landing a role, follow a personalised daily roadmap to:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Stay consistent</li>
                <li>Track progress</li>
                <li>Continue developing skills and confidence</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Subscriptions & Payments</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>MockITHub operates on a subscription model</li>
            <li>Payments are processed securely through providers like Stripe</li>
            <li>Subscription prices and billing periods are shown clearly at checkout</li>
            <li>Taxes are included where applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Automatic Renewal</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            All paid subscriptions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Renew automatically at the end of each billing period</li>
            <li>Continue until you cancel</li>
            <li>You can view renewal dates and billing details in your account dashboard and Stripe emails</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cancelling Your Subscription</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            You can cancel your subscription at any time through your account settings.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Cancelling stops future payments</li>
            <li>You keep access until the end of your current billing period</li>
            <li>We do not offer refunds for unused time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Refund Policy (Important – Please Read)</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            MockITHub provides instant access to digital services.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-red-900 mb-2">No Refunds After Use</h3>
            <p className="text-red-800 text-sm mb-2">
              Once you access paid features, we cannot offer refunds. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-red-800 text-sm ml-4">
              <li>Logging into the paid platform</li>
              <li>Using AI tools</li>
              <li>Uploading a CV</li>
              <li>Generating content</li>
              <li>Accessing mock interviews or roadmaps</li>
            </ul>
            <p className="text-red-800 text-sm mt-2">This follows UK consumer law for digital content.</p>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">14-Day Cooling-Off Period (Before Use Only)</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            You may request a refund within 14 days of purchase only if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-3">
            <li>You have not logged in to paid features</li>
            <li>You have not used any tools or content</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            Once any paid feature is used, refunds are no longer available.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Billing Errors & Exceptional Cases</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may consider refunds if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>You were charged twice</li>
            <li>A billing error occurred</li>
            <li>The platform failed and services couldn't be delivered</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            These cases are reviewed individually and refunds are not guaranteed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. What MockITHub Does Not Guarantee</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-amber-900 font-semibold mb-2">Important Notice</p>
            <p className="text-amber-800 text-sm mb-2">
              MockITHub helps you prepare — but we do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-800 text-sm ml-4">
              <li>Job offers</li>
              <li>Interviews</li>
              <li>Promotions</li>
              <li>Employment outcomes</li>
            </ul>
            <p className="text-amber-800 text-sm mt-2">
              All career decisions and applications remain your responsibility.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Using AI on MockITHub</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            MockITHub uses AI to generate suggestions, feedback, and practice content. Please note:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>AI outputs may not always be perfect</li>
            <li>AI advice is for guidance only</li>
            <li>You should review and apply judgement before using any output</li>
            <li>Where available, you may request human review</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Your Responsibilities</h2>
          <p className="text-slate-700 leading-relaxed mb-3">You agree to:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Use the platform lawfully and respectfully</li>
            <li>Upload only content you own or have permission to use</li>
            <li>Not misuse, copy, scrape, or exploit the platform</li>
            <li>Not share or resell your subscription</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            Breaking these rules may lead to suspension or termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>MockITHub owns all platform content, software, AI systems, and designs</li>
            <li>You may not copy or resell any part of the platform</li>
            <li>You retain ownership of your own CVs and uploaded content</li>
            <li>You allow MockITHub to process this content only to provide the services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Availability & Technical Issues</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We aim to keep MockITHub available at all times, but:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>We can't guarantee uninterrupted service</li>
            <li>Maintenance or updates may cause temporary downtime</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Limitation of Liability</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            To the maximum extent allowed by law:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>MockITHub is not responsible for indirect or consequential losses</li>
            <li>Our total liability is limited to the subscription fees you paid in the last 6 months</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            This does not limit liability for fraud or personal injury caused by negligence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Account Termination</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may suspend or terminate accounts if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>These Terms are repeatedly breached</li>
            <li>Fraud or abuse is detected</li>
            <li>Payments fail or chargebacks are raised</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            You can terminate your account at any time by cancelling your subscription.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Governing Law</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms are governed by the laws of England and Wales. Any disputes will be handled by courts in England & Wales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Changes to These Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may update these Terms occasionally. If changes are important, we'll notify you via:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Email</li>
            <li>Platform notification</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            Continued use means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">17. Contact Us</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Support:</strong> support@mockithub.ai</p>
            <p className="text-slate-700"><strong>Privacy:</strong> privacy@mockithub.com</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, 165–169 Great Portland Street, 5th Floor, W1W 5PF, London, United Kingdom</p>
          </div>
        </section>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mt-8">
          <p className="text-sky-900 font-semibold mb-2">Agreement</p>
          <p className="text-sky-800 text-sm">
            By using MockITHub, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
});

TermsOfServicePage.displayName = 'TermsOfServicePage';

export default TermsOfServicePage;