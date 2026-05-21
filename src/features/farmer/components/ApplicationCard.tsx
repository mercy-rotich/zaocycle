import { FlaskConical, CalendarDays, ArrowRight, Sprout } from 'lucide-react';
import { formatDate } from '@/shared/utils/formatters';
import type { PesticideApplicationResponse } from '@/types/api';

interface Props {
  application: PesticideApplicationResponse;
  chemicalName?: string;
  phiDays?: number;
}

const statusConfig = {
  PENDING: {
    bar: 'bg-amber-500',
    badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    label: 'Pending PHI',
  },
  SAFE: {
    bar: 'bg-green-500',
    badge: 'text-green-400 bg-green-400/10 border-green-400/20',
    label: 'Safe to Harvest',
  },
  EXPIRED: {
    bar: 'bg-red-500',
    badge: 'text-red-400 bg-red-400/10 border-red-400/20',
    label: 'Expired',
  },
  INVALIDATED: {
    bar: 'bg-slate-600',
    badge: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
    label: 'Invalidated',
  },
};

export default function ApplicationCard({ application, chemicalName, phiDays }: Props) {
  const config = statusConfig[application.status];

  return (
    <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bar}`} />

      <div className="p-4 pl-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{application.crop}</p>
              <p className="text-slate-500 text-xs mt-0.5">{application.quantityMl} ml applied</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${config.badge}`}>
            {config.label}
          </span>
        </div>

        <div className="space-y-1.5 pt-3 border-t border-slate-800/60">
          {chemicalName && (
            <div className="flex items-center gap-2">
              <FlaskConical className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="text-slate-400 text-xs">{chemicalName}</span>
              {phiDays && (
                <>
                  <span className="text-slate-700 text-xs">·</span>
                  <span className="text-slate-500 text-xs">{phiDays}-day PHI</span>
                </>
              )}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-500 text-xs">Safe harvest:</span>
            <ArrowRight className="w-3 h-3 text-slate-700 shrink-0" />
            <span className="text-slate-400 text-xs font-medium">
              {formatDate(application.safeHarvestDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
