import Link from 'next/link';
import { MapPin, Sprout, ShieldCheck, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import type { FarmRecord } from '@/lib/types';

interface Props {
  record: FarmRecord;
}

const statusConfig = {
  safe: {
    dot: 'bg-green-400',
    label: 'Residue-Free',
    labelColor: 'text-green-400',
    chipBg: 'bg-green-400/10 border-green-400/20',
    leftBar: 'bg-green-500',
    icon: ShieldCheck,
  },
  pending: {
    dot: 'bg-amber-400 animate-pulse',
    label: 'Pending Clearance',
    labelColor: 'text-amber-400',
    chipBg: 'bg-amber-400/10 border-amber-400/20',
    leftBar: 'bg-amber-500',
    icon: Clock,
  },
  flagged: {
    dot: 'bg-red-400',
    label: 'Unverified',
    labelColor: 'text-red-400',
    chipBg: 'bg-red-400/10 border-red-400/20',
    leftBar: 'bg-red-500',
    icon: AlertCircle,
  },
};

function formatShortDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function CertifiedCard({ record }: Props) {
  const cfg = statusConfig[record.status];
  const StatusIcon = cfg.icon;

  return (
    <Link
      href={`/buyer/verify/${encodeURIComponent(record.batchCode)}`}
      className="group flex bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Left accent bar */}
      <div className={`w-1 shrink-0 ${cfg.leftBar}`} />

      <div className="p-4 flex-1 min-w-0">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-white text-sm font-bold truncate">{record.farmerName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-600 shrink-0" />
              <p className="text-slate-500 text-xs truncate">{record.ward} Ward</p>
            </div>
          </div>
          <div className={`shrink-0 flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.chipBg} ${cfg.labelColor}`}>
            <StatusIcon className="w-3 h-3" />
            {cfg.label}
          </div>
        </div>

        {/* Crop row */}
        <div className="flex items-center gap-1.5 mb-3">
          <Sprout className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <p className="text-slate-400 text-xs">{record.cropType}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="text-slate-600 text-xs font-mono">
            {record.batchCode}
          </p>
          <div className="flex items-center gap-1 text-slate-500 group-hover:text-green-400 transition-colors text-xs font-medium">
            {record.status === 'safe' ? formatShortDate(record.certifiedAt) : 'View details'}
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
