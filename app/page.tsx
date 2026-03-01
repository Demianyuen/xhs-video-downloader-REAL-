import { DownloaderHero } from './components/DownloaderHero';
import { Features } from './components/Features';
import { HowToUse } from './components/HowToUse';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased overflow-x-hidden selection:bg-[#F84F1D]/30">
      <main className="flex flex-col items-center w-full">
        <DownloaderHero />
        <Features />
        <HowToUse />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
