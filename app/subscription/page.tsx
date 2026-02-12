'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Subscription {
  tier: 'free' | 'premium' | 'pay-per-use';
  downloadsRemaining: number;
  maxResolution: string;
  hasTranscript: boolean;
  hasBatchDownload: boolean;
  isAdFree: boolean;
  expiresAt?: number;
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching subscription data
    const mockSubscription: Subscription = {
      tier: 'free',
      downloadsRemaining: 5,
      maxResolution: '480p',
      hasTranscript: false,
      hasBatchDownload: false,
      isAdFree: false,
    };
    setSubscription(mockSubscription);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎬</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              XHS Video Downloader
            </h1>
          </div>
          <a href="/" className="text-gray-600 hover:text-gray-800 font-medium">
            ← Back Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Subscription</h1>
          <p className="text-gray-600 mb-8">Manage your subscription and billing</p>

          {subscription && (
            <div className="space-y-8">
              {/* Current Plan */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Plan Details */}
                  <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-6 border border-pink-200">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Current Tier</p>
                      <p className="text-3xl font-bold text-pink-500 capitalize">{subscription.tier}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Downloads Remaining Today</p>
                        <p className="text-lg font-semibold text-gray-900">{subscription.downloadsRemaining}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Max Resolution</p>
                        <p className="text-lg font-semibold text-gray-900">{subscription.maxResolution}</p>
                      </div>
                      {subscription.expiresAt && (
                        <div>
                          <p className="text-sm text-gray-600">Expires</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(subscription.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-4">Features Included</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={subscription.hasTranscript ? '✅' : '❌'}>
                          {subscription.hasTranscript ? '✅' : '❌'}
                        </span>
                        <span>AI Transcripts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>{subscription.hasBatchDownload ? '✅' : '❌'}</span>
                        <span>Batch Download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>{subscription.isAdFree ? '✅' : '❌'}</span>
                        <span>Ad-Free Experience</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upgrade Options */}
              {subscription.tier === 'free' && (
                <div className="border-b border-gray-200 pb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Upgrade Your Plan</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Premium Tier */}
                    <div className="bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-lg p-6 hover-lift transition-all">
                      <h3 className="text-2xl font-bold mb-2">Premium</h3>
                      <p className="text-white/80 mb-4">¥35/month</p>
                      <ul className="space-y-2 mb-6 text-sm">
                        <li>✅ Unlimited downloads</li>
                        <li>✅ 1080p resolution</li>
                        <li>✅ AI transcripts</li>
                        <li>✅ Batch download</li>
                        <li>✅ Ad-free</li>
                      </ul>
                      <Link
                        href="/payment/checkout?tier=premium"
                        className="block w-full bg-white text-pink-500 font-bold py-2 rounded-lg text-center hover:bg-gray-100 transition"
                      >
                        Upgrade to Premium
                      </Link>
                    </div>

                    {/* Pay-Per-Use */}
                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg p-6 hover-lift transition-all">
                      <h3 className="text-2xl font-bold mb-2">Pay-Per-Use</h3>
                      <p className="text-white/80 mb-4">¥7 for 10 downloads</p>
                      <ul className="space-y-2 mb-6 text-sm">
                        <li>✅ 10 additional downloads</li>
                        <li>✅ 720p resolution</li>
                        <li>✅ No expiration</li>
                        <li>❌ No transcripts</li>
                        <li>❌ No batch download</li>
                      </ul>
                      <Link
                        href="/payment/checkout?tier=pay-per-use"
                        className="block w-full bg-white text-orange-500 font-bold py-2 rounded-lg text-center hover:bg-gray-100 transition"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing History */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 text-center py-8">No billing history yet</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl shadow-lg p-8 text-center animate-scale-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Have questions about your subscription? Contact our support team.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition hover-scale"
          >
            Contact Support
          </Link>
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
