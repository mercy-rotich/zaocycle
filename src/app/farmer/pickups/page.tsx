'use client';

import { Package } from 'lucide-react';
import PickupsClient from '@/features/farmer/components/PickupsClient';
import { useFarmerPickupsQuery } from '@/features/farmer/hooks/usePickups';

export default function PickupsPage() {
  const { data: pickups = [], isLoading } = useFarmerPickupsQuery();

  return (
    <div className="px-4 pt-6 lg:px-10 lg:pt-8 lg:max-w-5xl lg:mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <Package className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Waste Pickups</h1>
          <p className="text-slate-500 text-xs mt-0.5">Scheduled pickups &amp; M-Pesa payment history</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <PickupsClient pickups={pickups} />
      )}
    </div>
  );
}
