'use client';

import { useState } from 'react';
import PickupCard from './PickupCard';
import type { FarmerPickup } from '@/lib/types';

type Tab = 'scheduled' | 'completed';

interface Props {
  pickups: FarmerPickup[];
}

export default function PickupsClient({ pickups }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('scheduled');

  const scheduled = pickups.filter((p) => p.status === 'scheduled');
  const completed  = pickups.filter((p) => p.status === 'completed');
  const current    = activeTab === 'scheduled' ? scheduled : completed;

  const totalEarned = completed.reduce((sum, p) => sum + (p.amountKES ?? 0), 0);

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 mb-5">
        {(['scheduled', 'completed'] as Tab[]).map((tab) => (
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
              {tab === 'scheduled' ? scheduled.length : completed.length}
            </span>
          </button>
        ))}
      </div>

      {/* Summary strip for completed */}
      {activeTab === 'completed' && completed.length > 0 && (
        <div className="flex items-center justify-between bg-slate-900 border border-green-500/20 rounded-xl px-4 py-3 mb-4">
          <span className="text-slate-400 text-xs">Total received</span>
          <span className="text-green-400 text-sm font-extrabold tabular-nums">
            KES {totalEarned.toLocaleString()}
          </span>
        </div>
      )}

      {/* Cards */}
      {current.length > 0 ? (
        <div className="space-y-3">
          {current.map((pickup) => (
            <PickupCard key={pickup.id} pickup={pickup} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            {activeTab === 'scheduled' ? 'No upcoming pickups' : 'No completed pickups yet'}
          </p>
          <p className="text-slate-600 text-xs mt-1">
            {activeTab === 'scheduled'
              ? 'Request a pickup from your dashboard once crops are certified.'
              : 'Your waste collection history will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
}
