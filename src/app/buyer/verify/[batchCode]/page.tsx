import Link from 'next/link';
import { ArrowLeft, SearchX, QrCode, ShieldCheck, AlertCircle, CheckCircle2, MapPin, Sprout, Calendar, Clock, User, Hash, FlaskConical } from 'lucide-react';
import VerifyInput from '@/features/buyer/components/VerifyInput';
import { mockFarmRecords } from '@/lib/mock-data';
import type { FarmRecord } from '@/lib/types';

interface Props {
  params: Promise<{ batchCode: string }>;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatShortDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

const statusConfig = {
  safe: {
    border: 'border-green-500/40',
    bg: 'bg-green-500/8',
    iconBg: 'bg-green-500',
    icon: ShieldCheck,
    tagColor: 'text-green-400',
    tag: 'Residue-Free',
    headline: 'Safe to Eat',
    headlineColor: 'text-green-300',
    body: 'This batch has been independently verified by ZaoCycle. The full Pre-Harvest Interval was observed before any harvesting took place.',
    glow: 'shadow-green-500/10',
  },
  pending: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/8',
    iconBg: 'bg-amber-500',
    icon: AlertCircle,
    tagColor: 'text-amber-400',
    tag: 'Verification Pending',
    headline: 'Awaiting Clearance',
    headlineColor: 'text-amber-300',
    body: 'This batch is currently within the Pre-Harvest Interval countdown. Certification will be issued once the safe period has fully elapsed.',
    glow: 'shadow-amber-500/10',
  },
  flagged: {
    border: 'border-red-500/40',
    bg: 'bg-red-500/8',
    iconBg: 'bg-red-500',
    icon: AlertCircle,
    tagColor: 'text-red-400',
    tag: 'Caution',
    headline: 'Harvest Unverified',
    headlineColor: 'text-red-300',
    body: 'ZaoCycle could not verify the safe harvest timeline for this batch. We recommend contacting the supplier for further clarification.',
    glow: 'shadow-red-500/10',
  },
};

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-800 last:border-0">
      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-green-400" />
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

