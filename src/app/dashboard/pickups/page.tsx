'use client';

import { useState } from 'react';
import { Truck, X, UserCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDashPickupsQuery, useAssignRiderMutation, useCancelPickupMutation, useRidersListQuery } from '@/features/dashboard/hooks/useDashPickups';
import { formatDate, formatKES } from '@/shared/utils/formatters';
import type { WastePickupResponse, PickupStatus } from '@/types/api';

const STATUS_STYLES: Record<PickupStatus, string> = {
  REQUESTED: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
  ASSIGNED:  'text-amber-400 bg-amber-400/10 border-amber-400/20',
  COLLECTED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  PAID:      'text-green-400 bg-green-400/10 border-green-400/20',
  CANCELLED: 'text-red-400 bg-red-400/10 border-red-400/20',
  FAILED:    'text-red-400 bg-red-400/10 border-red-400/20',
};

const STATUS_ICONS: Record<PickupStatus, React.ElementType> = {
  REQUESTED: Clock, ASSIGNED: UserCheck, COLLECTED: Truck,
  PAID: CheckCircle2, CANCELLED: AlertCircle, FAILED: AlertCircle,
};

type FilterStatus = 'ALL' | PickupStatus;

const FILTERS: { key: FilterStatus; label: string }[] = [
  { key: 'ALL',       label: 'All' },
  { key: 'REQUESTED', label: 'Unassigned' },
  { key: 'ASSIGNED',  label: 'Assigned' },
  { key: 'COLLECTED', label: 'Collected' },
  { key: 'PAID',      label: 'Paid' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

function AssignModal({ pickup, onClose }: { pickup: WastePickupResponse; onClose: () => void }) {
  const { data: riders = [] } = useRidersListQuery();
  const { mutate: assign, isPending } = useAssignRiderMutation();
  const [selectedRider, setSelectedRider] = useState('');

  const activeRiders = riders.filter((r) => r.active);

  function handleAssign() {
    if (!selectedRider) return;
    assign({ id: pickup.id, riderId: selectedRider }, { onSuccess: onClose });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold">Assign Rider</h2>
          <button onClick={onClose} className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-500 text-xs mb-4">
          Pickup #{pickup.id.slice(-8).toUpperCase()} · Requested {formatDate(pickup.requestedAt)}
        </p>

        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Select Rider
        </label>
        <select
          value={selectedRider}
          onChange={(e) => setSelectedRider(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500 transition-colors mb-5"
        >
          <option value="">Choose a rider…</option>
          {activeRiders.map((r) => (
            <option key={r.id} value={r.id}>{r.fullName} — {r.ward}</option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={!selectedRider || isPending}
          className="w-full py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl text-sm transition-colors"
        >
          {isPending ? 'Assigning…' : 'Confirm Assignment'}
        </button>
      </div>
    </div>
  );
}

export default function DashPickupsPage() {
  const { data: pickups = [], isLoading } = useDashPickupsQuery();
  const { mutate: cancel } = useCancelPickupMutation();
  const [filter, setFilter] = useState<FilterStatus>('ALL');
  const [assigningPickup, setAssigningPickup] = useState<WastePickupResponse | null>(null);

  const filtered = filter === 'ALL' ? pickups : pickups.filter((p) => p.status === filter);

  const counts: Record<FilterStatus, number> = {
    ALL:       pickups.length,
    REQUESTED: pickups.filter((p) => p.status === 'REQUESTED').length,
    ASSIGNED:  pickups.filter((p) => p.status === 'ASSIGNED').length,
    COLLECTED: pickups.filter((p) => p.status === 'COLLECTED').length,
    PAID:      pickups.filter((p) => p.status === 'PAID').length,
    CANCELLED: pickups.filter((p) => p.status === 'CANCELLED').length,
    FAILED:    pickups.filter((p) => p.status === 'FAILED').length,
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
            <Truck className="w-5 h-5 text-green-400" />
          </div>
          <h1 className="text-white font-bold text-xl">Waste Pickups</h1>
        </div>
        <p className="text-slate-500 text-sm ml-12">Manage collection requests and rider assignments</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === key
                ? 'bg-green-600 text-white border-green-600'
                : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            {label} ({counts[key]})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-10 text-center">
          <p className="text-slate-400 text-sm">No pickups in this category.</p>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {['Pickup ID', 'Requested', 'Scheduled', 'Weight', 'Payout', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const Icon = STATUS_ICONS[p.status];
                const canAssign = p.status === 'REQUESTED';
                const canCancel = p.status === 'REQUESTED' || p.status === 'ASSIGNED';

                return (
                  <tr key={p.id} className={`hover:bg-slate-800/40 transition-colors ${i < filtered.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                    <td className="px-5 py-4">
                      <p className="text-white text-sm font-mono">#{p.id.slice(-8).toUpperCase()}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300 text-sm whitespace-nowrap">
                      {formatDate(p.requestedAt)}
                    </td>
                    <td className="px-5 py-4 text-slate-300 text-sm whitespace-nowrap">
                      {p.scheduledFor ? formatDate(p.scheduledFor) : '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-300 text-sm font-mono whitespace-nowrap">
                      {p.weightKg != null ? `${p.weightKg} kg` : '—'}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {p.payoutAmount != null
                        ? <span className="text-green-400 text-sm font-semibold">{formatKES(p.payoutAmount)}</span>
                        : <span className="text-slate-600 text-sm">—</span>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[p.status]}`}>
                        <Icon className="w-3 h-3" />
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {canAssign && (
                          <button
                            onClick={() => setAssigningPickup(p)}
                            className="px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 text-xs font-semibold rounded-lg border border-green-600/20 transition-colors"
                          >
                            Assign Rider
                          </button>
                        )}
                        {canCancel && (
                          <button
                            onClick={() => cancel(p.id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {assigningPickup && (
        <AssignModal pickup={assigningPickup} onClose={() => setAssigningPickup(null)} />
      )}
    </div>
  );
}
