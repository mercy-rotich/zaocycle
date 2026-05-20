import Link from 'next/link';
import { Package } from 'lucide-react';
import { formatKES, formatKg } from '@/shared/utils/formatters';
import type { ProductResponse } from '@/types/api';

export function PublicProductCard({ product }: { product: ProductResponse }) {
  return (
    <div className="bg-slate-900 rounded-2xl ring-1 ring-slate-800 overflow-hidden flex flex-col">
      <div className="h-40 bg-slate-800 flex items-center justify-center">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Package className="w-12 h-12 text-slate-600" />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{product.sku}</p>
          <h3 className="text-white font-semibold mt-0.5">{product.name}</h3>
          <p className="text-slate-400 text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">
          <div>
            <p className="text-green-400 font-bold text-lg">{formatKES(product.unitPrice)}</p>
            <p className="text-slate-500 text-xs">{formatKg(product.weightKg)} per bag</p>
          </div>
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
