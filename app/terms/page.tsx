'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>
            <p className="text-gray-600 mb-4"><strong>Last Updated:</strong> February 12, 2026</p>
            <p className="text-gray-600">Please read these Terms of Service carefully before using XHS Video Downloader. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Use License</h3>
            <p className="text-gray-600 mb-4">Permission is granted to temporarily download videos for personal, non-commercial use only. You may not:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Modify or copy the materials</li>
              <li>Use materials for commercial purposes</li>
              <li>Attempt to decompile or reverse engineer software</li>
              <li>Remove copyright or proprietary notations</li>
              <li>Transfer materials to another person or mirror on other servers</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Copyright & Intellectual Property</h3>
            <p className="text-gray-600">All content on XHS Video Downloader is protected by international copyright laws. Users must respect copyright laws when downloading and using videos. Downloading copyrighted content without permission may violate applicable laws.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h3>
            <p className="text-gray-600 mb-4">You agree to use this Service only for lawful purposes. Prohibited behavior includes:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Downloading videos in violation of copyright laws</li>
              <li>Commercial use of downloaded content without permission</li>
              <li>Distributing copyrighted content</li>
              <li>Using the service to harm others</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Disclaimer</h3>
            <p className="text-gray-600">The materials on XHS Video Downloader are provided on an 'as is' basis. We make no warranties and disclaim all warranties including merchantability, fitness for a particular purpose, or non-infringement of rights.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">5. Limitations of Liability</h3>
            <p className="text-gray-600">In no event shall XHS Video Downloader be liable for any damages arising from use or inability to use the Service, even if notified of the possibility of such damage.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">6. Governing Law</h3>
            <p className="text-gray-600">These Terms are governed by applicable laws. Any disputes shall be resolved in accordance with applicable jurisdiction.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">7. Contact Us</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> legal@xhsdownloader.top</p>
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
