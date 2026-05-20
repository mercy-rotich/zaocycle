import { Package } from 'lucide-react';
import PickupsClient from '@/features/farmer/components/PickupsClient';
import { mockFarmerPickups } from '@/lib/farmer-mock-data';

export default function PickupsPage() {
  return (
    <div className="px-4 pt-6">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <Package className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Waste Pickups</h1>
          <p className="text-slate-500 text-xs mt-0.5">Scheduled pickups &amp; M-Pesa payment history</p>
        </div>
      </div>

      {/* Tabbed list — client component */}
      <PickupsClient pickups={mockFarmerPickups} />
    </div>
  );
}
