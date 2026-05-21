import DashboardNav from '@/features/dashboard/components/DashboardNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <DashboardNav />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
