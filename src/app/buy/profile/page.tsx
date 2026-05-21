'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, MapPin, Building2, Camera, Loader2, Save } from 'lucide-react';
import { useBuyerProfileQuery, useUpdateBuyerMutation, useUploadImageMutation } from '@/features/buyer/hooks/useBuyer';
import { updateBuyerSchema, type UpdateBuyerInput } from '@/shared/utils/validators';
import type { Ward } from '@/types/api';

const WARDS: Ward[] = ['MWEA', 'GICHUGU', 'KIRINYAGA_CENTRAL', 'NDIA'];
const WARD_LABEL: Record<Ward, string> = {
  MWEA: 'Mwea',
  GICHUGU: 'Gichugu',
  KIRINYAGA_CENTRAL: 'Kirinyaga Central',
  NDIA: 'Ndia',
};

const INPUT = 'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm disabled:opacity-50';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function ProfilePage() {
  const { data: profile, isLoading } = useBuyerProfileQuery();
  const { mutate: update, isPending: saving } = useUpdateBuyerMutation();
  const { mutate: uploadImage, isPending: uploading } = useUploadImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateBuyerInput>({
    resolver: zodResolver(updateBuyerSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        contactPerson: profile.contactPerson ?? '',
        address: profile.address ?? '',
        ward: profile.ward ?? '',
      });
    }
  }, [profile, reset]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    uploadImage(file);
  }

  const onSubmit = handleSubmit((data) => update(data));

  const initials = profile?.displayName
    ?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() ?? '?';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-white font-extrabold text-2xl tracking-tight">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account details and delivery info</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">

          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-green-600/20 border-2 border-green-600/30 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-green-400 font-extrabold text-2xl">{initials}</span>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center rounded-2xl">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-950 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <p className="text-white font-bold text-lg">{profile?.displayName}</p>
              <p className="text-slate-500 text-sm capitalize">{profile?.buyerType.toLowerCase()}</p>
            </div>
          </div>

          {/* Read-only info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Account Info</h2>
            {[
              { icon: Mail,  label: 'Email',  value: profile?.email },
              { icon: Phone, label: 'Phone',  value: profile?.phone },
              { icon: Building2, label: 'Type', value: profile?.buyerType },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">{label}</p>
                  <p className="text-white text-sm font-medium">{value ?? '—'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Editable form */}
          <form onSubmit={onSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Edit Profile</h2>

            <Field label="Display Name" error={errors.displayName?.message}>
              <input {...register('displayName')} className={INPUT} placeholder="Your school or business name" />
            </Field>

            <Field label="Contact Person (optional)" error={errors.contactPerson?.message}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input {...register('contactPerson')} className={`${INPUT} pl-9`} placeholder="e.g. John Kamau" />
              </div>
            </Field>

            <Field label="Delivery Address (optional)" error={errors.address?.message}>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input {...register('address')} className={`${INPUT} pl-9`} placeholder="e.g. Mwea Town, near Co-op Bank" />
              </div>
            </Field>

            <Field label="Ward (optional)" error={errors.ward?.message}>
              <select {...register('ward')} className={INPUT}>
                <option value="">Select ward</option>
                {WARDS.map((w) => (
                  <option key={w} value={w}>{WARD_LABEL[w]}</option>
                ))}
              </select>
            </Field>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
