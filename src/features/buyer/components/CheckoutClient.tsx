'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  Loader2,
  CheckCircle2,
  Minus,
  Plus,
  MapPin,
  User,
  Phone,
  School,
  ChevronRight,
} from 'lucide-react';
import type { BriquetteProduct } from '@/lib/types';

interface Props {
  product: BriquetteProduct;
  initialQty: number;
}

type Step = 'details' | 'payment' | 'processing' | 'success';

const WARDS = [
  'Mwea East', 'Mwea West', 'Tebere', 'Wamumu', 'Mutithi',
  'Kangai', 'Ngangu', 'Inoi', 'Kerugoya', 'Kirinyaga Central',
  'Baragwi', 'Gichugu', 'Ndia', 'Mukure',
];

export default function CheckoutClient({ product, initialQty }: Props) {
  const router = useRouter();

  const [qty, setQty] = useState(initialQty);
  const [step, setStep] = useState<Step>('details');

  const [form, setForm] = useState({
    schoolName: '',
    contactName: '',
    phone: '',
    ward: '',
    deliveryAddress: '',
    mpesaPhone: '',
  });

  const total = product.priceKES * qty;

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function detailsValid() {
    return (
      form.schoolName.trim().length > 2 &&
      form.contactName.trim().length > 2 &&
      /^07\d{8}$/.test(form.phone) &&
      form.ward.length > 0 &&
      form.deliveryAddress.trim().length > 5
    );
  }

  function mpesaValid() {
    return /^(07|01)\d{8}$/.test(form.mpesaPhone);
  }

  async function handlePay() {
    setStep('processing');
    // Simulate STK push + confirmation delay
    await new Promise((r) => setTimeout(r, 3200));
    setStep('success');
    // Redirect to the demo order after 2s
    setTimeout(() => router.push('/buy/orders/ORD-2026-0042'), 2000);
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-5">
          <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Check your phone</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          An M-Pesa prompt has been sent to{' '}
          <span className="text-white font-semibold">{form.mpesaPhone}</span>. Enter your
          PIN to complete the payment of{' '}
          <span className="text-green-400 font-bold">KES {total.toLocaleString()}</span>.
        </p>
        <div className="mt-6 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 bg-green-500/15 border border-green-500/40 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 className="w-9 h-9 text-green-400" />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Payment confirmed!</h2>
        <p className="text-slate-400 text-sm">Redirecting to your order…</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Order summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Order Summary</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">{product.name} — Eco-Briquettes</p>
            <p className="text-slate-500 text-xs mt-0.5">KES {product.priceKES.toLocaleString()} / sack</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-white font-bold w-5 text-center tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.stockBags, q + 1))}
              className="w-7 h-7 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-400 text-sm">{qty} sack{qty > 1 ? 's' : ''} · {product.weightKg * qty} kg total</span>
          <span className="text-white font-extrabold text-lg tabular-nums">KES {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Step: Delivery details */}
      {step === 'details' && (
        <div className="space-y-4">
          <h2 className="text-white font-bold text-lg">Delivery Details</h2>

          <label className="block">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1.5">
              <School className="w-3.5 h-3.5" /> School Name
            </span>
            <input
              type="text"
              value={form.schoolName}
              onChange={(e) => update('schoolName', e.target.value)}
              placeholder="e.g. Mwea Primary School"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </label>

          <label className="block">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1.5">
              <User className="w-3.5 h-3.5" /> Contact Name
            </span>
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              placeholder="Your full name"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </label>

          <label className="block">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1.5">
              <Phone className="w-3.5 h-3.5" /> Phone Number
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="07XXXXXXXX"
              inputMode="tel"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </label>

          <label className="block">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1.5">
              <MapPin className="w-3.5 h-3.5" /> Ward
            </span>
            <select
              value={form.ward}
              onChange={(e) => update('ward', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none"
            >
              <option value="" disabled className="text-slate-600">Select ward…</option>
              {WARDS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1.5">
              <MapPin className="w-3.5 h-3.5" /> Delivery Address
            </span>
            <textarea
              value={form.deliveryAddress}
              onChange={(e) => update('deliveryAddress', e.target.value)}
              placeholder="e.g. Near Total Petrol Station, Kutus Town"
              rows={2}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
            />
          </label>

          <button
            onClick={() => setStep('payment')}
            disabled={!detailsValid()}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Continue to Payment
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step: M-Pesa payment */}
      {step === 'payment' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => setStep('details')}
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              ← Back
            </button>
          </div>
          <h2 className="text-white font-bold text-lg">Pay via M-Pesa</h2>

          <div className="bg-slate-900 border border-green-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">M-Pesa STK Push</p>
                <p className="text-slate-500 text-xs">We&apos;ll send a payment prompt to your phone</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="text-slate-400 text-xs mb-1">Amount to pay</p>
              <p className="text-green-400 text-3xl font-extrabold tabular-nums">
                KES {total.toLocaleString()}
              </p>
            </div>
          </div>

          <label className="block">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1.5">
              <Phone className="w-3.5 h-3.5" /> M-Pesa Phone Number
            </span>
            <input
              type="tel"
              value={form.mpesaPhone}
              onChange={(e) => update('mpesaPhone', e.target.value)}
              placeholder="07XXXXXXXX or 01XXXXXXXX"
              inputMode="tel"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors"
            />
          </label>

          <p className="text-slate-600 text-xs">
            By paying, you agree to the ZaoCycle terms of service. Free delivery within Kirinyaga County.
          </p>

          <button
            onClick={handlePay}
            disabled={!mpesaValid()}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            Send STK Push · KES {total.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  );
}
