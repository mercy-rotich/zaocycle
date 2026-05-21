'use client';

import Link from 'next/link';
import { Users, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { useAdminStaffListQuery, useDeactivateStaffMutation, useActivateStaffMutation } from '@/features/admin/hooks/useAdminStaff';
import { formatDate } from '@/shared/utils/formatters';

const ROLE_LABEL: Record<string, string> = {
  COOP_MANAGER: 'Coop Manager',
  ADMIN: 'Administrator',
};

export default function AdminStaffPage() {
  const { data: staff = [], isLoading } = useAdminStaffListQuery();
  const { mutate: deactivate, isPending: deactivating } = useDeactivateStaffMutation();
  const { mutate: activate,   isPending: activating   } = useActivateStaffMutation();

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Staff Members</h1>
            <p className="text-slate-500 text-sm">{staff.length} registered accounts</p>
          </div>
        </div>
        <Link
          href="/admin/staff/new"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-slate-800/50 rounded-xl animate-pulse" />)}
        </div>
      ) : staff.length === 0 ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center">
          <p className="text-slate-400 text-sm mb-4">No staff accounts yet.</p>
          <Link href="/admin/staff/new" className="text-green-400 hover:text-green-300 text-sm underline">
            Create the first staff member
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {['Name', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((s, i) => (
                <tr key={s.id} className={`hover:bg-slate-800/40 transition-colors ${i < staff.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                  <td className="px-5 py-4">
                    <Link href={`/admin/staff/${s.id}`} className="text-white text-sm font-semibold hover:text-green-400 transition-colors">
                      {s.fullName}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-sm">{s.email}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      s.role === 'ADMIN'
                        ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                        : 'text-sky-400 bg-sky-400/10 border-sky-400/20'
                    }`}>
                      {ROLE_LABEL[s.role] ?? s.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-sm whitespace-nowrap">
                    {formatDate(s.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                      s.active
                        ? 'text-green-400 bg-green-400/10 border-green-400/20'
                        : 'text-slate-500 bg-slate-500/10 border-slate-500/20'
                    }`}>
                      {s.active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {s.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {s.active ? (
                        <button
                          onClick={() => deactivate(s.id)}
                          disabled={deactivating}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition-colors disabled:opacity-50"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => activate(s.id)}
                          disabled={activating}
                          className="px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 text-xs font-semibold rounded-lg border border-green-600/20 transition-colors disabled:opacity-50"
                        >
                          Reactivate
                        </button>
                      )}
                      <Link
                        href={`/admin/staff/${s.id}`}
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
