'use client';

import { Wallet } from 'lucide-react';
import { useRiderEarningsQuery } from '@/features/rider/hooks/useRider';
import { formatKES } from '@/shared/utils/formatters';

export default function RiderEarningsPage() {
  const { data: e, isLoading } = useRiderEarningsQuery();

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <Wallet className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Earnings</h1>
          <p className="text-slate-500 text-xs">Your commission summary</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-24 bg-slate-800/50 rounded-xl animate-pulse" />
          <div className="h-40 bg-slate-800/50 rounded-2xl animate-pulse" />
        </div>
      ) : e ? (
        <>
          {/* Period stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Today',      value: e.today },
              { label: 'This Week',  value: e.thisWeek },
              { label: 'This Month', value: e.thisMonth },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                <p className="text-white text-sm font-extrabold tabular-nums leading-tight">
                  {value > 0 ? formatKES(value) : '—'}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* All-time hero */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-slate-900 rounded-2xl p-5 border border-green-700/40 mb-5">
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative">
              <p className="text-green-200/80 text-xs font-semibold uppercase tracking-widest mb-1.5">
                All Time Earned
              </p>
              <p className="text-white text-4xl font-extrabold tabular-nums">
                {formatKES(e.total)}
              </p>
              <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-green-200/70 text-xs mb-0.5">Pickups completed</p>
                  <p className="text-white text-sm font-bold">{e.pickupCount}</p>
                </div>
                <div>
                  <p className="text-green-200/70 text-xs mb-0.5">Waste recovered</p>
                  <p className="text-white text-sm font-bold">{e.totalWeightKg.toLocaleString()} kg</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm">No earnings data available.</p>
        </div>
      )}
    </div>
  );
}
