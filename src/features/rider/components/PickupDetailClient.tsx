'use client';

import { useState } from 'react';
import { MapPin, Package, StickyNote, CheckCircle2, X, Loader2 } from 'lucide-react';
import { useCollectPickupMutation } from '@/features/rider/hooks/useRiderPickups';
import { formatKES, formatDate } from '@/shared/utils/formatters';
import type { WastePickupResponse } from '@/types/api';

interface Props {
  pickup: WastePickupResponse;
}

export default function PickupDetailClient({ pickup }: Props) {
  const isAlreadyDone = pickup.status === 'COLLECTED' || pickup.status === 'PAID';
  const { mutate: collect, isPending, isSuccess } = useCollectPickupMutation(pickup.id);

  const [showModal, setShowModal] = useState(false);
  const [weightKg, setWeightKg]   = useState('');

  const parsed  = parseFloat(weightKg);
  const isValid = !isNaN(parsed) && parsed > 0;

  const isDone = isAlreadyDone || isSuccess;

  function handleConfirm() {
    if (!isValid) return;
    collect(parsed, { onSuccess: () => setShowModal(false) });
  }

  if (isDone) {
    const finalWeight = pickup.weightKg ?? (parseFloat(weightKg) || 0);
    const finalPayout = pickup.payoutAmount;

    return (
      <div className="px-4 pt-12 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-600/30">
          <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={1.75} />
        </div>
        <h2 className="text-white text-2xl font-extrabold mb-2">Collection Done!</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">
          The farmer&apos;s M-Pesa payment is being processed.
        </p>

        <div className="w-full bg-slate-900 border border-green-500/20 rounded-2xl p-5 mb-3 text-center">
          <p className="text-slate-500 text-xs mb-1.5">
            {pickup.status === 'PAID' ? 'Farmer was paid' : 'Farmer payout triggered'}
          </p>
          {finalPayout != null ? (
            <p className="text-green-400 text-4xl font-extrabold tabular-nums">
              {formatKES(finalPayout)}
            </p>
          ) : (
            <p className="text-slate-400 text-lg font-bold">Payout pending</p>
          )}
          {finalWeight > 0 && (
            <p className="text-slate-500 text-xs mt-2">{finalWeight} kg collected</p>
          )}
        </div>

        {pickup.paidAt && (
          <p className="text-slate-600 text-xs">Paid on {formatDate(pickup.paidAt)}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="px-4 pt-4 pb-36">
        {/* Map placeholder */}
        <div className="relative bg-slate-800 rounded-2xl overflow-hidden h-48 mb-4 border border-slate-700">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/40">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-slate-300 text-sm font-semibold">Location not available</p>
            <p className="text-slate-500 text-xs">Contact farmer directly</p>
          </div>
        </div>

        {/* Pickup info */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-3">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Pickup Details</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Pickup ID</p>
                <p className="text-white text-sm font-bold font-mono">
                  #{pickup.id.slice(-10).toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Scheduled</p>
                <p className="text-white text-sm font-semibold">
                  {pickup.scheduledFor ? formatDate(pickup.scheduledFor) : 'Not yet scheduled'}
                </p>
              </div>
            </div>
            {pickup.weightKg != null && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Weight recorded</p>
                  <p className="text-white text-sm font-semibold">{pickup.weightKg} kg</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {pickup.notes && (
          <div className="flex gap-3 bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4 mb-3">
            <StickyNote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-200/80 text-sm leading-relaxed">{pickup.notes}</p>
          </div>
        )}

        <p className="text-slate-600 text-xs text-center leading-relaxed px-2">
          Weigh the waste on collection. The farmer&apos;s M-Pesa payment is calculated from actual kg.
        </p>
      </div>

      {/* Sticky collect button */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setShowModal(true)}
            className="w-full h-14 bg-green-600 hover:bg-green-500 active:scale-[0.98] text-white text-base font-bold rounded-2xl transition-all shadow-xl shadow-green-600/30"
          >
            Mark as Collected
          </button>
        </div>
      </div>

      {/* Collect modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-md bg-slate-900 rounded-t-3xl border-t border-slate-800 p-6 pb-10">
            <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-lg font-bold">Log Collection</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/60 rounded-xl px-3 py-2.5 mb-5">
              <Package className="w-4 h-4 text-green-400 shrink-0" />
              <p className="text-white text-sm font-semibold">
                Pickup #{pickup.id.slice(-6).toUpperCase()}
              </p>
            </div>

            <label className="block mb-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Actual weight (kg)
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="e.g. 45"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full h-14 bg-slate-800 border border-slate-700 focus:border-green-500 text-white text-xl font-bold rounded-xl px-4 outline-none transition-colors mb-4 tabular-nums"
            />

            <button
              onClick={handleConfirm}
              disabled={!isValid || isPending}
              className="w-full h-14 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all text-base flex items-center justify-center gap-2"
            >
              {isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
              ) : (
                'Confirm Collection'
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
