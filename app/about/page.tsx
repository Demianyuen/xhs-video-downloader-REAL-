'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            About Us
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About XHS Video Downloader</h2>
            <p className="text-gray-600 text-lg">XHS Video Downloader is a free, fast, and easy-to-use online tool for downloading videos from Xiaohongshu (XHS) in multiple resolutions without registration or installation.</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">Our mission is to provide users with a simple, reliable, and secure way to download and save their favorite Xiaohongshu videos for personal use.</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">🎁 100% Free</h4>
                <p className="text-gray-600 text-sm">No hidden fees, no premium plans. Completely free forever.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">⚡ Super Fast</h4>
                <p className="text-gray-600 text-sm">Download videos in seconds with optimized servers.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">🔒 100% Safe</h4>
                <p className="text-gray-600 text-sm">No installation, no registration, no data collection.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">📱 All Devices</h4>
                <p className="text-gray-600 text-sm">Works on desktop, mobile, tablet, and all browsers.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Simplicity</h4>
                <p className="text-gray-600">Technology should be simple and accessible to everyone.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Privacy</h4>
                <p className="text-gray-600">We respect your privacy and don't collect unnecessary data.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Reliability</h4>
                <p className="text-gray-600">We strive to provide a reliable service that works every time.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Respect</h4>
                <p className="text-gray-600">We respect copyright laws and encourage responsible use.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Legal Notice</h3>
            <p className="text-gray-600 mb-4">XHS Video Downloader is for personal, non-commercial use only. Users are responsible for ensuring compliance with applicable laws and Xiaohongshu's terms of service.</p>
            <p className="text-gray-600">For more information, see our <a href="/terms" className="text-pink-500 hover:text-pink-600 font-semibold">Terms of Service</a> and <a href="/privacy" className="text-pink-500 hover:text-pink-600 font-semibold">Privacy Policy</a>.</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> support@xhsdownloader.top</p>
              <p className="text-gray-700 mb-2"><strong>Website:</strong> https://xhs-downloader.vercel.app</p>
              <p className="text-gray-700"><strong>Response Time:</strong> Within 24 hours</p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Copyright & Attribution</h3>
            <p className="text-gray-600">&copy; 2026 XHS Video Downloader. All rights reserved. XHS Video Downloader is not affiliated with, endorsed by, or associated with Xiaohongshu or any of its subsidiaries.</p>
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
