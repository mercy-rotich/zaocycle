import { Banknote, Package } from 'lucide-react';
import { formatKES, formatDate } from '@/shared/utils/formatters';
import type { FarmerEarningsResponse } from '@/types/api';

interface Props {
  earnings: FarmerEarningsResponse;
}

export default function EarningsCard({ earnings }: Props) {
  const lastPayout = earnings.recentPayouts[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-slate-900 rounded-2xl p-5 border border-green-700/40">
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-green-200/80 text-xs font-semibold uppercase tracking-widest mb-1.5">
              This Month
            </p>
            <div className="text-4xl font-extrabold text-white tabular-nums leading-none">
              {formatKES(earnings.thisMonth)}
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Banknote className="w-5 h-5 text-green-200" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex items-end justify-between">
          <div>
            <p className="text-green-200/70 text-xs mb-0.5">Last payout</p>
            {lastPayout ? (
              <p className="text-white text-sm font-semibold">
                {formatKES(lastPayout.amount)}
                <span className="text-green-300/70 font-normal ml-1.5">
                  · {formatDate(lastPayout.date)}
                </span>
              </p>
            ) : (
              <p className="text-green-300/50 text-sm">No payouts yet</p>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end mb-0.5">
              <Package className="w-3.5 h-3.5 text-green-300/70" />
              <p className="text-green-200/70 text-xs">{earnings.pickupCount} pickups</p>
            </div>
            <p className="text-white text-sm font-bold tabular-nums">
              {formatKES(earnings.total)} all time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
