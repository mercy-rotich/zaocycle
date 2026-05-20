import { CheckCircle2, AlertTriangle, XCircle, Leaf } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/shared/utils/formatters';
import type { PublicCertificateResponse } from '@/types/api';

const STATUS_CONFIG = {
  ACTIVE:  { icon: CheckCircle2,  color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/30', label: 'Certificate Active' },
  EXPIRED: { icon: AlertTriangle, color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30', label: 'Certificate Expired' },
  REVOKED: { icon: XCircle,       color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30',   label: 'Certificate Revoked' },
};

export function CertificateVerifyDisplay({ cert }: { cert: PublicCertificateResponse }) {
  const cfg = STATUS_CONFIG[cert.status];
  const Icon = cfg.icon;

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">
            Zao<span className="text-green-400">Cycle</span>
          </span>
        </div>

        {/* Status badge */}
        <div className={`rounded-2xl p-5 ring-1 ${cfg.bg} ${cfg.border} mb-4 flex items-center gap-3`}>
          <Icon className={`w-7 h-7 shrink-0 ${cfg.color}`} />
          <span className={`font-bold text-lg ${cfg.color}`}>{cfg.label}</span>
        </div>

        {/* Certificate details */}
        <div className="bg-slate-900 rounded-2xl ring-1 ring-slate-800 p-5 space-y-3 mb-6">
          {[
            { label: 'Farmer',   value: cert.farmerName },
            { label: 'Ward',     value: cert.ward },
            { label: 'Crop',     value: cert.crop },
            { label: 'Chemical', value: cert.chemicalName },
            { label: 'Issued',   value: formatDate(cert.issuedAt) },
            { label: 'Expires',  value: formatDate(cert.expiresAt) },
            { label: 'Verified', value: `${cert.verifiedCount} ${cert.verifiedCount === 1 ? 'time' : 'times'}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-500 w-24 shrink-0">{label}</span>
              <span className="text-white font-medium text-right">{value}</span>
            </div>
          ))}
        </div>

        <Link
          href="/products"
          className="block text-center w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors"
        >
          Browse Briquette Products →
        </Link>
      </div>
    </main>
  );
}

export function CertificateNotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h1 className="text-white font-bold text-xl mb-2">Certificate Not Found</h1>
        <p className="text-slate-400 text-sm">
          This certificate could not be found. The QR code may be damaged or invalid.
        </p>
      </div>
    </main>
  );
}
