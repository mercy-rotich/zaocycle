'use client';

import Link from 'next/link';
import { Bell, Leaf, Truck, ArrowRight } from 'lucide-react';
import EarningsCard from '@/features/farmer/components/EarningsCard';
import PHICountdownCard from '@/features/farmer/components/PHICountdownCard';
import { useFarmerProfileQuery, useFarmerEarningsQuery } from '@/features/farmer/hooks/useFarmer';
import { useFarmerApplicationsQuery } from '@/features/farmer/hooks/useApplications';
import { useRequestPickupMutation } from '@/features/farmer/hooks/usePickups';
import { useAuthStore } from '@/store/authStore';

export default function FarmerDashboardPage() {
  const { user } = useAuthStore();
  const { data: profile } = useFarmerProfileQuery();
  const { data: earnings } = useFarmerEarningsQuery();
  const { data: applications = [] } = useFarmerApplicationsQuery();
  const { mutate: requestPickup, isPending: requesting } = useRequestPickupMutation();

  const firstName = (profile?.fullName ?? user?.displayName ?? 'Farmer').split(' ')[0];
  const safeApplications = applications.filter((a) => a.status === 'SAFE');
  const activeApplications = applications.filter((a) => a.status !== 'EXPIRED' && a.status !== 'INVALIDATED');

  return (
    <div className="px-4 pt-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-base">
            Zao<span className="text-green-400">Cycle</span>
          </span>
        </div>
        <button className="relative w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
          <Bell className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Greeting */}
      <div className="mb-5">
        <p className="text-slate-500 text-sm">Habari 👋</p>
        <h1 className="text-white text-2xl font-extrabold mt-0.5 tracking-tight">{firstName}</h1>
        {profile && (
          <p className="text-slate-500 text-xs mt-0.5">{profile.ward} Ward</p>
        )}
      </div>

      {/* Earnings card */}
      <div className="mb-5">
        {earnings ? (
          <EarningsCard earnings={earnings} />
        ) : (
          <div className="h-36 bg-slate-800/50 rounded-2xl animate-pulse" />
        )}
      </div>

      {/* Request Pickup CTA */}
      {safeApplications.length > 0 && (
        <div className="mb-5 bg-green-500/8 border border-green-500/20 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Waste pickup available</p>
              <p className="text-green-400 text-xs">
                {safeApplications.length} crop{safeApplications.length > 1 ? 's' : ''} certified &amp; ready
              </p>
            </div>
          </div>
          <button
            onClick={() => requestPickup(undefined)}
            disabled={requesting}
            className="shrink-0 flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-colors"
          >
            {requesting ? 'Requesting…' : 'Request'}
            {!requesting && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Active Applications section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm tracking-tight">Active Applications</h2>
          <Link
            href="/farmer/applications"
            className="text-green-400 text-xs font-medium hover:text-green-300 transition-colors"
          >
            View all
          </Link>
        </div>

        {activeApplications.length > 0 ? (
          <div className="space-y-3">
            {activeApplications.slice(0, 3).map((app) => (
              <PHICountdownCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
            <p className="text-slate-400 text-sm">No active applications.</p>
            <p className="text-slate-600 text-xs mt-1.5">
              Log your next spray via USSD <span className="font-mono text-slate-500">*XXX#</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
