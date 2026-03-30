'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(t.input.errorEmpty);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, type: 'download' }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/download/${data.videoId}`);
      } else {
        setError(data.error || t.input.errorGeneric);
      }
    } catch {
      setError(t.input.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fff1f2 0%, #fff7ed 50%, #fef9c3 100%)' }}>

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="bg-white/70 backdrop-blur-md border-b border-pink-100/60 sticky top-0 z-50">
        <div className="section-container py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-button">
              X
            </div>
            <span className="text-xl font-extrabold gradient-text hidden sm:block">
              XHS Downloader
            </span>
          </a>
          <nav className="flex gap-5 text-sm items-center">
            <a href="/"      className="text-pink-600 font-semibold">{t.header.home}</a>
            <a href="/blog"  className="text-gray-500 hover:text-gray-900 transition-colors duration-200">{t.header.blog}</a>
            <a href="/about" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">{t.header.about}</a>
            <a href="/faq"   className="text-gray-500 hover:text-gray-900 transition-colors duration-200">{t.header.faq}</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 lg:py-24">
        <div className="w-full max-w-2xl">

          {/* Eyebrow label */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <span className="badge">
              <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
              {t.hero.badge}
            </span>
          </div>

          {/* Main heading */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-gray-500 mb-6">
              {t.hero.subtitle}
            </p>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>

          {/* ── Input card ──────────────────────────────────── */}
          <div className="card p-8 mb-10 animate-fade-in-delay-1" style={{ boxShadow: '0 4px 32px rgba(230,57,107,0.10)' }}>
            <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
              {t.input.label}
            </label>
            <div className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.input.placeholder}
                className="input-field"
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleDownload()}
              />

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                onClick={handleDownload}
                disabled={loading}
                className="btn-primary w-full text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    {t.input.processing}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    {t.input.button}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Feature cards ──────────────────────────────── */}
          <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-in-delay-2">
            {[
              { icon: (
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                  </svg>
                ),
                title: t.features.noWatermark.title,
                desc: t.features.noWatermark.desc,
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                ),
                title: t.features.fastFree.title,
                desc: t.features.fastFree.desc,
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                ),
                title: t.features.safePrivate.title,
                desc: t.features.safePrivate.desc,
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/70 backdrop-blur rounded-xl p-4 text-center border border-pink-100/60 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-2">{icon}</div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── How to use ─────────────────────────────────── */}
          <div className="card p-8 animate-fade-in-delay-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {t.howItWorks.title}
            </h2>
            <ol className="space-y-4">
              {[
                { step: '1', ...t.howItWorks.step1 },
                { step: '2', ...t.howItWorks.step2 },
                { step: '3', ...t.howItWorks.step3 },
              ].map(({ step, strong, text }) => (
                <li key={step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {step}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-0.5">
                    <strong className="text-gray-900 font-semibold">{strong}</strong>{text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      {/* ── AdSense placeholder ────────────────────────────── */}
      <div className="py-8 border-t border-pink-100/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-24 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-200">
            {t.footer.adSpace}
          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/"       className="hover:text-pink-500 transition-colors">{t.footer.home}</a>
            <a href="/blog"   className="hover:text-pink-500 transition-colors">{t.footer.blog}</a>
            <a href="/about"  className="hover:text-pink-500 transition-colors">{t.footer.about}</a>
            <a href="/privacy" className="hover:text-pink-500 transition-colors">{t.footer.privacy}</a>
            <a href="/terms"  className="hover:text-pink-500 transition-colors">{t.footer.terms}</a>
          </div>
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
