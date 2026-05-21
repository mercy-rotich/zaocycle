import AdminNav from '@/features/admin/components/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminNav />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
