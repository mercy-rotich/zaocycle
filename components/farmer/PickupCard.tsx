import { Package, User, Hash, CheckCircle2, CalendarClock } from 'lucide-react';
import type { FarmerPickup } from '@/lib/types';

interface Props {
  pickup: FarmerPickup;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function PickupCard({ pickup }: Props) {
  const isCompleted = pickup.status === 'completed';

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      {/* Status header band */}
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${
        isCompleted
          ? 'bg-green-500/5 border-green-500/10'
          : 'bg-amber-500/5 border-amber-500/10'
      }`}>
        <div className="flex items-center gap-2">
          {isCompleted
            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            : <CalendarClock className="w-3.5 h-3.5 text-amber-400" />
          }
          <span className={`text-xs font-semibold ${isCompleted ? 'text-green-400' : 'text-amber-400'}`}>
            {isCompleted ? 'Completed' : 'Scheduled'}
          </span>
        </div>
        <span className="text-slate-500 text-xs">
          {formatDate(isCompleted && pickup.collectedDate ? pickup.collectedDate : pickup.scheduledDate)}
        </span>
      </div>

      <div className="p-4">
        {/* Main row: waste type + payout */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{pickup.wasteType}</p>
              <p className="text-slate-500 text-xs mt-0.5">
                {isCompleted && pickup.actualWeightKg
                  ? `${pickup.actualWeightKg} kg collected`
                  : `~${pickup.estimatedWeightKg} kg estimated`
                }
              </p>
            </div>
          </div>

          {isCompleted && pickup.amountKES != null && (
            <div className="text-right shrink-0">
              <p className="text-green-400 text-lg font-extrabold tabular-nums leading-none">
                KES {pickup.amountKES.toLocaleString()}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">M-Pesa paid</p>
            </div>
          )}
        </div>

        {/* Detail rows */}
        <div className="space-y-2 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-400 text-xs">{pickup.riderName}</span>
          </div>

          {isCompleted && pickup.mpesaTransactionId && (
            <div className="flex items-center gap-2">
              <Hash className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="text-slate-500 text-xs">M-Pesa ref:</span>
              <span className="text-green-400 text-xs font-mono tracking-wider">
                {pickup.mpesaTransactionId}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
