import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CheckoutClient from '@/components/buy/CheckoutClient';
import { mockProducts } from '@/lib/school-mock-data';

export const metadata = {
  title: 'Checkout — ZaoCycle',
};

interface Props {
  searchParams: Promise<{ product?: string; qty?: string }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { product: productId = 'BR-25', qty: qtyStr = '1' } = await searchParams;

  const product = mockProducts.find((p) => p.id === productId);
  if (!product) notFound();

  const qty = Math.max(1, Math.min(parseInt(qtyStr) || 1, product.stockBags));

  return (
    <div>
      {/* Header */}
      <div className="sticky top-14 z-30 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3.5">
            <Link
              href="/buy"
              className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-base leading-tight">Checkout</h1>
              <p className="text-slate-500 text-xs">{product.name} · KES {product.priceKES.toLocaleString()} / sack</p>
            </div>
          </div>
        </div>
      </div>

      <CheckoutClient product={product} initialQty={qty} />
    </div>
  );
}
