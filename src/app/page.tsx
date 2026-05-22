import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';
import HeroSection from '@/features/home/components/HeroSection';
import ImpactBanner from '@/features/home/components/ImpactBanner';
import HowItWorksSection from '@/features/home/components/HowItWorksSection';
import { ProductsPreview } from '@/features/home/components/ProductsPreview';
import type { ProductResponse } from '@/types/api';

export const revalidate = 60;

async function getTopProducts(): Promise<ProductResponse[]> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/products`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data as ProductResponse[]).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getTopProducts();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactBanner />
        <HowItWorksSection />
        {products.length > 0 && <ProductsPreview products={products} />}
      </main>
      <Footer />
    </>
  );
}
