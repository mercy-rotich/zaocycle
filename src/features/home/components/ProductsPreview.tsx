import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PublicProductCard } from '@/features/products/components/PublicProductCard';
import type { ProductResponse } from '@/types/api';

export function ProductsPreview({ products }: { products: ProductResponse[] }) {
  return (
    <section className="bg-slate-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Our Products</h2>
            <p className="text-slate-400 mt-1 text-sm">
              Clean-burning eco-briquettes made from recovered agricultural waste.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <PublicProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-medium"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
