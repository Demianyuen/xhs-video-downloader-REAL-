'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4"><strong>Last Updated:</strong> February 12, 2026</p>
            <p className="text-gray-600">XHS Video Downloader respects your privacy. This page informs you of our policies regarding data collection and use.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h3>
            <p className="text-gray-600 mb-4">We collect minimal data:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Email address (only if you create an account)</li>
              <li>IP address (for rate limiting and security)</li>
              <li>Browser type and pages visited (for analytics)</li>
              <li>Session cookies (for authentication)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h3>
            <p className="text-gray-600 mb-4">We use collected data to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Provide and maintain our Service</li>
              <li>Notify you about changes to our Service</li>
              <li>Provide customer support</li>
              <li>Gather analytics to improve our Service</li>
              <li>Detect and prevent technical issues</li>
              <li>Prevent abuse and enforce our Terms</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. Data Security</h3>
            <p className="text-gray-600">We implement security measures to protect your data. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Third-Party Services</h3>
            <p className="text-gray-600 mb-4">We use third-party services for payments and analytics:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Stripe (payment processing)</li>
              <li>WeChat Pay (payment processing)</li>
              <li>Alipay (payment processing)</li>
              <li>Google Analytics (analytics)</li>
            </ul>
            <p className="text-gray-600 mt-4">These services have their own privacy policies. We do not store credit card data.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">5. GDPR Compliance</h3>
            <p className="text-gray-600 mb-4">For EU users, we comply with GDPR. You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">6. Contact Us</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacy@xhsdownloader.top</p>
              <p className="text-gray-700"><strong>Website:</strong> https://xhs-downloader.vercel.app</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>&copy; 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
