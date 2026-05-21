import { Clock, Package, ChevronRight, CheckCircle2, XCircle, CalendarClock } from 'lucide-react';
import Link from 'next/link';
import { formatKES, formatDate } from '@/shared/utils/formatters';
import type { WastePickupResponse, PickupStatus } from '@/types/api';

interface Props {
  pickup: WastePickupResponse;
}

const STATUS_CONFIG: Record<PickupStatus, {
  badge: string;
  dot: string;
  label: string;
}> = {
  REQUESTED: { badge: 'text-sky-400 bg-sky-400/10 border-sky-400/20',     dot: 'bg-sky-400',    label: 'Requested' },
  ASSIGNED:  { badge: 'text-green-400 bg-green-400/10 border-green-400/20', dot: 'bg-green-400',  label: 'Your Pickup' },
  COLLECTED: { badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20',   dot: 'bg-blue-400',   label: 'Collected' },
  PAID:      { badge: 'text-green-400 bg-green-400/10 border-green-400/20', dot: 'bg-green-400',  label: 'Paid' },
  CANCELLED: { badge: 'text-slate-500 bg-slate-700/40 border-slate-700',   dot: 'bg-slate-500',  label: 'Cancelled' },
  FAILED:    { badge: 'text-red-400 bg-red-400/10 border-red-400/20',      dot: 'bg-red-400',    label: 'Failed' },
};

const DONE = new Set<PickupStatus>(['COLLECTED', 'PAID', 'CANCELLED', 'FAILED']);

export default function RiderPickupCard({ pickup }: Props) {
  const config = STATUS_CONFIG[pickup.status];
  const isDone = DONE.has(pickup.status);

  return (
    <div className={`bg-slate-900 rounded-2xl border overflow-hidden transition-all ${
      isDone ? 'border-slate-800/50 opacity-60' : 'border-slate-800 hover:border-slate-700'
    }`}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/60">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {pickup.scheduledFor
              ? formatDate(pickup.scheduledFor)
              : formatDate(pickup.requestedAt)}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Pickup identity */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold">
                Pickup #{pickup.id.slice(-6).toUpperCase()}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                {pickup.weightKg != null
                  ? `${pickup.weightKg} kg collected`
                  : 'Weight not yet recorded'}
              </p>
            </div>
          </div>
          {pickup.payoutAmount != null && (
            <div className="text-right shrink-0">
              <p className="text-green-400 text-sm font-extrabold tabular-nums">
                {formatKES(pickup.payoutAmount)}
              </p>
              <p className="text-slate-500 text-xs">farmer payout</p>
            </div>
          )}
        </div>

        {pickup.notes && (
          <p className="text-slate-500 text-xs italic mb-3 line-clamp-2">"{pickup.notes}"</p>
        )}

        {/* Actions */}
        {!isDone ? (
          <div className="flex gap-2.5">
            <div className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-slate-800 border border-slate-700 rounded-xl">
              <CalendarClock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-xs font-medium">
                {pickup.scheduledFor ? formatDate(pickup.scheduledFor) : 'Unscheduled'}
              </span>
            </div>
            <Link
              href={`/rider/pickup/${pickup.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Open <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 bg-slate-800/50 rounded-xl px-3 py-2.5">
            {pickup.status === 'PAID' || pickup.status === 'COLLECTED' ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span className="text-slate-400 text-sm">
              {pickup.status === 'PAID' && pickup.payoutAmount != null
                ? <>Farmer paid <span className="text-green-400 font-bold">{formatKES(pickup.payoutAmount)}</span></>
                : pickup.status === 'COLLECTED'
                  ? 'Collected — payout pending'
                  : config.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
