import { CheckCircle2, Clock, Truck, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { WasteCollectionLog } from '@/lib/types';

interface Props {
  logs: WasteCollectionLog[];
}

interface StatusConfig {
  icon: LucideIcon;
  label: string;
  classes: string;
}

const statusConfig: Record<WasteCollectionLog['status'], StatusConfig> = {
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    classes: 'text-green-400 bg-green-400/10 border-green-400/20',
  },
  'in-transit': {
    icon: Truck,
    label: 'In Transit',
    classes: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    classes: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
  },
};

function StatusBadge({ status }: { status: WasteCollectionLog['status'] }) {
  const { icon: Icon, label, classes } = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${classes}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

const columnHeaders = ['Farmer', 'Ward', 'Waste Type', 'Weight', 'Rider', 'M-Pesa Paid', 'Status'];

export default function ActivityTable({ logs }: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-green-400" />
          <h2 className="text-white font-bold">Recent Waste Collections</h2>
        </div>
        <span className="text-slate-500 text-sm">{logs.length} entries</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              {columnHeaders.map((h) => (
                <th
                  key={h}
                  className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={log.id}
                className={`hover:bg-slate-800/40 transition-colors ${
                  i < logs.length - 1 ? 'border-b border-slate-800/60' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="text-white text-sm font-medium whitespace-nowrap">{log.farmerName}</div>
                  <div className="text-slate-500 text-xs">{log.collectionDate}</div>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm whitespace-nowrap">{log.ward}</td>
                <td className="px-6 py-4 text-slate-300 text-sm whitespace-nowrap">{log.wasteType}</td>
                <td className="px-6 py-4 text-slate-300 text-sm font-mono whitespace-nowrap">
                  {log.weightKg} kg
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm whitespace-nowrap">{log.riderName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-400 text-sm font-semibold">
                    KES {log.mpesaAmountKES.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
