'use client';

import Link from 'next/link';
import { useMyOrdersQuery } from '@/features/buyer/hooks/useOrders';
import OrderStatusBadge from '@/features/buyer/components/OrderStatusBadge';
import { formatKES, formatDate } from '@/shared/utils/formatters';
import { Package, ChevronRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function OrdersPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useMyOrdersQuery(page);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-white font-extrabold text-2xl tracking-tight">My Orders</h1>
        <p className="text-slate-400 text-sm mt-1">Track and manage your briquette orders</p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-16">
          <p className="text-red-400 text-sm">Failed to load orders. Please try again.</p>
        </div>
      )}

      {data && data.content.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-white font-semibold mb-1">No orders yet</p>
          <p className="text-slate-500 text-sm mb-5">Place your first briquette order to get started.</p>
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}

      {data && data.content.length > 0 && (
        <>
          <div className="space-y-3">
            {data.content.map((order) => (
              <Link
                key={order.id}
                href={`/buy/orders/${order.id}`}
                className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-colors group"
              >
                <div className="w-11 h-11 bg-green-600/10 border border-green-600/20 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-green-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold text-sm truncate">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">
                    {order.quantity} bag{order.quantity > 1 ? 's' : ''} · {order.deliveryAddress}
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">{formatDate(order.createdAt)}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-sm">{formatKES(order.totalAmount)}</p>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors mt-1 ml-auto" />
                </div>
              </Link>
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span className="text-slate-500 text-sm">
                Page {page + 1} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                disabled={page >= data.totalPages - 1}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
