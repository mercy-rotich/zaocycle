import Link from 'next/link';
import { ArrowRight, ScanLine, ShieldCheck, Leaf, TreePine } from 'lucide-react';

const trustSignals = [
  { icon: ShieldCheck, label: '248 Certified Farmers' },
  { icon: Leaf, label: '18,420 Kg Waste Recovered' },
  { icon: TreePine, label: 'Deforestation Actively Reversed' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-slate-900 flex items-center overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">

          {/* Top badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-8">
            <Leaf className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">
              Kirinyaga Youth Summit 2026 — Innovation Pitch
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Zero Poison.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Zero Waste.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            ZaoCycle pays Kirinyaga farmers to farm safely by monetizing their agricultural waste — linking Kenya&apos;s agrochemical health crisis and its deforestation problem into one self-sustaining solution.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/scan/demo"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/20"
            >
              <ScanLine className="w-5 h-5" />
              Verify Food Safety
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all"
            >
              View Dashboard
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-6 mt-14 pt-14 border-t border-slate-800">
            {trustSignals.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400">
                <Icon className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
