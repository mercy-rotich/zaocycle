import { Package, Hash, CheckCircle2, CalendarClock, Clock, XCircle } from 'lucide-react';
import { formatDate, formatKES } from '@/shared/utils/formatters';
import type { WastePickupResponse, PickupStatus } from '@/types/api';

interface Props {
  pickup: WastePickupResponse;
}

const STATUS_CONFIG: Record<PickupStatus, { label: string; headerClass: string; icon: React.ElementType; iconClass: string }> = {
  REQUESTED: { label: 'Requested',    headerClass: 'bg-amber-500/5 border-amber-500/10',   icon: Clock,        iconClass: 'text-amber-400' },
  ASSIGNED:  { label: 'Rider Assigned', headerClass: 'bg-sky-500/5 border-sky-500/10',     icon: CalendarClock, iconClass: 'text-sky-400' },
  COLLECTED: { label: 'Collected',    headerClass: 'bg-blue-500/5 border-blue-500/10',      icon: Package,      iconClass: 'text-blue-400' },
  PAID:      { label: 'Paid',         headerClass: 'bg-green-500/5 border-green-500/10',    icon: CheckCircle2, iconClass: 'text-green-400' },
  CANCELLED: { label: 'Cancelled',    headerClass: 'bg-slate-500/5 border-slate-500/10',    icon: XCircle,      iconClass: 'text-slate-500' },
  FAILED:    { label: 'Failed',       headerClass: 'bg-red-500/5 border-red-500/10',        icon: XCircle,      iconClass: 'text-red-400' },
};

function getDisplayDate(pickup: WastePickupResponse): string {
  if (pickup.paidAt) return formatDate(pickup.paidAt);
  if (pickup.collectedAt) return formatDate(pickup.collectedAt);
  if (pickup.scheduledFor) return formatDate(pickup.scheduledFor);
  return formatDate(pickup.requestedAt);
}

export default function PickupCard({ pickup }: Props) {
  const config = STATUS_CONFIG[pickup.status];
  const Icon = config.icon;
  const isPaid = pickup.status === 'PAID';

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${config.headerClass}`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-3.5 h-3.5 ${config.iconClass}`} />
          <span className={`text-xs font-semibold ${config.iconClass}`}>{config.label}</span>
        </div>
        <span className="text-slate-500 text-xs">{getDisplayDate(pickup)}</span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold">Farm Waste</p>
              <p className="text-slate-500 text-xs mt-0.5">
                {pickup.weightKg != null
                  ? `${pickup.weightKg} kg collected`
                  : pickup.scheduledFor
                    ? `Scheduled ${formatDate(pickup.scheduledFor)}`
                    : 'Pending scheduling'}
              </p>
            </div>
          </div>

          {isPaid && pickup.payoutAmount != null && (
            <div className="text-right shrink-0">
              <p className="text-green-400 text-lg font-extrabold tabular-nums leading-none">
                {formatKES(pickup.payoutAmount)}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">M-Pesa paid</p>
            </div>
          )}
        </div>

        {pickup.notes && (
          <p className="text-slate-500 text-xs mb-3 italic">"{pickup.notes}"</p>
        )}

        <div className="pt-3 border-t border-slate-800/60 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Requested {formatDate(pickup.requestedAt)}</span>
          </div>
          {/* M-Pesa ref not available on pickup — shown if backend adds it later */}
        </div>
      </div>
    </div>
  );
}