function VerifyResult({ record }: { record: FarmRecord }) {
  const cfg = statusConfig[record.status];
  const Icon = cfg.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back nav */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/buyer"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <div>
          <p className="text-slate-400 text-xs">Verification result</p>
          <p className="text-white text-sm font-mono font-bold">{record.batchCode}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-6">

        {/* ── Left: verdict ── */}
        <div className="space-y-4">

          {/* Safety badge */}
          <div className={`${cfg.bg} border ${cfg.border} rounded-2xl p-8 text-center shadow-xl ${cfg.glow}`}>
            <div className="flex items-center justify-center gap-2 mb-5">
              <QrCode className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
                ZaoCycle Food Verification
              </span>
            </div>

            <div className={`inline-flex items-center justify-center w-20 h-20 ${cfg.iconBg} rounded-full mb-5 shadow-lg`}>
              <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>

            <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-2 ${cfg.tagColor}`}>
              {cfg.tag}
            </p>
            <h1 className={`text-3xl font-extrabold mb-4 ${cfg.headlineColor}`}>
              {cfg.headline}
              {record.status === 'safe' && ' ✓'}
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              {cfg.body}
            </p>

            {record.status === 'safe' && (
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 mt-5">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-slate-300 text-xs font-mono tracking-wider">{record.batchCode}</span>
              </div>
            )}
          </div>

          {/* Certificate metadata */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Certificate Info</p>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Farmer</span>
              <span className="text-white font-medium text-right max-w-[180px] leading-snug">{record.farmerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Ward</span>
              <span className="text-white font-medium">{record.ward}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Crop</span>
              <span className="text-white font-medium text-right max-w-[180px]">{record.cropType}</span>
            </div>
            {record.certifiedAt && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Certified at</span>
                <span className="text-white font-mono text-xs">
                  {new Date(record.certifiedAt).toLocaleString('en-KE')}
                </span>
              </div>
            )}
            <div className="pt-1 text-center">
              <p className="text-slate-700 text-xs">
                Verified by ZaoCycle Digital Platform · Kirinyaga County
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: farm & chemical data ── */}
        <div className="space-y-4">

          {/* Farm details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-1">Farm &amp; Crop Details</h2>
            <p className="text-slate-500 text-xs mb-4">
              Verified data logged by the certified farmer via ZaoCycle USSD platform.
            </p>
            <DetailRow icon={Hash}     label="Batch Code"          value={record.batchCode} />
            <DetailRow icon={User}     label="Certified Farmer"    value={record.farmerName} />
            <DetailRow icon={MapPin}   label="Farm Location"       value={record.farmLocation} />
            <DetailRow icon={Sprout}   label="Crop Type"           value={record.cropType} />
            <DetailRow icon={Calendar} label="Last Spray Date"     value={formatDate(record.lastSprayDate)} />
            <DetailRow icon={Clock}    label="Pre-Harvest Interval" value={`${record.preHarvestIntervalDays} days · ${record.chemical}`} />
            <DetailRow icon={Calendar} label="Safe Harvest Date"   value={formatDate(record.safeHarvestDate)} />
            {record.harvestDate && (
              <DetailRow icon={Calendar} label="Actual Harvest Date" value={formatDate(record.harvestDate)} />
            )}
          </div>

          {/* Chemical timeline (safe records only) */}
          {record.status !== 'pending' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-1">Chemical Safety Timeline</h2>
              <p className="text-slate-500 text-xs mb-6">
                Tamper-evident record of the full Pre-Harvest Interval lifecycle.
              </p>
              <div className="space-y-0">
                {[
                  {
                    icon: FlaskConical,
                    label: 'Pesticide Applied',
                    date: formatShortDate(record.lastSprayDate),
                    desc: `${record.chemical} applied to ${record.cropType}. Logged instantly via USSD by the farmer.`,
                  },
                  {
                    icon: Clock,
                    label: `${record.preHarvestIntervalDays}-Day PHI Countdown`,
                    date: `+${record.preHarvestIntervalDays} days`,
                    desc: 'Chemical degrades to safe, non-detectable levels. ZaoCycle enforces this wait period automatically.',
                  },
                  {
                    icon: ShieldCheck,
                    label: 'Safe-to-Harvest Certificate Issued',
                    date: formatShortDate(record.safeHarvestDate),
                    desc: 'ZaoCycle digital certificate generated. QR code activated for consumer verification.',
                  },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/30">
                        <step.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                      </div>
                      {i < arr.length - 1 && <div className="w-0.5 h-10 bg-green-600/30 mt-1" />}
                    </div>
                    <div className="pt-2 pb-6">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white text-sm font-semibold">{step.label}</span>
                        <span className="text-green-400 text-xs font-mono bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function VerifyPage({ params }: Props) {
  const { batchCode } = await params;
  const decoded = decodeURIComponent(batchCode).toUpperCase();
  const record = mockFarmRecords.find((r) => r.batchCode.toUpperCase() === decoded);

  if (record) return <VerifyResult record={record} />;

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/buyer"
            className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </Link>
          <div>
            <p className="text-slate-400 text-xs">Verification result</p>
            <p className="text-white text-sm font-mono font-bold">{decoded}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center mb-6">
          <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7 text-slate-500" />
          </div>
          <h2 className="text-white font-bold text-lg mb-2">Batch not found</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-1">
            No record matches{' '}
            <span className="text-white font-mono font-bold">{decoded}</span>.
          </p>
          <p className="text-slate-600 text-xs">
            Double-check the code on the produce sticker — letters, numbers, and hyphens must be exact.
          </p>
        </div>
        <p className="text-slate-400 text-sm text-center mb-4">Try another batch code:</p>
        <VerifyInput />
      </div>
    </div>
  );
}
