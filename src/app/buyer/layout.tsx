import Link from 'next/link';
import { Leaf, ShieldCheck } from 'lucide-react';

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-base">
              Zao<span className="text-green-400">Cycle</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold bg-green-400/8 border border-green-400/15 px-2.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Food Safety Verification</span>
            <span className="sm:hidden">Verification</span>
          </div>
        </div>
      </header>

      {/* pb accounts for iOS home indicator in standalone PWA mode */}
      <main className="pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        {children}
      </main>

      <footer className="border-t border-slate-800/60 py-4 px-4 text-center">
        <p className="text-slate-700 text-xs">
          ZaoCycle · Kirinyaga County, Kenya · Certified PHI Compliance Platform
        </p>
      </footer>
    </div>
  );
}
