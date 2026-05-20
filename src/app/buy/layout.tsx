import BuyNav from '@/features/buyer/components/BuyNav';

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <BuyNav />
      <main>{children}</main>
      <footer className="border-t border-slate-800 mt-16 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-xs">
          <p>© 2026 ZaoCycle · Kirinyaga County, Kenya</p>
          <p>Zero Poison. Zero Waste. Clean Energy for Every School Kitchen.</p>
        </div>
      </footer>
    </div>
  );
}
