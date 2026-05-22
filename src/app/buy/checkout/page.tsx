import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CheckoutClient from '@/features/buyer/components/CheckoutClient';
import { formatKES } from '@/shared/utils/formatters';
import type { ProductResponse } from '@/types/api';

export const metadata = {
  title: 'Checkout — ZaoCycle',
};

interface Props {
  searchParams: Promise<{ product?: string; qty?: string }>;
}

async function getProduct(id: string): Promise<ProductResponse | null> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as ProductResponse;
  } catch {
    return null;
  }
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { product: productId = '', qty: qtyStr = '1' } = await searchParams;

  if (!productId) notFound();

  const product = await getProduct(productId);
  if (!product) notFound();

  const qty = Math.max(1, parseInt(qtyStr) || 1);

  return (
    <div>
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
              <p className="text-slate-500 text-xs">{product.name} · {formatKES(product.unitPrice)} / bag</p>
            </div>
          </div>
        </div>
      </div>

      <CheckoutClient product={product} initialQty={qty} />
    </div>
  );
}
