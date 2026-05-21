'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, ShieldOff, Hash, Calendar, Eye } from 'lucide-react';
import { useCertificateQuery, useRevokeCertificateMutation } from '@/features/dashboard/hooks/useDashCertificates';
import { formatDate } from '@/shared/utils/formatters';

interface Props { params: Promise<{ id: string }> }

const STATUS_CONFIG = {
  ACTIVE:  { label: 'Active',  cls: 'text-green-400 bg-green-400/10 border-green-400/20' },
  EXPIRED: { label: 'Expired', cls: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
  REVOKED: { label: 'Revoked', cls: 'text-red-400 bg-red-400/10 border-red-400/20' },
};

export default function CertificateDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: cert, isLoading, isError } = useCertificateQuery(id);
  const { mutate: revoke, isPending } = useRevokeCertificateMutation();

  if (isLoading) {
    return (
      <div className="px-6 py-8 max-w-lg mx-auto">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-6" />
        <div className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (isError || !cert) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-red-400 text-sm mb-3">Certificate not found.</p>
        <Link href="/dashboard/certificates" className="text-green-400 hover:text-green-300 text-sm underline">
          Back to certificate lookup
        </Link>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[cert.status];

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/dashboard/certificates"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <h1 className="text-white font-bold text-xl">Certificate Detail</h1>
      </div>

      {/* Status badge */}
      <div className="flex justify-center mb-8">
        <span className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border ${statusCfg.cls}`}>
          {cert.status === 'ACTIVE' ? <ShieldCheck className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
          {statusCfg.label}
        </span>
      </div>

      {/* Info card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5 space-y-4">
        {[
          { icon: Hash,     label: 'Token',    value: cert.token },
          { icon: Calendar, label: 'Issued',   value: formatDate(cert.issuedAt) },
          { icon: Calendar, label: 'Expires',  value: formatDate(cert.expiresAt) },
          { icon: Eye,      label: 'Scan Count', value: String(cert.verifiedCount) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-slate-500 text-xs">{label}</p>
              <p className="text-white text-sm font-medium font-mono">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* QR image */}
      {cert.qrImageUrl && (
        <div className="flex justify-center mb-5">
          <img src={cert.qrImageUrl} alt="Certificate QR" className="w-36 h-36 rounded-xl border border-slate-700" />
        </div>
      )}

      {/* Revoke action */}
      {cert.status === 'ACTIVE' && (
        <button
          onClick={() => revoke(cert.id)}
          disabled={isPending}
          className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-sm border border-red-500/20 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Revoking…' : 'Revoke Certificate'}
        </button>
      )}
    </div>
  );
}
