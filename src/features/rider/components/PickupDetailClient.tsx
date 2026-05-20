'use client';

import { useState } from 'react';
import { MapPin, Phone, Package, StickyNote, CheckCircle2, X } from 'lucide-react';
import type { RiderPickupTask } from '@/lib/types';

interface Props {
  pickup: RiderPickupTask;
}

export default function PickupDetailClient({ pickup }: Props) {
  const isAlreadyDone = pickup.status === 'collected' || pickup.status === 'paid';
  const [showModal, setShowModal]     = useState(false);
  const [weightKg, setWeightKg]       = useState('');
  const [isCollected, setIsCollected] = useState(isAlreadyDone);
  const [confirmedWeight, setConfirmedWeight] = useState(pickup.actualWeightKg ?? 0);

  const parsed  = parseFloat(weightKg);
  const isValid = !isNaN(parsed) && parsed > 0;
  const payout  = isValid ? Math.round(parsed * pickup.payoutRateKES) : 0;
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    pickup.farmLocation + ', Kirinyaga County, Kenya'
  )}`;

  function handleConfirm() {
    if (!isValid) return;
    setConfirmedWeight(parsed);
    setIsCollected(true);
    setShowModal(false);
  }

  if (isCollected) {
    const finalPayout = pickup.actualPayoutKES ?? Math.round(confirmedWeight * pickup.payoutRateKES);
    return (
      <div className="px-4 pt-12 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-600/30">
          <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={1.75} />
        </div>
        <h2 className="text-white text-2xl font-extrabold mb-2">Collection Done!</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">
          {pickup.farmerName} will receive their M-Pesa payment shortly.
        </p>

        <div className="w-full bg-slate-900 border border-green-500/20 rounded-2xl p-5 mb-3 text-center">
          <p className="text-slate-500 text-xs mb-1.5">Farmer payout triggered</p>
          <p className="text-green-400 text-4xl font-extrabold tabular-nums">
            KES {finalPayout.toLocaleString()}
          </p>
          <p className="text-slate-500 text-xs mt-2">{confirmedWeight} kg · {pickup.wasteType}</p>
        </div>

        {pickup.mpesaTransactionId && (
          <p className="text-slate-600 text-xs font-mono">
            M-Pesa ref: {pickup.mpesaTransactionId}
          </p>
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
            <p className="text-white text-sm font-semibold text-center px-6 leading-snug">
              {pickup.farmLocation}
            </p>
            <p className="text-slate-400 text-xs">{pickup.distanceKm} km from your location</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            Open Maps
          </a>
        </div>

        {/* Farmer card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-3">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Farmer</p>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-white text-lg font-bold leading-tight">{pickup.farmerName}</p>
              <p className="text-slate-500 text-sm mt-0.5">{pickup.ward} Ward</p>
            </div>
            <a
              href={`tel:${pickup.farmerPhone}`}
              className="w-11 h-11 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center shrink-0 hover:bg-green-500/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-green-400" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 border-t border-slate-800/60">
            <span className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Package className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              {pickup.wasteType}
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-300 text-sm font-medium">~{pickup.estimatedWeightKg} kg</span>
            <span className="text-slate-700">·</span>
            <span className="text-green-400 text-sm font-semibold">
              ~KES {Math.round(pickup.estimatedWeightKg * pickup.payoutRateKES)}
            </span>
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
          Weigh the waste on collection. Farmer&apos;s M-Pesa payment is calculated automatically from actual kg.
        </p>
      </div>

      {/* Sticky collect button — floats above bottom nav */}
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

      {/* Collect modal (bottom sheet) */}
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
              <div>
                <p className="text-white text-sm font-semibold">{pickup.farmerName}</p>
                <p className="text-slate-500 text-xs">{pickup.wasteType} · est. {pickup.estimatedWeightKg} kg</p>
              </div>
            </div>

            <label className="block mb-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Actual weight (kg)
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder={`e.g. ${pickup.estimatedWeightKg}`}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full h-14 bg-slate-800 border border-slate-700 focus:border-green-500 text-white text-xl font-bold rounded-xl px-4 outline-none transition-colors mb-4 tabular-nums"
            />

            {isValid && (
              <div className="flex items-center justify-between bg-green-500/8 border border-green-500/20 rounded-xl px-4 py-3 mb-5">
                <span className="text-slate-300 text-sm">Farmer will receive</span>
                <span className="text-green-400 text-2xl font-extrabold tabular-nums">
                  KES {payout.toLocaleString()}
                </span>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={!isValid}
              className="w-full h-14 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all text-base"
            >
              Confirm Collection
            </button>
          </div>
        </div>
      )}
    </>
  );
}
