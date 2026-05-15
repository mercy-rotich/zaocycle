'use client';

import { useState } from 'react';
import ApplicationCard from './ApplicationCard';
import type { PesticideApplication } from '@/lib/types';

type Filter = 'all' | 'pending' | 'safe' | 'expired';

const filters: { key: Filter; label: string; color: string }[] = [
  { key: 'all',     label: 'All',     color: 'data-[active=true]:bg-slate-700 data-[active=true]:text-white' },
  { key: 'pending', label: 'Pending', color: 'data-[active=true]:bg-amber-500/20 data-[active=true]:text-amber-400 data-[active=true]:border-amber-500/30' },
  { key: 'safe',    label: 'Safe',    color: 'data-[active=true]:bg-green-500/20 data-[active=true]:text-green-400 data-[active=true]:border-green-500/30' },
  { key: 'expired', label: 'Expired', color: 'data-[active=true]:bg-red-500/20 data-[active=true]:text-red-400 data-[active=true]:border-red-500/30' },
];

interface Props {
  applications: PesticideApplication[];
}

export default function ApplicationsClient({ applications }: Props) {
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all'
    ? applications
    : applications.filter((a) => a.status === active);

  const counts: Record<Filter, number> = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    safe: applications.filter((a) => a.status === 'safe').length,
    expired: applications.filter((a) => a.status === 'expired').length,
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
        {filters.map(({ key, label, color }) => (
          <button
            key={key}
            data-active={active === key}
            onClick={() => setActive(key)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-slate-800 text-slate-500 transition-all ${color}`}
          >
            {label}
            <span className="text-[10px] opacity-70">({counts[key]})</span>
          </button>
        ))}
      </div>

      {/* Application list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm font-medium">No {active} applications</p>
          <p className="text-slate-600 text-xs mt-1">
            Log your next spray via USSD to see it here.
          </p>
        </div>
      )}
    </div>
  );
}
