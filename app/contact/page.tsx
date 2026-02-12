'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition"
                >
                  Send Message
                </button>
                {submitted && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                    ✅ Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">📧 Email</h4>
                  <p className="text-gray-600">support@xhsdownloader.top</p>
                  <p className="text-sm text-gray-500 mt-1">Response time: Within 24 hours</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🌐 Website</h4>
                  <p className="text-gray-600">https://xhs-downloader.vercel.app</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">⚖️ Legal Inquiries</h4>
                  <p className="text-gray-600">legal@xhsdownloader.top</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🔒 Privacy Concerns</h4>
                  <p className="text-gray-600">privacy@xhsdownloader.top</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">💡 Feedback</h4>
                  <p className="text-gray-600 text-sm">We'd love to hear your suggestions and feedback to improve our service!</p>
                </div>
              </div>
            </div>
          </div>
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
