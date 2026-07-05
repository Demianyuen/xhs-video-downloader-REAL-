import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Mail } from 'lucide-react';

export const metadata = {
  title: 'RedNote Creator Pack Delivery - XHS Downloader',
  description: 'How to use the RedNote Creator Pack after purchase.',
  alternates: {
    canonical: 'https://xhsvideodownloader.com/creator-pack',
  },
};

export default function CreatorPackPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-7 w-7 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-950">RedNote Creator Pack</h1>
        </div>
        <p className="mt-4 text-gray-600 leading-7">
          Use this page after purchase to process public RedNote/XHS links into clean notes.
          If you paid by Stripe or PayPal, keep your receipt and email it with any links that need manual help.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/extract"
            className="rounded-xl border border-gray-100 p-5 transition hover:border-pink-200 hover:bg-pink-50"
          >
            <FileText className="h-5 w-5 text-pink-600" />
            <h2 className="mt-3 font-bold text-gray-950">Extract post text</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Paste a public RedNote/XHS link and copy the extracted title, caption, and hashtags.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-pink-700">
              Open extractor <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <a
            href="mailto:support@xhsvideodownloader.com?subject=RedNote%20Creator%20Pack%20Processing"
            className="rounded-xl border border-gray-100 p-5 transition hover:border-pink-200 hover:bg-pink-50"
          >
            <Mail className="h-5 w-5 text-pink-600" />
            <h2 className="mt-3 font-bold text-gray-950">Manual processing help</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Send your receipt and up to 10 public links if automatic extraction fails.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-pink-700">
              Email support <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-5 text-sm leading-6 text-gray-600">
          <strong className="text-gray-950">Suggested workflow:</strong> collect links, run text extraction,
          paste the result into your notes app, then turn hooks and hashtags into your own original captions or scripts.
        </div>
      </div>
    </main>
  );
}
