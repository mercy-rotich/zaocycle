import { Users, Package, Zap, Banknote, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricItem {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
  color: string;
  iconBg: string;
}

const metrics: MetricItem[] = [
  {
    icon: Users,
    value: '248',
    label: 'Active Farmers',
    sub: 'across 4 wards',
    color: 'text-green-400',
    iconBg: 'bg-green-500/15',
  },
  {
    icon: Package,
    value: '18.4T',
    label: 'Biomass Recovered',
    sub: 'diverted from open burning',
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
  },
  {
    icon: Zap,
    value: '3,684',
    label: 'Eco-Briquettes',
    sub: 'replacing school firewood',
    color: 'text-teal-400',
    iconBg: 'bg-teal-500/15',
  },
  {
    icon: Banknote,
    value: 'KES 184K',
    label: 'M-Pesa Payouts',
    sub: 'to smallholder farmers',
    color: 'text-green-300',
    iconBg: 'bg-green-400/15',
  },
];

export default function ImpactBanner() {
  return (
    <section id="impact" className="bg-slate-900 border-y border-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-center gap-2 mb-12">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">
            Pilot Phase Impact — Kirinyaga County
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map(({ icon: Icon, value, label, sub, color, iconBg }) => (
            <div
              key={label}
              className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700 text-center hover:border-green-500/30 hover:bg-slate-800/60 transition-all group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${iconBg} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className={`text-3xl sm:text-4xl font-extrabold ${color} mb-1 tabular-nums`}>
                {value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{label}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
