'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePlaceOrderMutation } from '@/features/buyer/hooks/useOrders';
import { placeOrderSchema, type PlaceOrderInput } from '@/shared/utils/validators';
import { formatKES, formatKg } from '@/shared/utils/formatters';
import type { ProductResponse } from '@/types/api';

const INPUT = 'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface Props {
  product: ProductResponse;
  initialQty: number;
}

export default function CheckoutClient({ product, initialQty }: Props) {
  const { mutate: placeOrder, isPending } = usePlaceOrderMutation();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PlaceOrderInput>({
    resolver: zodResolver(placeOrderSchema),
    defaultValues: {
      productId: product.id,
      quantity: initialQty,
      deliveryPhone: '',
      deliveryAddress: '',
    },
  });

  const qty = watch('quantity') || 1;
  const total = qty * product.unitPrice;

  const onSubmit = handleSubmit((data) => placeOrder(data));

  return (
    <form onSubmit={onSubmit} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-10">

        {/* ── Form ── */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">Delivery Details</h2>

          <Field label="Quantity (bags)" error={errors.quantity?.message}>
            <input
              type="number"
              min={1}
              {...register('quantity', { valueAsNumber: true })}
              className={INPUT}
            />
          </Field>

          <Field label="Delivery Address" error={errors.deliveryAddress?.message}>
            <input
              {...register('deliveryAddress')}
              placeholder="e.g. Mwea Town, near Co-op Bank"
              className={INPUT}
            />
          </Field>

          <Field label="M-Pesa Phone Number" error={errors.deliveryPhone?.message}>
            <input
              type="tel"
              {...register('deliveryPhone')}
              placeholder="+254712345678"
              className={INPUT}
            />
          </Field>

          <Field label="Requested Delivery Date (optional)" error={errors.requestedDelivery?.message}>
            <input type="date" {...register('requestedDelivery')} className={INPUT} />
          </Field>

          <Field label="Notes (optional)" error={errors.notes?.message}>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Any special instructions…"
              className={INPUT}
            />
          </Field>
        </div>

        {/* ── Order Summary ── */}
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Order Summary</h2>
          <div className="bg-slate-900 rounded-2xl ring-1 ring-slate-800 p-5 space-y-4 sticky top-20">

            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="w-12 h-12 bg-green-600/15 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-green-400 font-bold text-lg">{formatKg(product.weightKg).split(' ')[0]}</span>
              </div>
              <div>
                <p className="text-white font-semibold">{product.name}</p>
                <p className="text-slate-400 text-sm">{formatKES(product.unitPrice)} / bag</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Bags</span><span>{qty}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unit price</span><span>{formatKES(product.unitPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total weight</span><span>{formatKg(qty * product.weightKg)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-slate-800">
                <span>Total</span><span className="text-green-400">{formatKES(total)}</span>
              </div>
            </div>

            <p className="text-slate-500 text-xs">
              An M-Pesa STK push will be sent to your phone after placing the order.
            </p>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold transition-colors"
            >
              {isPending ? 'Placing order…' : `Pay ${formatKES(total)} via M-Pesa`}
            </button>
          </div>
        </div>

      </div>
    </form>
  );
}
