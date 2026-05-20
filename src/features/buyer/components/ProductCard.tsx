import Link from 'next/link';
import { Flame, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { BriquetteProduct } from '@/lib/types';

interface Props {
  product: BriquetteProduct;
  featured?: boolean;
}

const sizeConfig = {
  'BR-50': {
    label: 'Best Value',
    bagW: 'w-24',
    bagH: 'h-28',
    accentFrom: 'from-green-600',
    accentTo: 'to-green-800',
    glow: 'shadow-green-500/20',
    badge: 'bg-green-500/20 text-green-300 border-green-500/30',
    perKg: 17,
  },
  'BR-25': {
    label: 'Most Popular',
    bagW: 'w-20',
    bagH: 'h-24',
    accentFrom: 'from-emerald-600',
    accentTo: 'to-emerald-800',
    glow: 'shadow-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    perKg: 18,
  },
  'BR-10': {
    label: 'Starter Pack',
    bagW: 'w-16',
    bagH: 'h-20',
    accentFrom: 'from-teal-600',
    accentTo: 'to-teal-800',
    glow: 'shadow-teal-500/20',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    perKg: 20,
  },
};

const defaultConfig = {
  label: '',
  bagW: 'w-20',
  bagH: 'h-24',
  accentFrom: 'from-green-600',
  accentTo: 'to-green-800',
  glow: 'shadow-green-500/20',
  badge: 'bg-green-500/20 text-green-300 border-green-500/30',
  perKg: 18,
};

export default function ProductCard({ product, featured = false }: Props) {
  const cfg = sizeConfig[product.id as keyof typeof sizeConfig] ?? defaultConfig;

  return (
    <div
      className={`relative bg-slate-900 rounded-2xl border overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-xl ${
        featured
          ? `border-green-500/50 shadow-lg ${cfg.glow}`
          : 'border-slate-800'
      }`}
    >
      {/* Label chip */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.badge}`}>
          {cfg.label}
        </span>
      </div>

      {/* Visual — fixed height so all three cards align */}
      <div className={`bg-gradient-to-br ${cfg.accentFrom} ${cfg.accentTo} h-40 flex items-center justify-center shrink-0`}>
        <div className="flex flex-col items-center">
          <div
            className={`${cfg.bagW} ${cfg.bagH} bg-white/10 border-2 border-white/20 rounded-t-2xl rounded-b-lg flex flex-col items-center justify-center gap-1 shadow-inner`}
          >
            <Flame className="w-5 h-5 text-white/70" />
            <span className="text-white/90 text-xs font-bold">{product.weightKg} kg</span>
          </div>
          <div className={`${cfg.bagW} h-2.5 bg-white/15 rounded-b-xl border-2 border-t-0 border-white/20`} />
        </div>
      </div>

      {/* Content — flex-1 so all cards stretch to equal height in the grid row */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
          <div className="text-right shrink-0">
            <p className="text-white font-extrabold text-xl tabular-nums">
              KES {product.priceKES.toLocaleString()}
            </p>
            <p className="text-slate-500 text-xs">KES {cfg.perKg}/kg</p>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

        {/* Stock indicator */}
        <div className="flex items-center gap-1.5 mb-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
          <span className="text-green-400 text-xs font-medium">
            {product.stockBags} bags in stock · Free delivery in Kirinyaga
          </span>
        </div>

        {/* Order button — simple flex row, no competing alignment */}
        <Link
          href={`/buy/checkout?product=${product.id}&qty=1`}
          className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
            featured
              ? 'bg-green-600 hover:bg-green-500 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
        >
          <span>Order Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
