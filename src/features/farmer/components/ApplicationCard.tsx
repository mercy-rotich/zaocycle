import { FlaskConical, CalendarDays, QrCode, Sprout, ArrowRight } from 'lucide-react';
import type { PesticideApplication } from '@/lib/types';

interface Props {
  application: PesticideApplication;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const statusConfig = {
  pending: {
    bar: 'bg-amber-500',
    badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    label: 'Pending',
  },
  safe: {
    bar: 'bg-green-500',
    badge: 'text-green-400 bg-green-400/10 border-green-400/20',
    label: 'Safe to Harvest',
  },
  expired: {
    bar: 'bg-red-500',
    badge: 'text-red-400 bg-red-400/10 border-red-400/20',
    label: 'Expired',
  },
};

export default function ApplicationCard({ application }: Props) {
  const config = statusConfig[application.status];

  return (
    <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group hover:border-slate-700 transition-colors">
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bar}`} />

      <div className="p-4 pl-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{application.cropType}</p>
              <p className="text-slate-500 text-xs mt-0.5 truncate">{application.plotName}</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${config.badge}`}>
            {config.label}
          </span>
        </div>

        {/* Detail rows */}
        <div className="space-y-1.5 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-400 text-xs">{application.chemical}</span>
            <span className="text-slate-700 text-xs">·</span>
            <span className="text-slate-500 text-xs">{application.phiDays}-day PHI</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-500 text-xs">
              Sprayed {formatDate(application.sprayedDate)}
            </span>
            <ArrowRight className="w-3 h-3 text-slate-700 shrink-0" />
            <span className="text-slate-500 text-xs">
              Safe {formatDate(application.safeHarvestDate)}
            </span>
          </div>

          {application.batchCode && (
            <div className="flex items-center gap-1.5 pt-1">
              <QrCode className="w-3.5 h-3.5 text-green-500 shrink-0" />
              <span className="text-green-400 text-xs font-mono tracking-wide">
                {application.batchCode}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
