import { MapPin, Clock, Package, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { RiderPickupTask } from '@/lib/types';

interface Props {
  pickup: RiderPickupTask;
}

const statusConfig = {
  pending: {
    badge: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    dot: 'bg-sky-400',
    label: 'Unassigned',
  },
  assigned: {
    badge: 'text-green-400 bg-green-400/10 border-green-400/20',
    dot: 'bg-green-400',
    label: 'Your Pickup',
  },
  collected: {
    badge: 'text-slate-500 bg-slate-700/40 border-slate-700',
    dot: 'bg-slate-500',
    label: 'Collected',
  },
  paid: {
    badge: 'text-green-400 bg-green-400/10 border-green-400/20',
    dot: 'bg-green-400',
    label: 'Paid',
  },
};

export default function RiderPickupCard({ pickup }: Props) {
  const config = statusConfig[pickup.status];
  const isDone = pickup.status === 'collected' || pickup.status === 'paid';
  const estPayout = Math.round(pickup.estimatedWeightKg * pickup.payoutRateKES);
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    pickup.farmLocation + ', Kirinyaga County, Kenya'
  )}`;

  return (
    <div className={`bg-slate-900 rounded-2xl border overflow-hidden transition-all ${
      isDone ? 'border-slate-800/50 opacity-55' : 'border-slate-800 hover:border-slate-700'
    }`}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/60">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{pickup.scheduledTime}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Farmer info */}
        <p className="text-white text-base font-bold leading-tight mb-0.5">{pickup.farmerName}</p>
        <p className="text-slate-400 text-sm mb-3">{pickup.farmLocation}</p>

        {/* Waste + distance row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
          <span className="flex items-center gap-1.5 text-slate-300 text-sm">
            <Package className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {pickup.wasteType}
          </span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-300 text-sm font-medium">~{pickup.estimatedWeightKg} kg</span>
          <span className="text-slate-700">·</span>
          <span className="text-green-400 text-sm font-semibold">~KES {estPayout}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
          <span className="text-slate-400 text-sm">{pickup.distanceKm} km away</span>
        </div>

        {/* Actions */}
        {!isDone ? (
          <div className="flex gap-2.5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Navigate
            </a>
            <Link
              href={`/rider/pickup/${pickup.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 h-12 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Open
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 bg-slate-800/50 rounded-xl px-3 py-2.5">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            <span className="text-slate-400 text-sm">
              Farmer paid{' '}
              <span className="text-green-400 font-bold">
                KES {pickup.actualPayoutKES?.toLocaleString()}
              </span>
            </span>
            {pickup.mpesaTransactionId && (
              <span className="text-slate-600 text-xs font-mono ml-auto">
                {pickup.mpesaTransactionId}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
