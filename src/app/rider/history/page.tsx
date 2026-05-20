import { Clock, Package, CheckCircle2, Hash } from 'lucide-react';
import { mockRiderPickups } from '@/lib/rider-mock-data';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

export default function RiderHistoryPage() {
  const completed = mockRiderPickups.filter(
    (p) => p.status === 'collected' || p.status === 'paid'
  );
  const totalKg  = completed.reduce((s, p) => s + (p.actualWeightKg ?? 0), 0);
  const totalKES = completed.reduce((s, p) => s + (p.actualPayoutKES ?? 0), 0);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
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
          <p className="text-green-400 text-2xl font-extrabold tabular-nums">
            KES {totalKES.toLocaleString()}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">Total paid to farmers</p>
        </div>
      </div>

      {/* Completed pickups list */}
      {completed.length > 0 ? (
        <div className="space-y-3">
          {completed.map((pickup) => (
            <div key={pickup.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-green-500/5 border-b border-green-500/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 text-xs font-semibold">Collected</span>
                </div>
                <span className="text-slate-500 text-xs">{formatDate(pickup.scheduledDate)}</span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-white text-sm font-bold">{pickup.farmerName}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{pickup.farmLocation}</p>
                  </div>
                  {pickup.actualPayoutKES != null && (
                    <div className="text-right shrink-0">
                      <p className="text-green-400 text-base font-extrabold tabular-nums">
                        KES {pickup.actualPayoutKES.toLocaleString()}
                      </p>
                      <p className="text-slate-500 text-xs">{pickup.actualWeightKg} kg</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Package className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    {pickup.wasteType}
                  </span>
                  {pickup.mpesaTransactionId && (
                    <>
                      <span className="text-slate-700 text-xs">·</span>
                      <span className="flex items-center gap-1 text-slate-500 text-xs">
                        <Hash className="w-3 h-3 text-slate-600 shrink-0" />
                        <span className="font-mono">{pickup.mpesaTransactionId}</span>
                      </span>
                    </>
                  )}
                </div>
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
