'use client';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free',
      price: '¥0',
      description: 'Perfect for casual users',
      features: [
        '5 downloads/day',
        '480p resolution',
        'No transcripts',
        'Community support',
      ],
      cta: 'Get Started',
      highlighted: false,
      ctaLink: '/',
    },
    {
      name: 'Premium',
      price: '¥35',
      period: '/month',
      description: 'Best for power users',
      features: [
        'Unlimited downloads',
        '1080p resolution',
        'AI transcripts',
        'Batch download (5 videos)',
        'Email support',
        'Ad-free',
      ],
      cta: 'Subscribe Now',
      highlighted: true,
      ctaLink: '/payment/checkout',
    },
    {
      name: 'Pay-Per-Use',
      price: '¥7',
      period: '/10 downloads',
      description: 'For occasional users',
      features: [
        '10 additional downloads',
        '720p resolution',
        'No expiration',
        'Community support',
      ],
      cta: 'Buy Now',
      highlighted: false,
      ctaLink: '/payment/checkout',
    },
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
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the plan that works for you
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 animate-fade-in-delay-1 hover-lift transition-all ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white shadow-2xl transform scale-105'
                  : 'bg-white shadow-lg'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className={tier.highlighted ? 'text-white/80' : 'text-gray-600'}>{tier.description}</p>
              <div className="my-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className={tier.highlighted ? 'text-white/80' : 'text-gray-600'}>
                    {tier.period}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaLink}
                className={`w-full py-3 rounded-lg font-bold transition hover-scale inline-block text-center ${
                  tier.highlighted
                    ? 'bg-white text-pink-500 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-lg'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 animate-slide-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Premium</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Pay-Per-Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Daily Downloads</td>
                  <td className="text-center py-3 px-4">5</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                  <td className="text-center py-3 px-4">10</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Max Resolution</td>
                  <td className="text-center py-3 px-4">480p</td>
                  <td className="text-center py-3 px-4">1080p</td>
                  <td className="text-center py-3 px-4">720p</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">AI Transcripts</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">❌</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Batch Download</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">❌</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Ad-Free</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl shadow-lg p-8 text-center animate-scale-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions about pricing?</h2>
          <p className="text-gray-600 mb-6">
            Check out our FAQ or contact our support team for more information.
          </p>
          <div className="space-x-4">
            <a
              href="/faq"
              className="inline-block bg-white text-pink-500 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition hover-scale"
            >
              View FAQ
            </a>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition hover-scale"
            >
              Contact Us
            </a>
          </div>
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
