'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useAdminRiderQuery, useDeactivateRiderMutation, useActivateRiderMutation } from '@/features/admin/hooks/useAdminRiders';

interface Props { params: Promise<{ id: string }> }

const WARD_LABEL: Record<string, string> = {
  MWEA: 'Mwea', GICHUGU: 'Gichugu',
  KIRINYAGA_CENTRAL: 'Kirinyaga Central', NDIA: 'Ndia',
};

export default function RiderDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: rider, isLoading, isError } = useAdminRiderQuery(id);
  const { mutate: deactivate, isPending: deactivating } = useDeactivateRiderMutation();
  const { mutate: activate,   isPending: activating   } = useActivateRiderMutation();

  if (isLoading) {
    return (
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-6" />
        <div className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (isError || !rider) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-red-400 text-sm mb-3">Rider not found.</p>
        <Link href="/admin/riders" className="text-green-400 hover:text-green-300 text-sm underline">Back to riders</Link>
      </div>
    );
  }

  const initials = rider.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('');

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/riders" className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <h1 className="text-white font-bold text-xl">Rider Detail</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mb-3 ring-4 ring-green-500/20">
          <span className="text-white text-2xl font-extrabold">{initials}</span>
        </div>
        <h2 className="text-white text-lg font-bold">{rider.fullName}</h2>
        <span className={`mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
          rider.active
            ? 'text-green-400 bg-green-400/10 border-green-400/20'
            : 'text-slate-500 bg-slate-500/10 border-slate-500/20'
        }`}>
          {rider.active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {rider.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Info card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5 space-y-4">
        {[
          { icon: Phone,  label: 'Phone', value: rider.phone },
          { icon: MapPin, label: 'Ward',  value: WARD_LABEL[rider.ward] ?? rider.ward },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-slate-500 text-xs">{label}</p>
              <p className="text-white text-sm font-medium">{value}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
            {rider.active ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-slate-500" />}
          </div>
          <div>
            <p className="text-slate-500 text-xs">Status</p>
            <p className={`text-sm font-medium ${rider.active ? 'text-green-400' : 'text-slate-500'}`}>
              {rider.active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      {rider.active ? (
        <button
          onClick={() => deactivate(rider.id)}
          disabled={deactivating}
          className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-sm border border-red-500/20 transition-colors disabled:opacity-50"
        >
          {deactivating ? 'Deactivating…' : 'Deactivate Rider'}
        </button>
      ) : (
        <button
          onClick={() => activate(rider.id)}
          disabled={activating}
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          {activating ? 'Reactivating…' : 'Reactivate Rider'}
        </button>
      )}
    </div>
  );
}
