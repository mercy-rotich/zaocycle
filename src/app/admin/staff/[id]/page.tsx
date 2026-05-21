'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, ShieldCheck, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { useAdminStaffQuery, useDeactivateStaffMutation, useActivateStaffMutation } from '@/features/admin/hooks/useAdminStaff';
import { formatDate } from '@/shared/utils/formatters';

interface Props { params: Promise<{ id: string }> }

const ROLE_LABEL: Record<string, string> = {
  COOP_MANAGER: 'Coop Manager',
  ADMIN: 'Administrator',
};

export default function StaffDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: staff, isLoading, isError } = useAdminStaffQuery(id);
  const { mutate: deactivate, isPending: deactivating } = useDeactivateStaffMutation();
  const { mutate: activate,   isPending: activating   } = useActivateStaffMutation();

  if (isLoading) {
    return (
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-6" />
        <div className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-red-400 text-sm mb-3">Staff member not found.</p>
        <Link href="/admin/staff" className="text-green-400 hover:text-green-300 text-sm underline">Back to staff</Link>
      </div>
    );
  }

  const initials = staff.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('');

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/staff" className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <h1 className="text-white font-bold text-xl">Staff Detail</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-700 rounded-full flex items-center justify-center mb-3 ring-4 ring-sky-500/20">
          <span className="text-white text-2xl font-extrabold">{initials}</span>
        </div>
        <h2 className="text-white text-lg font-bold">{staff.fullName}</h2>
        <span className={`mt-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
          staff.role === 'ADMIN'
            ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
            : 'text-sky-400 bg-sky-400/10 border-sky-400/20'
        }`}>
          {ROLE_LABEL[staff.role]}
        </span>
      </div>

      {/* Info card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5 space-y-4">
        {[
          { icon: Mail,         label: 'Email',  value: staff.email },
          { icon: ShieldCheck,  label: 'Role',   value: ROLE_LABEL[staff.role] ?? staff.role },
          { icon: Calendar,     label: 'Joined', value: formatDate(staff.createdAt) },
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
            {staff.active ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-slate-500" />}
          </div>
          <div>
            <p className="text-slate-500 text-xs">Status</p>
            <p className={`text-sm font-medium ${staff.active ? 'text-green-400' : 'text-slate-500'}`}>
              {staff.active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      {staff.active ? (
        <button
          onClick={() => deactivate(staff.id)}
          disabled={deactivating}
          className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-sm border border-red-500/20 transition-colors disabled:opacity-50"
        >
          {deactivating ? 'Deactivating…' : 'Deactivate Account'}
        </button>
      ) : (
        <button
          onClick={() => activate(staff.id)}
          disabled={activating}
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          {activating ? 'Reactivating…' : 'Reactivate Account'}
        </button>
      )}
    </div>
  );
}
