import FarmerBottomNav from '@/components/farmer/FarmerBottomNav';

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-md mx-auto pb-20">
        {children}
      </div>
      <FarmerBottomNav />
    </div>
  );
}
