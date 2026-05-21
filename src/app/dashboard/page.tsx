'use client';

import { Users, Package, Zap, Banknote, RefreshCw, MapPin, LayoutDashboard } from 'lucide-react';
import MetricsCard from '@/features/dashboard/components/MetricsCard';
import ActivityTable from '@/features/dashboard/components/ActivityTable';
import { useDashPickupsQuery } from '@/features/dashboard/hooks/useDashPickups';
import { useDashOrdersQuery } from '@/features/dashboard/hooks/useDashOrders';
import { useQueryClient } from '@tanstack/react-query';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { data: pickups = [], isLoading: loadingPickups } = useDashPickupsQuery();
  const { data: ordersPage, isLoading: loadingOrders } = useDashOrdersQuery();

  const orders = ordersPage?.content ?? [];

  // Aggregate metrics from live data
  const pendingPickups  = pickups.filter((p) => p.status === 'REQUESTED').length;
  const activePickups   = pickups.filter((p) => p.status === 'ASSIGNED').length;
  const biomassKg       = pickups.filter((p) => p.status === 'PAID' || p.status === 'COLLECTED')
                                 .reduce((s, p) => s + (p.weightKg ?? 0), 0);
  const totalPayouts    = pickups.filter((p) => p.status === 'PAID')
                                 .reduce((s, p) => s + (p.payoutAmount ?? 0), 0);
  const pendingOrders   = orders.filter((o) => o.status === 'PAID').length;
  const deliveredOrders = orders.filter((o) => o.status === 'DELIVERED').length;

  const isLoading = loadingPickups || loadingOrders;

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  }

  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold leading-tight">Cooperative Dashboard</h1>
              <p className="text-slate-500 text-sm">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
              <span className="text-slate-300 text-sm">{isLoading ? 'Loading…' : 'Live Data'}</span>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-3 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
          <span>Kirinyaga County — Mwea · Gichugu · Kirinyaga Central · Ndia</span>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <MetricsCard
          title="Pending Pickups"
          value={pendingPickups.toString()}
          sub={`${activePickups} assigned to riders`}
          change={`${pendingPickups + activePickups} open`}
          icon={Users}
          color="green"
        />
        <MetricsCard
          title="Biomass Collected"
          value={biomassKg >= 1000 ? `${(biomassKg / 1000).toFixed(1)}T` : `${biomassKg} kg`}
          sub="diverted from open burning"
          change="paid pickups total"
          icon={Package}
          color="emerald"
        />
        <MetricsCard
          title="Pending Orders"
          value={pendingOrders.toString()}
          sub={`${deliveredOrders} delivered`}
          change={`${orders.length} total`}
          icon={Zap}
          color="teal"
        />
        <MetricsCard
          title="M-Pesa Payouts"
          value={totalPayouts >= 1000 ? `KES ${(totalPayouts / 1000).toFixed(0)}K` : `KES ${totalPayouts}`}
          sub="to smallholder farmers"
          change="paid pickups"
          icon={Banknote}
          color="sky"
        />
      </div>

      {/* Activity table */}
      {isLoading ? (
        <div className="h-64 bg-slate-900 rounded-2xl border border-slate-800 animate-pulse" />
      ) : (
        <ActivityTable pickups={pickups} />
      )}
    </div>
  );
}
