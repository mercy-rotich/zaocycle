import { CheckCircle2, Clock, Truck, Package, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatKES, formatDate } from '@/shared/utils/formatters';
import type { WastePickupResponse, PickupStatus } from '@/types/api';

interface Props {
  pickups: WastePickupResponse[];
}

interface StatusConfig { icon: LucideIcon; label: string; classes: string }

const STATUS_CONFIG: Record<PickupStatus, StatusConfig> = {
  PAID:      { icon: CheckCircle2, label: 'Paid',      classes: 'text-green-400 bg-green-400/10 border-green-400/20' },
  COLLECTED: { icon: Truck,        label: 'Collected', classes: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  ASSIGNED:  { icon: Clock,        label: 'Assigned',  classes: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  REQUESTED: { icon: Clock,        label: 'Requested', classes: 'text-slate-400 bg-slate-400/10 border-slate-400/20' },
  CANCELLED: { icon: AlertCircle,  label: 'Cancelled', classes: 'text-red-400 bg-red-400/10 border-red-400/20' },
  FAILED:    { icon: AlertCircle,  label: 'Failed',    classes: 'text-red-400 bg-red-400/10 border-red-400/20' },
};

function StatusBadge({ status }: { status: PickupStatus }) {
  const { icon: Icon, label, classes } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${classes}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export default function ActivityTable({ pickups }: Props) {
  const recent = pickups.slice(0, 20);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-green-400" />
          <h2 className="text-white font-bold">Recent Waste Pickups</h2>
        </div>
        <span className="text-slate-500 text-sm">{recent.length} entries</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              {['Pickup ID', 'Requested', 'Scheduled', 'Weight', 'Payout', 'Status'].map((h) => (
                <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500 text-sm">
                  No pickups yet.
                </td>
              </tr>
            ) : recent.map((p, i) => (
              <tr key={p.id} className={`hover:bg-slate-800/40 transition-colors ${i < recent.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                <td className="px-6 py-4">
                  <p className="text-white text-sm font-mono">#{p.id.slice(-8).toUpperCase()}</p>
                  <p className="text-slate-500 text-xs">{p.farmerId.slice(-6)}</p>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm whitespace-nowrap">
                  {formatDate(p.requestedAt)}
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm whitespace-nowrap">
                  {p.scheduledFor ? formatDate(p.scheduledFor) : '—'}
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm font-mono whitespace-nowrap">
                  {p.weightKg != null ? `${p.weightKg} kg` : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {p.payoutAmount != null
                    ? <span className="text-green-400 text-sm font-semibold">{formatKES(p.payoutAmount)}</span>
                    : <span className="text-slate-600 text-sm">—</span>
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
