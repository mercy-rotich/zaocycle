'use client';

import Link from 'next/link';
import { Bike, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { useAdminRidersListQuery, useDeactivateRiderMutation, useActivateRiderMutation } from '@/features/admin/hooks/useAdminRiders';

const WARD_LABEL: Record<string, string> = {
  MWEA: 'Mwea', GICHUGU: 'Gichugu',
  KIRINYAGA_CENTRAL: 'Kirinyaga Central', NDIA: 'Ndia',
};

export default function AdminRidersPage() {
  const { data: riders = [], isLoading } = useAdminRidersListQuery();
  const { mutate: deactivate, isPending: deactivating } = useDeactivateRiderMutation();
  const { mutate: activate,   isPending: activating   } = useActivateRiderMutation();

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
            <Bike className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Riders</h1>
            <p className="text-slate-500 text-sm">{riders.length} registered riders</p>
          </div>
        </div>
        <Link
          href="/admin/riders/new"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Register Rider
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-slate-800/50 rounded-xl animate-pulse" />)}
        </div>
      ) : riders.length === 0 ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
          <p className="text-slate-400 text-sm mb-4">No riders registered yet.</p>
          <Link href="/admin/riders/new" className="text-green-400 hover:text-green-300 text-sm underline">
            Register the first rider
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {['Name', 'Phone', 'Ward', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riders.map((r, i) => (
                <tr key={r.id} className={`hover:bg-slate-800/40 transition-colors ${i < riders.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                  <td className="px-5 py-4">
                    <Link href={`/admin/riders/${r.id}`} className="text-white text-sm font-semibold hover:text-green-400 transition-colors">
                      {r.fullName}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-sm">{r.phone}</td>
                  <td className="px-5 py-4 text-slate-400 text-sm">{WARD_LABEL[r.ward] ?? r.ward}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                      r.active
                        ? 'text-green-400 bg-green-400/10 border-green-400/20'
                        : 'text-slate-500 bg-slate-500/10 border-slate-500/20'
                    }`}>
                      {r.active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {r.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {r.active ? (
                        <button
                          onClick={() => deactivate(r.id)}
                          disabled={deactivating}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition-colors disabled:opacity-50"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => activate(r.id)}
                          disabled={activating}
                          className="px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 text-xs font-semibold rounded-lg border border-green-600/20 transition-colors disabled:opacity-50"
                        >
                          Reactivate
                        </button>
                      )}
                      <Link
                        href={`/admin/riders/${r.id}`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
