import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Clock, AlertCircle, MapPin, Sprout, ExternalLink } from 'lucide-react';
import { mockFarmRecords } from '@/lib/mock-data';

export const metadata = {
  title: 'All Certified Batches — ZaoCycle',
};

const statusConfig = {
  safe: {
    label: 'Residue-Free',
    icon: ShieldCheck,
    chip: 'bg-green-400/10 border-green-400/20 text-green-400',
    bar: 'bg-green-500',
  },
  pending: {
    label: 'Pending Clearance',
    icon: Clock,
    chip: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
    bar: 'bg-amber-500',
  },
  flagged: {
    label: 'Unverified',
    icon: AlertCircle,
    chip: 'bg-red-400/10 border-red-400/20 text-red-400',
    bar: 'bg-red-500',
  },
};

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

const safeCount = mockFarmRecords.filter((r) => r.status === 'safe').length;
const pendingCount = mockFarmRecords.filter((r) => r.status === 'pending').length;

export default function BatchesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/buyer"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-slate-300" />
        </Link>
        <div>
          <h1 className="text-white font-bold text-xl leading-tight">Certified Batches</h1>
          <p className="text-slate-500 text-xs mt-0.5">Kirinyaga County · All wards</p>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-white font-bold text-sm">{safeCount}</span>
          <span className="text-slate-500 text-sm">Residue-Free</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-white font-bold text-sm">{pendingCount}</span>
          <span className="text-slate-500 text-sm">Pending Clearance</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
          <span className="text-slate-500 text-sm">Total:</span>
          <span className="text-white font-bold text-sm">{mockFarmRecords.length} batches</span>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/40">
              <th className="text-left text-slate-400 font-semibold px-5 py-3.5">Farmer</th>
              <th className="text-left text-slate-400 font-semibold px-4 py-3.5">Crop</th>
              <th className="text-left text-slate-400 font-semibold px-4 py-3.5">Batch Code</th>
              <th className="text-left text-slate-400 font-semibold px-4 py-3.5">Status</th>
              <th className="text-left text-slate-400 font-semibold px-4 py-3.5">Certified</th>
              <th className="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {mockFarmRecords.map((record) => {
              const cfg = statusConfig[record.status];
              const Icon = cfg.icon;
              return (
                <tr key={record.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-white font-semibold">{record.farmerName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-600" />
                      <span className="text-slate-500 text-xs">{record.ward} Ward</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span className="text-slate-300">{record.cropType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-slate-400 text-xs">{record.batchCode}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.chip}`}>
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-xs">
                    {formatDate(record.certifiedAt)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={`/buyer/verify/${encodeURIComponent(record.batchCode)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-green-400 transition-colors"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: card list */}
      <div className="md:hidden space-y-3">
        {mockFarmRecords.map((record) => {
          const cfg = statusConfig[record.status];
          const Icon = cfg.icon;
          return (
            <Link
              key={record.id}
              href={`/buyer/verify/${encodeURIComponent(record.batchCode)}`}
              className="flex bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all"
            >
              <div className={`w-1 shrink-0 ${cfg.bar}`} />
              <div className="p-4 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-white text-sm font-bold">{record.farmerName}</p>
                  <span className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.chip}`}>
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{record.ward}</span>
                  <span className="flex items-center gap-1"><Sprout className="w-3 h-3" />{record.cropType}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono text-slate-600 text-xs">{record.batchCode}</span>
                  <span className="text-slate-500 text-xs">{formatDate(record.certifiedAt)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
