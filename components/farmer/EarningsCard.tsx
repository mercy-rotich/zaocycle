import { Banknote, TrendingUp, TrendingDown } from 'lucide-react';
import type { EarningsSummary } from '@/lib/types';

interface Props {
  earnings: EarningsSummary;
}

function formatKES(amount: number) {
  return `KES ${amount.toLocaleString()}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' });
}

export default function EarningsCard({ earnings }: Props) {
  const changePercent = Math.round(
    ((earnings.thisMonthKES - earnings.lastMonthKES) / earnings.lastMonthKES) * 100
  );
  const isUp = changePercent >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-slate-900 rounded-2xl p-5 border border-green-700/40">
      {/* Ambient glow decoration */}
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-green-200/80 text-xs font-semibold uppercase tracking-widest mb-1.5">
              This Month
            </p>
            <div className="text-4xl font-extrabold text-white tabular-nums leading-none">
              {formatKES(earnings.thisMonthKES)}
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Banknote className="w-5 h-5 text-green-200" />
          </div>
        </div>

        {/* Change badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isUp ? 'text-green-200 bg-white/10' : 'text-amber-300 bg-amber-400/15'
          }`}>
            <TrendIcon className="w-3 h-3" />
            {isUp ? '+' : ''}{changePercent}% vs last month
          </div>
        </div>

        {/* Footer row */}
        <div className="border-t border-white/10 pt-4 flex items-end justify-between">
          <div>
            <p className="text-green-200/70 text-xs mb-0.5">Last payment</p>
            <p className="text-white text-sm font-semibold">
              {formatKES(earnings.lastPaymentKES)}
              <span className="text-green-300/70 font-normal ml-1.5">
                · {formatDate(earnings.lastPaymentDate)}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-200/70 text-xs mb-0.5">All time</p>
            <p className="text-white text-sm font-bold tabular-nums">
              {formatKES(earnings.totalEarnedKES)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
