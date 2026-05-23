'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/features/auth/services/auth.service';
import { registerBuyerSchema, type RegisterBuyerInput } from '@/shared/utils/validators';

const INPUT_CLASS =
  'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm';

const SELECT_CLASS =
  'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-green-500 transition-colors text-sm';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterBuyerInput>({
    resolver: zodResolver(registerBuyerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const tokens = await authApi.register(data);
      login(tokens);
      document.cookie = `zao-role=${tokens.user.role}; path=/; SameSite=Strict`;
      router.push('/buy');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Display Name" error={errors.displayName?.message}>
          <input {...register('displayName')} placeholder="St. Mary's Primary" className={INPUT_CLASS} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input type="tel" {...register('phone')} placeholder="+254712345678" className={INPUT_CLASS} />
        </Field>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register('email')} placeholder="you@example.com" className={INPUT_CLASS} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input type="password" {...register('password')} placeholder="Min. 6 characters" className={INPUT_CLASS} />
        </Field>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Buyer Type" error={errors.buyerType?.message}>
          <select {...register('buyerType')} className={SELECT_CLASS}>
            <option value="">Select type…</option>
            <option value="SCHOOL">School</option>
            <option value="INDIVIDUAL">Individual</option>
            <option value="INSTITUTION">Institution</option>
            <option value="BUSINESS">Business</option>
          </select>
        </Field>
        <Field label="Ward (optional)" error={errors.ward?.message}>
          <select {...register('ward')} className={SELECT_CLASS}>
            <option value="">Select ward…</option>
            <option value="MWEA">Mwea</option>
            <option value="GICHUGU">Gichugu</option>
            <option value="KIRINYAGA_CENTRAL">Kirinyaga Central</option>
            <option value="NDIA">Ndia</option>
          </select>
        </Field>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Contact Person (optional)" error={errors.contactPerson?.message}>
          <input {...register('contactPerson')} placeholder="Alice Wanjiru" className={INPUT_CLASS} />
        </Field>
        <Field label="Delivery Address (optional)" error={errors.address?.message}>
          <input {...register('address')} placeholder="Main Street, Mwea" className={INPUT_CLASS} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
      >
        {loading ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <a href="/login" className="text-green-400 hover:text-green-300 font-medium">
          Sign in
        </a>
      </p>
    </form>
  );
}
