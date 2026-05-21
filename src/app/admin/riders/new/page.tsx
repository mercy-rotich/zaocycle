'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRiderSchema, type CreateRiderInput } from '@/shared/utils/validators';
import { useCreateRiderMutation } from '@/features/admin/hooks/useAdminRiders';

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

export default function NewRiderPage() {
  const { mutate: create, isPending } = useCreateRiderMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateRiderInput>({
    resolver: zodResolver(createRiderSchema),
    defaultValues: { ward: 'MWEA' },
  });

  const onSubmit = handleSubmit((data) => create(data));

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/riders" className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <div>
          <h1 className="text-white font-bold text-xl">Register Rider</h1>
          <p className="text-slate-500 text-sm">Add a new waste collection rider</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input {...register('fullName')} placeholder="e.g. James Kariuki" className={INPUT} />
        </Field>

        <Field label="Phone Number" error={errors.phone?.message}>
          <input type="tel" {...register('phone')} placeholder="e.g. 0712345678" className={INPUT} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input type="password" {...register('password')} placeholder="Min 6 characters" className={INPUT} />
        </Field>

        <Field label="Ward" error={errors.ward?.message}>
          <select {...register('ward')} className={INPUT}>
            <option value="MWEA">Mwea</option>
            <option value="GICHUGU">Gichugu</option>
            <option value="KIRINYAGA_CENTRAL">Kirinyaga Central</option>
            <option value="NDIA">Ndia</option>
          </select>
        </Field>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors"
        >
          {isPending ? 'Registering…' : 'Register Rider'}
        </button>
      </form>
    </div>
  );
}
