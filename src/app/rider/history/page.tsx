'use client';

import { Clock, Package, CheckCircle2 } from 'lucide-react';
import { useRiderPickupsQuery } from '@/features/rider/hooks/useRiderPickups';
import { formatKES, formatDate } from '@/shared/utils/formatters';

export default function RiderHistoryPage() {
  const { data: pickups = [], isLoading } = useRiderPickupsQuery();

  const completed = pickups.filter((p) => p.status === 'COLLECTED' || p.status === 'PAID');
  const totalKg   = completed.reduce((s, p) => s + (p.weightKg ?? 0), 0);
  const totalKES  = completed.reduce((s, p) => s + (p.payoutAmount ?? 0), 0);

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <Clock className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">History</h1>
          <p className="text-slate-500 text-xs">Completed waste collections</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-green-400 text-2xl font-extrabold tabular-nums">{totalKg} kg</p>
          <p className="text-slate-500 text-xs mt-0.5">Total waste collected</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-green-400 text-xl font-extrabold tabular-nums">{formatKES(totalKES)}</p>
          <p className="text-slate-500 text-xs mt-0.5">Total paid to farmers</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : completed.length > 0 ? (
        <div className="space-y-3">
          {completed.map((pickup) => (
            <div key={pickup.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-green-500/5 border-b border-green-500/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 text-xs font-semibold">
                    {pickup.status === 'PAID' ? 'Paid' : 'Collected'}
                  </span>
                </div>
                <span className="text-slate-500 text-xs">
                  {pickup.collectedAt ? formatDate(pickup.collectedAt) : formatDate(pickup.createdAt)}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-bold">
                        Pickup #{pickup.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {pickup.weightKg != null ? `${pickup.weightKg} kg` : 'Weight pending'}
                      </p>
                    </div>
                  </div>
                  {pickup.payoutAmount != null && (
                    <div className="text-right shrink-0">
                      <p className="text-green-400 text-base font-extrabold tabular-nums">
                        {formatKES(pickup.payoutAmount)}
                      </p>
                      <p className="text-slate-500 text-xs">farmer paid</p>
                    </div>
                  )}
                </div>

                {pickup.notes && (
                  <p className="text-slate-500 text-xs italic truncate">"{pickup.notes}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm font-medium">No completed pickups yet.</p>
          <p className="text-slate-600 text-xs mt-1.5">
            Your collection history will appear here once you mark pickups as collected.
          </p>
        </div>
      )}
    </div>
  );
}
