import Link from 'next/link';
import {
  ArrowRight, ScanLine, ShieldCheck, Leaf, TreePine,
  Users, Package, Banknote, Zap, CheckCircle2, Clock, Bike, LogIn,
} from 'lucide-react';

const trustSignals = [
  { icon: ShieldCheck, label: '248 Certified Farmers' },
  { icon: Leaf, label: '18,420 Kg Waste Recovered' },
  { icon: TreePine, label: 'Deforestation Reversed' },
];

const metrics = [
  { icon: Users,    value: '248',      label: 'Active Farmers',     color: 'text-green-400',   bg: 'bg-green-500/10' },
  { icon: Package,  value: '18.4 T',   label: 'Biomass Collected',  color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Banknote, value: 'KES 184K', label: 'M-Pesa Payouts',     color: 'text-green-300',   bg: 'bg-green-400/10' },
  { icon: Zap,      value: '3,684',    label: 'Eco-Briquettes',     color: 'text-teal-400',    bg: 'bg-teal-500/10' },
];

const recentActivity = [
  { icon: CheckCircle2, color: 'text-green-400', text: 'Grace Wanjiku — Tomatoes certified safe', time: '2 min ago' },
  { icon: Bike,         color: 'text-sky-400',   text: 'James Mwangi collected 85 kg rice husks', time: '14 min ago' },
  { icon: Clock,        color: 'text-amber-400', text: 'Mary Njeri — PHI countdown: 3 days left', time: '31 min ago' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-slate-950 flex items-center overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-[600px] h-[500px] bg-green-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-green-600/4 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: headline + CTAs ── */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-8">
              <Leaf className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">
                Kirinyaga Youth Summit 2026 — Innovation Pitch
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Zero Poison.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Zero Waste.
              </span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              ZaoCycle pays Kirinyaga farmers to farm safely by monetizing their agricultural
              waste — linking Kenya&apos;s agrochemical health crisis and its deforestation
              problem into one self-sustaining solution.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/register"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/20"
              >
                <Package className="w-5 h-5" />
                Buy Briquettes
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Staff Login
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-slate-800">
              {trustSignals.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-slate-400">
                  <Icon className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: platform snapshot card ── */}
          <div className="hidden lg:block">
            <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 rounded-md flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white text-sm font-bold">ZaoCycle Platform</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-px bg-slate-800/50 border-b border-slate-800">
                {metrics.map(({ icon: Icon, value, label, color, bg }) => (
                  <div key={label} className="bg-slate-900 px-5 py-4">
                    <div className={`inline-flex items-center justify-center w-8 h-8 ${bg} rounded-lg mb-2`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <p className={`text-xl font-extrabold tabular-nums ${color} leading-tight`}>{value}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Recent activity feed */}
              <div className="px-5 py-4">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Recent Activity</p>
                <div className="space-y-3">
                  {recentActivity.map(({ icon: Icon, color, text, time }) => (
                    <div key={text} className="flex items-start gap-3">
                      <Icon className={`w-4 h-4 ${color} shrink-0 mt-0.5`} />
                      <div className="min-w-0">
                        <p className="text-slate-300 text-xs leading-snug">{text}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 py-3 border-t border-slate-800 bg-slate-800/20">
                <p className="text-slate-600 text-xs text-center">
                  Kirinyaga County · Mwea · Gichugu · Kirinyaga Central · Ndia
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
