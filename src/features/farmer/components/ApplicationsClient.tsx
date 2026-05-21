'use client';

import { useState } from 'react';
import ApplicationCard from './ApplicationCard';
import type { PesticideApplicationResponse, ApplicationStatus, ChemicalResponse } from '@/types/api';

type Filter = 'ALL' | ApplicationStatus;

const filters: { key: Filter; label: string; color: string }[] = [
  { key: 'ALL',         label: 'All',         color: 'data-[active=true]:bg-slate-700 data-[active=true]:text-white' },
  { key: 'PENDING',     label: 'Pending',     color: 'data-[active=true]:bg-amber-500/20 data-[active=true]:text-amber-400 data-[active=true]:border-amber-500/30' },
  { key: 'SAFE',        label: 'Safe',        color: 'data-[active=true]:bg-green-500/20 data-[active=true]:text-green-400 data-[active=true]:border-green-500/30' },
  { key: 'EXPIRED',     label: 'Expired',     color: 'data-[active=true]:bg-red-500/20 data-[active=true]:text-red-400 data-[active=true]:border-red-500/30' },
  { key: 'INVALIDATED', label: 'Invalidated', color: 'data-[active=true]:bg-slate-500/20 data-[active=true]:text-slate-400 data-[active=true]:border-slate-500/30' },
];

interface Props {
  applications: PesticideApplicationResponse[];
  chemicals: ChemicalResponse[];
}

export default function ApplicationsClient({ applications, chemicals }: Props) {
  const [active, setActive] = useState<Filter>('ALL');

  const chemicalMap = Object.fromEntries(chemicals.map((c) => [c.id, c]));

  const filtered = active === 'ALL'
    ? applications
    : applications.filter((a) => a.status === active);

  const counts = {
    ALL:         applications.length,
    PENDING:     applications.filter((a) => a.status === 'PENDING').length,
    SAFE:        applications.filter((a) => a.status === 'SAFE').length,
    EXPIRED:     applications.filter((a) => a.status === 'EXPIRED').length,
    INVALIDATED: applications.filter((a) => a.status === 'INVALIDATED').length,
  };

  return (
    <div>
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

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((app) => {
            const chem = chemicalMap[app.chemicalId];
            return (
              <ApplicationCard
                key={app.id}
                application={app}
                chemicalName={chem?.name}
                phiDays={chem?.phiDays}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            No {active === 'ALL' ? '' : active.toLowerCase()} applications
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Log your next spray via USSD to see it here.
          </p>
        </div>
      )}
    </div>
  );
}
