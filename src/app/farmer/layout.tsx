import FarmerBottomNav from '@/features/farmer/components/FarmerBottomNav';

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">

      {/* Desktop: ambient glow behind the phone frame */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-80 bg-green-600/6 rounded-full blur-3xl" />
      </div>

      {/* Desktop: label above the frame */}
      <div className="hidden lg:flex items-center justify-center gap-2 pt-8 pb-3 text-slate-600 text-xs">
        <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full animate-pulse" />
        ZaoCycle Farmer · Field App · Optimised for mobile
      </div>

      {/* Phone frame on desktop, plain wrapper on mobile */}
      <div className="max-w-md mx-auto pb-20 lg:ring-1 lg:ring-slate-700/50 lg:rounded-2xl lg:overflow-hidden lg:shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        {children}
      </div>

      <FarmerBottomNav />
    </div>
  );
}
