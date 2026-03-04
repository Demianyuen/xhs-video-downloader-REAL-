export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition">
            XHS Video Downloader
          </a>
          <nav className="flex gap-8 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900 transition">Terms</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <p className="text-sm text-gray-500 mb-6">Last Updated: March 4, 2026</p>
            <p className="text-lg">
              XHS Video Downloader ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.1 Information You Provide</h3>
            <p>
              When you use our service, you provide us with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Xiaohongshu video URLs that you submit for downloading</li>
              <li>Any feedback or communications you send to us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.2 Automatically Collected Information</h3>
            <p>
              We automatically collect certain information when you visit our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>IP address and general location information</li>
              <li>Browser type and version</li>
              <li>Device information (type, operating system)</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to improve your experience. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant ads</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>To provide and maintain our video downloading service</li>
              <li>To process your download requests</li>
              <li>To improve and optimize our website performance</li>
              <li>To analyze usage patterns and trends</li>
              <li>To prevent fraud and abuse</li>
              <li>To comply with legal obligations</li>
              <li>To display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Google AdSense</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies
              to serve ads based on your prior visits to our website or other websites. You may opt out of
              personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>.
            </p>
            <p className="mt-3">
              For more information about how Google uses data, please visit{' '}
              <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google's Privacy & Terms
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Service Providers:</strong> We may share data with third-party service providers who help us operate our website (e.g., hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your information may be transferred</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p>
              We retain your information only for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Video URLs and download data are automatically deleted after 24 hours</li>
              <li>Analytics data is retained for up to 26 months</li>
              <li>Server logs are retained for up to 90 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications and personalized ads</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you believe we have collected information from
              a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have different data protection laws. By using our service, you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Security</h2>
            <p>
              We implement reasonable security measures to protect your information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p><strong>Email:</strong> privacy@xhsvideodownloader.com</p>
              <p className="mt-2"><strong>Website:</strong> https://xhsvideodownloader.com</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">GDPR Compliance (EU Users)</h2>
            <p>
              If you are located in the European Economic Area (EEA), you have additional rights under the
              General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Right to be informed about data collection and use</li>
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Rights related to automated decision-making and profiling</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the information provided above.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">CCPA Compliance (California Users)</h2>
            <p>
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access your personal information</li>
              <li>Right to equal service and price</li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/" className="hover:text-gray-900 transition">Home</a>
            <a href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-900 transition">Terms of Service</a>
          </div>
          <p>&copy; 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
