'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStaffSchema, type CreateStaffInput } from '@/shared/utils/validators';
import { useCreateStaffMutation } from '@/features/admin/hooks/useAdminStaff';

const INPUT = 'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function NewStaffPage() {
  const { mutate: create, isPending } = useCreateStaffMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateStaffInput>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: { role: 'COOP_MANAGER' },
  });

  const onSubmit = handleSubmit((data) => create(data));

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/staff" className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <div>
          <h1 className="text-white font-bold text-xl">Add Staff Member</h1>
          <p className="text-slate-500 text-sm">Create a new coop manager or admin account</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input {...register('fullName')} placeholder="e.g. Jane Wanjiku" className={INPUT} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register('email')} placeholder="jane@zaocycle.co.ke" className={INPUT} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input type="password" {...register('password')} placeholder="Min 8 characters" className={INPUT} />
        </Field>

        <Field label="Role" error={errors.role?.message}>
          <select {...register('role')} className={INPUT}>
            <option value="COOP_MANAGER">Coop Manager</option>
            <option value="ADMIN">Administrator</option>
          </select>
        </Field>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors"
        >
          {isPending ? 'Creating…' : 'Create Staff Account'}
        </button>
      </form>
    </div>
  );
}
