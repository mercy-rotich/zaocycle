import { Wallet, TrendingUp } from 'lucide-react';
import { mockRiderEarnings } from '@/lib/rider-mock-data';

export default function RiderEarningsPage() {
  const e = mockRiderEarnings;
  const maxBar = Math.max(...e.dailyEarnings.map((d) => d.amountKES), 1);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <Wallet className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Earnings</h1>
          <p className="text-slate-500 text-xs">Your commission summary</p>
        </div>
      </div>

      {/* Period stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Today',      value: e.todayKES,     dim: false },
          { label: 'This Week',  value: e.thisWeekKES,  dim: false },
          { label: 'This Month', value: e.thisMonthKES, dim: false },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-white text-sm font-extrabold tabular-nums leading-tight">
              {value > 0 ? `KES ${value.toLocaleString()}` : '—'}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* All-time hero card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-slate-900 rounded-2xl p-5 border border-green-700/40 mb-5">
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="relative">
          <p className="text-green-200/80 text-xs font-semibold uppercase tracking-widest mb-1.5">
            All Time Earned
          </p>
          <p className="text-white text-4xl font-extrabold tabular-nums">
            KES {e.totalKES.toLocaleString()}
          </p>
          <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-green-200/70 text-xs mb-0.5">Pickups completed</p>
              <p className="text-white text-sm font-bold">{e.completedPickups}</p>
            </div>
            <div>
              <p className="text-green-200/70 text-xs mb-0.5">Waste recovered</p>
              <p className="text-white text-sm font-bold">{e.totalWeightKg.toLocaleString()} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily bar chart */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <h2 className="text-white font-bold text-sm">Last 7 Days</h2>
        </div>

        <div className="flex items-end gap-2.5" style={{ height: '96px' }}>
          {e.dailyEarnings.map(({ day, amountKES }) => {
            const pct = amountKES > 0 ? (amountKES / maxBar) * 100 : 5;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end" style={{ height: '72px' }}>
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      amountKES > 0 ? 'bg-green-500' : 'bg-slate-800'
                    }`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className="text-slate-500 text-[10px] font-medium">{day}</span>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="flex justify-between mt-3 pt-3 border-t border-slate-800">
          <span className="text-slate-600 text-xs">0</span>
          <span className="text-slate-600 text-xs">KES {maxBar.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
