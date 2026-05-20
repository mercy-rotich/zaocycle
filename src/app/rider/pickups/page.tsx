import { Leaf, Navigation2 } from 'lucide-react';
import RiderPickupCard from '@/features/rider/components/RiderPickupCard';
import { mockRiderPickups, mockRider } from '@/lib/rider-mock-data';

export default function RiderPickupsPage() {
  const todayDate = '2026-05-11';
  const todayPickups = mockRiderPickups.filter((p) => p.scheduledDate === todayDate);
  const active  = todayPickups.filter((p) => p.status === 'pending' || p.status === 'assigned');
  const done    = todayPickups.filter((p) => p.status === 'collected' || p.status === 'paid');
  const todayKES = done.reduce((sum, p) => sum + (p.actualPayoutKES ?? 0), 0);

  const sortedPickups = [
    ...active.sort((a, b) => a.distanceKm - b.distanceKm),
    ...done,
  ];

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
        <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5">
          <Navigation2 className="w-3.5 h-3.5 text-green-400" />
          <span className="text-slate-300 text-xs font-medium">{mockRider.ward} Ward</span>
        </div>
      </div>

      {/* Page heading */}
      <div className="mb-5">
        <h1 className="text-white text-2xl font-extrabold tracking-tight">Today&apos;s Pickups</h1>
        <p className="text-slate-500 text-sm mt-1">
          Sorted nearest first · {active.length} active, {done.length} done
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Active', value: String(active.length), color: 'text-amber-400' },
          { label: 'Done',   value: String(done.length),   color: 'text-green-400' },
          { label: 'Earned', value: todayKES > 0 ? `KES ${todayKES}` : '—', color: 'text-green-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className={`text-lg font-extrabold tabular-nums leading-tight ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Pickup list */}
      {sortedPickups.length > 0 ? (
        <div className="space-y-3">
          {sortedPickups.map((pickup) => (
            <RiderPickupCard key={pickup.id} pickup={pickup} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center">
          <p className="text-slate-400 text-sm font-medium">No pickups scheduled today.</p>
          <p className="text-slate-600 text-xs mt-1.5">Check back later or contact your coop manager.</p>
        </div>
      )}
    </div>
  );
}
