import Link from 'next/link';
import { Package, Flame } from 'lucide-react';
import { formatKES, formatKg } from '@/shared/utils/formatters';
import type { ProductResponse } from '@/types/api';

interface Props {
  product: ProductResponse;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: Props) {
  const checkoutHref = `/buy/checkout?product=${product.id}&qty=1`;

  return (
    <div className={`relative bg-slate-900 rounded-2xl overflow-hidden flex flex-col transition-all
      ${featured
        ? 'ring-2 ring-green-500/50 shadow-xl shadow-green-500/10'
        : 'ring-1 ring-slate-800 hover:ring-slate-700'
      }`}
    >
      {featured && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
          Popular
        </div>
      )}

      {/* Visual */}
      <div className={`h-36 flex items-center justify-center
        ${featured ? 'bg-gradient-to-br from-green-800 to-green-950' : 'bg-slate-800'}`}
      >
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Flame className={`w-10 h-10 ${featured ? 'text-green-400' : ''}`} />
            <Package className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{product.sku}</p>
          <h3 className="text-white font-bold text-lg mt-0.5">{product.name}</h3>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">
          <div>
            <p className={`font-extrabold text-xl ${featured ? 'text-green-400' : 'text-white'}`}>
              {formatKES(product.unitPrice)}
            </p>
            <p className="text-slate-500 text-xs">{formatKg(product.weightKg)} per bag</p>
          </div>
          <Link
            href={checkoutHref}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors
              ${featured
                ? 'bg-green-600 hover:bg-green-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
              }`}
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
