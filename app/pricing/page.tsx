import Link from 'next/link';
import { Check, FileText, Sparkles, Video, Zap } from 'lucide-react';
import { getPaymentTarget } from '@/lib/payment-config';

const packFeatures = [
  '10 RedNote/XHS post text extractions with clean copy-ready output',
  '5 video transcription jobs when a direct media URL is available',
  'Creator repurpose checklist for captions, blog outlines, and short-form scripts',
  'Priority email help for failed public post links within 7 days',
];

const useCases = [
  'Turn RedNote product research into captions and blog drafts',
  'Archive useful tutorials as searchable notes',
  'Extract hooks, hashtags, and post text for content planning',
];

export const metadata = {
  title: 'RedNote Creator Pack - XHS Text Extraction and Transcription',
  description: 'A lightweight creator pack for extracting RedNote/XHS post text and turning public video content into reusable notes.',
  alternates: {
    canonical: 'https://xhsvideodownloader.com/pricing',
  },
};

export default function PricingPage() {
  const payment = getPaymentTarget();

  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1.5 text-sm font-medium text-pink-700">
              <Sparkles className="h-4 w-4" />
              Creator monetization toolkit
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              RedNote Creator Pack
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
              Extract post text, prepare video transcripts, and turn RedNote/XHS research into reusable creator notes.
              Built for creators, teachers, designers, and small business owners who need content ideas quickly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={payment.href}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-pink-600"
              >
                {payment.provider === 'email' ? 'Request the $9 pack' : 'Buy the $9 pack'}
              </a>
              <Link
                href="/extract"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-800 transition hover:border-pink-300 hover:text-pink-600"
              >
                Try text extraction
              </Link>
              <Link
                href="/creator-pack"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-800 transition hover:border-pink-300 hover:text-pink-600"
              >
                Delivery instructions
              </Link>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Payment provider: {payment.provider === 'email' ? 'manual access by email until payment links are configured' : payment.label}.
            </p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-orange-50 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-950">Creator Pack</h2>
                <p className="mt-1 text-sm text-gray-600">One-time launch offer</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-gray-950">$9</div>
                <div className="text-xs font-medium uppercase tracking-wide text-pink-700">USD</div>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {packFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <Check className="mt-1 h-4 w-4 flex-none text-pink-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto grid gap-4 px-4 py-8 sm:grid-cols-3">
          {[
            { icon: FileText, title: 'Post to text', body: 'Capture titles, captions, descriptions, and hashtags from public posts.' },
            { icon: Video, title: 'Media to transcript', body: 'Use OpenAI transcription when a direct video or audio URL is available.' },
            { icon: Zap, title: 'Repurpose faster', body: 'Turn extracted material into scripts, outlines, captions, and research notes.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-5 ring-1 ring-gray-100">
              <item.icon className="h-5 w-5 text-pink-600" />
              <h3 className="mt-3 font-bold text-gray-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-950">Who this helps</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {useCases.map((useCase) => (
            <li key={useCase} className="rounded-xl border border-gray-100 p-4 text-sm leading-6 text-gray-700">
              {useCase}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6 text-gray-500">
          Use this service only for content you have the right to analyze, archive, or repurpose. We do not grant rights to reuse third-party content commercially.
        </p>
      </section>
    </main>
  );
}
