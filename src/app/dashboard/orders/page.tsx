'use client';

import { useState } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDashOrdersQuery, useMarkReadyMutation, useMarkDeliveredMutation } from '@/features/dashboard/hooks/useDashOrders';
import { formatDate, formatKES } from '@/shared/utils/formatters';
import OrderStatusBadge from '@/features/buyer/components/OrderStatusBadge';
import type { OrderStatus } from '@/types/api';

type FilterStatus = 'ALL' | OrderStatus;

const FILTERS: { key: FilterStatus; label: string }[] = [
  { key: 'ALL',               label: 'All' },
  { key: 'PENDING_PAYMENT',   label: 'Awaiting Payment' },
  { key: 'PAID',              label: 'Paid' },
  { key: 'READY_FOR_DELIVERY',label: 'Ready' },
  { key: 'DELIVERED',         label: 'Delivered' },
  { key: 'CANCELLED',         label: 'Cancelled' },
];

export default function DashOrdersPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<FilterStatus>('ALL');
  const { data, isLoading } = useDashOrdersQuery(page);
  const { mutate: markReady,     isPending: markingReady } = useMarkReadyMutation();
  const { mutate: markDelivered, isPending: markingDelivered } = useMarkDeliveredMutation();

  const orders = data?.content ?? [];
  const filtered = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
            <ShoppingBag className="w-5 h-5 text-green-400" />
          </div>
          <h1 className="text-white font-bold text-xl">Orders</h1>
        </div>
        <p className="text-slate-500 text-sm ml-12">Manage briquette orders and delivery status</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === key
                ? 'bg-green-600 text-white border-green-600'
                : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-10 text-center">
          <p className="text-slate-400 text-sm">No orders in this category.</p>
        </div>
      ) : (
        <>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Order ID', 'Placed', 'Address', 'Qty', 'Total', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => {
                  const canMarkReady     = o.status === 'PAID';
                  const canMarkDelivered = o.status === 'READY_FOR_DELIVERY';

                  return (
                    <tr key={o.id} className={`hover:bg-slate-800/40 transition-colors ${i < filtered.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                      <td className="px-5 py-4">
                        <p className="text-white text-sm font-mono">#{o.id.slice(-8).toUpperCase()}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-300 text-sm whitespace-nowrap">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-slate-300 text-sm max-w-[180px] truncate">
                        {o.deliveryAddress}
                      </td>
                      <td className="px-5 py-4 text-slate-300 text-sm whitespace-nowrap">
                        {o.quantity} bag{o.quantity > 1 ? 's' : ''}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-white text-sm font-semibold">{formatKES(o.totalAmount)}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <OrderStatusBadge status={o.status} />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {canMarkReady && (
                            <button
                              onClick={() => markReady(o.id)}
                              disabled={markingReady}
                              className="px-3 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 text-xs font-semibold rounded-lg border border-blue-600/20 transition-colors disabled:opacity-50"
                            >
                              Mark Ready
                            </button>
                          )}
                          {canMarkDelivered && (
                            <button
                              onClick={() => markDelivered(o.id)}
                              disabled={markingDelivered}
                              className="px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 text-xs font-semibold rounded-lg border border-green-600/20 transition-colors disabled:opacity-50"
                            >
                              Mark Delivered
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span className="text-slate-500 text-sm">Page {page + 1} of {data.totalPages}</span>
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
