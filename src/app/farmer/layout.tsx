import FarmerBottomNav from '@/features/farmer/components/FarmerBottomNav';
import FarmerSidebar from '@/features/farmer/components/FarmerSidebar';

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <FarmerSidebar />

      {/* Content: offset by sidebar on desktop, padded for bottom nav on mobile */}
      <div className="lg:ml-60 min-h-screen pb-20 lg:pb-0">
        {children}
      </div>

      <FarmerBottomNav />
    </div>
  );
}
