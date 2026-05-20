'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/features/auth/services/auth.service';
import {
  loginEmailSchema, type LoginEmailInput,
  loginPhonePinSchema, type LoginPhonePinInput,
  loginPhonePasswordSchema, type LoginPhonePasswordInput,
} from '@/shared/utils/validators';
import type { TokenResponse } from '@/types/api';

type LoginRole = 'BUYER' | 'STAFF' | 'FARMER' | 'RIDER';

const TABS: { role: LoginRole; label: string }[] = [
  { role: 'BUYER', label: 'Buyer' },
  { role: 'STAFF', label: 'Staff' },
  { role: 'FARMER', label: 'Farmer' },
  { role: 'RIDER', label: 'Rider' },
];

const ROLE_REDIRECT: Record<string, string> = {
  BUYER: '/buy',
  COOP_MANAGER: '/dashboard',
  ADMIN: '/dashboard',
  FARMER: '/farmer/dashboard',
  RIDER: '/rider',
};

const INPUT_CLASS =
  'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function LoginForm() {
  const [role, setRole] = useState<LoginRole>('BUYER');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const emailForm = useForm<LoginEmailInput>({ resolver: zodResolver(loginEmailSchema) });
  const phonePinForm = useForm<LoginPhonePinInput>({ resolver: zodResolver(loginPhonePinSchema) });
  const phonePassForm = useForm<LoginPhonePasswordInput>({ resolver: zodResolver(loginPhonePasswordSchema) });

  const handleSuccess = (data: TokenResponse) => {
    login(data);
    document.cookie = `zao-role=${data.user.role}; path=/; SameSite=Strict`;
    router.push(ROLE_REDIRECT[data.user.role] ?? '/');
  };

  const handleError = (e: unknown) => {
    toast.error(e instanceof Error ? e.message : 'Something went wrong');
  };

  const submitEmail = (apiFn: (d: LoginEmailInput) => Promise<TokenResponse>) =>
    emailForm.handleSubmit(async (data) => {
      setLoading(true);
      try { handleSuccess(await apiFn(data)); }
      catch (e) { handleError(e); }
      finally { setLoading(false); }
    });

  const submitPhonePin = phonePinForm.handleSubmit(async (data) => {
    setLoading(true);
    try { handleSuccess(await authApi.loginFarmer(data)); }
    catch (e) { handleError(e); }
    finally { setLoading(false); }
  });

  const submitPhonePass = phonePassForm.handleSubmit(async (data) => {
    setLoading(true);
    try { handleSuccess(await authApi.loginRider(data)); }
    catch (e) { handleError(e); }
    finally { setLoading(false); }
  });

  const submitHandlers: Record<LoginRole, React.FormEventHandler> = {
    BUYER: submitEmail(authApi.loginBuyer),
    STAFF: submitEmail(authApi.loginStaff),
    FARMER: submitPhonePin,
    RIDER: submitPhonePass,
  };

  const isEmailRole = role === 'BUYER' || role === 'STAFF';

  return (
    <form onSubmit={submitHandlers[role]} className="space-y-5">
      <div className="flex rounded-lg bg-slate-800 p-1 gap-1">
        {TABS.map((t) => (
          <button
            key={t.role}
            type="button"
            onClick={() => setRole(t.role)}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              role === t.role ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isEmailRole ? (
        <>
          <Field label="Email" error={emailForm.formState.errors.email?.message}>
            <input type="email" {...emailForm.register('email')} placeholder="you@example.com" className={INPUT_CLASS} />
          </Field>
          <Field label="Password" error={emailForm.formState.errors.password?.message}>
            <input type="password" {...emailForm.register('password')} placeholder="••••••••" className={INPUT_CLASS} />
          </Field>
        </>
      ) : role === 'FARMER' ? (
        <>
          <Field label="Phone" error={phonePinForm.formState.errors.phone?.message}>
            <input type="tel" {...phonePinForm.register('phone')} placeholder="+254712345678" className={INPUT_CLASS} />
          </Field>
          <Field label="PIN" error={phonePinForm.formState.errors.pin?.message}>
            <input type="password" {...phonePinForm.register('pin')} placeholder="••••" maxLength={6} className={INPUT_CLASS} />
          </Field>
        </>
      ) : (
        <>
          <Field label="Phone" error={phonePassForm.formState.errors.phone?.message}>
            <input type="tel" {...phonePassForm.register('phone')} placeholder="+254712345678" className={INPUT_CLASS} />
          </Field>
          <Field label="Password" error={phonePassForm.formState.errors.password?.message}>
            <input type="password" {...phonePassForm.register('password')} placeholder="••••••••" className={INPUT_CLASS} />
          </Field>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      {role === 'BUYER' && (
        <p className="text-center text-sm text-slate-400">
          New buyer?{' '}
          <a href="/register" className="text-green-400 hover:text-green-300 font-medium">
            Create an account
          </a>
        </p>
      )}
    </form>
  );
}
