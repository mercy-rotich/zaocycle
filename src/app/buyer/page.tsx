import { ShieldCheck, Sprout, Zap, Users } from 'lucide-react';
import VerifyInput from '@/features/buyer/components/VerifyInput';
import { CertifiedBatchList } from '@/features/buyer/components/CertifiedBatchList';
import { mockFarmRecords } from '@/lib/mock-data';

export const metadata = {
  title: 'Verify Produce Safety — ZaoCycle',
  description:
    'Scan or enter a batch code to verify that your produce was harvested safely, with the full Pre-Harvest Interval observed.',
};

const safeCount  = mockFarmRecords.filter((r) => r.status === 'safe').length;
const totalCount = mockFarmRecords.length;

export default function BuyerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Hero — always full width ── */}
      <section className="pt-8 pb-6">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Powered by PHI compliance data
        </div>

        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
          Is your food <span className="text-green-400">safe to eat?</span>
        </h1>

        <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-lg">
          Enter the batch code from your produce sticker to see its full chemical safety record.
        </p>

        <VerifyInput />

        {/* Trust chips */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { icon: ShieldCheck, value: `${safeCount}/${totalCount}`, label: 'Certified safe' },
            { icon: Users,       value: '248+',                       label: 'Farmers' },
            { icon: Zap,         value: 'Instant',                    label: 'Result' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
              <Icon className="w-3.5 h-3.5 text-green-400 mx-auto mb-1.5" />
              <p className="text-white font-extrabold text-base tabular-nums leading-none">{value}</p>
              <p className="text-slate-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Content grid: batch list first on mobile, how-it-works second ── */}
      <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12 pb-10 items-start">

        {/* How it works — order-2 on mobile (shows AFTER batch list) */}
        <div className="order-2 lg:order-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-green-600/15 border border-green-600/20 rounded-lg flex items-center justify-center">
                <Sprout className="w-4 h-4 text-green-400" />
              </div>
              <h2 className="text-white font-bold">How this works</h2>
            </div>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Farmer logs the spray', body: 'When a pesticide is applied, the farmer texts a USSD code from any phone. ZaoCycle records the chemical and starts a countdown clock.' },
                { step: '2', title: 'System enforces the wait', body: 'Every pesticide has a Pre-Harvest Interval — days needed for chemicals to degrade safely. ZaoCycle blocks certification until it fully expires.' },
                { step: '3', title: 'Certificate & QR issued', body: 'Only after the full wait does the system generate a "Residue-Free" certificate and activate the QR code on the produce.' },
                { step: '4', title: 'You verify at the market', body: 'Scan or type the batch code here. You see the dates, the chemical used, and the ZaoCycle safety verdict — instantly.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-3">
                  <div className="w-7 h-7 bg-green-600/20 border border-green-600/30 rounded-full flex items-center justify-center text-green-400 text-xs font-bold shrink-0 mt-0.5">
                    {step}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{title}</p>
                    <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certified batches — order-1 on mobile (shows immediately after hero) */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20">

          {/* Mobile: plain heading, no heavy panel wrapper */}
          <div className="flex items-center justify-between mb-3 lg:hidden">
            <div>
              <h2 className="text-white font-bold">Certified Batches</h2>
              <p className="text-slate-500 text-xs mt-0.5">Tap any batch to verify</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">{totalCount} active</span>
            </div>
          </div>

          {/* Desktop: card panel with header */}
          <div className="hidden lg:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
              <div>
                <h2 className="text-white font-bold text-sm">Certified Batches</h2>
                <p className="text-slate-500 text-xs mt-0.5">Kirinyaga County · All wards</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">{totalCount} active</span>
              </div>
            </div>
            <CertifiedBatchList records={mockFarmRecords} variant="desktop" />
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-800/20 text-center">
              <p className="text-slate-600 text-xs">Tap any batch to see its full chemical safety record</p>
            </div>
          </div>

          {/* Mobile: show first 5, expand on tap */}
          <div className="lg:hidden">
            <CertifiedBatchList records={mockFarmRecords} variant="mobile" />
          </div>
        </div>

      </div>
    </div>
  );
}
