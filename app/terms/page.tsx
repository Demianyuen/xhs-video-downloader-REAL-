export default function TermsOfService() {
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
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition">Privacy</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <p className="text-sm text-gray-500 mb-6">Last Updated: March 4, 2026</p>
            <p className="text-lg">
              Please read these Terms of Service carefully before using XHS Video Downloader
              ("Service") operated by us. By accessing or using our Service, you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by these Terms of Service
              and our Privacy Policy. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              XHS Video Downloader provides a free online tool that allows users to download videos from
              Xiaohongshu (小红书) for personal, non-commercial use. The Service is provided "as is" without
              any warranties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Permitted Use</h2>
            <p>You may use our Service only for lawful purposes and in accordance with these Terms. You agree to use the Service only to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Download videos for personal, non-commercial use</li>
              <li>Download videos that you have the right to download</li>
              <li>Download your own content or content you have explicit permission to download</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
            <p>You agree NOT to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Download copyrighted content without authorization from the copyright holder</li>
              <li>Redistribute, sell, or commercially exploit downloaded content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Harass, abuse, or harm other individuals</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to excessively access or scrape our Service</li>
              <li>Transmit any malicious code, viruses, or harmful content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p>
              All content downloaded through our Service remains the intellectual property of the original
              content creators. By using our Service, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Downloaded content is protected by copyright law</li>
              <li>You are solely responsible for ensuring you have the right to download any content</li>
              <li>We do not claim ownership of any downloaded content</li>
              <li>The website design, code, and branding of XHS Video Downloader are our intellectual property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the Service will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or reliability of any content</li>
              <li>Warranties that the Service will meet your requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Loss of profits, data, or goodwill</li>
              <li>Service interruptions or failures</li>
              <li>Any damages resulting from your use or inability to use the Service</li>
              <li>Any content downloaded through the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Rate Limiting</h2>
            <p>
              To ensure fair use and prevent abuse, we implement rate limiting on our Service:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Free users are limited to 5 downloads per day per IP address</li>
              <li>Excessive use may result in temporary or permanent access restrictions</li>
              <li>We reserve the right to modify rate limits at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services</h2>
            <p>
              Our Service may contain links to or integrate with third-party services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Google AdSense:</strong> We display advertisements through Google AdSense</li>
              <li><strong>Xiaohongshu:</strong> We access publicly available content from Xiaohongshu</li>
            </ul>
            <p className="mt-3">
              We are not responsible for the content, privacy policies, or practices of any third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Privacy</h2>
            <p>
              Your use of the Service is also governed by our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>,
              which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
              We shall not be liable to you or any third party for any modification, suspension, or discontinuation
              of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. We will notify users of significant changes
              by updating the "Last Updated" date. Your continued use of the Service after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard
              to conflict of law provisions. Any disputes arising from these Terms or your use of the Service
              shall be resolved through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p><strong>Email:</strong> legal@xhsvideodownloader.com</p>
              <p className="mt-2"><strong>Website:</strong> https://xhsvideodownloader.com</p>
            </div>
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
