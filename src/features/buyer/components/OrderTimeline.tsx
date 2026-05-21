import { CheckCircle2, Circle, Clock, Truck, Package, Wallet } from 'lucide-react';
import type { OrderStatus } from '@/types/api';

const STEPS: { status: OrderStatus; label: string; sublabel: string; icon: React.ElementType }[] = [
  { status: 'PENDING_PAYMENT',    label: 'Payment Pending',  sublabel: 'Awaiting M-Pesa confirmation',      icon: Wallet },
  { status: 'PAID',               label: 'Confirmed',        sublabel: 'Payment received, order queued',    icon: CheckCircle2 },
  { status: 'READY_FOR_DELIVERY', label: 'Ready',            sublabel: 'Packed and ready for delivery',     icon: Package },
  { status: 'DELIVERED',          label: 'Delivered',        sublabel: 'Order complete',                    icon: Truck },
];

const STATUS_INDEX: Partial<Record<OrderStatus, number>> = {
  PENDING_PAYMENT: 0, PAID: 1, READY_FOR_DELIVERY: 2, DELIVERED: 3,
};

export default function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentIdx = STATUS_INDEX[status] ?? -1;

  if (currentIdx === -1) {
    return (
      <p className="text-slate-500 text-sm italic">
        This order has been {status.toLowerCase().replace('_', ' ')}.
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {STEPS.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                done   ? 'bg-green-600 border-green-600' :
                active ? 'bg-green-600/20 border-green-500' :
                         'bg-slate-800 border-slate-700'
              }`}>
                {done   ? <CheckCircle2 className="w-4 h-4 text-white" /> :
                 active ? <Icon className="w-4 h-4 text-green-400" /> :
                          <Circle className="w-4 h-4 text-slate-600" />}
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-0.5 flex-1 my-1 min-h-[2rem] ${done ? 'bg-green-600' : 'bg-slate-800'}`} />
              )}
            </div>
            <div className="pb-6 pt-1.5">
              <p className={`text-sm font-semibold leading-tight ${
                done ? 'text-green-400' : active ? 'text-white' : 'text-slate-600'
              }`}>
                {step.label}
                {active && (
                  <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" /> Current
                  </span>
                )}
              </p>
              <p className={`text-xs mt-0.5 ${done || active ? 'text-slate-400' : 'text-slate-700'}`}>
                {step.sublabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
