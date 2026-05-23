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
  const activeApplications = applications.filter(
    (a) => a.status !== 'EXPIRED' && a.status !== 'INVALIDATED',
  );

  return (
    <div className="px-4 pt-6 lg:px-10 lg:pt-8 lg:max-w-5xl lg:mx-auto">

      {/* ── Mobile top bar ── */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-base">
            Zao<span className="text-green-400">Cycle</span>
          </span>
        </div>
        <button className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
          <Bell className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* ── Mobile greeting ── */}
      <div className="mb-5 lg:hidden">
        <p className="text-slate-500 text-sm">Habari 👋</p>
        <h1 className="text-white text-2xl font-extrabold mt-0.5 tracking-tight">{firstName}</h1>
        {profile && <p className="text-slate-500 text-xs mt-0.5">{profile.ward} Ward</p>}
      </div>

      {/* ── Desktop page header ── */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div>
          <p className="text-slate-500 text-sm">Habari 👋</p>
          <h1 className="text-white text-3xl font-extrabold mt-0.5 tracking-tight">{firstName}</h1>
          {profile && <p className="text-slate-500 text-sm mt-1">{profile.ward} Ward</p>}
        </div>
        <button className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 hover:bg-slate-700 transition-colors">
          <Bell className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* ── Earnings + Pickup CTA: stack on mobile, 2-col on desktop ── */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 mb-5 lg:mb-8">
        <div className="mb-5 lg:mb-0">
          {earnings ? (
            <EarningsCard earnings={earnings} />
          ) : (
            <div className="h-36 bg-slate-800/50 rounded-2xl animate-pulse" />
          )}
        </div>

        {safeApplications.length > 0 ? (
          <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-5 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Waste pickup available</p>
                <p className="text-green-400 text-xs">
                  {safeApplications.length} crop{safeApplications.length > 1 ? 's' : ''} certified &amp; ready
                </p>
              </div>
            </div>
            <button
              onClick={() => requestPickup(undefined)}
              disabled={requesting}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
            >
              {requesting ? 'Requesting…' : 'Request Pickup'}
              {!requesting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          /* Placeholder on desktop when no pickups are ready */
          <div className="hidden lg:flex flex-col justify-center bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mb-3">
              <Truck className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm font-medium">No pickups ready</p>
            <p className="text-slate-600 text-xs mt-1">
              Crops appear here once the PHI countdown completes.
            </p>
          </div>
        )}
      </div>

      {/* ── Active Applications ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h2 className="text-white font-bold text-sm lg:text-base tracking-tight">
            Active Applications
          </h2>
          <Link
            href="/farmer/applications"
            className="text-green-400 text-xs font-medium hover:text-green-300 transition-colors"
          >
            View all
          </Link>
        </div>

        {activeApplications.length > 0 ? (
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
            {activeApplications.slice(0, 4).map((app) => (
              <PHICountdownCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
            <p className="text-slate-400 text-sm">No active applications.</p>
            <p className="text-slate-600 text-xs mt-1.5">
              Log your next spray via USSD{' '}
              <span className="font-mono text-slate-500">*XXX#</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
