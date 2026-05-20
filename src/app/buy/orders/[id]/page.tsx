import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, MapPin, Phone, Hash, CheckCircle2, Truck } from 'lucide-react';
import OrderTimeline from '@/features/buyer/components/OrderTimeline';
import { mockOrders } from '@/lib/school-mock-data';

interface Props {
  params: Promise<{ id: string }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-KE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

const statusLabel: Record<string, string> = {
  pending_payment: 'Awaiting Payment',
  confirmed: 'Confirmed',
  processing: 'Preparing',
  dispatched: 'On the Way',
  delivered: 'Delivered',
};

const statusColor: Record<string, string> = {
  pending_payment: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  confirmed: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  processing: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  dispatched: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  delivered: 'text-green-400 bg-green-400/10 border-green-400/20',
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = mockOrders.find((o) => o.id === id);
  if (!order) notFound();

  const subtotal = order.items.reduce((s, i) => s + i.priceKES * i.quantity, 0);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-14 z-30 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3.5">
            <Link
              href="/buy"
              className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-base leading-tight">Order {order.id}</h1>
              <p className="text-slate-500 text-xs truncate">{order.schoolName}</p>
            </div>
            <div className="ml-auto shrink-0">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor[order.status]}`}>
                {statusLabel[order.status]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left column: timeline + delivery */}
          <div className="lg:col-span-3 space-y-5">
            {/* Status hero */}
            {order.status === 'delivered' ? (
              <div className="bg-gradient-to-br from-green-700 via-green-800 to-slate-900 rounded-2xl border border-green-600/30 p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Delivered!</p>
                  <p className="text-green-200/70 text-sm">
                    Order completed on {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : '—'}
                  </p>
                </div>
              </div>
            ) : order.status === 'dispatched' ? (
              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                  <Truck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-bold">On the Way</p>
                  <p className="text-slate-400 text-sm">
                    Expected delivery: {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : '—'}
                  </p>
                </div>
              </div>
            ) : null}

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
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">School</p>
                    <p className="text-white text-sm font-semibold">{order.schoolName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Contact</p>
                    <p className="text-white text-sm font-semibold">
                      {order.contactName} · {order.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Delivery address</p>
                    <p className="text-white text-sm font-semibold">
                      {order.deliveryAddress}, {order.ward} Ward
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: order items + receipt */}
          <div className="lg:col-span-2 space-y-5">
            {/* Items */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Items Ordered
              </h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600/10 border border-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{item.productName}</p>
                        <p className="text-slate-500 text-xs">× {item.quantity} sack{item.quantity > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <p className="text-white text-sm font-bold tabular-nums shrink-0">
                      KES {(item.priceKES * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-300">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold mt-1 pt-1 border-t border-slate-800">
                  <span className="text-white">Total Paid</span>
                  <span className="text-white text-lg">KES {order.totalKES.toLocaleString()}</span>
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
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">Placed</span>
                    <span className="text-slate-300 text-xs">{formatDate(order.placedAt)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Re-order */}
            <Link
              href="/buy"
              className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Place Another Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
