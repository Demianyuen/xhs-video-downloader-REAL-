'use client';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I use XHS Video Downloader?',
      answer: 'Simply paste a Xiaohongshu video URL in the input field on the home page and click "Download Video". Select your preferred quality and the download will start automatically.'
    },
    {
      question: 'Is it really free?',
      answer: 'Yes! Completely free. No registration, no payment, no hidden fees. Download as many videos as you want.'
    },
    {
      question: 'What video qualities are available?',
      answer: 'We support multiple resolutions: 1080p, 720p, 480p, and 360p. The available quality depends on the original video.'
    },
    {
      question: 'Do I need to install anything?',
      answer: 'No installation needed! It&apos;s a web-based tool that works directly in your browser on any device.'
    },
    {
      question: 'Is it safe to use?',
      answer: 'Yes, it&apos;s 100% safe. We don&apos;t collect personal data, don&apos;t require registration, and don&apos;t install any software on your device.'
    },
    {
      question: 'Can I download videos in bulk?',
      answer: 'Currently, you can download videos one at a time. Batch download feature is coming soon in our premium tier.'
    },
    {
      question: 'What about transcripts?',
      answer: 'AI-powered transcription is currently in development. We&apos;ll have this feature available soon.'
    },
    {
      question: 'How long does a download take?',
      answer: 'Most videos download in seconds, depending on your internet speed and video size. Larger videos may take a bit longer.'
    },
    {
      question: 'Can I use downloaded videos commercially?',
      answer: 'No. Downloaded videos are for personal use only. Commercial use requires permission from the original creator.'
    },
    {
      question: 'What if I encounter an error?',
      answer: 'If you encounter an error, try refreshing the page and pasting the URL again. If the problem persists, contact our support team.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎬</span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                XHS Video Downloader
              </h1>
              <p className="text-xs text-gray-600">Free • No Registration • No Limits</p>
            </div>
          </div>
          <a href="/" className="text-gray-600 hover:text-gray-800 font-medium">
            ← Back Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Find answers to common questions about XHS Video Downloader
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition hover-lift animate-fade-in-delay-1"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  {faq.question}
                  <span className="text-gray-600 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-lg p-8 text-white text-center animate-scale-in">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">Can&apos;t find the answer you&apos;re looking for? Please contact our support team.</p>
          <a
            href="/contact"
            className="inline-block bg-white text-pink-500 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition hover-scale"
          >
            Contact Us
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>&copy; 2026 XHS Video Downloader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
