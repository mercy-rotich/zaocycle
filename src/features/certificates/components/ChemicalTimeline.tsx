import { FlaskConical, Clock, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FarmRecord } from '@/lib/types';

interface Props {
  record: FarmRecord;
}

interface TimelineStep {
  icon: LucideIcon;
  label: string;
  date: string;
  description: string;
  status: 'done' | 'active' | 'pending';
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}

function TimelineNode({ step, isLast }: { step: TimelineStep; isLast: boolean }) {
  const Icon = step.icon;

  const nodeColor =
    step.status === 'done'
      ? 'bg-green-600 shadow-green-600/30'
      : step.status === 'active'
      ? 'bg-yellow-500 shadow-yellow-500/30'
      : 'bg-slate-700';

  const connectorColor =
    step.status === 'done' ? 'bg-green-600/30' : 'bg-slate-700';

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-10 h-10 ${nodeColor} rounded-full flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
        </div>
        {!isLast && <div className={`w-0.5 h-12 ${connectorColor} mt-1`} />}
      </div>

      <div className={`${isLast ? 'pb-0' : 'pb-2'} pt-1.5`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-white text-sm font-semibold">{step.label}</span>
          <span className="text-green-400 text-xs font-mono bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
            {step.date}
          </span>
        </div>
        <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

export default function ChemicalTimeline({ record }: Props) {
  const steps: TimelineStep[] = [
    {
      icon: FlaskConical,
      label: 'Pesticide Applied',
      date: formatShortDate(record.lastSprayDate),
      description: `${record.chemical} applied to ${record.cropType}. Logged instantly via USSD by the farmer.`,
      status: 'done',
    },
    {
      icon: Clock,
      label: `${record.preHarvestIntervalDays}-Day PHI Countdown`,
      date: `+${record.preHarvestIntervalDays} days`,
      description: 'Chemical degrades to safe, non-detectable levels. ZaoCycle enforces this wait period automatically.',
      status: 'done',
    },
    {
      icon: ShieldCheck,
      label: 'Safe-to-Harvest Certificate Issued',
      date: formatShortDate(record.safeHarvestDate),
      description: 'ZaoCycle digital certificate generated. QR code activated for consumer verification.',
      status: 'done',
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-white font-bold text-lg mb-1">Chemical Safety Timeline</h2>
      <p className="text-slate-500 text-xs mb-7">
        Tamper-evident record of the full Pre-Harvest Interval lifecycle.
      </p>

      <div>
        {steps.map((step, i) => (
          <TimelineNode key={step.label} step={step} isLast={i === steps.length - 1} />
        ))}
      </div>
    </div>
  );
}
