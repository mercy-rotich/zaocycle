'use client';

import { useState } from 'react';
import PickupCard from './PickupCard';
import { formatKES } from '@/shared/utils/formatters';
import type { WastePickupResponse } from '@/types/api';

type Tab = 'active' | 'completed';

const ACTIVE_STATUSES = new Set(['REQUESTED', 'ASSIGNED']);
const DONE_STATUSES   = new Set(['COLLECTED', 'PAID', 'CANCELLED', 'FAILED']);

interface Props {
  pickups: WastePickupResponse[];
}

export default function PickupsClient({ pickups }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('active');

  const active    = pickups.filter((p) => ACTIVE_STATUSES.has(p.status));
  const completed = pickups.filter((p) => DONE_STATUSES.has(p.status));
  const current   = activeTab === 'active' ? active : completed;

  const totalEarned = completed
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + (p.payoutAmount ?? 0), 0);

  return (
    <div>
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 mb-5">
        {(['active', 'completed'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'
            }`}>
              {tab === 'active' ? active.length : completed.length}
            </span>
          </button>
        ))}
      </div>

      {activeTab === 'completed' && totalEarned > 0 && (
        <div className="flex items-center justify-between bg-slate-900 border border-green-500/20 rounded-xl px-4 py-3 mb-4">
          <span className="text-slate-400 text-xs">Total received</span>
          <span className="text-green-400 text-sm font-extrabold tabular-nums">
            {formatKES(totalEarned)}
          </span>
        </div>
      )}

      {current.length > 0 ? (
        <div className="space-y-3">
          {current.map((pickup) => (
            <PickupCard key={pickup.id} pickup={pickup} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            {activeTab === 'active' ? 'No active pickups' : 'No completed pickups yet'}
          </p>
          <p className="text-slate-600 text-xs mt-1">
            {activeTab === 'active'
              ? 'Request a pickup from your dashboard once crops are certified.'
              : 'Your waste collection history will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
}
