import type { OrderStatus } from '@/types/api';

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING_PAYMENT:    'bg-amber-500/10  text-amber-400  border-amber-500/20',
  PAID:               'bg-sky-500/10    text-sky-400    border-sky-500/20',
  READY_FOR_DELIVERY: 'bg-blue-500/10   text-blue-400   border-blue-500/20',
  DELIVERED:          'bg-green-500/10  text-green-400  border-green-500/20',
  CANCELLED:          'bg-slate-500/10  text-slate-400  border-slate-500/20',
  REFUNDED:           'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT:    'Awaiting Payment',
  PAID:               'Paid',
  READY_FOR_DELIVERY: 'Ready for Delivery',
  DELIVERED:          'Delivered',
  CANCELLED:          'Cancelled',
  REFUNDED:           'Refunded',
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
