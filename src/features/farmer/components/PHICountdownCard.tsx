'use client';

import { Sprout, FlaskConical, CalendarCheck } from 'lucide-react';
import { formatDate } from '@/shared/utils/formatters';
import type { PesticideApplicationResponse } from '@/types/api';

interface Props {
  application: PesticideApplicationResponse;
  chemicalName?: string;
  phiDays?: number;
}

function getDaysRemaining(safeDate: string): number {
  const diff = new Date(safeDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getProgress(safeDate: string, phiDays: number): number {
  const sprayedMs = new Date(safeDate).getTime() - phiDays * 86400000;
  const elapsed = (Date.now() - sprayedMs) / (1000 * 60 * 60 * 24);
  return Math.min(100, Math.round((elapsed / phiDays) * 100));
}

const statusConfig = {
  PENDING: {
    badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    bar: 'bg-gradient-to-r from-amber-500 to-amber-400',
    track: 'bg-amber-400/15',
    label: 'In Progress',
    dayText: (d: number) => `Safe to harvest in ${d} day${d !== 1 ? 's' : ''}`,
    dayColor: 'text-amber-400',
  },
  SAFE: {
    badge: 'text-green-400 bg-green-400/10 border-green-400/20',
    bar: 'bg-gradient-to-r from-green-600 to-green-400',
    track: 'bg-green-400/15',
    label: 'Safe',
    dayText: () => '✓ Safe to harvest now',
    dayColor: 'text-green-400',
  },
  EXPIRED: {
    badge: 'text-red-400 bg-red-400/10 border-red-400/20',
    bar: 'bg-gradient-to-r from-red-600 to-red-400',
    track: 'bg-red-400/15',
    label: 'Expired',
    dayText: () => 'Certificate has expired',
    dayColor: 'text-red-400',
  },
  INVALIDATED: {
    badge: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
    bar: 'bg-slate-500',
    track: 'bg-slate-700',
    label: 'Invalidated',
    dayText: () => 'Application invalidated',
    dayColor: 'text-slate-400',
  },
};

export default function PHICountdownCard({ application, chemicalName, phiDays }: Props) {
  const config = statusConfig[application.status];
  const daysRemaining = getDaysRemaining(application.safeHarvestDate);
  const progress = phiDays ? getProgress(application.safeHarvestDate, phiDays) : null;

  return (
    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
            <Sprout className="w-4 h-4 text-green-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-bold truncate">{application.crop}</p>
            <p className="text-slate-500 text-xs mt-0.5">
              {application.quantityMl} ml applied
            </p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${config.badge}`}>
          {config.label}
        </span>
      </div>

      {progress !== null && (
        <>
          <div className={`w-full h-2 ${config.track} rounded-full overflow-hidden mb-2`}>
            <div
              className={`h-full ${config.bar} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className={`text-xs font-semibold ${config.dayColor}`}>
              {config.dayText(daysRemaining)}
            </p>
            <p className="text-slate-600 text-xs tabular-nums">{progress}%</p>
          </div>
        </>
      )}

      {progress === null && (
        <p className={`text-xs font-semibold mb-4 ${config.dayColor}`}>
          {config.dayText(daysRemaining)}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 border-t border-slate-800/80">
        {chemicalName && (
          <>
            <span className="flex items-center gap-1.5 text-slate-500 text-xs">
              <FlaskConical className="w-3 h-3 text-slate-600 shrink-0" />
              {chemicalName}
            </span>
            {phiDays && (
              <>
                <span className="text-slate-700 text-xs">·</span>
                <span className="text-slate-500 text-xs">{phiDays}-day PHI</span>
              </>
            )}
            <span className="text-slate-700 text-xs">·</span>
          </>
        )}
        <span className="flex items-center gap-1 text-slate-500 text-xs">
          <CalendarCheck className="w-3 h-3 text-slate-600 shrink-0" />
          Safe: {formatDate(application.safeHarvestDate)}
        </span>
      </div>
    </div>
  );
}
