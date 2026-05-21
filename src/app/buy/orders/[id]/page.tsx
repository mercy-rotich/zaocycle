'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, MapPin, Phone, Hash, CheckCircle2, Truck, X } from 'lucide-react';
import OrderTimeline from '@/features/buyer/components/OrderTimeline';
import OrderStatusBadge from '@/features/buyer/components/OrderStatusBadge';
import { useOrderQuery, useCancelOrderMutation } from '@/features/buyer/hooks/useOrders';
import { formatKES, formatKg, formatDate } from '@/shared/utils/formatters';

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: order, isLoading, isError } = useOrderQuery(id);
  const { mutate: cancel, isPending: cancelling } = useCancelOrderMutation(id);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-6" />
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            <div className="h-48 bg-slate-800/50 rounded-2xl animate-pulse" />
            <div className="h-48 bg-slate-800/50 rounded-2xl animate-pulse" />
          </div>
          <div className="lg:col-span-2 space-y-5">
            <div className="h-48 bg-slate-800/50 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-red-400 text-sm mb-4">Order not found or failed to load.</p>
        <Link href="/buy/orders" className="text-green-400 hover:text-green-300 text-sm underline">
          Back to orders
        </Link>
      </div>
    );
  }

  const canCancel = order.status === 'PENDING_PAYMENT';

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky top-14 z-30 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3.5">
            <Link
              href="/buy/orders"
              className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="text-white font-bold text-base leading-tight">
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-slate-500 text-xs">{formatDate(order.createdAt)}</p>
            </div>
            <div className="shrink-0">
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Left: timeline + delivery */}
          <div className="lg:col-span-3 space-y-5">

            {/* Status hero banner */}
            {order.status === 'DELIVERED' && (
              <div className="bg-gradient-to-br from-green-700 via-green-800 to-slate-900 rounded-2xl border border-green-600/30 p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Delivered!</p>
                  <p className="text-green-200/70 text-sm">
                    {order.deliveredAt ? `Completed on ${formatDate(order.deliveredAt)}` : 'Order complete'}
                  </p>
                </div>
              </div>
            )}

            {order.status === 'READY_FOR_DELIVERY' && (
              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                  <Truck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-bold">Ready for Delivery</p>
                  <p className="text-slate-400 text-sm">
                    {order.requestedDelivery
                      ? `Requested for ${formatDate(order.requestedDelivery)}`
                      : 'Our rider will contact you soon'}
                  </p>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5">
                Order Progress
              </h2>
              <OrderTimeline status={order.status} />
            </div>

            {/* Delivery info */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Delivery Info
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Delivery address</p>
                    <p className="text-white text-sm font-semibold">{order.deliveryAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">M-Pesa phone</p>
                    <p className="text-white text-sm font-semibold">{order.deliveryPhone}</p>
                  </div>
                </div>
                {order.notes && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Notes</p>
                      <p className="text-white text-sm">{order.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: summary + receipt + actions */}
          <div className="lg:col-span-2 space-y-5">

            {/* Order summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Order Summary
              </h2>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
                <div className="w-10 h-10 bg-green-600/10 border border-green-600/20 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {order.quantity} bag{order.quantity > 1 ? 's' : ''}
                  </p>
                  <p className="text-slate-500 text-xs">{formatKg(order.totalKg)} total</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Quantity</span><span>{order.quantity}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Unit price</span><span>{formatKES(order.unitPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery</span><span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-800">
                  <span className="text-white">Total</span>
                  <span className="text-green-400">{formatKES(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Payment receipt */}
            {order.mpesaTransactionId && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Payment Receipt
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">Method</span>
                    <span className="text-white text-xs font-semibold">M-Pesa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Hash className="w-3 h-3" /> Transaction ID
                    </span>
                    <span className="text-green-400 text-xs font-mono font-bold">
                      {order.mpesaTransactionId}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <Link
                href="/buy"
                className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Place Another Order
              </Link>
              {canCancel && (
                <button
                  onClick={() => cancel()}
                  disabled={cancelling}
                  className="flex items-center justify-center gap-2 w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  {cancelling ? 'Cancelling…' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
