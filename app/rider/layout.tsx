import RiderBottomNav from '@/components/rider/RiderBottomNav';

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-md mx-auto pb-20">
        {children}
      </div>
      <RiderBottomNav />
    </div>
  );
}
