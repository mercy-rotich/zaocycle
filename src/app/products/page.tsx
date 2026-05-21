import { PublicProductCard } from '@/features/products/components/PublicProductCard';
import type { ProductResponse } from '@/types/api';
import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';

export const revalidate = 60;

async function getProducts(): Promise<ProductResponse[]> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white">Eco-Briquettes</h1>
            <p className="text-slate-400 mt-2">
              Clean-burning fuel made from agricultural waste collected from Kirinyaga farmers.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              Products are currently unavailable. Please check back soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <PublicProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
