import { TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  sub: string;
  change: string;
  icon: LucideIcon;
  color: 'green' | 'emerald' | 'teal' | 'sky';
}

const colorMap = {
  green: {
    iconBg: 'bg-green-500/10',
    iconText: 'text-green-400',
    border: 'border-green-500/20',
    value: 'text-green-400',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    border: 'border-emerald-500/20',
    value: 'text-emerald-400',
  },
  teal: {
    iconBg: 'bg-teal-500/10',
    iconText: 'text-teal-400',
    border: 'border-teal-500/20',
    value: 'text-teal-400',
  },
  sky: {
    iconBg: 'bg-sky-500/10',
    iconText: 'text-sky-400',
    border: 'border-sky-500/20',
    value: 'text-sky-400',
  },
};

export default function MetricsCard({ title, value, sub, change, icon: Icon, color }: Props) {
  const c = colorMap[color];

  return (
    <div className={`bg-slate-900 rounded-2xl p-6 border ${c.border} hover:bg-slate-800/50 transition-all`}>
      <div className="flex items-start justify-between mb-5">
        <div className={`w-11 h-11 ${c.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.iconText}`} />
        </div>
        <div className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-400/10 rounded-full px-2.5 py-1">
          <TrendingUp className="w-3 h-3" />
          <span>{change}</span>
        </div>
      </div>

      <div className={`text-3xl font-extrabold ${c.value} mb-1 tabular-nums`}>{value}</div>
      <div className="text-white text-sm font-semibold mb-1">{title}</div>
      <div className="text-slate-500 text-xs leading-relaxed">{sub}</div>
    </div>
  );
}
