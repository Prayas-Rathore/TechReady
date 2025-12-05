import PolicyLayout from '../components/PolicyLayout';

export default function ConsentPolicyPage() {
  return (
    <PolicyLayout title="Consent Policy" lastUpdated="December 3, 2025">
      <div className="space-y-8">
        <section> 
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            At MockITHub Ltd ("MockITHub," "we," "us," or "our"), we respect your privacy and are committed
            to providing you with clear choices about how we collect, use and share your personal information.
            This Consent Policy explains how we obtain and manage your consent for data processing activities.
          </p>
          <p className="text-slate-700 leading-relaxed">
            This policy should be read in conjunction with our Privacy Policy and Cookies Policy, which provide
            detailed information about our data practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Types of Consent</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.1 Explicit Consent</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            For certain sensitive processing activities, we require your explicit consent. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Video and audio recording during mock interviews</li>
            <li>Analysis of your interview performance using AI technology</li>
            <li>Sharing your anonymised data for research purposes</li>
            <li>Marketing communications and promotional offers</li>
            <li>Using your testimonials and feedback publicly</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            Explicit consent is obtained through clear affirmative action, such as checking a box or clicking
            an "I agree" button.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.2 Implied Consent</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            By using MockITHub services, you provide implied consent for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Essential cookies necessary for platform functionality</li>
            <li>Basic analytics to improve service performance</li>
            <li>Processing information necessary to fulfil our contract with you</li>
            <li>Communication about your account and services</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.3 Opt-In vs. Opt-Out</h3>
          <p className="text-slate-700 leading-relaxed">
            We use an opt-in approach for non-essential data processing, meaning we will ask for your permission
            before processing your data. For certain activities, you can opt out at any time through your account
            settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. When We Request Consent</h2>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-3">Account Creation</h4>
              <p className="text-slate-700 text-sm mb-3">
                When you create an account, we ask for consent to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Process your personal information</li>
                <li>Store your data securely</li>
                <li>Send account-related notifications</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-3">Interview Sessions</h4>
              <p className="text-slate-700 text-sm mb-3">
                Before starting a recorded interview, we request consent for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Recording audio and video</li>
                <li>Analyzing your responses using AI</li>
                <li>Storing session data for your review</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-3">CV Upload</h4>
              <p className="text-slate-700 text-sm mb-3">
                When uploading your CV or resume, we ask for consent to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Parse and analyse your document</li>
                <li>Extract relevant information</li>
                <li>Provide optimisation recommendations</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-3">Marketing Communications</h4>
              <p className="text-slate-700 text-sm mb-3">
                We request separate consent for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Email newsletters and updates</li>
                <li>Promotional offers and discounts</li>
                <li>Product announcements</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-3">Cookie Consent</h4>
              <p className="text-slate-700 text-sm mb-3">
                On your first visit, we display a cookie banner requesting consent for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm ml-4">
                <li>Analytics and performance cookies</li>
                <li>Functional cookies for enhanced features</li>
                <li>Advertising and targeting cookies</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How to Provide Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We make it easy for you to understand what you're consenting to and provide clear mechanisms to
            give consent:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Clear Information</h4>
                <p className="text-slate-700 text-sm">
                  We provide clear, concise explanations of what data we collect and how we use it
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Specific Requests</h4>
                <p className="text-slate-700 text-sm">
                  We ask for consent separately for different purposes, not in bulk
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Voluntary Choice</h4>
                <p className="text-slate-700 text-sm">
                  Your consent must be freely given; you can refuse without negative consequences
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Affirmative Action</h4>
                <p className="text-slate-700 text-sm">
                  We require active consent through checkboxes, buttons, or explicit statements
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Withdrawing Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You have the right to withdraw your consent at any time. Withdrawing consent does not affect the
            lawfulness of processing carried out before its withdrawal.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">How to Withdraw Consent</h3>
          <div className="space-y-3">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h4 className="font-semibold text-sky-900 mb-2">Account Settings</h4>
              <p className="text-sky-800 text-sm">
                Log in to your account and navigate to Privacy Settings to manage your consent preferences
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h4 className="font-semibold text-sky-900 mb-2">Unsubscribe Links</h4>
              <p className="text-sky-800 text-sm">
                Click the "Unsubscribe" link at the bottom of our marketing emails
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h4 className="font-semibold text-sky-900 mb-2">Cookie Settings</h4>
              <p className="text-sky-800 text-sm">
                Use the cookie consent tool to adjust your cookie preferences at any time
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h4 className="font-semibold text-sky-900 mb-2">Contact Us</h4>
              <p className="text-sky-800 text-sm">
                Email privacy@mockithub.com to withdraw consent for specific processing activities
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Consequences of Withdrawing Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Depending on what consent you withdraw, this may affect your ability to use certain features:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>Withdrawing consent for interview recording will prevent you from using recorded interview features</li>
            <li>Refusing analytics cookies may limit our ability to improve your experience</li>
            <li>Unsubscribing from marketing emails means you'll miss promotional offers</li>
            <li>Some essential services require certain data processing to function</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Parental Consent</h2>
          <p className="text-slate-700 leading-relaxed">
            MockITHub is not intended for users under 18 years of age. If we discover that we have collected
            personal information from a child under 18 without parental consent, we will delete that information
            immediately. If you believe we have inadvertently collected such information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Record of Consent</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We maintain records of the consents you provide, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
            <li>What you consented to</li>
            <li>When you provided consent</li>
            <li>How consent was obtained</li>
            <li>Any changes or withdrawals of consent</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-3">
            You can request a copy of your consent records by contacting privacy@mockithub.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Updates to This Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            We may update this Consent Policy to reflect changes in our practices or legal requirements. Material
            changes will be communicated to you, and we may request renewed consent where necessary. The "Last
            Updated" date indicates when the policy was last revised.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            If you have questions about consent or wish to exercise your rights, please contact us:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-2">
            <p className="text-slate-700"><strong>Email:</strong> privacy@mockithub.com</p>
            <p className="text-slate-700"><strong>Data Protection Officer:</strong> dpo@mockithub.com</p>
            <p className="text-slate-700"><strong>Address:</strong> MockITHub Ltd, United Kingdom</p>
            <p className="text-slate-700"><strong>Website:</strong> www.mockithub.com</p>
          </div>
        </section>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mt-8">
          <p className="text-sky-900 font-semibold mb-2">Your Rights</p>
          <p className="text-sky-800 text-sm">
            You have control over your personal data. You can manage your consent preferences at any time
            through your account settings or by contacting us directly. We're here to help you understand
            and exercise your privacy rights.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
