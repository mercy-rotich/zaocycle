import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { FarmRecord } from '@/lib/types';

interface Props {
  record: FarmRecord;
}

const statusConfig = {
  safe: {
    border: 'border-green-500',
    bg: 'bg-green-500/10',
    iconBg: 'bg-green-500',
    icon: ShieldCheck,
    tagColor: 'text-green-400',
    tag: 'Residue-Free',
    headline: 'Safe to Eat',
    headlineColor: 'text-green-300',
    body: 'This batch has been independently verified by ZaoCycle. The full Pre-Harvest Interval was observed before any harvesting took place.',
  },
  pending: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-500/10',
    iconBg: 'bg-yellow-500',
    icon: AlertCircle,
    tagColor: 'text-yellow-400',
    tag: 'Verification Pending',
    headline: 'Awaiting Clearance',
    headlineColor: 'text-yellow-300',
    body: 'This batch is currently within the Pre-Harvest Interval countdown. Verification will be issued once the safe period has elapsed.',
  },
  flagged: {
    border: 'border-red-500',
    bg: 'bg-red-500/10',
    iconBg: 'bg-red-500',
    icon: AlertCircle,
    tagColor: 'text-red-400',
    tag: 'Caution',
    headline: 'Harvest Date Unverified',
    headlineColor: 'text-red-300',
    body: 'ZaoCycle could not verify the safe harvest timeline for this batch. We recommend contacting the supplier for clarification.',
  },
};

export default function SafetyBadge({ record }: Props) {
  const config = statusConfig[record.status];
  const Icon = config.icon;

  return (
    <div className={`rounded-2xl p-8 text-center border-2 ${config.border} ${config.bg}`}>
      <div className={`inline-flex items-center justify-center w-20 h-20 ${config.iconBg} rounded-full mb-5 shadow-lg`}>
        <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
      </div>

      <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-2 ${config.tagColor}`}>
        {config.tag}
      </p>

      <h1 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${config.headlineColor}`}>
        {config.headline}
        {record.status === 'safe' && <span className="ml-2">✓</span>}
      </h1>

      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-6">
        {config.body}
      </p>

      {record.status === 'safe' && (
        <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <span className="text-slate-300 text-xs font-mono tracking-wider">{record.batchCode}</span>
        </div>
      )}
    </div>
  );
}
