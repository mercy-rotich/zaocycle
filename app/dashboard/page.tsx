import { Users, Package, Zap, Banknote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricsCard from '@/components/dashboard/MetricsCard';
import ActivityTable from '@/components/dashboard/ActivityTable';
import { mockMetrics, mockWasteLogs } from '@/lib/mock-data';
import type { DashboardMetrics } from '@/lib/types';

interface MetricConfig {
  key: keyof DashboardMetrics;
  title: string;
  sub: string;
  change: string;
  icon: LucideIcon;
  color: 'green' | 'emerald' | 'teal' | 'sky';
  format: (v: number) => string;
}

const metricsConfig: MetricConfig[] = [
  {
    key: 'activeFarmers',
    title: 'Active Farmers',
    sub: 'across 4 wards',
    change: '+12% this month',
    icon: Users,
    color: 'green',
    format: (v) => v.toLocaleString(),
  },
  {
    key: 'biomassCollectedKg',
    title: 'Biomass Collected',
    sub: 'diverted from open burning',
    change: '+8% this week',
    icon: Package,
    color: 'emerald',
    format: (v) => `${(v / 1000).toFixed(1)}T`,
  },
  {
    key: 'ecoBriquettesProduced',
    title: 'Eco-Briquettes',
    sub: 'replacing school firewood',
    change: '+15% this month',
    icon: Zap,
    color: 'teal',
    format: (v) => v.toLocaleString(),
  },
  {
    key: 'totalMpesaPayoutsKES',
    title: 'M-Pesa Payouts',
    sub: 'to smallholder farmers',
    change: '+20% this month',
    icon: Banknote,
    color: 'sky',
    format: (v) => `KES ${(v / 1000).toFixed(0)}K`,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <DashboardHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {metricsConfig.map((m) => (
            <MetricsCard
              key={m.key}
              title={m.title}
              value={m.format(mockMetrics[m.key])}
              sub={m.sub}
              change={m.change}
              icon={m.icon}
              color={m.color}
            />
          ))}
        </div>

        <ActivityTable logs={mockWasteLogs} />
      </main>
    </div>
  );
}
